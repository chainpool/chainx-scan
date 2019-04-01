const { extractPage } = require("../utils");

class EventController {
  async getEvents(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { block } = ctx.query;

    const order = [["number", "DESC"], ["index", "ASC"]];
    const options = {
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    };
    if (block && /^\d+$/.test(block)) {
      Object.assign(options, { where: { number: block } });
    }
    const transactions = await ctx.db.Event.findAll(options);
    const count = await ctx.db.Event.count();

    const items = transactions.map(tx => {
      return {
        ...tx,
        args: JSON.parse(tx.args),
        phase: JSON.parse(tx.phase),
        data: JSON.parse(tx.data)
      };
    });

    ctx.body = {
      items,
      pageSize,
      page,
      total: count
    };
  }
}

module.exports = new EventController();
