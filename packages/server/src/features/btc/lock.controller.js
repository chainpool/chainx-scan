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

  async addressLockStats(ctx) {
    const { address } = ctx.params;
    const record = await ctx.db.AccountLockBtcBalances.findOne({
      where: {
        [Op.and]: [{ address }, { unlock: { $lt: ctx.db.sequelize.col("lock") } }]
      },
      attributes: { exclude: ["address"] },
      order: [["height", "DESC"]],
      raw: true
    });

    if (!record) {
      ctx.body = {};
      return;
    }

    ctx.body = {
      ...record,
      value: parseInt(record.lock - record.unlock)
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

      const records = await ctx.db.BtcLockUp.findAll({
        where: {
          $or: [{ hash: txid, index, type: 0 }, { pre_hash: txid, pre_index: index, type: 1 }]
        },
        raw: true
      });

      if (records.length === 2 && records[0].type + records[1].type === 1) {
        ctx.body = {
          state: "LockAndUnlock"
        };
        return;
      }

      if (records.length === 1 && records[0].type === 0) {
        hasLockRecord = true;
      }
    }

    ctx.body = {
      state: hasLockRecord ? "Lock" : "Irrelevant"
    };
  }

  async addresses(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const addresses = await ctx.db.LbtcAddresses.findAll({
      include: [{ model: ctx.db.Intention, as: "intention", attributes: ["name"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = addresses.map(address => ({
      ...address,
      addresses: JSON.parse(address.addresses)
    }));
  }
}

module.exports = new BtcLockUpController();
