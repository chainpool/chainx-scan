const { extractPage } = require("../utils");
const { toBtcAddress } = require("../btc/address");

class AccountController {
  async intentions(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows: intentions, count } = await ctx.db.Intention.findAndCountAll({
      limit: pageSize,
      offset: page * pageSize,
      order: [["totalNomination", "DESC"]]
    });

    const items = intentions.map(intention => {
      Object.assign(intention.dataValues, {
        isActive: intention.dataValues.isActive === "true",
        isTrustee: JSON.parse(intention.dataValues.isTrustee),
        isValidator: intention.dataValues.isValidator === "true"
      });
      return intention;
    });

    ctx.body = {
      items,
      pageSize,
      page,
      total: count
    };
  }

  async accounts(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const totalField = `"Free" + "ReservedStaking" + "ReservedStakingRevocation" + "ReservedWithdrawal" + "ReservedDexSpot" + "ReservedDexFuture" AS total`;

    const rows = await ctx.db.sequelize.query(
      `SELECT DISTINCT(x.accountid), btc.total as btc, sdot.total as sdot, pcx.free AS pcx_free, pcx.total as pcx, nonce.nonce FROM "XAssets_AssetBalance" AS x
      LEFT JOIN (SELECT accountid as id, ${totalField} FROM "XAssets_AssetBalance" WHERE token='BTC') as btc
      ON x.accountid=btc.id
      LEFT JOIN (SELECT accountid as id, "Free" as free, ${totalField} FROM "XAssets_AssetBalance" WHERE token='PCX') as pcx
      ON x.accountid=pcx.id
      LEFT JOIN (SELECT accountid as id, ${totalField} FROM "XAssets_AssetBalance" WHERE token='SDOT') as sdot
      ON x.accountid=sdot.id
      LEFT JOIN "System_AccountNonce" as nonce ON x.accountid=nonce.accountid
      LIMIT ${pageSize} OFFSET ${page * pageSize}`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const result = await ctx.db.sequelize.query(`SELECT COUNT(DISTINCT accountid) FROM "XAssets_AssetBalance"`, {
      type: ctx.db.sequelize.QueryTypes.SELECT
    });

    ctx.body = {
      items: rows,
      page,
      pageSize,
      total: result[0].count
    };
  }

  async accountDetail(ctx) {
    const { accountId } = ctx.params;

    const nonce = await ctx.db.AccountNonce.findOne({
      where: { accountid: accountId },
      attributes: ["nonce"],
      raw: true
    });
    const addresses = await ctx.db.CrossChainAddressMap.findAll({
      where: { accountid: accountId, chain: "Bitcoin" },
      attributes: ["address"],
      raw: true
    });

    ctx.body = {
      accountId,
      txCount: nonce ? nonce.nonce : 0,
      btcAddresses: addresses.map(address => toBtcAddress(address.address))
    };
  }

  async txs(ctx) {
    const { accountId } = ctx.params;

    const { page, pageSize } = extractPage(ctx);
    const order = [["number", "DESC"], ["index", "DESC"]];
    const { rows: items, count } = await ctx.db.Transaction.findAndCountAll({
      attributes: ["number", "index", "signed", "hash", "module", "call", "time"],
      where: { signed: accountId },
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items,
      page,
      pageSize,
      total: count
    };
  }

  async bindAddresses(ctx) {
    const { accountId } = ctx.params;

    const rows = await ctx.db.CrossChainAddressMap.findAll({
      include: [{ model: ctx.db.Intention, as: "intention", attributes: ["name"] }],
      attributes: { exclude: ["height"] },
      where: { accountid: accountId },
      raw: true
    });

    ctx.body = rows.map(row => ({
      ...row,
      address: toBtcAddress(row.address)
    }));
  }

  async fillOrders(ctx) {
    const { accountId } = ctx.params;
    const { page, pageSize } = extractPage(ctx);

    const records = await ctx.db.sequelize.query(
      `
    SELECT f.id, f.amount, f.price,
    o.direction, o.price as set_price,
    p.currency_pair as pair, p.precision, b.time as time
    FROM "event_xspot_FillsOf" AS f
    INNER JOIN "event_xspot_AccountOrder" AS o
    ON o.accountid=f.maker_user AND f.maker_user_order_index=o.id OR f.taker_user=o.accountid AND f.taker_user_order_index=o.id
    INNER JOIN "XSpot_TradingPairOf" AS p on f.pairid=p.pairid
    INNER JOIN block AS b on b.number=f.time
    where o.accountid='${accountId}' ORDER BY f.time DESC
    LIMIT ${pageSize} OFFSET ${page * pageSize};
    `,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const rows = await ctx.db.sequelize.query(
      `SELECT COUNT(*)
    FROM "event_xspot_FillsOf" AS f
    INNER JOIN "event_xspot_AccountOrder" AS o
    ON o.accountid=f.maker_user AND f.maker_user_order_index=o.id OR f.taker_user=o.accountid AND f.taker_user_order_index=o.id
    INNER JOIN "XSpot_TradingPairOf" AS p on f.pairid=p.pairid
    INNER JOIN block AS b on b.number=f.time
    where o.accountid='${accountId}'`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );
    const total = rows[0].count;

    const items = records.map(row => ({
      ...row,
      pair: JSON.parse(row.pair)
    }));

    ctx.body = {
      items,
      total,
      page,
      pageSize
    };
  }
}

module.exports = new AccountController();
