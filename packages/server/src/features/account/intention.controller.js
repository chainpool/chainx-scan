const { extractPage } = require("../utils");

const session = 150;

class AccountController {
  async validators(ctx) {
    const intentions = await ctx.db.Intention.findAll({
      attributes: ["accountid", "name", "about", "selfVote", "totalNomination"],
      where: { isActive: "true", isValidator: "true" },
      raw: true
    });

    const set = new Set(intentions.map(i => i.accountid));

    const result = [];
    for (const id of set) {
      const target = intentions.find(i => id === i.accountid);
      result.push(target);
    }

    result.sort((a, b) => b.selfVote - a.selfVote);

    ctx.body = result;
  }

  async intention(ctx) {
    const { accountId } = ctx.params;

    const intention = await ctx.db.Intention.findOne({ where: { accountid: accountId }, raw: true });
    ctx.body = {
      ...intention,
      isActive: intention.isActive === "true",
      isTrustee: JSON.parse(intention.isTrustee),
      isValidator: intention.isValidator === "true"
    };
  }

  async pseduIntentions(ctx) {
    const intentions = await ctx.db.PseduIntention.findAll({ raw: true });
    ctx.body = intentions.filter(i => !["SDOT", "L-BTC"].includes(i.id));
  }

  async setting(ctx) {
    const { accountId } = ctx.params;

    const profiles = await ctx.db.Trustee.findAll({
      attributes: { exclude: ["height", "accountid"] },
      where: { accountid: accountId },
      raw: true
    });

    ctx.body = profiles.map(profile => {
      const cold_entity = JSON.parse(profile.cold_entity);
      const hot_entity = JSON.parse(profile.hot_entity);
      return {
        ...profile,
        chain: "BTC",
        cold_entity: cold_entity["Compressed"],
        hot_entity: hot_entity["Compressed"]
      };
    });
  }

  async intentionMissedBlocks(ctx) {
    const maxHeight = await ctx.db.Block.max("number");
    const latestPeriodHeight = maxHeight - (maxHeight % 150);
    let startHeight = latestPeriodHeight - 150 * 9;
    startHeight = startHeight > 0 ? startHeight : 0;

    const rows = await ctx.db.MissedBlocks.findAll({
      where: { height: { $gte: startHeight } },
      order: [["height", "DESC"]],
      raw: true
    });

    ctx.body = rows.map(row => ({
      accountid: row.accountid,
      missed: row.missed,
      period: Math.floor(row.height / session)
    }));
  }

  async missedBlocks(ctx) {
    const { page, pageSize } = extractPage(ctx);
    const { accountId } = ctx.params;

    const { rows, count: total } = await ctx.db.MissedBlocks.findAndCountAll({
      attributes: { exclude: ["accountid"] },
      where: { accountid: accountId },
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows.map(row => ({
        missed: row.missed,
        period: Math.floor(row.height / session)
      })),
      pageSize,
      page,
      total
    };
  }

  async logos(ctx) {
    const keys = [
      "bihodl",
      "bitcat",
      "buildlinks",
      "cha.in",
      "exinpool",
      "hashquark",
      "hlt",
      "keepnode",
      "liebipool",
      "mathwallet",
      "nodeasy",
      "sssnodes",
      "laocius",
      "bitportal",
      "novanode",
      "polkaworld",
      "realgar",
      "dapppub",
      "nodeasy.com",
      "wetez",
      "bemular",
      "chainxtools",
      "cybexdex",
      "gfnetwork",
      "hotbit",
      "pos.dog",
      "pox.cool",
      "xchainx",
      "jinma",
      "2100.io",
      "dhg",
      "skittles",
      "tower",
      "scans",
      "spacexpool",
      "ducapital",
      "web3",
      "huolanshan",
      "overlook",
      "polkaitaly",
      "polkanordic",
      "twopizza",
      "chainy",
      "snzholding",
      "stella",
      "xpool",
      "bepal",
      "bigone",
      "blockeden",
      "rabbit",
      "nova staking",
      "hash",
      "xiamipool",
      "fish",
      "ipse",
      "pcxpool",
      "azimut",
      "redpenguin",
      "angel",
      "chainx",
      "luckyve",
      "luckyve2",
      "readmylife",
      "ctpool.org",
      "CryptOptimus",
      "cryptoptimus",
      "168node",
      "exxibox",
      "ma_ipfs_dot",
      "olympuspool",
      "northcap",
      "polkatrust",
      "mxcpospool",
      "hybridge",
      "entretenidos"
    ];

    ctx.body = keys.map(key => {
      return {
        [key]: `https://chainx-validators-logo.oss-cn-hangzhou.aliyuncs.com/${key}.png`
      };
    });
  }
}

module.exports = new AccountController();
