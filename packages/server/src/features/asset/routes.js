const Router = require("koa-router");
const assetController = require("./asset.controller");

const router = new Router();
router.get("/tokens", assetController.tokens);

module.exports = router;
