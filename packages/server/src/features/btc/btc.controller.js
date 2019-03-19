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

    const { rows, count } = await ctx.db.BtcTx.findAndCountAll({
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      attributes: { exclude: ["inputs", "outputs"] },
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
