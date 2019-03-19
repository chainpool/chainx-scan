const { extractPage } = require("../utils");
const { toBtcAddress } = require("./address");

class BtcController {
  async headers(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.BtcHeader.findAndCountAll({
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
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
      `SELECT tx.txid, tx.tx_type, header.header, header.time, tx.chainx_tx, tx.relay, block.time as "block.time" FROM "XBridgeOfBTC_TxFor" AS tx
      LEFT JOIN "XBridgeOfBTC_BlockHeaderFor" AS header on tx.bitcoin_height=header.bitcoin_height
      LEFT JOIN "block" ON block.number=tx.height
      ORDER BY tx.height DESC
      LIMIT ${pageSize} OFFSET ${page * pageSize}`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );
    const total = await ctx.db.BtcTx.count();

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
}

module.exports = new BtcController();
