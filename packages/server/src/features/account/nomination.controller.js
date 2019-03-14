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
}

module.exports = new NominationController();
