const Router = require("koa-router");
const chainController = require("./chain.controller");

const router = new Router();
router.get("/chain/height", chainController.height);

module.exports = router;
