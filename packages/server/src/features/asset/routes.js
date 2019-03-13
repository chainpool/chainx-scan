const Router = require("koa-router");
const assetController = require("./asset.controller");

const router = new Router();
router.get("/tokens", assetController.tokens);
router.get("/account/:accountId/withdraw_list", assetController.withdraw);
router.get("/account/:accountId/deposits", assetController.deposits);

module.exports = router;
