const Router = require("koa-router");
const accountController = require("./account.controller");
const nominationController = require("./nomination.controller");
const intentionController = require("./intention.controller");

const router = new Router();
router.get("/intentions", accountController.intentions);
router.get("/psedu_intentions", intentionController.pseduIntentions);
router.get("/intention/:accountId", intentionController.intention);
router.get("/intention/:accountId/nominations", nominationController.byNominee);
router.get("/intention/:accountId/settings", intentionController.setting);
router.get("/intention/:accountId/missed_blocks", intentionController.missedBlocks);
router.get("/accounts", accountController.accounts);
router.get("/account/:accountId/nominations", nominationController.accountNominations);
router.get("/account/:accountId/detail", accountController.accountDetail);
router.get("/account/:accountId/txs", accountController.txs);
router.get("/account/:accountId/binds", accountController.bindAddresses);
router.get("/account/:accountId/fill_orders", accountController.fillOrders);

module.exports = router;
