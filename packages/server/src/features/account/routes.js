const Router = require("koa-router");
const accountController = require("./account.controller");

const router = new Router();
router.get("/intentions", accountController.intentions);

module.exports = router;