const Router = require("koa-router");

const router = new Router();

router.get("/power_percent", async ctx => {
  const tokens = await ctx.db.Token.findAll({ raw: true });
  const pseduIntentions = await ctx.db.PseduIntention.findAll({ raw: true });
  let pseduPower = pseduIntentions.map(intention => {
    const token = tokens.find(token => token.token === intention.id);
    const power = parseInt((intention.circulation / Math.pow(10, token.precision)) * intention.power);

    return {
      token: intention.id,
      power
    };
  });

  const allPseduPower = pseduPower.reduce((result, p) => result + p.power, 0);
  pseduPower = pseduPower.map(p => ({
    ...p,
    power: (p.power / allPseduPower) * 50
  }));

  const allAssetsPower = pseduPower.concat({ token: "PCX", power: 50 });

  ctx.body = allAssetsPower.sort((a, b) => b.power - a.power);
});

module.exports = router;
