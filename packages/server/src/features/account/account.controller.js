class IntentionController {
  async intentions(ctx) {
    const intentions = await ctx.db.Intention.findAll({
      include: [{ model: ctx.db.IntentionProfile, as: "profile" }]
    });
    ctx.body = intentions;
  }
}

module.exports = new IntentionController();
