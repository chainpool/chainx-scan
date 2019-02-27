const blockRouter = require("./features/block/routes");

module.exports = app => {
  app
    .use(blockRouter.routes())
    .use(blockRouter.allowedMethods({ throw: true }));
};
