import io from "socket.io-client";
import { from, throwError, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { hexAddPrefix, hexStripPrefix } from "@polkadot/util";

import { decodeAddress } from "../shared";

class Api {
  endpoint = null;
  socket = null;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetch = (path, params = {}, options) => {
    const paramsKeyConvert = (str = "") => str.replace(/[A-Z]/g, ([s]) => `_${s.toLowerCase()}`);
    const url = new URL(path, this.endpoint);
    for (const key of Object.keys(params)) {
      url.searchParams.set(paramsKeyConvert(key), params[key]);
    }
    return window.fetch(url, options).then(response => response.json());
  };

  fetch$ = (path, params = {}, options) => {
    return from(this.fetch(path, params, options)).pipe(
      catchError(err => {
        // @todo 全局的错误上报处理
        return throwError(err);
      })
    );
  };

  createObservable = (name, eventName) => {
    if (!this.socket) {
      this.socket = io(process.env.REACT_APP_SERVER);
    }
    if (this.socket.disconnected) {
      this.socket.connect();
    }
    return new Observable(observer => {
      this.socket.emit("subscribe", name);
      this.socket.on(eventName, data => {
        observer.next(data);
      });
      return () => {
        this.socket.removeListener(eventName);
        this.socket.emit("unsubscribe", name);
      };
    });
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
  fetchValidatorDetail$ = nodeId => {
    return this.fetch$(`/intention/${nodeId}`);
  };

  /**
   * 获取投票用户列表
   */
  fetchNominations$ = nodeId => {
    return this.fetch$(`/intention/${nodeId}/nominations`);
  };

  /**
   * 获取信托设置列表
   */
  fetchTrusteeSettingList$ = nodeId => {
    return this.fetch$(`/intention/${nodeId}/settings`);
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
  fetchIntentions$ = (params, options) => {
    return this.fetch$(`/intentions`, params, options).pipe(
      map(result => {
        if (typeof params.tabFilter === "string") {
          result.items = result.items.filter(item => item.isTrustee.indexOf(params.tabFilter) >= 0);
          result.total = result.items.length;
        } else if (params.tabFilter === 1) {
          result.items = result.items.filter(item => !item.isValidator);
          result.total = result.items.length;
        }
        return result;
      })
    );
  };

  /**
   * 获取区块列表
   */
  fetchBlocks$ = (params, options) => {
    return this.fetch$(`/blocks`, params, options);
  };

  /**
   * 获取交易列表
   */
  fetchTxs$ = (params, options) => {
    return this.fetch$(`/txs`, params, options);
  };

  /**
   * 获取事件列表
   */
  fetchEvents$ = (params, options) => {
    return this.fetch$(`/events`, params, options);
  };

  /**
   * 获取账号列表
   */
  fetchAccounts$ = (params, options) => {
    return this.fetch$(`/accounts`, params, options);
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
   * 获取账户资产列表
   */
  fetchAccountAssset$ = (accountId, params) => {
    return this.fetch$(`/account/${hexAddPrefix(accountId)}/balance`, params);
  };

  /**
   * 获取账户投票列表
   */
  fetchAccountNominations$ = (accountId, params) => {
    return this.fetch$(`/intention/${hexAddPrefix(accountId)}/nominations`, params);
  };

  /**
   * 获取账户挂单列表
   */
  fetchAccountOrders$ = (accountId, params) => {
    return this.fetch$(`/trade/userorders/${hexStripPrefix(accountId)}`, params);
  };

  /**
   * 获取账户成交列表
   */
  fetchAccountFillOrders$ = (accountId, params) => {
    return this.fetch$(`/account/${hexStripPrefix(accountId)}/fill_orders`, params);
  };

  /**
   * 获取账户交易列表
   */
  fetchAccountTxs$ = (accountId, params) => {
    return this.fetch$(`/account/${hexStripPrefix(accountId)}/txs`, params);
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

  /**
   * 获取挂单列表
   */
  fetchHandicap$ = (pairid, params) => {
    return this.fetch$(`/trade/handicap/${pairid}`, params);
  };

  /**
   * 搜索，返回一个对象
   */
  search = async (input = "") => {
    input = input.trim();
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
      const txResult = await this.fetch(`/tx/${hexStripPrefix(input)}`);
      if (txResult && !txResult.error) {
        return {
          result: `/txs/${hexAddPrefix(input)}`
        };
      }
      const blockResult = await this.fetch(`/block/${hexAddPrefix(input)}`);
      if (blockResult && !blockResult.error) {
        return {
          result: `/blocks/${hexAddPrefix(input)}`
        };
      }

      const accountResult = await this.fetch(`/account/${hexAddPrefix(input)}/detail`);

      if (accountResult && !accountResult.error) {
        return {
          result: `/accounts/${hexAddPrefix(input)}`
        };
      }

      return {
        error: {
          message: "找不到对应的交易、区块或账号"
        }
      };
    } catch {
      return {
        error: {
          message: "无效的值"
        }
      };
    }
  };
}

export default new Api(process.env.REACT_APP_SERVER);
