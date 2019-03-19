const { extractPage } = require("../utils");

class AccountController {
  async intentions(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows: intentions, count } = await ctx.db.Intention.findAndCountAll({
      limit: pageSize,
      offset: page * pageSize
    });

    const items = intentions.map(intention => {
      Object.assign(intention.dataValues, {
        isActive: intention.dataValues.isActive === "true",
        isTrustee: intention.dataValues.isTrustee === "true",
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
      `SELECT DISTINCT(accountid), btc.total as btc, pcx.total as pcx FROM "XAssets_AssetBalance" AS x
      LEFT JOIN (SELECT accountid as id, ${totalField} FROM "XAssets_AssetBalance" WHERE token='BTC') as btc
      ON x.accountid=btc.id
      LEFT JOIN (SELECT accountid as id, ${totalField} FROM "XAssets_AssetBalance" WHERE token='PCX') as pcx
      ON x.accountid=pcx.id
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

    const count = await ctx.db.Transaction.count({ where: { signed: accountId } });
    const addressMap = await ctx.db.CrossChainAddressMap.findOne({
      where: { accountid: accountId, chain: "Bitcoin" },
      attributes: ["address"],
      raw: true
    });

    ctx.body = {
      accountId,
      txCount: count,
      btcAddress: addressMap ? addressMap.address : null
    };
  }

  async txs(ctx) {
    const { accountId } = ctx.params;

    const { page, pageSize } = extractPage(ctx);
    const order = [["number", "DESC"], ["index", "DESC"]];
    const { rows: items, count } = await ctx.db.Transaction.findAndCountAll({
      attributes: ["number", "hash", "module", "call", "time"],
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
}

module.exports = new AccountController();
