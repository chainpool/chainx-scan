const Router = require("koa-router");
const ReferendumController = require("./referendum.controller");

const router = new Router();
router.get("/referendum/detail/:listId", ReferendumController.detail);
router.get("/referendum/lists/:listId", ReferendumController.list);
router.get("/referendum/total/:listId", ReferendumController.total);

module.exports = router;
