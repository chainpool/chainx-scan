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

    let where = accountid ? `where l.accountid='${accountid}'` : "";

    const baseSql = `select l.lock_hash, l.output_index, l.address, l.value, l.lock_chainx_relay, l.accountid, l.unlock_hash, l.input_index, l.unlock_chainx_relay, l.channel, lb.time as lock_time, u.time as unlock_time from "event_lockupbtc" as l
      inner join block as lb on lb.number=l.lock_time
      left join (
      select l.unlock_time, ub.time from "event_lockupbtc" as l
      inner join block as ub on ub.number=l.unlock_time
      ) as u on u.unlock_time=l.unlock_time ${where}`;
    const sql = `${baseSql} order by l.lock_time desc limit ${pageSize} offset ${page * pageSize};`;

    const cntSql = `select count(*) from "event_lockupbtc" as l
      inner join block as lb on lb.number=l.lock_time
      left join (
      select l.unlock_time, ub.time from "event_lockupbtc" as l
      inner join block as ub on ub.number=l.unlock_time
      ) as u on u.unlock_time=l.unlock_time ${where}`;

    const records = await ctx.db.sequelize.query(sql, { type: ctx.db.sequelize.QueryTypes.SELECT });
    const rows = await ctx.db.sequelize.query(cntSql, { type: ctx.db.sequelize.QueryTypes.SELECT });
    const total = rows[0].count;

    ctx.body = {
      items: records,
      page,
      pageSize,
      total
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
