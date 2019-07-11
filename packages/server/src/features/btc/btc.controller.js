const { extractPage } = require("../utils");
const { pubKeyToAddress, hashToBtcAdress, normalizeTxHash } = require("./address");

class BtcController {
  async status(ctx) {
    const rows = await ctx.db.BtcStatus.findAll({
      order: [["trustee_session", "DESC"]],
      limit: 1,
      raw: true
    });

    ctx.body = rows.length > 0 ? rows[0] : null;
  }

  async headers(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.BtcHeader.findAndCountAll({
      include: [{ model: ctx.db.Transaction, as: "block", attributes: ["time"] }],
      order: [["time", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows.map(row => ({
        ...row,
        confirmed: row.confirmed === "true",
        txid: JSON.parse(row.txid)
      })),
      page,
      pageSize,
      total: count
    };
  }

  async txs(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const items = await ctx.db.sequelize.query(
      `SELECT tx.txid, tx.tx_type, tx.header, tx.chainx_tx, tx.relay, tx.value, transaction.time as "block.time" FROM "XBridgeOfBTC_TxFor" AS tx
      INNER JOIN "XBridgeOfBTC_BlockHeaderFor" AS header on tx.header=header.header
      INNER JOIN "transaction" ON transaction.hash=tx.chainx_tx
      WHERE tx.header IS NOT NULL AND tx.chainx_tx IS NOT NULL
      ORDER BY tx.height DESC
      LIMIT ${pageSize} OFFSET ${page * pageSize}`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );
    const rows = await ctx.db.sequelize.query(
      `SELECT count(*) FROM (SELECT tx.txid, tx.tx_type, tx.header, tx.chainx_tx, tx.relay, tx.value, transaction.time as "block.time" FROM "XBridgeOfBTC_TxFor" AS tx
      INNER JOIN "XBridgeOfBTC_BlockHeaderFor" AS header on tx.header=header.header
      INNER JOIN "transaction" ON transaction.hash=tx.chainx_tx
      WHERE tx.header IS NOT NULL AND tx.chainx_tx IS NOT NULL) AS tx`,
      {
        type: ctx.db.sequelize.QueryTypes.SELECT
      }
    );
    const total = rows[0].count;

    ctx.body = {
      items,
      page,
      pageSize,
      total
    };
  }

  async address(ctx) {
    const { address } = ctx.params;
    const map = await ctx.db.BtcCrossChainAddressMap.findOne({
      where: { display_address: address },
      include: [{ model: ctx.db.Intention, as: "intention", attributes: ["name"] }],
      attributes: { exclude: ["address", "chain", "height", "display_address"] },
      raw: true
    });

    ctx.body = map || {};
  }

  async addresses(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.BtcCrossChainAddressMap.findAndCountAll({
      include: [{ model: ctx.db.Intention, as: "intention", attributes: ["name"] }],
      attributes: { exclude: ["chain", "height"] },
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows.map(row => {
        const address = JSON.parse(row.address);
        return {
          ...row,
          address: hashToBtcAdress(address.hash, address.kind, address.network)
        };
      }),
      page,
      pageSize,
      total: count
    };
  }

  async pendingDeposits(ctx) {
    const deposits = await ctx.db.PendingDeposit.findAll({
      order: [["height", "ASC"]],
      raw: true
    });

    const result = deposits.reduce((result, deposit) => {
      const addrItem = JSON.parse(deposit.address);
      const address = hashToBtcAdress(addrItem.hash, addrItem.kind, addrItem.network);

      const txs = JSON.parse(deposit.txid_balance).map(tx => {
        return { ...tx, address, height: deposit.height, txid: normalizeTxHash(tx.txid) };
      });

      return result.concat(txs);
    }, []);

    ctx.body = result;
  }

  async deposits(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.Deposit.findAndCountAll({
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows,
      page,
      pageSize,
      total: count
    };
  }

  async withdrawals(ctx) {
    const { page, pageSize } = extractPage(ctx);

    const { rows, count } = await ctx.db.Withdraw.findAndCountAll({
      where: { chain: "1" }, // '1' 代表btc chain
      include: [{ model: ctx.db.Block, as: "block", attributes: ["time"] }],
      order: [["height", "DESC"]],
      limit: pageSize,
      offset: page * pageSize,
      raw: true
    });

    ctx.body = {
      items: rows.map(row => {
        return {
          ...row,
          memo: Buffer.from(row.memo, "hex").toString()
        };
      }),
      page,
      pageSize,
      total: count
    };
  }

  async sessionTrustees(ctx) {
    const rows = await ctx.db.SessionTrusteeInfo.findAll({
      attributes: { exclude: ["chain", "height"] },
      order: [["id", "DESC"]],
      limit: 5,
      raw: true
    });

    const normalizedRows = rows.map(row => ({
      ...row,
      trusteeList: JSON.parse(row.trustee_list),
      hotAddressList: JSON.parse(row.hot_address_list),
      coldAddressList: JSON.parse(row.cold_address_list)
    }));

    ctx.body = normalizedRows.reduce((result, row) => {
      row.trusteeList.forEach((trustee, index) => {
        result.push({
          trustee,
          id: row.id,
          hotAddress: row.hotAddressList[index] ? pubKeyToAddress(row.hotAddressList[index]) : null,
          coldAddress: row.coldAddressList[index] ? pubKeyToAddress(row.coldAddressList[index]) : null
        });
      });
      return result;
    }, []);
  }
}

module.exports = new BtcController();
