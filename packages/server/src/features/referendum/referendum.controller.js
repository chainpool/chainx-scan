const config = require("./referendum.json");
const { remove0x } = require("../utils");
const db = require("../../../models");
const dayjs = require("dayjs");
const calcTotal = require("./calcTotal");
const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient();
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);

// 避免同时请求数据库
let updatingBalancePromise = null;
let referendumList = {};
let syncingList = {};

async function updateBalance() {
  const accountBalanceList = await db.Balance.findAll({
    where: [
      {
        token: "PCX"
      }
    ],
    attributes: [
      "accountid",
      "Free",
      "ReservedStaking",
      "ReservedStakingRevocation",
      "ReservedDexSpot",
      "ReservedWithdrawal"
    ]
  }).reduce(
    (r, { accountid, Free, ReservedStaking, ReservedStakingRevocation, ReservedDexSpot, ReservedWithdrawal }) => {
      r[accountid] = Free + ReservedStaking + ReservedStakingRevocation + ReservedDexSpot + ReservedWithdrawal;
      return r;
    },
    {}
  );

  balances = accountBalanceList;

  return balances;
}

async function updateList(listId) {
  const { yes: yesAddress, no: noAddress, deadBlock } = config.find(({ id }) => id === listId);

  const order = [["number", "DESC"], ["index", "DESC"]];

  const result = await db.Transaction.findAll({
    where: {
      $or: [{ payee: remove0x(yesAddress) }, { payee: remove0x(noAddress) }],
      call: "transfer",
      number: {
        $lte: deadBlock
      }
    },
    attributes: ["number", "signed", "payee", "hash", "args"],
    raw: true,
    order
  }).map(({ number, signed, payee, hash, args }) => ({
    height: number,
    signed: `0x${signed}`,
    payee: `0x${payee}`,
    hash: `0x${hash}`,
    memo: JSON.parse(args).find(({ name }) => name === "memo").data || ""
  }));

  const [yesList, noList] = Object.values(
    result.reduce((list, current) => {
      if (!list[current.signed]) {
        list[current.signed] = current;
      }
      return list;
    }, {})
  ).reduce(
    ([_yesList, _noList], current) => {
      if (current.payee === yesAddress) {
        _yesList.push(current);
      }
      if (current.payee === noAddress) {
        _noList.push(current);
      }
      return [_yesList, _noList];
    },
    [[], []]
  );

  referendumList[listId] = {
    lastTxHeight: Math.max(yesList[0] && yesList[0].height, noList[0] && noList[0].height),
    yes: yesList,
    no: noList
  };

  return referendumList[listId];
}

async function getList(listId) {
  const { yes: yesAddress, no: noAddress } = config.find(({ id }) => id === listId);

  if (!referendumList[listId]) {
    return await updateList(listId);
  }

  const currentLastTxHeight = referendumList[listId].lastTxHeight;

  const order = [["number", "DESC"], ["index", "DESC"]];

  const query = await db.Transaction.findOne({
    where: { $or: [{ payee: remove0x(yesAddress) }, { payee: remove0x(noAddress) }], call: "transfer" },
    attributes: ["number", "signed", "payee", "hash"],
    raw: true,
    order
  });

  const lastTxHeight = query ? query.number : Number.MAX_SAFE_INTEGER;

  if (!currentLastTxHeight || parseInt(lastTxHeight, 10) > parseInt(currentLastTxHeight, 10)) {
    return await updateList(listId);
  }

  return referendumList[listId];
}

async function syncBalanceByNumber(deadBlock, listId) {
  const redisBalances = await redisGet(`balances:${listId}-${deadBlock}`);
  if (redisBalances) return JSON.parse(redisBalances);

  if (syncingList[deadBlock]) return {};
  syncingList[deadBlock] = true;

  Promise.all([
    db.Block.findOne({
      order: [["number", "DESC"]],
      where: {
        number: deadBlock
      },
      raw: true,
      attributes: ["number", "time", "hash"]
    }),
    updateList(listId)
  ])
    .then(([{ hash }, list]) => {
      return calcTotal(hash, list.yes.concat(list.no).map(({ signed }) => signed));
    })
    .then(balance => {
      console.log(`${deadBlock} 余额查询成功`);
      return redisSet(`balances:${listId}-${deadBlock}`, JSON.stringify(balance));
    })
    .then(() => {
      delete syncingList[deadBlock];
    });

  return {};
}

async function getBalance(listId) {
  const { isFinished, deadBlock } = await getDetail(listId);
  if (isFinished) {
    return syncBalanceByNumber(deadBlock, listId);
  } else {
    if (updatingBalancePromise) return updatingBalancePromise;

    updatingBalancePromise = updateBalance().then(result => {
      updatingBalancePromise = null;
      return result;
    });

    return updatingBalancePromise;
  }
}

async function getDetails() {
  const blockInfo = await db.Block.findOne({
    order: [["number", "DESC"]],
    raw: true,
    attributes: ["number", "time", "hash"]
  });

  const currentTime = dayjs(blockInfo.time);
  const currentBlock = blockInfo.number;

  return config.map(item => {
    return {
      ...item,
      status: currentBlock - +item.deadBlock > 0 ? true : false,
      deadTime: currentTime.add((+item.deadBlock - currentBlock) * 2, "s").format("YYYY-MM-DD HH:mm:ss")
    };
  });
}

async function getDetail(listId) {
  return (await getDetails()).find(({ id }) => id === listId);
}

class ReferendumController {
  async list(ctx) {
    const { listId } = ctx.params;

    const [{ yes, no }, balances] = await Promise.all([getList(listId), getBalance(listId)]);

    ctx.body = {
      yes: yes.map(o => ({ ...o, value: balances[o.signed] })),
      no: no.map(o => ({ ...o, value: balances[o.signed] }))
    };
  }

  async total(ctx) {
    const { listId } = ctx.params;

    const [{ yes, no }, balances] = await Promise.all([getList(listId), getBalance(listId)]);

    ctx.body = {
      yes: yes.reduce((r, o) => r + balances[o.signed], 0),
      no: no.reduce((r, o) => r + balances[o.signed], 0)
    };
  }

  async detail(ctx) {
    const { listId } = ctx.params;

    ctx.body = await getDetail(listId);
  }

  async details(ctx) {
    ctx.body = await getDetails();
  }
}

module.exports = new ReferendumController();
