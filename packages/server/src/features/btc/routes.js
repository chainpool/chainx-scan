const Router = require("koa-router");
const btcController = require("./btc.controller");

const router = new Router();
router.get("/btc/headers", btcController.headers);

module.exports = router;
