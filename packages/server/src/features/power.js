const Router = require("koa-router");

const router = new Router();

router.get("/power", async ctx => {
  const tokens = await ctx.db.Token.findAll({ raw: true });
  const pseduIntentions = await ctx.db.PseduIntention.findAll({ raw: true });
  const paeduPower = pseduIntentions.map(intention => {
    const token = tokens.find(token => token.token === intention.id);
  });
});

module.exports = router;
