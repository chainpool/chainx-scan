const { extractPage } = require("../utils");

class MultisigController {
  async records(ctx) {
    const { page, pageSize } = extractPage(ctx);
    if (pageSize === 0) {
      ctx.status = 400;
      return;
    }

    const { rows, count: total } = await ctx.db.EventMultiSig.findAndCountAll({
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    const items = rows.map(record => ({
      ...record,
      args: record.call === "release_lock" ? [] : JSON.parse(record.args)
    }));

    ctx.body = {
      items,
      page,
      pageSize,
      total
    };
  }
}

module.exports = new MultisigController();
