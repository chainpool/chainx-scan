const Router = require("koa-router");

const router = new Router();

router.get("/power_percent_v2", async ctx => {
  const solidPowers = [
    {
      name: "PolkaX",
      power: 0.2
    },
    {
      name: "TR",
      power: 0.096
    },
    {
      name: "L-BTC",
      power: 0.032
    },
    {
      name: "SDOT",
      power: 0.032
    }
  ];

  const xBtcIntention = await ctx.db.PseduIntention.findOne({
    where: { id: "BTC" },
    attributes: ["circulation"],
    raw: true
  });
  // 9号提案规定暂时使用固定比例
  const xBtcToPcxRation = 400;

  const xBtcEquivalentNomination = parseInt(xBtcIntention.circulation) * xBtcToPcxRation;
  const pcxNomination = await getPcxPower(ctx);

  const sortFunc = (a, b) => b.power - a.power;
  // 9号提案: 设置跨链硬顶 XR=10%
  if (xBtcEquivalentNomination * 9 > pcxNomination) {
    return (ctx.body = [
      {
        name: "X-BTC",
        power: 0.064
      },
      {
        name: "PCX",
        power: 0.576
      },
      ...solidPowers
    ].sort(sortFunc));
  }

  // 9号提案: 可分配挖矿收益 AMO
  const totalNomination = xBtcEquivalentNomination + pcxNomination;
  const totalAmoPower = 0.64;
  return (ctx.body = [
    {
      name: "X-BTC",
      power: (xBtcEquivalentNomination / totalNomination) * totalAmoPower
    },
    {
      name: "PCX",
      power: (pcxNomination / totalNomination) * totalAmoPower
    },
    ...solidPowers
  ].sort(sortFunc));
});

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
  const pcxPower = await getPcxPower(ctx);

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

async function getPcxPower(ctx) {
  const intentions = await ctx.db.Intention.findAll({
    attributes: ["accountid", "totalNomination"],
    where: { isActive: "true" },
    raw: true
  });

  const ids = intentions.map(intention => intention.accountid);
  const set = new Set(ids);

  return [...set].reduce((result, id) => {
    const intention = intentions.find(intention => intention.accountid === id);
    return result + parseInt(intention.totalNomination);
  }, 0);
}

module.exports = router;
