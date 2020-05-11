const Router = require("koa-router");
const councilController = require("./council.controller");

const router = new Router();
router.get("/council/transfers", councilController.transfers);

module.exports = router;
