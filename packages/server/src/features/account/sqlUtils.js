const getPcxAccountsSql = function(page, pageSize, withJackpot = false) {
  const jackpotWhere = withJackpot
    ? ``
    : `
  WHERE accountid NOT IN (
    SELECT "jackpotAddress" FROM intentions
  )
  `;

  return `
  WITH balance AS (
    SELECT b.*,
      b."Free" + 
      b."ReservedStaking" + 
      b."ReservedDexSpot" + 
      b."ReservedDexFuture" + 
      b."ReservedWithdrawal" + 
      b."ReservedStakingRevocation" AS total
    FROM "XAssets_AssetBalance" AS b WHERE "token"='PCX'
  ) SELECT * FROM balance
  ${jackpotWhere}
  ORDER BY total DESC
  LIMIT ${pageSize} OFFSET ${page * pageSize}
  `;
};

const getPcxAccountsCountSql = function(withJackpot = false) {
  const jackpotWhere = withJackpot
    ? ``
    : `
  WHERE accountid NOT IN (
    SELECT "jackpotAddress" FROM intentions
  )
  `;

  return `
  WITH balance AS (
    SELECT b.*
    FROM "XAssets_AssetBalance" AS b WHERE "token"='PCX'
  ) SELECT COUNT(1) FROM balance
  ${jackpotWhere}
  `;
};

module.exports = {
  getPcxAccountsSql,
  getPcxAccountsCountSql
};
