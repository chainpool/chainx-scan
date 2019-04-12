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
    const { native } = ctx.query;

    const where = { accountid: accountId };
    if (native === "true") {
      Object.assign(where, { token: "PCX" });
    } else if (native === "false") {
      Object.assign(where, { token: { $not: "PCX" } });
    }

    const balances = await ctx.db.Balance.findAll({
      where,
      raw: true
    });
    ctx.body = balances;
  }
}

module.exports = new BalanceController();
