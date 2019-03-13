const Router = require("koa-router");
const accountController = require("./account.controller");
const nominationController = require("./nomination.controller");

const router = new Router();
router.get("/intentions", accountController.intentions);
router.get("/accounts", accountController.accounts);
router.get("/account/:accountId/nominations", nominationController.accountNominations);

module.exports = router;
