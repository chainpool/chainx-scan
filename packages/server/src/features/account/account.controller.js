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
      `SELECT DISTINCT(x.accountid), btc.total as btc, sdot.total as sdot, balance.balance AS pcx_free, pcx.total + balance.balance as pcx, nonce.nonce FROM "XAssets_AssetBalance" AS x
      LEFT JOIN (SELECT accountid as id, ${totalField} FROM "XAssets_AssetBalance" WHERE token='BTC') as btc
      ON x.accountid=btc.id
      LEFT JOIN (SELECT accountid as id, ${totalField} FROM "XAssets_AssetBalance" WHERE token='PCX') as pcx
      ON x.accountid=pcx.id
      LEFT JOIN (SELECT accountid as id, ${totalField} FROM "XAssets_AssetBalance" WHERE token='SDOT') as sdot
      ON x.accountid=sdot.id
      LEFT JOIN "Balances_FreeBalance" as balance
      ON x.accountid=balance.accountid
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
      attributes: { exclude: ["height"] },
      where: { accountid: accountId },
      raw: true
    });

    ctx.body = rows;
  }
}

module.exports = new AccountController();
