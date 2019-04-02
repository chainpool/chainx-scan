const { extractPage } = require("../utils");

class NominationController {
  async accountNominations(ctx) {
    const { accountId } = ctx.params;
    const { nominee } = ctx.query;

    const where = { nominator: accountId };
    if (nominee) {
      Object.assign(where, { nominee });
    }

    const nominations = await ctx.db.Nomination.findAll({ where });
    ctx.body = nominations;
  }

  async byNominee(ctx) {
    const { accountId } = ctx.params;
    const { page, pageSize } = extractPage(ctx);

    const where = { nominee: accountId };
    const { rows: items, count } = await ctx.db.Nomination.findAndCountAll({
      attributes: { exclude: ["nominee"] },
      where,
      limit: pageSize,
      offset: page * pageSize,
      order: [["height", "DESC"]],
      raw: true
    });
    ctx.body = {
      items: items.map(item => ({
        ...item,
        revocations: JSON.parse(item.revocations)
      })),
      total: count,
      page,
      pageSize
    };
  }
}

module.exports = new NominationController();
