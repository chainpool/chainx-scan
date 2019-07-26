const fetch = require("node-fetch");
const Sequelize = require("sequelize");
const { Observable, timer, merge } = require("rxjs");
const { timeout, retryWhen, switchMap, delayWhen, reduce, take } = require("rxjs/operators");
const db = require("../../../models");

const concurrent = 20; // 并发数量

const log = console;

const rpcUrl = "https://w1.chainx.org.cn/rpc";

function timeoutAndRetry(time = 10000, retryTime = 10000, msg) {
  return source$ =>
    source$.pipe(
      timeout(time),
      retryWhen(errors => {
        if (msg) log.error(msg);
        return errors.pipe(delayWhen(val => timer(retryTime)));
      }),
      take(1)
    );
}

function queryAccountAssets(hash, accountid) {
  return new Observable(async subscriber => {
    try {
      const requestData = {
        id: `${accountid}`,
        jsonrpc: "2.0",
        method: "chainx_getAssetsByAccount",
        params: [`${accountid}`, 0, 100, `${hash}`]
      };

      const res = await fetch(rpcUrl, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
      const {
        result: { data }
      } = await res.json();

      const asstesData = data
        .filter(o => o.name === "PCX")
        .map(({ details, name }) => {
          return [
            name,
            details.Free +
              details.ReservedCurrency +
              details.ReservedDexFuture +
              details.ReservedDexSpot +
              details.ReservedStaking +
              details.ReservedStakingRevocation +
              details.ReservedWithdrawal
          ];
        })
        .reduce((result, [name, value]) => {
          if (isNaN(value)) {
            const msg = `${accountid} 资产总额相加错误`;
            log.error(msg);
            throw new Error(msg);
          }
          result[name] = value;
          return result;
        }, {});
      // log.info(`${accountid} 资产：${JSON.stringify(asstesData)}`);
      subscriber.next([accountid, asstesData]);
      subscriber.complete();
    } catch (error) {
      if (!subscriber.closed) {
        log.error(`${accountid} 查询错误`);
      }
      subscriber.error(error);
    }
  }).pipe(timeoutAndRetry(10000, 10000, `${accountid} 查询超时重试`));
}

function queryAllAccounts() {
  return new Observable(async subscriber => {
    try {
      const allAccounts = Array.from(
        await db.Balance.findAll({
          attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("accountid")), "accountid"]]
        }),
        ({ accountid }) => accountid
      );
      subscriber.next(allAccounts);
      subscriber.complete();
    } catch (error) {
      log.error(`查询帐号错误`, error);
      subscriber.error();
    }
  }).pipe(timeoutAndRetry());
}

module.exports = function calcTotal(hash, allAccounts) {
  log.info("开始查询余额");

  return merge(
    ...allAccounts.map(accountId => {
      return queryAccountAssets(hash, accountId);
    }),
    concurrent
  )
    .pipe(
      reduce((acc, [accountid, data]) => {
        acc[accountid] = data["PCX"];
        return acc;
      }, {})
    )
    .toPromise();
};
