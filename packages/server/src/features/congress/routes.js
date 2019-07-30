const Router = require("koa-router");

const router = new Router();

router.get("/congress/members", async ctx => {
  ctx.body = [
    "buildlinks",
    "BiHODL",
    "SSSnodes",
    "HashQuark",
    "PolkaWorld",
    "SNZHolding",
    "Polkanordic",
    "huolanshan",
    "realgar",
    "Scans"
    // "tower"
  ];
});

module.exports = router;
