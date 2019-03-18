const { FEED_INTERVAL } = require("./setting");

const pairIds = [0, 1];
const types = [60, 300, 1800, 86400, 604800, 2592000];

const roomPrefix = "LATEST_KLINE_ROOM";

async function feedLatestKline(io, db) {
  try {
    for (let id of pairIds) {
      for (let type of types) {
        const room = `${roomPrefix}_${id}_${type}`;

        const rows = await db.sequelize.query(
          `SELECT b.time, k.open, k.high, k.close, k.low, k.volume from kline as k
          INNER JOIN block as b on k.time=b.number
          WHERE k.type=${type} AND k.pairid=${id}
          ORDER BY b.time DESC LIMIT 5;`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );

        io.to(room).emit(`latestKline_${id}_${type}`, rows);
      }
    }

    setTimeout(feedLatestKline.bind(null, io, db), FEED_INTERVAL);
  } catch (e) {
    setTimeout(feedLatestKline.bind(null, io, db), FEED_INTERVAL);
  }
}

module.exports = { feedLatestKline };
