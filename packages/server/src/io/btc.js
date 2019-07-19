const { FEED_INTERVAL } = require("./setting");

const latestBtcStatusRoom = "LATEST_BTC_STATUS_ROOM";

async function feedBtcStatus(io, db) {
  try {
    const rows = await db.BtcStatus.findAll({
      order: [["trustee_session", "DESC"]],
      limit: 1,
      raw: true
    });

    io.to(latestBtcStatusRoom).emit("latestBtcStatus", rows[0] || null);

    setTimeout(feedBtcStatus.bind(null, io, db), FEED_INTERVAL);
  } catch (e) {
    console.error(`fetch btc status error, redo in ${FEED_INTERVAL}`, e);
    setTimeout(feedBtcStatus.bind(null, io, db), FEED_INTERVAL);
  }
}

module.exports = {
  feedBtcStatus
};
