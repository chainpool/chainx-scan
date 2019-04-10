const Router = require("koa-router");
const btcController = require("./btc.controller");

const router = new Router();
router.get("/btc/headers", btcController.headers);
router.get("/btc/txs", btcController.txs);
router.get("/btc/status", btcController.status);
router.get("/btc/addresses", btcController.addresses);
router.get("/btc/deposits", btcController.deposits);
router.get("/btc/withdrawals", btcController.withdrawals);
router.get("/btc/session_trustees", btcController.sessionTrustees);

module.exports = router;
