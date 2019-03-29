const { extractPage } = require("../utils");
const { toBtcAddress } = require("./address");

class BtcController {
  async headers(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.BtcHeader.findAndCountAll({
      include: [{ model: ctx.db.Transaction, as: "block", attributes: ["time"] }],
      order: [["time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows.map(row => ({
        ...row,
        confirmed: row.confirmed === "true",
        txid: JSON.parse(row.txid)
      })),
      page,
      pageSize,
      total: count
    };
  }

  async txs(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const items = await ctx.db.sequelize.query(
      `SELECT tx.txid, tx.tx_type, tx.header, header.time, tx.chainx_tx, tx.relay, transaction.time as "block.time" FROM "XBridgeOfBTC_TxFor" AS tx
      INNER JOIN "XBridgeOfBTC_BlockHeaderFor" AS header on tx.header=header.header
      INNER JOIN "transaction" ON transaction.hash=tx.chainx_tx
      WHERE tx.header IS NOT NULL AND tx.chainx_tx IS NOT NULL
      ORDER BY tx.height DESC
      LIMIT ${pageSize} OFFSET ${page * pageSize}`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );
    const rows = await ctx.db.sequelize.query(
      `SELECT COUNT(*) FROM "XBridgeOfBTC_TxFor" AS tx WHERE tx.header IS NOT NULL`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );
    const total = rows[0].count;

    ctx.body = {
      items,
      page,
      pageSize,
      total
    };
  }

  async addresses(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.CrossChainAddressMap.findAndCountAll({
      attributes: { exclude: ["chain"] },
      where: { chain: "Bitcoin" },
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows.map(row => ({
        ...row,
        address: toBtcAddress(row.address)
      })),
      page,
      pageSize,
      total: count
    };
  }

  async deposits(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.Deposit.findAndCountAll({
      where: { chain: "1" }, // '1' 代表btc chain
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows,
      page,
      pageSize,
      total: count
    };
  }

  async withdrawals(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.Withdraw.findAndCountAll({
      where: { chain: "1" }, // '1' 代表btc chain
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows,
      page,
      pageSize,
      total: count
    };
  }
}

module.exports = new BtcController();
