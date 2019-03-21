const { extractPage } = require("../utils");

class AssetController {
  async tokens(ctx) {
    const tokens = await ctx.db.Token.findAll();
    ctx.body = tokens.map(token => {
      Object.assign(token.dataValues, { ok: token.dataValues.ok === "true" });
      return token;
    });
  }

  async deposits(ctx) {
    const { accountId } = ctx.params;
    if (typeof accountId === "undefined") {
      ctx.status = 400;
      ctx.body = { error: "no account id" };
      return;
    }

    const where = { accountid: accountId };
    const { token, chain } = ctx.query;
    if (token) {
      Object.assign(where, { token, chain });
    }
    if (chain) {
      Object.assign(where, { chain });
    }

    const { page, pageSize } = extractPage(ctx);
    const { rows, count } = await ctx.db.Deposit.findAndCountAll({
      where,
      order: [["height", "DESC"]],
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

  async withdraw(ctx) {
    const { accountId } = ctx.params;

    const where = { accountid: accountId };
    const { token, chain } = ctx.query;
    if (token) {
      Object.assign(where, { token });
    }
    if (chain) {
      Object.assign(where, { chain });
    }

    const { page, pageSize } = extractPage(ctx);
    const { rows, count } = await ctx.db.Withdraw.findAndCountAll({
      where,
      order: [["height", "DESC"]],
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
}

module.exports = new AssetController();
