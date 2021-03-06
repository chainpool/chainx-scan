import io from "socket.io-client";
import { combineLatest, from, Observable, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import hexAddPrefix from "@polkadot/util/hex/addPrefix";
import hexStripPrefix from "@polkadot/util/hex/stripPrefix";

import { decodeAddress } from "../shared";
import { getDefaultApi } from "./utils";

class Socket {
  socket = null;
  subscribeNames = [];
  eventNames = [];
  handler = {};

  constructor() {
    this.socket = io(getDefaultApi());
    this.socket.connect();
    this.socket.on("connect", data => this.connectHandler());
    this.socket.on("connect_error", data => this.reconnect(data));
    this.socket.on("disconnect", data => this.reconnect(data));
    this.socket.on("error", data => this.reconnect(data));
  }

  connectHandler(subscribeName = "") {
    if (!subscribeName) {
      for (let _name of this.subscribeNames) {
        this.socket.emit("subscribe", _name);
      }
    } else {
      if (!(subscribeName in this.subscribeNames)) {
        this.subscribeNames.push(subscribeName);
      }
      this.socket.emit("subscribe", subscribeName);
    }
  }

  closeHandler(subscribeName = "") {
    if (!subscribeName) {
      for (let _name of this.subscribeNames) {
        this.socket.emit("unsubscribe", _name);
      }
    } else {
      this.socket.emit("unsubscribe", subscribeName);
    }
  }

  reconnect(e) {
    this.socket.close();
    setTimeout(() => {
      this.socket.connect();
    }, 3000);
  }
}

class Api {
  endpoint = null;
  socket = null;
  subscribeName = [];

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  setEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  fetch = (path, params = {}, options) => {
    const paramsKeyConvert = (str = "") => str.replace(/[A-Z]/g, ([s]) => `_${s.toLowerCase()}`);
    const url = new URL(path, this.endpoint);
    for (const key of Object.keys(params)) {
      url.searchParams.set(paramsKeyConvert(key), params[key]);
    }

    return new Promise(async (resolve, reject) => {
      const resp = await window.fetch(url, options);
      if (resp.status !== 200) {
        resolve({
          error: {
            code: resp.status,
            url: path,
            message: "api is not online"
          }
        });
      } else {
        resolve({
          result: await resp.json()
        });
      }
    });
  };

  fetch$ = (path, params = {}, options = {}) => {
    return from(this.fetch(path, params, options)).pipe(
      map(({ result, error }) => {
        if (!error) {
          return result;
        } else {
          throw error;
        }
      }),
      catchError(error => {
        // @todo 全局的错误上报处理
        return throwError(error);
      })
    );
  };

  createObservable = (name, eventName) => {
    if (!this.socket) {
      this.socket = new Socket();
    }
    return new Observable(observer => {
      this.socket.connectHandler(name);
      this.socket.socket.on(eventName, data => {
        observer.next(data);
      });
      return () => {
        this.socket.socket.removeListener(eventName);
        this.socket.closeHandler(name);
      };
    });
  };

  fetchLatestBlock$ = () => {
    return this.fetch$(`/chain/latest`);
  };

  /**
   * 获取账户详情
   */
  fetchAccountDetail$ = accountId => {
    return this.fetch$(`/account/${accountId}/detail`);
  };

  /**
   * 获取节点详情
   */
  fetchValidatorDetail$ = (nodeId, params) => {
    return this.fetch$(`/intention/${nodeId}`, params);
  };

  /**
   * 获取投票用户列表
   */
  fetchNominations$ = (params, { nodeID }) => {
    return this.fetch$(`/intention/${nodeID}/nominations`, params);
  };

  /**
   * 获取信托设置列表
   */
  fetchTrusteeSettingList$ = nodeID => {
    return this.fetch$(`/intention/${nodeID}/settings`);
  };

  /**
   * 获取托管地址列表
   */
  fetchTrusteeList$ = () => {
    return this.fetch$(`/btc/session_trustees`);
  };

  /**
   * 获取托管地址列表
   */
  fetchDepositClaim$ = () => {
    return this.fetch$(`/btc/pending_deposits`);
  };

  /**
   * 获取账户跨链资产列表
   */
  fetchAccountBalance$ = accountId => {
    return this.fetch$(`/account/${accountId}/balance`);
  };

  /**
   * 获取最新的块头列表
   */
  fetchLatestBlocks$ = () => {
    return this.createObservable("LATEST_BLOCKS_ROOM", "latestBlocks");
  };

  /**
   * 获取交易信息
   */
  fetchTransaction$ = () => {
    return this.fetch$("/chain/daily_transactions");
  };

  /**
   * 获取最新的交易列表
   */
  fetchLatestTxs$ = () => {
    return this.createObservable("LATEST_TRANSACTIONS_ROOM", "latestTxs");
  };

  /**
   * 获取最新的链的状态
   */
  fetchChainStatus$ = () => {
    return this.createObservable("CHAIN_STATUS", "chainStatus");
  };

  /**
   * 获取验证人列表
   */
  fetchIntentions$ = (params, options = {}) => {
    const { tabFilter = null } = options;
    return this.fetch$(`/intentions`, params).pipe(
      map(result => {
        if (!tabFilter) {
          return result;
        }
        switch (tabFilter) {
          case "unsettled":
            result.items = result.items.filter(item => !item.isValidator);
            break;
          case "all":
            result.items = result.items.filter(item => item.isValidator);
            break;
          default:
            result.items = result.items.filter(item => item.isTrustee.indexOf(tabFilter) >= 0);
            break;
        }
        result.total = result.items.length;
        result.items.sort((a, b) => {
          if (a.isTrustee.length && !b.isTrustee.length) {
            return -1;
          } else if (!a.isTrustee.length && b.isTrustee.length) {
            return 1;
          } else {
            return 0;
          }
        });
        return result;
      })
    );
  };

  /**
   * 获取漏块统计
   */
  fetchIntendtionMissed$ = () => {
    return this.fetch$(`/intention_missed_blocks`);
  };

  /**
   * 获取验证详情漏块统计
   */
  fetchDetailMissed$ = (params, { nodeId }) => {
    return this.fetch$(`/intention/${nodeId}/missed_blocks`, params);
  };

  /**
   * 获取区块列表
   */
  fetchBlocks$ = params => {
    return this.fetch$(`/blocks`, params);
  };

  /**
   * 获取交易列表
   */
  fetchTxs$ = (params, { block } = {}) => {
    return this.fetch$(`/txs`, { ...params, block });
  };

  /**
   * 获取事件列表
   */
  fetchEvents$ = (params, { block, tx } = {}) => {
    return this.fetch$(`/events`, { ...params, block, tx });
  };

  /**
   * 获取账号列表
   */
  fetchAccounts$ = params => {
    return this.fetch$(`/accounts`, params);
  };

  /**
   * 获取区块详情
   */
  fetchBlockDetail$ = blockId => {
    return this.fetch$(`/block/${blockId}`);
  };

  /**
   * 获取交易详情
   */
  fetchTxDetail$ = txId => {
    return this.fetch$(`/tx/${txId}`);
  };

  /**
   * 获取比特币详情
   */
  fetchBtcStatus$ = () => {
    return this.createObservable("LATEST_BTC_HEADERS_ROOM", "latestBtcHeaders");
  };

  /**
   * 获取比特币详情
   */
  fetchHTTPBtcStatus$ = () => {
    return this.createObservable("LATEST_BTC_STATUS_ROOM", "latestBtcStatus");
  };

  /**
   * 获取账户资产列表
   */
  fetchAccountAssset$ = (accountId, params) => {
    return this.fetch$(`/account/${hexAddPrefix(accountId)}/balance`, params);
  };

  /**
   * 获取账户投票列表
   */
  fetchAccountNominations$ = (accountId, params) => {
    return this.fetch$(`/account/${hexAddPrefix(accountId)}/nominations`, params);
  };

  /**
   * 获取账户挂单列表
   */
  fetchAccountOrders$ = (params, { accountId, status }) => {
    return this.fetch$(`/trade/userorders/${hexStripPrefix(accountId)}`, { ...params, status });
  };

  /**
   * 获取账户转账列表
   */
  fetchAccountTransfers$ = (params, { accountId }) => {
    return this.fetch$(`/account/${hexAddPrefix(accountId)}/transfers`, params);
  };

  /**
   * 获取账户成交列表
   */
  fetchAccountFillOrders$ = (params, { accountId }) => {
    return this.fetch$(`/account/${hexStripPrefix(accountId)}/fill_orders`, params);
  };

  /**
   * 获取账户交易列表
   */
  fetchAccountTxs$ = (params, { accountId }) => {
    return this.fetch$(`/account/${hexStripPrefix(accountId)}/txs`, params);
  };

  /**
   * 获取多签记录
   */
  fetchMultisigRecords$ = params => {
    return this.fetch$(`/multisig/records`, params);
  };

  /**
   * 获取议会转账记录
   */
  fetchCouncilTransfers$ = params => {
    return this.fetch$(`/council/transfers`, params);
  };

  /**
   * 获取智能合约
   */
  fetchContracts$ = params => {
    return this.fetch$(`/contracts`, params);
  };

  /**
   * 获取智能合约详情
   */
  fetchContractDetail$ = accountId => {
    return this.fetch$(`/contract/${hexStripPrefix(accountId)}`);
  };

  /**
   * 获取智能合约交易详情
   */
  fetchContractTx$ = (params, { accountId }) => {
    return this.fetch$(`/contract/${hexStripPrefix(accountId)}/txs`);
  };

  /**
   * 获取账户绑定地址列表
   */
  fetchAccountBindAddresses$ = (accountId, params) => {
    return this.fetch$(`/account/${hexAddPrefix(accountId)}/binds`, params);
  };

  /**
   * 跨链 BTC 列表
   */
  fetchBtcBlocks$ = params => {
    return this.fetch$(`/btc/headers`, params);
  };

  /**
   * 跨链充值列表
   */
  fetchBtcDeposits$ = (params, { accountId }) => {
    return this.fetch$(`/btc/deposits`, { accountId: hexStripPrefix(accountId), ...params });
  };

  /**
   * BTC 锁仓列表
   */
  fetchBtcLock$ = params => {
    return this.fetch$(`/btc/lock/records`, params);
  };

  /**
   * BTC 锁仓地址列表
   */
  fetchBtcAddress$ = params => {
    return this.fetch$(`/btc/lock/addresses`, params);
  };

  /**
   * 某一用户的锁仓列表
   */
  fetchAccountBtcLock$ = (params, { accountId }) => {
    return this.fetch$(`/btc/lock/records`, { accountid: hexStripPrefix(accountId), ...params });
  };

  /**
   * 跨链提现列表
   */
  fetchBtcWithdrawals$ = (params, { accountId }) => {
    return this.fetch$(`/btc/withdrawals`, { accountId: hexStripPrefix(accountId), ...params });
  };

  /**
   * 跨链 BTC 交易
   */
  fetchBtcTxs$ = params => {
    return this.fetch$(`/btc/txs`, params);
  };

  /**
   * 跨链 BTC 绑定地址
   */
  fetchBtcBind$ = params => {
    return this.fetch$(`/btc/addresses`, params);
  };

  /**
   * 跨链以太绑定
   */
  fetchEtherumBind$ = params => {
    return this.fetch$(`/eth/addresses`, params);
  };

  /**
   * 获取充值挖矿列表
   */
  fetchDepositsMine$ = params => {
    return this.fetch$(`/psedu_intentions`, params);
  };

  /**
   * 获取 token 和精度对应关系
   */
  fetchTokens$ = params => {
    return this.fetch$("/tokens", params);
  };

  /**
   * 获取 pairs 列表
   */
  fetchPairs$ = params => {
    return this.fetch$("/trade/pairs", params);
  };

  fetchPowerPercent$ = () => {
    return this.fetch$("/power_percent");
  };

  fetchPowerPercentV2$ = () => {
    return this.fetch$("/power_percent_v2");
  };

  fetchPowerPercentV3$ = () => {
    return this.fetch$("/power_percent_v3");
  };

  /**
   * 获取挂单列表
   */
  fetchHandicap$ = (pairid, params) => {
    return this.fetch$(`/trade/handicap/${pairid}`, params);
  };

  /**
   * 获取当前委托列表
   */
  fetchTradeCurrent$ = (params, { pairid }) => {
    return this.fetch$(`/trade/all_orders/${pairid}`, params);
  };

  /**
   * 获取历史委托列表
   */
  fetchTradeHistory$ = (params, { pairid }) => {
    return this.fetch$(`/trade/all_filled_orders/${pairid}`, params);
  };

  /**
   * 获取公投详情
   */
  fetchReferendumDetail$ = (id, params) => {
    return this.fetch$(`/referendum/detail/${id}`, params);
  };

  /**
   * 获取公投详情列表
   */
  fetchReferendumDetails$ = () => {
    return this.fetch$(`/referendum/details`).pipe(map(data => data.reverse()));
  };

  /**
   * 获取公投列表
   */
  fetchReferendumList$ = (id, params) => {
    return this.fetch$(`/referendum/lists/${id}`, params);
  };

  /**
   * 获取公投结果
   */
  fetchReferendumTotal$ = (id, params) => {
    return this.fetch$(`/referendum/total/${id}`, params);
  };

  /**
   * 获取公投详情列表
   */
  fetchReferendumDetailsAndTotal$ = () => {
    return this.fetch$(`/referendum/details`).pipe(
      map(data => data.reverse()),
      switchMap(data => {
        return combineLatest(
          data.map(item =>
            this.fetchReferendumTotal$(item.id).pipe(
              map(r => ({
                ...item,
                ...r
              }))
            )
          )
        );
      })
    );
  };

  /**
   * 搜索，返回一个对象
   */
  search = async (input = "") => {
    input = input.trim();
    if (input === "") {
      return { result: `/blocks/您的输入为空` };
    }
    if (isNaN(input) && /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{48,}$/.test(input)) {
      try {
        const address = decodeAddress(input);
        return {
          result: `/accounts/${address}`
        };
      } catch {}
    }
    if (!isNaN(input) && /^\d*$/.test(input)) {
      return {
        result: `/blocks/${input}`
      };
    }
    try {
      const { result: txResult, error: txError } = await this.fetch(`/tx/${hexStripPrefix(input)}`);
      if (txResult && !txError) {
        return {
          result: `/txs/${hexAddPrefix(input)}`
        };
      }
      const { result: blockResult, error: blockError } = await this.fetch(`/block/${hexAddPrefix(input)}`);
      if (blockResult && !blockError) {
        return {
          result: `/blocks/${hexAddPrefix(input)}`
        };
      }

      const { result: accountResult, error: accountError } = await this.fetch(`/account/${hexAddPrefix(input)}/detail`);

      if (accountResult && !accountError) {
        return {
          result: `/accounts/${hexAddPrefix(input)}`
        };
      }

      return {
        error: {
          message: "找不到对应的交易、区块或账号"
        }
      };
    } catch (e) {
      return {
        error: {
          message: "无效的值"
        }
      };
    }
  };
}

export default new Api(getDefaultApi());
