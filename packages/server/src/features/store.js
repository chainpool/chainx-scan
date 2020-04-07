const { normalizePCX } = require("./utils");
const map = new Map();
const MILLI_SECONDS_24H = 1000 * 3600 * 24;
const TX_FEE_KEY = "tx_fee";

async function updateTxFee(db) {
  const time = new Date().getTime() - MILLI_SECONDS_24H;
  const rows = await db.sequelize.query(`select sum(fee) from transaction where signed != '' and time > ${time};`, {
    type: db.sequelize.QueryTypes.SELECT
  });

  const totalFee = parseInt(rows[0].sum);

  const cntRows = await db.sequelize.query(`select count(1) from transaction where signed != '' and time > ${time};`, {
    type: db.sequelize.QueryTypes.SELECT
  });

  const cnt = parseInt(cntRows[0].count);
  const avgFee = parseInt(totalFee / cnt);

  const value = {
    total: normalizePCX(totalFee),
    avg: normalizePCX(avgFee)
  };

  map.set(TX_FEE_KEY, value);
  console.log("tx fee updated");
}

async function updateTxFeeForever(db) {
  try {
    await updateTxFee(db);
  } catch (e) {
    console.error("Fail to update tx fee", e);
  } finally {
    setTimeout(async () => {
      await updateTxFeeForever(db);
    }, 2000);
  }
}

module.exports = {
  storeMap: map,
  updateTxFeeForever,
  TX_FEE_KEY
};
