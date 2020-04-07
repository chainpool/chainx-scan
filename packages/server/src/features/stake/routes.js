const Router = require("koa-router");
const stakeController = require("./stake.controller");

const router = new Router();
router.get("/stake/total_staked", stakeController.stakedBalance);

module.exports = router;
