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
}

module.exports = new ContractController();
