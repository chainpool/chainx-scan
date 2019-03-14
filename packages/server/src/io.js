const { normalizeBlock, normalizeTransaction } = require("./features/utils");

const latestBlocksRoom = "LATEST_BLOCKS_ROOM";
const latestTxsRoom = "LATEST_TRANSACTIONS_ROOM";
const chainStatusRoom = "CHAIN_STATUS";

const FEED_INTERVAL = 2000;

let preBlockHeight = null;
let preTxHeight = null;
let preStatusHeight = null;

module.exports = (io, db) => {
  io.on("connection", function(socket) {
    socket.on("subscribe", socket.join);
    socket.on("unsubscribe", socket.leave);
  });

  feedLatestBlocks(io, db).then(() => {
    console.log("begin to feed latest blocks");
  });
  feedLatestTxs(io, db).then(() => {
    console.log("begin to feed latest transactions");
  });
  feedChainStatus(io, db).then(() => {
    console.log("begin to feed chain status");
  });
};

async function feedChainStatus(io, db) {
  try {
    const status = await db.Status.findOne({
      order: [["best", "DESC"]],
      limit: 1,
      raw: true
    });

    if (status && (preStatusHeight === null || status.best > preStatusHeight)) {
      io.to(chainStatusRoom).emit("chainStatus", status);
    }

    setTimeout(feedChainStatus.bind(null, io, db), FEED_INTERVAL);
  } catch (e) {
    setTimeout(feedChainStatus.bind(null, io, db), FEED_INTERVAL);
  }
}

async function feedLatestBlocks(io, db) {
  const pageSize = 10;
  const page = 0;
  const order = [["number", "DESC"]];

  try {
    const blocks = await db.Block.findAll({
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    const items = blocks.map(normalizeBlock);

    if (items.length > 0) {
      const nowMaxBlockHeight = Math.max(...items.map(item => item.number));
      if (preBlockHeight === null || nowMaxBlockHeight > preBlockHeight) {
        io.to(latestBlocksRoom).emit("latestBlocks", items);
      }
    }

    setTimeout(feedLatestBlocks.bind(null, io, db), FEED_INTERVAL);
  } catch (e) {
    setTimeout(feedLatestBlocks.bind(null, io, db), FEED_INTERVAL);
  }
}

async function feedLatestTxs(io, db) {
  const pageSize = 10;
  const page = 0;
  const order = [["number", "DESC"], ["index", "DESC"]];
  const options = {
    order,
    limit: pageSize,
    offset: page * pageSize,
    raw: true
  };

  try {
    const transactions = await db.Transaction.findAll(options);

    const items = transactions.map(normalizeTransaction);
    if (items.length > 0) {
      const nowMaxTxHeight = Math.max(...items.map(item => item.number));
      if (preTxHeight === null || nowMaxTxHeight > preTxHeight) {
        io.to(latestTxsRoom).emit("latestTxs", items);
      }
    }

    setTimeout(feedLatestTxs.bind(null, io, db), FEED_INTERVAL);
  } catch (e) {
    setTimeout(feedLatestTxs.bind(null, io, db), FEED_INTERVAL);
  }
}
