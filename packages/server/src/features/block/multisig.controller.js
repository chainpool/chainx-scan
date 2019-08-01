const { extractPage } = require("../utils");

class MultisigController {
  async records(ctx) {
    const { page, pageSize } = extractPage(ctx);
    if (pageSize === 0) {
      ctx.status = 400;
      return;
    }

    const records = await ctx.db.EventMultiSig.findAll({
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = records.map(record => ({
      ...record,
      args: record.call === "release_lock" ? [] : JSON.parse(record.args)
    }));
  }
}

module.exports = new MultisigController();
