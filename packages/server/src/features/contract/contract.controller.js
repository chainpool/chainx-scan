const { extractPage, normalizeTransaction } = require("../utils");

class ContractController {
  async getContracts(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const order = [["height", "DESC"]];
    const options = {
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    };

    const { rows: contracts, count: cnt } = await ctx.db.Contract.findAndCountAll(options);

    ctx.body = {
      items: contracts,
      page,
      pageSize,
      total: parseInt(cnt)
    };
  }

  async getContract(ctx) {
    const { address } = ctx.params;

    const option = { raw: true, where: { contract: address } };
    ctx.body = await ctx.db.Contract.findOne(option);
  }

  async getContractTxs(ctx) {
    const { address } = ctx.params;

    const txs = await ctx.db.sequelize.query(
      `
      select t.*, b.time from "contracts_transation" as ct
      inner join transaction as t on t.hash = ct.tx
      inner join block as b on b.number=t.number where ct.contract='${address}';
    `,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    ctx.body = txs.map(normalizeTransaction);
  }
}

module.exports = new ContractController();
