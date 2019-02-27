class BlockController {
  async getBlocks(ctx) {
    const { page_size: queryPageSize, page: queryPage } = ctx.query;

    let pageSize;
    try {
      pageSize = parseInt(queryPageSize);
      pageSize = isNaN(pageSize) ? 10 : pageSize;
    } catch (e) {
      pageSize = 10;
    }
    let page;
    try {
      page = parseInt(queryPage);
      page = isNaN(page) ? 0 : page;
    } catch (e) {
      page = 0;
    }

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

    const items = blocks.map(block => {
      return {
        ...block,
        hash: block.hash.trim(),
        parent_hash: block.parent_hash.trim(),
        state_root: block.state_root.trim(),
        extrinsics_root: block.extrinsics_root.trim(),
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
