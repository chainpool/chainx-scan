const { extractPage } = require("../utils");

class EthController {
  async addresses(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.EthCrossChainAddressMap.findAndCountAll({
      attributes: { exclude: ["chain", "height"] },
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows,
      page,
      pageSize,
      total: count
    };
  }
}

module.exports = new EthController();
