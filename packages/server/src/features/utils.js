const BigNumber = require("bignumber.js");

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
    result[field] = (obj[field] || "").trim();
    return result;
  }, {});

  return {
    ...obj,
    ...override
  };
}

function normalizeBlock(block) {
  const result = { ...block };
  if (result.digest) {
    result.digest = JSON.parse(block.digest);
  }

  if (result.data) {
    result.data = JSON.parse(block.data);
  }

  return result;
}

function normalizeTransaction(tx) {
  return {
    ...tx,
    args: JSON.parse(tx.args)
  };
}

function remove0x(str) {
  if (str.startsWith("0x")) {
    return str.slice(2);
  }
  return str;
}

function normalizePCX(num) {
  return new BigNumber(num)
    .dividedBy(Math.pow(10, 8))
    .toNumber()
    .toFixed(8);
}

module.exports = {
  extractPage,
  trimFields,
  normalizeBlock,
  normalizeTransaction,
  remove0x,
  normalizePCX
};
