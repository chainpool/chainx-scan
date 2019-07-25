class ChainController {
  async status(ctx) {
    ctx.body = {
      type: "testnet"
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
}

module.exports = new ChainController();
