const { extractPage } = require("../utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class BtcLockUpController {
  async allRecords(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { accountid } = ctx.query;

    const options = {
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    };
    if (accountid) {
      Object.assign(options, { where: { accountid } });
    }

    const { rows: items, count: total } = await ctx.db.BtcLockUp.findAndCountAll(options);

    ctx.body = {
      items: items.map(item => ({
        ...item,
        lock_time: item["block.time"]
      })),
      page,
      pageSize,
      total
    };
  }

  async accountRecords(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { accountId } = ctx.params;

    const options = {
      where: { accountid: accountId },
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    };

    const { rows: items, count: total } = await ctx.db.BtcLockUp.findAndCountAll(options);

    ctx.body = {
      items: items.map(item => ({
        ...item,
        lock_time: item["block.time"]
      })),
      page,
      pageSize,
      total
    };
  }

  async accountLockStats(ctx) {
    const { accountId: accountid } = ctx.params;
    const records = await ctx.db.AccountLockBtcBalances.findAll({
      where: {
        [Op.and]: [{ accountid }, { unlock: { $lt: ctx.db.sequelize.col("lock") } }]
      },
      attributes: { exclude: ["accountid"] },
      order: [["height", "DESC"]],
      raw: true
    });

    ctx.body = records.map(record => ({
      ...record,
      value: parseInt(record.lock - record.unlock)
    }));
  }

  async txState(ctx) {
    const { txid, index } = ctx.request.body;

    const cnt = await ctx.db.BtcLockUp.count({
      where: { hash: txid, index, type: 0 },
      raw: true
    });

    ctx.body = {
      state: cnt > 0 ? "Lock" : "Irrelevant"
    };
  }

  async txStates(ctx) {
    const txs = ctx.request.body;

    let hasLockRecord;
    for (let tx of txs) {
      const { txid, index } = tx;

      const record = await ctx.db.BtcLockUp.findOne({
        where: {
          $or: [{ hash: txid, index, type: 0 }, { pre_hash: txid, pre_index: index, type: 1 }]
        },
        raw: true
      });

      if (!record) {
        continue;
      }

      if (record.type > 0) {
        ctx.body = {
          state: "LockAndUnlock"
        };
        return;
      }

      hasLockRecord = true;
    }

    ctx.body = {
      state: hasLockRecord ? "Lock" : "Irrelevant"
    };
  }
}

module.exports = new BtcLockUpController();
