const BigNumber = require("bignumber.js");
const { extractPage, normalizeBlock } = require("../utils");
const MILLI_SECONDS_24H = 1000 * 3600 * 24;

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

    const rows = await ctx.db.sequelize.query(`select max(best) from  "status_chain";`, {
      type: ctx.db.sequelize.QueryTypes.SELECT
    });
    const total = rows[0].max;

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

  async getBlocksInfo(ctx) {
    const { ids = [] } = ctx.request.body;

    const blocks = await ctx.db.Block.findAll({
      where: {
        number: {
          $in: ids
        }
      },
      raw: true
    });

    ctx.body = blocks.map(normalizeBlock);
  }

  async avg24HBlockTime(ctx) {
    const time = new Date().getTime() - MILLI_SECONDS_24H;

    const minRows = await ctx.db.sequelize.query(
      `
    select number, time from block where time > ${time} order by time limit 1;
    `,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const minNumber = parseInt(minRows[0].number);
    const minTime = parseInt(minRows[0].time);

    const maxRows = await ctx.db.sequelize.query(
      `
    select number, time from block order by time desc limit 1
    `,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );

    const maxNumber = parseInt(maxRows[0].number);
    const maxTime = parseInt(maxRows[0].time);

    ctx.body = new BigNumber((maxTime - minTime) / (maxNumber - minNumber)).toFixed(0);
  }
}

module.exports = new BlockController();
