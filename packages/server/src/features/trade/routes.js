const Router = require("koa-router");
const tradeController = require("./trade.controller");
const klineController = require("./kline.controller");

const router = new Router();
router.get("/trade/pairs", tradeController.getPairs);
router.get("/trade/handicap/:pairId", tradeController.handicap);
router.get("/trade/latestfills/:pairId", tradeController.latestFills);
router.get("/trade/userorders/:accountId", tradeController.userOrders);
router.get("/trade/userorder/fills/:accountId/:index", tradeController.orderFills);
router.get("/kline", klineController.getCandles);
router.get("/trade/fill_orders", tradeController.filledOrdersByIds);

module.exports = router;
