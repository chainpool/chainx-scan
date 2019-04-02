class AccountController {
  async intention(ctx) {
    const { accountId } = ctx.params;

    const intention = await ctx.db.Intention.findOne({ where: { accountid: accountId }, raw: true });
    ctx.body = {
      ...intention,
      isActive: intention.isActive === "true",
      isTrustee: JSON.parse(intention.isTrustee),
      isValidator: intention.isValidator === "true"
    };
  }
}

module.exports = new AccountController();
