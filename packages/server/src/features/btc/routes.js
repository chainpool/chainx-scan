const Router = require("koa-router");
const btcController = require("./btc.controller");

const router = new Router();
router.get("/btc/headers", btcController.headers);
router.get("/btc/txs", btcController.txs);
router.get("/btc/addresses", btcController.addresses);

module.exports = router;
