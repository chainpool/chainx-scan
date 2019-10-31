const Router = require("koa-router");

const router = new Router();

router.get("/congress/members", async ctx => {
  ctx.body = [
    "buildlinks",
    "BiHODL",
    "huolanshan",
    "SSSnodes",
    "Jinma",
    "HashQuark",
    "HLT",
    "realgar",
    "PolkaWorld",
    "bemular"
    // "tower",
    // "SNZHolding",
    // "Polkanordic",
    // "Scans",
  ];
});

module.exports = router;
