const { extractPage, trimFields } = require("../utils");

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
    const {
      rows: transactions,
      count
    } = await ctx.db.Transaction.findAndCountAll(options);

    const fieldsNeedTrim = [
      "signed",
      "signature",
      "era",
      "module",
      "call",
      "help"
    ];
    const items = transactions.map(tx => {
      return {
        ...tx,
        ...trimFields(tx, fieldsNeedTrim),
        args: JSON.parse(tx.args)
      };
    });

    ctx.body = {
      items,
      pageSize,
      page,
      pageMax: Math.floor(count / pageSize)
    };
  }
}

module.exports = new TransactionController();
