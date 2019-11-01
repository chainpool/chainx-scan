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
}

module.exports = new ContractController();
