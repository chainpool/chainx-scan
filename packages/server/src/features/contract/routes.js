const Router = require("koa-router");
const contractController = require("./contract.controller");

const router = new Router();
router.get("/contracts", contractController.getContracts);
router.get("/contract/:address", contractController.getContract);
router.get("/contract/:address/txs", contractController.getContractTxs);

module.exports = router;
