const Router = require("koa-router");
const chainController = require("./chain.controller");

const router = new Router();
router.get("/chain", chainController.status);
router.get("/chain/height", chainController.height);
router.get("/chain/daily_transactions", chainController.dailyTransactions);

module.exports = router;
