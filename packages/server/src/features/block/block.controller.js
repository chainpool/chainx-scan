const { extractPage, trimFields } = require("../utils");

function normalizeBlock(block) {
  const fieldsNeedTrim = [
    "hash",
    "parent_hash",
    "state_root",
    "extrinsics_root"
  ];

  return {
    ...block,
    ...trimFields(block, fieldsNeedTrim),
    digest: JSON.parse(block.digest),
    data: JSON.parse(block.data)
  };
}

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

    const items = blocks.map(normalizeBlock);

    ctx.body = {
      items,
      pageSize,
      page,
      pageMax: Math.floor(count / pageSize)
    };
  }

  async getBlock(ctx) {
    const { heightOrHash } = ctx.params;

    const option = { raw: true };
    if (/^\d+$/.test(heightOrHash)) {
      Object.assign(option, { where: { number: heightOrHash } });
    } else if (/^0x[\da-fA-F]{64}$/.test(heightOrHash)) {
      Object.assign(option, { where: { hash: heightOrHash.toLowerCase() } });
    } else {
      ctx.status = 400;
      ctx.body = { error: "invalid param" };
      return;
    }

    const block = await ctx.db.Block.findOne(option);
    if (!block) {
      ctx.status = 404;
      ctx.body = { error: "not found" };
      return;
    }

    ctx.body = normalizeBlock(block);
  }
}

module.exports = new BlockController();
