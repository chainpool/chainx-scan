class KlineController {
  async getCandles(ctx) {
    const { pairid, type, start_date: startDate, end_date: endDate } = ctx.query;
    if (typeof pairid === "undefined" || typeof type === "undefined") {
      ctx.status = 400;
      ctx.body = { error: "no pairid or type query param" };
      return;
    }

    if (typeof startDate === "undefined" || typeof endDate === "undefined") {
      ctx.status = 400;
      ctx.body = { error: "no start_date or end_date query param" };
      return;
    }

    const rows = await ctx.db.sequelize.query(
      `SELECT
    time,
    open,
    high,
    close,
    low,
    volume
    from kline as k
    where type=${type} AND pairid=${pairid} AND time <= ${endDate} AND time >= ${startDate}
    ORDER BY time DESC;`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    ctx.body = rows;
  }
}

module.exports = new KlineController();
