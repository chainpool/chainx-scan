const { normalizeBlock } = require("./features/utils");

const latestBlocksRoom = "LATEST_BLOCKS_ROOM";
const FEED_INTERVAL = 2000;

module.exports = (io, db) => {
  io.on("connection", function(socket) {
    socket.on("subscribe", socket.join);
    socket.on("unsubscribe", socket.leave);
  });

  feedLatestBlocks(io, db).then(() => {
    console.log("begin to feed latest blocks");
  });
};

async function feedLatestBlocks(io, db) {
  const pageSize = 10;
  const page = 0;
  const order = [["number", "DESC"]];

  const { rows: blocks, count } = await db.Block.findAndCountAll({
    order,
    limit: pageSize,
    offset: page * pageSize,
    raw: true
  });

  const items = blocks.map(normalizeBlock);
  const result = {
    items,
    pageSize,
    page,
    pageMax: Math.floor(count / pageSize)
  };

  io.to(latestBlocksRoom).emit("latestBlocks", result);

  setTimeout(feedLatestBlocks.bind(null, io, db), FEED_INTERVAL);
}
