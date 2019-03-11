const Router = require("koa-router");
const tradeController = require("./trade.controller");

const router = new Router();
router.get("/trade/pairs", tradeController.getPairs);
router.get("/trade/handicap/:pairId", tradeController.handicap);

module.exports = router;
