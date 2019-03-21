const { feedLatestKline } = require("./kline-feeder");
const { FEED_INTERVAL } = require("./setting");

const latestBlocksRoom = "LATEST_BLOCKS_ROOM";
const latestTxsRoom = "LATEST_TRANSACTIONS_ROOM";
const chainStatusRoom = "CHAIN_STATUS";
const latestBtcHeadersRoom = "LATEST_BTC_HEADERS_ROOM";

let preBlockHeight = null;
let preTxHeight = null;
let preStatusHeight = null;

module.exports = (io, db) => {
  io.on("connection", function(socket) {
    socket.on("subscribe", socket.join);
    socket.on("unsubscribe", socket.leave);
  });

  feedLatestBlocks(io, db)
    .then(() => {
      console.log("begin to feed latest blocks");
    })
    .catch(() => {
      console.error("fail to feed latest blocks");
    });
  feedLatestTxs(io, db)
    .then(() => {
      console.log("begin to feed latest transactions");
    })
    .catch(() => {
      console.error("fail to feed latest transactions");
    });
  feedChainStatus(io, db)
    .then(() => {
      console.log("begin to feed chain status");
    })
    .catch(() => {
      console.error("fail to feed latest status");
    });
  feedBtcHeaders(io, db)
    .then(() => {
      console.log("begin to feed latest btc headers");
    })
    .catch(() => {
      console.error("fail to feed latest btc headers");
    });
  feedLatestKline(io, db)
    .then(() => {
      console.log("begin to feed latest kline");
    })
    .catch(() => {
      console.error("fail to feed latest kline");
    });
};

async function feedBtcHeaders(io, db) {
  const pageSize = 10;
  const page = 0;

  try {
    const rows = await db.BtcHeader.findAll({
      attributes: ["bitcoin_height", "header", "time", "relay", "chainx_tx", "txid"],
      order: [["time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize
    });

    io.to(latestBtcHeadersRoom).emit("latestBtcHeaders", rows);

    setTimeout(feedBtcHeaders.bind(null, io, db), FEED_INTERVAL);
  } catch (e) {
    setTimeout(feedBtcHeaders.bind(null, io, db), FEED_INTERVAL);
  }
}

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
      attributes: ["number", "producer", "extrinsics"],
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    if (blocks.length > 0) {
      const nowMaxBlockHeight = Math.max(...blocks.map(item => item.number));
      if (preBlockHeight === null || nowMaxBlockHeight > preBlockHeight) {
        io.to(latestBlocksRoom).emit("latestBlocks", blocks);
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
    attributes: ["hash", "signed", "module", "call"],
    order,
    limit: pageSize,
    offset: page * pageSize,
    raw: true
  };

  try {
    const transactions = await db.Transaction.findAll(options);

    if (transactions.length > 0) {
      const nowMaxTxHeight = Math.max(...transactions.map(item => item.number));
      if (preTxHeight === null || nowMaxTxHeight > preTxHeight) {
        io.to(latestTxsRoom).emit("latestTxs", transactions);
      }
    }

    setTimeout(feedLatestTxs.bind(null, io, db), FEED_INTERVAL);
  } catch (e) {
    setTimeout(feedLatestTxs.bind(null, io, db), FEED_INTERVAL);
  }
}
