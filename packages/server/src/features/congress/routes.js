const Router = require("koa-router");

const router = new Router();

router.get("/congress/members", async ctx => {
  ctx.body = [
    "SSSnodes",
    "buildlinks",
    "HashQuark",
    "huolanshan",
    "PolkaWorld",
    "xiamiPool",
    "AZIMUT",
    "luckyve"
    // "BiHODL",
    // "Jinma",
    // "HLT",
    // "realgar",
    // "bemular"
    // "tower",
    // "SNZHolding",
    // "Polkanordic",
    // "Scans",
  ];
});

module.exports = router;
