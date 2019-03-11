const blockRouter = require("./features/block/routes");
const txRouter = require("./features/transaction/routes");
const eventRouter = require("./features/event/routes");
const tradeRouter = require("./features/trade/routes");

module.exports = app => {
  app
    .use(blockRouter.routes())
    .use(blockRouter.allowedMethods({ throw: true }))
    .use(txRouter.routes())
    .use(txRouter.allowedMethods({ throw: true }))
    .use(tradeRouter.routes())
    .use(tradeRouter.allowedMethods({ throw: true }))
    .use(eventRouter.routes())
    .use(eventRouter.allowedMethods({ throw: true }));
};
