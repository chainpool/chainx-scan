const { extractPage } = require("../utils");

class AccountController {
  async intentions(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows: intentions, count } = await ctx.db.Intention.findAndCountAll({
      include: [{ model: ctx.db.IntentionProfile, as: "profile" }],
      limit: pageSize,
      offset: page * pageSize
    });

    const items = intentions.map(intention => {
      Object.assign(intention.dataValues.profile, { is_active: intention.dataValues.profile.is_active === "true" });
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
}

module.exports = new AccountController();
