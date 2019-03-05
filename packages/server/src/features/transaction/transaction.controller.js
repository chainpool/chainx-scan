const { extractPage, normalizeTransaction } = require("../utils");

class TransactionController {
  async getTransactions(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { block } = ctx.query;

    const order = [["number", "DESC"], ["index", "DESC"]];
    const options = {
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    };
    if (block && /^\d+$/.test(block)) {
      Object.assign(options, { where: { number: block } });
    }
    const transactions = await ctx.db.Transaction.findAll(options);
    const count = await ctx.db.Block.count();

    const items = transactions.map(normalizeTransaction);

    ctx.body = {
      items,
      pageSize,
      page,
      total: count
    };
  }

  // TODO: transaction表里没有交易hash，暂时搁置获取交易api
  async getTransaction(ctx) {}
}

module.exports = new TransactionController();
