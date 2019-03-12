class AssetController {
  async tokens(ctx) {
    const tokens = await ctx.db.Token.findAll();
    ctx.body = tokens.map(token => {
      Object.assign(token.dataValues, { ok: token.dataValues.ok === "true" });
      return token;
    });
  }
}

module.exports = new AssetController();
