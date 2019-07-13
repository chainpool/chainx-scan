const { extractPage } = require("../utils");

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
      items,
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
      items,
      page,
      pageSize,
      total
    };
  }

  async accountLockStats(ctx) {
    const { accountId: accountid } = ctx.params;
    const records = await ctx.db.AccountLockBtcBalances.findAll({
      where: { accountid },
      attributes: { exclude: ["accountid"] },
      order: [["height", "DESC"]],
      raw: true
    });

    ctx.body = records;
  }
}

module.exports = new BtcLockUpController();
