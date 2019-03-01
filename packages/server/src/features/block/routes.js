const Router = require("koa-router");
const blockController = require("./block.controller");

const router = new Router();
router.get("/blocks", blockController.getBlocks);
router.get("/block/:heightOrHash", blockController.getBlock);

module.exports = router;
