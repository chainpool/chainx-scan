function extractPage(ctx) {
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

  return {
    page,
    pageSize
  };
}

function trimFields(obj, fields) {
  const override = fields.reduce((result, field) => {
    result[field] = obj[field].trim();
    return result;
  }, {});

  return {
    ...obj,
    ...override
  };
}

module.exports = {
  extractPage,
  trimFields
};
