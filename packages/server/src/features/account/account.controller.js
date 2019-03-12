class IntentionController {
  async intentions(ctx) {
    const intentions = await ctx.db.Intention.findAll({
      include: [{ model: ctx.db.IntentionProfile, as: "profile" }]
    });
    ctx.body = intentions.map(intention => {
      Object.assign(intention.dataValues.profile, { is_active: intention.dataValues.profile.is_active === "true" });
      return intention;
    });
  }
}

module.exports = new IntentionController();
