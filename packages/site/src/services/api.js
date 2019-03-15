import { from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export default {
  endpoint: process.env.REACT_APP_SERVER,
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
  }
};
