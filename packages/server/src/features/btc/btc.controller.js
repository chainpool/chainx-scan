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
}

module.exports = new BtcController();
