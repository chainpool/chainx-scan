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

  async getTransaction(ctx) {
    const { hash } = ctx.params;
    if (!/^[\da-f]{64}$/.test(hash.toLowerCase())) {
      ctx.status = 400;
      return;
    }

    const option = { raw: true, where: { hash } };
    const transaction = await ctx.db.Transaction.findOne(option);
    if (!transaction) {
      ctx.status = 404;
      ctx.body = { error: "not found" };
      return;
    }

    ctx.body = normalizeTransaction(transaction);
  }
}

module.exports = new TransactionController();
