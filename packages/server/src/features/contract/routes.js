const Router = require("koa-router");
const contractController = require("./contract.controller");

const router = new Router();
router.get("/contracts", contractController.getContracts);

module.exports = router;
