const Router = require("koa-router");
const transactionController = require("./transaction.controller");

const router = new Router();
router.get("/txs", transactionController.getTransactions);

module.exports = router;
