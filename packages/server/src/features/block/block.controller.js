const { extractPage, trimFields } = require("../utils");

class BlockController {
  async getBlocks(ctx) {
    const { page, pageSize } = extractPage(ctx);

    if (pageSize === 0) {
      ctx.status = 400;
      return;
    }

    const order = [["number", "DESC"]];

    const { rows: blocks, count } = await ctx.db.Block.findAndCountAll({
      order,
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    const fieldsNeedTrim = [
      "hash",
      "parent_hash",
      "state_root",
      "extrinsics_root"
    ];
    const items = blocks.map(block => {
      return {
        ...block,
        ...trimFields(block, fieldsNeedTrim),
        digest: JSON.parse(block.digest),
        data: JSON.parse(block.data)
      };
    });

    ctx.body = {
      items,
      pageSize,
      page,
      pageMax: Math.floor(count / pageSize)
    };
  }
}

module.exports = new BlockController();
