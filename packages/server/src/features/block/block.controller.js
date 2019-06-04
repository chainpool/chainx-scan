const { extractPage, normalizeBlock } = require("../utils");

class BlockController {
  async getBlocks(ctx) {
    const { page, pageSize } = extractPage(ctx);
    if (pageSize === 0) {
      ctx.status = 400;
      return;
    }

    const option = {
      order: [["number", "DESC"]],
      raw: true
    };

    Object.assign(option, {
      limit: pageSize,
      offset: page * pageSize
    });

    const blocks = await ctx.db.sequelize.query(
      `SELECT block.number, block.hash, block.justification, block.extrinsics, block.time, block.producer,
      event.count as event_count FROM block
    LEFT JOIN (select number, count(*) from event group by number order by number desc) as event
    on block.number=event.number
    ORDER BY block.number DESC
    LIMIT ${pageSize} OFFSET ${page * pageSize};`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const rows = await ctx.db.sequelize.query(`SELECT COUNT(*) FROM block`, {
      type: ctx.db.sequelize.QueryTypes.SELECT
    });
    const total = rows[0].count;

    const items = blocks.map(normalizeBlock);

    ctx.body = {
      items,
      pageSize,
      page,
      total
    };
  }

  async getBlock(ctx) {
    const { heightOrHash } = ctx.params;

    const option = { attributes: { exclude: ["data"] }, raw: true };
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
