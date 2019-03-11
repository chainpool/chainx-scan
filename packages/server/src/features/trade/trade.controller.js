const { extractPage } = require("../utils");

class TradeController {
  async getPairs(ctx) {
    const pairs = await ctx.db.TradingPair.findAll({
      include: [{ model: ctx.db.TradingPairPrice, as: "price" }]
    });
    ctx.body = pairs.map(pair => {
      Object.assign(pair.dataValues, { currency_pair: JSON.parse(pair.dataValues.currency_pair) });
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
    const where = { pairid: pairId };
    const orders = await ctx.db.FilledOrder.findAll({
      raw: true,
      where,
      order: [["time", "DESC"]],
      limit: count,
      offset: 0
    });
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
    const orders = await ctx.db.Order.findAll({
      where: { accountid: accountId },
      order: [["create_time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize
    });

    ctx.body = orders;
  }
}

module.exports = new TradeController();
