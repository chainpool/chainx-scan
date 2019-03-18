const { extractPage } = require("../utils");

class BtcController {
  async headers(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.BtcHeader.findAndCountAll({
      order: [["time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize
    });

    ctx.body = {
      items: rows,
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
}

module.exports = new BtcController();
