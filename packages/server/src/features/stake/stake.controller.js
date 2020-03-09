const BigNumber = require("bignumber.js");

class StakeController {
  async stakedBalance(ctx) {
    const rows = await ctx.db.sequelize.query(
      `SELECT SUM(nomination) FROM (
        SELECT DISTINCT ON(accountid) accountid, "totalNomination" as nomination from intentions
      ) AS nomination`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const sum = new BigNumber(rows[0].sum);

    ctx.body = sum
      .dividedBy(Math.pow(10, 8))
      .toNumber()
      .toFixed(8);
  }
}

module.exports = new StakeController();
