class ChainController {
  async height(ctx) {
    const height = await ctx.db.Block.max("number", { raw: true });
    ctx.body = { height };
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
