const Router = require("koa-router");
const ethController = require("./eth.controller");

const router = new Router();
router.get("/eth/addresses", ethController.addresses);

module.exports = router;
