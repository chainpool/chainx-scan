const Router = require("koa-router");
const assetController = require("./asset.controller");
const balanceController = require("./balance.controller");

const router = new Router();
router.get("/tokens", assetController.tokens);
router.get("/account/:accountId/withdrawals", assetController.withdraw);
router.get("/account/:accountId/deposits", assetController.deposits);
router.get("/balances", balanceController.balances);
router.get("/account/:accountId/balance", balanceController.accountBalance);

module.exports = router;
