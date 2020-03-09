const Router = require("koa-router");
const transactionController = require("./transaction.controller");

const router = new Router();
router.get("/txs", transactionController.getTransactions);
router.get("/tx/:hash", transactionController.getTransaction);
router.get("/tx_fee_24h", transactionController.txFee24H);

module.exports = router;
