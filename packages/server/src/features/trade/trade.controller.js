const { extractPage } = require("../utils");

class TradeController {
  async getPairs(ctx) {
    const pairs = await ctx.db.TradingPair.findAll({
      include: [
        { model: ctx.db.TradingPairPrice, as: "price", attributes: ["last_price", "aver_price"] },
        { model: ctx.db.HandicapOf, as: "handicap", attributes: ["buy", "sell"] }
      ]
    });
    ctx.body = pairs.map(pair => {
      Object.assign(pair.dataValues, {
        currency_pair: JSON.parse(pair.dataValues.currency_pair),
        online: pair.online === "true"
      });
      return pair;
    });
  }

  async handicap(ctx) {
    const { pairId } = ctx.params;
    if (typeof pairId === "undefined") {
      ctx.status = 400;
      ctx.body = { error: "no pairid" };
      return;
    }

    const { count = 5 } = ctx.query;

    const where = { pairid: pairId };
    const asks = await ctx.db.Handicap.findAll({
      where: Object.assign({}, where, { direction: "Sell" }),
      order: [["price", "ASC"]],
      limit: count,
      offset: 0
    });

    const bids = await ctx.db.Handicap.findAll({
      where: Object.assign({}, where, { direction: "Buy" }),
      order: [["price", "DESC"]],
      limit: count,
      offset: 0
    });

    ctx.body = { asks, bids };
  }

  async latestFills(ctx) {
    const { pairId } = ctx.params;
    if (typeof pairId === "undefined") {
      ctx.status = 400;
      ctx.body = { error: "no pairid" };
      return;
    }

    const { count = 20 } = ctx.query;
    const orders = await ctx.db.sequelize.query(
      `
    SELECT fill.*, o.direction FROM "event_xspot_FillsOf" AS fill
    INNER JOIN "event_xspot_AccountOrder" AS o ON fill.taker_user=o.accountid AND fill.taker_user_order_index=o.id
    WHERE fill.pairid=${pairId}
    ORDER BY time desc OFFSET 0 limit ${count};
    `,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );
    ctx.body = orders;
  }

  async userOrders(ctx) {
    const { accountId } = ctx.params;
    if (typeof accountId === "undefined") {
      ctx.status = 400;
      ctx.body = { error: "no account id" };
      return;
    }

    const { page, pageSize } = extractPage(ctx);
    const where = { accountid: accountId };
    const { status, pairid } = ctx.query;
    if (typeof pairid !== "undefined" && pairid !== null) {
      Object.assign(where, { pairid });
    }

    /**
     * 0: 零成交或部分成交
     * 1: 部分成交或全部成交
     * 2: 全部成交
     * 3: 全部成交，取消(代表所有历史委托)
     * 没有指定status，则返回所有
     */
    if (status === "0") {
      Object.assign(where, { $or: [{ status: "ZeroFill" }, { status: "ParitialFill" }] });
    } else if (status === "1") {
      Object.assign(where, { $or: [{ status: "Filled" }, { status: "ParitialFill" }] });
    } else if (status === "2") {
      Object.assign(where, { status: "Filled" });
    } else if (status === "3") {
      Object.assign(where, {
        $or: [{ status: "Filled" }, { status: "Canceled" }, { status: "ParitialFillAndCanceled" }]
      });
    }
    const { rows: items, count: total } = await ctx.db.Order.findAndCountAll({
      where,
      include: [
        { model: ctx.db.Block, as: "block", attributes: ["time"] },
        { model: ctx.db.TradingPair, as: "pair" },
        { model: ctx.db.Block, as: "updateBlock", attributes: ["time"] }
      ],
      order: [["create_time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: items.map(item => ({
        ...item,
        fill_index: JSON.parse(item.fill_index),
        ["pair.currency_pair"]: JSON.parse(item["pair.currency_pair"]),
        ["pair.online"]: item["pair.online"] === "true"
      })),
      page,
      pageSize,
      total
    };
  }

  async orderFills(ctx) {
    const { accountId, index } = ctx.params;
    if (typeof accountId === "undefined" || typeof index === "undefined") {
      ctx.status = 400;
      ctx.body = { error: "no accountId or index" };
      return;
    }

    const fills = await ctx.db.FilledOrder.findAll({
      where: {
        $and: [
          { $or: [{ maker_user: accountId }, { taker_user: accountId }] },
          { $or: [{ maker_user_order_index: index }, { taker_user_order_index: index }] }
        ]
      },
      raw: true
    });

    ctx.body = fills;
  }

  async filledOrdersByIds(ctx) {
    const { id, pair_id: pairId } = ctx.query;
    if (!id || !pairId) {
      ctx.status = 400;
      ctx.body = { error: "no id or pair_id query param" };
      return;
    }

    const ids = id.split(",").map(i => parseInt(i));
    for (let i of ids) {
      if (isNaN(i)) {
        ctx.status = 400;
        ctx.body = { error: "invalid id" };
        return;
      }
    }

    const orders = await ctx.db.FilledOrder.findAll({
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      where: {
        id: {
          $in: ids
        },
        pairid: pairId
      },
      raw: true
    });

    ctx.body = orders;
  }

  async allOrders(ctx) {
    const { pairId } = ctx.params;
    const { page, pageSize } = extractPage(ctx);

    const { rows: items, count: total } = await ctx.db.Order.findAndCountAll({
      where: { pairid: pairId, $or: [{ status: "ZeroFill" }, { status: "ParitialFill" }] },
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      attributes: { exclude: ["pairid"] },
      order: [["create_time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items,
      page,
      pageSize,
      total
    };
  }

  async allFilledOrders(ctx) {
    const { pairId } = ctx.params;
    const { page, pageSize } = extractPage(ctx);

    const { rows: items, count: total } = await ctx.db.FilledOrder.findAndCountAll({
      where: { pairid: pairId },
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      attributes: { exclude: ["pairid", "time"] },
      order: [["time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items,
      page,
      pageSize,
      total
    };
  }
}

module.exports = new TradeController();
