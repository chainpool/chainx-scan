const { extractPage, normalizeBlock } = require("../utils");

class BlockController {
  async getBlocks(ctx) {
    const { page, pageSize } = extractPage(ctx);
    if (pageSize === 0) {
      ctx.status = 400;
      return;
    }

    const { from, to } = ctx.query;
    if ((from && !to) || (!from && to)) {
      ctx.status = 400;
      return;
    }

    const option = {
      order: [["number", "DESC"]],
      raw: true
    };

    if (from && /^\d+$/.test(from) && to && /^\d+$/.test(to)) {
      Object.assign(option, {
        where: {
          $and: [{ number: { $lt: to } }, { number: { $gte: from } }]
        }
      });
    } else {
      Object.assign(option, {
        limit: pageSize,
        offset: page * pageSize
      });
    }

    const blocks = await ctx.db.Block.findAll(option);
    const count = await ctx.db.Block.count();

    const items = blocks.map(normalizeBlock);

    ctx.body = {
      items,
      pageSize,
      page,
      total: count
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

    const { fields } = ctx.query;
    if (fields) {
      const fieldsArr = fields.split(",");
      Object.assign(option, { attributes: fieldsArr });
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
