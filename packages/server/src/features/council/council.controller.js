const { extractPage } = require("../utils");

const councilAddr = "67df26a755e0c31ac81e2ed530d147d7f2b9a3f5a570619048c562b1ed00dfdd";

class CouncilController {
  async transfers(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const where = { addr: councilAddr, call: "transfer" };
    const order = [["height", "DESC"]];
    const exclude = ["multisigid", "call", "module", "confirm_tx", "yet_needed", "owners_done"];
    const { rows, count } = await ctx.db.EventMultiSig.findAndCountAll({
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      attributes: { exclude },
      where,
      order,
      offset: page * pageSize,
      raw: true
    });

    const items = rows.map(row => {
      const args = JSON.parse(row.args);
      const dest = (args.find(arg => arg.name === "dest") || {}).data;
      const token = (args.find(arg => arg.name === "token") || {}).data;
      const value = parseInt((args.find(arg => arg.name === "value") || {}).data);
      const memo = (args.find(arg => arg.name === "memo") || {}).data;
      delete row.args;
      return {
        ...row,
        dest,
        token,
        value,
        memo
      };
    });

    ctx.body = {
      items,
      pageSize,
      page,
      total: count
    };
  }
}

module.exports = new CouncilController();
