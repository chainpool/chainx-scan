const Router = require("koa-router");
const blockController = require("./block.controller");
const multisigController = require("./multisig.controller");

const router = new Router();
router.get("/blocks", blockController.getBlocks);
router.get("/block/:heightOrHash", blockController.getBlock);
router.get("/multisig/records", multisigController.records);
router.post("/blocksInfo", blockController.getBlocksInfo);

module.exports = router;
