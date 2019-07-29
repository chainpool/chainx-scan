const Router = require("koa-router");

const router = new Router();

router.get("/congress/members", async ctx => {
  ctx.body = [
    "buildlinks",
    "HashQuark",
    "PolkaWorld",
    "Scans",
    "huolanshan",
    "Polkanordic",
    "realgar",
    "BiHODL",
    "SSSnodes",
    "tower"
  ];
});

module.exports = router;
