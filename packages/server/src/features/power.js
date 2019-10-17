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
  const intentions = await ctx.db.Intention.findAll({
    attributes: ["accountid", "totalNomination"],
    where: { isActive: "true" },
    raw: true
  });
  const ids = intentions.map(intention => intention.accountid);
  const set = new Set(ids);

  const pcxPower = [...set].reduce((result, id) => {
    const intention = intentions.find(intention => intention.accountid === id);
    return result + parseInt(intention.totalNomination);
  }, 0);

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
