const { normalizeBlock, normalizeTransaction } = require("./features/utils");

const latestBlocksRoom = "LATEST_BLOCKS_ROOM";
const latestTxsRoom = "LATEST_TRANSACTIONS_ROOM";
const FEED_INTERVAL = 2000;

let preBlockHeight = null;
let preTxHeight = null;

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
};

async function feedLatestBlocks(io, db) {
  const pageSize = 10;
  const page = 0;
  const order = [["number", "DESC"]];

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

  const transactions = await db.Transaction.findAll(options);

  const items = transactions.map(normalizeTransaction);
  if (items.length > 0) {
    const nowMaxTxHeight = Math.max(...items.map(item => item.number));
    if (preTxHeight === null || nowMaxTxHeight > preTxHeight) {
      io.to(latestTxsRoom).emit("latestTxs", items);
    }
  }

  setTimeout(feedLatestTxs.bind(null, io, db), FEED_INTERVAL);
}
