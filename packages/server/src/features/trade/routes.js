const Router = require("koa-router");
const tradeController = require("./trade.controller");

const router = new Router();
router.get("/trade/pairs", tradeController.getPairs);

module.exports = router;
