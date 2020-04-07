const Router = require("koa-router");
const blockController = require("./block.controller");
const multisigController = require("./multisig.controller");

const router = new Router();
router.get("/blocks", blockController.getBlocks);
router.get("/block/:heightOrHash", blockController.getBlock);
router.get("/multisig/records", multisigController.records);
router.get("/avg_block_time_24h", blockController.avg24HBlockTime);
router.post("/blocksInfo", blockController.getBlocksInfo);

module.exports = router;
