class NominationController {
  async accountNominations(ctx) {
    const { accountId } = ctx.params;

    const nominations = await ctx.db.Nomination.findAll({ where: { nominator: accountId } });
    ctx.body = nominations;
  }
}

module.exports = new NominationController();
