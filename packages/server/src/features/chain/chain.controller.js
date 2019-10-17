const BigNumber = require("bignumber.js");

class ChainController {
  async status(ctx) {
    ctx.body = {
      type: "mainnet"
    };
  }

  async chainStatus(ctx) {
    const status = await ctx.db.Status.findOne({
      order: [["best", "DESC"]],
      limit: 1,
      raw: true
    });

    ctx.body = status;
  }

  async height(ctx) {
    const height = await ctx.db.Block.max("number", { raw: true });
    ctx.body = { height };
  }

  async latest(ctx) {
    const block = await ctx.db.Block.findOne({
      order: [["number", "DESC"]],
      raw: true
    });

    ctx.body = block;
  }

  async dailyTransactions(ctx) {
    const txs = await ctx.db.DailyTransactions.findAll({
      attributes: { exclude: ["height"] },
      order: [["day", "DESC"]],
      raw: true,
      limit: 14
    });

    ctx.body = txs;
  }

  async circulation(ctx) {
    const sum = await ctx.db.Balance.sum("Free", {
      where: { token: "PCX" },
      raw: true
    });

    const free = new BigNumber(sum);

    ctx.body = free
      .dividedBy(Math.pow(10, 8))
      .toNumber()
      .toFixed(8);
  }

  async issuance(ctx) {
    const status = await ctx.db.Status.findOne({
      order: [["best", "DESC"]],
      raw: true
    });

    const issuance = new BigNumber(status["pcx_issuance"]);

    ctx.body = issuance
      .dividedBy(Math.pow(10, 8))
      .toNumber()
      .toFixed(8);
  }
}

module.exports = new ChainController();
