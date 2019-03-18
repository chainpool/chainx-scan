import io from "socket.io-client";
import { from, throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

export default {
  endpoint: process.env.REACT_APP_SERVER,
  socket: null,
  setApiProvider(endpoint) {
    this.endpoint = endpoint;
  },
  fetch(path, params = {}, options) {
    const paramsKeyConvert = (str = "") => str.replace(/[A-Z]/g, ([s]) => `_${s.toLowerCase()}`);
    const url = new URL(path, this.endpoint);
    for (const key of Object.keys(params)) {
      url.searchParams.set(paramsKeyConvert(key), params[key]);
    }
    return from(window.fetch(url, options).then(response => response.json())).pipe(
      catchError(err => {
        // @todo 全局的错误上报处理
        return throwError(err);
      })
    );
  },
  createObservable(name, eventName) {
    if (!this.socket) {
      this.socket = io(process.env.REACT_APP_SERVER);
    }
    if (!this.socket.disconnected) {
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
  },
  /**
   * 获取账户详情
   */
  fetchAccountDetail$(accountId) {
    return this.fetch(`/account/${accountId}/detail`);
  },
  /**
   * 获取账户跨链资产列表
   */
  fetchAccountBalance$(accountId) {
    return this.fetch(`/account/${accountId}/balance`);
  },
  /**
   * 获取最新的块头列表
   */
  fetchLatestBlocks$() {
    return this.createObservable("LATEST_BLOCKS_ROOM", "latestBlocks");
  },
  /**
   * 获取最新的交易列表
   */
  fetchLatestTxs$() {
    return this.createObservable("LATEST_TRANSACTIONS_ROOM", "latestTxs");
  },
  /**
   * 获取最新的链的状态
   */
  fetchChainStatus$() {
    return this.createObservable("CHAIN_STATUS", "chainStatus");
  }
};
