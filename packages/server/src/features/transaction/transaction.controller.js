const { extractPage, normalizeTransaction, normalizePCX } = require("../utils");
const { storeMap, TX_FEE_KEY } = require("../store");
const MILLI_SECONDS_24H = 1000 * 3600 * 24;

class TransactionController {
  async getTransactions(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { block } = ctx.query;

    const order = [
      ["number", "DESC"],
      ["index", "ASC"]
    ];
    const options = {
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    };

    let transactions, count;
    if (block && /^\d+$/.test(block)) {
      Object.assign(options, { where: { number: block } });
      const { rows: txs, count: cnt } = await ctx.db.Transaction.findAndCountAll(options);
      transactions = txs;
      count = cnt;
    } else {
      transactions = await ctx.db.Transaction.findAll(options);
      const [{ count: cnt }] = await ctx.db.sequelize.query(`select sum(num) as count from "transaction_daily";`, {
        type: ctx.db.sequelize.QueryTypes.SELECT
      });

      count = cnt;
    }

    const items = transactions.map(normalizeTransaction);

    ctx.body = {
      items,
      pageSize,
      page,
      total: parseInt(count)
    };
  }

  async getTransaction(ctx) {
    const { hash } = ctx.params;
    if (!/^[\da-f]{64}$/.test(hash.toLowerCase())) {
      ctx.status = 400;
      return;
    }

    const option = { raw: true, where: { hash } };
    const transaction = await ctx.db.Transaction.findOne(option);
    if (!transaction) {
      ctx.status = 404;
      ctx.body = { error: "not found" };
      return;
    }

    ctx.body = normalizeTransaction(transaction);
  }

  async txFee24H(ctx) {
    const storeValue = storeMap.get(TX_FEE_KEY);
    if (storeValue) {
      ctx.body = storeValue;
      return;
    }

    const time = new Date().getTime() - MILLI_SECONDS_24H;
    const rows = await ctx.db.sequelize.query(
      `select sum(fee) from transaction where signed != '' and time > ${time};`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const totalFee = parseInt(rows[0].sum);

    const cntRows = await ctx.db.sequelize.query(
      `select count(1) from transaction where signed != '' and time > ${time};`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const cnt = parseInt(cntRows[0].count);
    const avgFee = parseInt(totalFee / cnt);

    const result = {
      total: normalizePCX(totalFee),
      avg: normalizePCX(avgFee)
    };

    storeMap.set(TX_FEE_KEY, result);

    ctx.body = result;
  }
}

module.exports = new TransactionController();
