const { extractPage, trimFields } = require("../utils");

class TransactionController {
  async getTransactions(ctx) {
    const { page, pageSize } = extractPage(ctx);

    if (pageSize === 0) {
      ctx.status = 400;
      return;
    }

    const order = [["number", "DESC"], ["index", "DESC"]];

    const {
      rows: transactions,
      count
    } = await ctx.db.Transaction.findAndCountAll({
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    const fieldsNeedTrim = [
      "signed",
      "signature",
      "era",
      "module",
      "call",
      "help"
    ];
    const items = transactions.map(tx => {
      return trimFields(tx, fieldsNeedTrim);
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
