class TradeController {
  async getPairs(ctx) {
    const pairs = await ctx.db.TradingPair.findAll({
      include: [{ model: ctx.db.TradingPairPrice, as: "price" }]
    });
    ctx.body = pairs.map(pair => {
      Object.assign(pair.dataValues, { currency_pair: JSON.parse(pair.dataValues.currency_pair) });
      return pair;
    });
  }
}

module.exports = new TradeController();
