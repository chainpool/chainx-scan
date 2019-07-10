const { extractPage } = require("../utils");

class BtcLockUpController {
  async allRecords(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { accountid } = ctx.query;

    const options = {
      order: [["lock_time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    };
    if (accountid) {
      Object.assign(options, { where: { accountid } });
    }

    const { rows, count } = await ctx.db.BtcLockUp.findAndCountAll(options);

    ctx.body = {
      items: rows,
      page,
      pageSize,
      total: count
    };
  }

  async accountLockStats(ctx) {
    const { accountId: accountid } = ctx.params;
    const records = await ctx.db.BtcLockUp.findAll({
      where: { accountid },
      order: [["lock_time", "DESC"]],
      raw: true
    });

    const balances = records.reduce((result, record) => {
      if (record.unlock_hash) {
        return result;
      }

      const target = result.find(item => item.address === record.address);
      if (target) {
        target.value += record.value;
      } else {
        result.push({ address: record.address, value: record.value });
      }

      return result;
    }, []);

    ctx.body = balances;
  }
}

module.exports = new BtcLockUpController();
