const { extractPage } = require("../utils");
const { getPcxAccountsSql, getPcxAccountsCountSql } = require("./sqlUtils");

class PcxController {
  async pcxAccounts(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const selectOptions = {
      type: ctx.db.sequelize.QueryTypes.SELECT
    };

    const accounts = await ctx.db.sequelize.query(getPcxAccountsSql(page, pageSize), selectOptions);
    const [{ count: total }] = await ctx.db.sequelize.query(getPcxAccountsCountSql(page, pageSize), selectOptions);

    const items = accounts.map(
      ({
        accountid,
        total,
        Free: free,
        ReservedStaking: reservedStaking,
        ReservedStakingRevocation: reservedStakingRevocation,
        ReservedDexSpot: reservedDexSpot,
        ReservedDexFuture: reservedDexFuture
      }) => ({
        accountid,
        total,
        free,
        reservedStaking,
        reservedStakingRevocation,
        reservedDexSpot,
        reservedDexFuture
      })
    );

    ctx.body = {
      items,
      total,
      page,
      pageSize
    };
  }
}

module.exports = new PcxController();
