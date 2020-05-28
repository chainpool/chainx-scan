const Router = require("koa-router");
const router = new Router();
const fetch = require("node-fetch");

router.get("/interest", async ctx => {
  const response = await fetch("http://127.0.0.1:4831/interest");
  const result = await response.json();

  ctx.body = result;
});

module.exports = router;
