class ChainController {
  async height(ctx) {
    const height = await ctx.db.Block.max("number", { raw: true });
    ctx.body = { height };
  }
}

module.exports = new ChainController();
