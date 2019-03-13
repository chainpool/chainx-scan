const { extractPage } = require("../utils");

class BalanceController {
  async balances(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { rows, count } = await ctx.db.Balance.findAndCountAll({
      limit: pageSize,
      offset: page * pageSize
    });

    ctx.body = {
      items: rows,
      pageSize,
      page,
      total: count
    };
  }

  async accountBalance(ctx) {
    const { accountId } = ctx.params;

    const where = { accountid: accountId };
    const balances = await ctx.db.Balance.findAll({ where });
    ctx.body = balances;
  }
}

module.exports = new BalanceController();
