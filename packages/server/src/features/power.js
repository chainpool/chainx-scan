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
  let pcxPower = await ctx.db.Balance.sum("ReservedStaking", {
    where: { token: "PCX" },
    raw: true
  });

  if (allPseduPower > pcxPower) {
    pcxPower = allPseduPower;
  }

  const totalPower = pcxPower + allPseduPower;
  pseduPower = pseduPower.map(p => ({
    ...p,
    power: p.power / totalPower
  }));

  const allAssetsPower = pseduPower.concat({ token: "PCX", power: pcxPower / totalPower });

  ctx.body = allAssetsPower
    .map(p => {
      if (p.token !== "BTC") {
        return p;
      }

      return {
        ...p,
        token: "X-BTC"
      };
    })
    .sort((a, b) => b.power - a.power);
});

module.exports = router;
