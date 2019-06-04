const { extractPage } = require("../utils");

class AccountTransferController {
  async transfers(ctx) {
    const { accountId } = ctx.params;

    const { page, pageSize } = extractPage(ctx);
    const order = [["number", "DESC"], ["index", "DESC"]];
    const { rows: items, count } = await ctx.db.Transaction.findAndCountAll({
      where: { $or: [{ signed: accountId }, { payee: accountId }], call: "transfer" },
      attributes: ["number", "index", "signed", "payee", "args", "hash", "time"],
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: items.map(item => {
        const args = JSON.parse(item.args);
        const target = { ...item };
        delete target.args;

        const fields = ["token", "value", "memo"];
        fields.forEach(field => {
          const arg = args.find(arg => arg.name === field);
          Object.assign(target, { [field]: arg.data });
        });

        return target;
      }),
      page,
      pageSize,
      total: count
    };
  }
}

module.exports = new AccountTransferController();
