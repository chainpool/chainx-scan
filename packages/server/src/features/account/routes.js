const Router = require("koa-router");
const accountController = require("./account.controller");
const nominationController = require("./nomination.controller");

const router = new Router();
router.get("/intentions", accountController.intentions);
router.get("/accounts", accountController.accounts);
router.get("/account/:accountId/nominations", nominationController.accountNominations);
router.get("/account/:accountId/detail", accountController.accountDetail);
router.get("/account/:accountId/txs", accountController.txs);
router.get("/account/:accountId/binds", accountController.bindAddresses);

module.exports = router;
