const blockRouter = require("./features/block/routes");
const txRouter = require("./features/transaction/routes");
const eventRouter = require("./features/event/routes");
const tradeRouter = require("./features/trade/routes");
const accountRouter = require("./features/account/routes");
const assetRouter = require("./features/asset/routes");
const btcRouter = require("./features/btc/routes");
const ethRouter = require("./features/eth/routes");
const chainRouter = require("./features/chain/routes");
const ReferendumRouter = require("./features/referendum/routes");
const powRouter = require("./features/power");
const congressRouter = require("./features/congress/routes");
const stakeRouter = require("./features/stake/routes");

module.exports = app => {
  app
    .use(blockRouter.routes())
    .use(blockRouter.allowedMethods({ throw: true }))
    .use(txRouter.routes())
    .use(txRouter.allowedMethods({ throw: true }))
    .use(tradeRouter.routes())
    .use(tradeRouter.allowedMethods({ throw: true }))
    .use(accountRouter.routes())
    .use(accountRouter.allowedMethods({ throw: true }))
    .use(assetRouter.routes())
    .use(assetRouter.allowedMethods({ throw: true }))
    .use(btcRouter.routes())
    .use(btcRouter.allowedMethods({ throw: true }))
    .use(ethRouter.routes())
    .use(ethRouter.allowedMethods({ throw: true }))
    .use(chainRouter.routes())
    .use(chainRouter.allowedMethods({ throw: true }))
    .use(eventRouter.routes())
    .use(eventRouter.allowedMethods({ throw: true }))
    .use(powRouter.routes())
    .use(powRouter.allowedMethods({ throw: true }))
    .use(congressRouter.routes())
    .use(congressRouter.allowedMethods({ throw: true }))
    .use(stakeRouter.routes())
    .use(stakeRouter.allowedMethods({ throw: true }))
    .use(ReferendumRouter.routes())
    .use(ReferendumRouter.allowedMethods({ throw: true }));
};
