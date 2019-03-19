import React, { useState, useEffect } from "react";
import classnames from "classnames";

import api from "../../services/api";
import { PanelList, AddressLink, Number } from "../../components";
import AccountAsset from "./AccountAsset";
import AccountNomination from "./AccountNomination";
import AccountOrder from "./AccountOrder";

export default function Account(props) {
  const { match } = props;
  const {
    params: { accountId }
  } = match;

  const [detail, setDetail] = useState({});
  const [activeKey, setActiveKey] = useState("nativeAsset");

  useEffect(() => {
    const subscription = api.fetchAccountDetail$(accountId).subscribe(data => setDetail(data));
    return () => subscription.unsubscribe();
  }, [accountId]);

  return (
    <div>
      <h4 className="title is-size-5">账户详情</h4>
      <PanelList
        dataSource={[
          {
            label: "账户地址",
            data: <AddressLink value={detail.accountId} />
          },
          {
            label: "账户交易数",
            data: <Number value={detail.txCount} />
          },
          {
            label: "BTC 充值地址",
            data: detail.btcAddress
          }
        ]}
      />
      <div className="box">
        <div className="tabs">
          <ul>
            <li
              onClick={() => setActiveKey("nativeAsset")}
              className={classnames({ "is-active": activeKey === "nativeAsset" })}
            >
              <a>ChainX 资产列表</a>
            </li>
            <li
              onClick={() => setActiveKey("crossAsset")}
              className={classnames({ "is-active": activeKey === "crossAsset" })}
            >
              <a>跨链资产列表</a>
            </li>
            <li
              onClick={() => setActiveKey("nomination")}
              className={classnames({ "is-active": activeKey === "nomination" })}
            >
              <a>投票列表</a>
            </li>
            <li
              onClick={() => setActiveKey("orderList")}
              className={classnames({ "is-active": activeKey === "orderList" })}
            >
              <a>挂单列表</a>
            </li>
            <li onClick={() => setActiveKey("events")} className={classnames({ "is-active": activeKey === "events" })}>
              <a>交易列表</a>
            </li>
          </ul>
        </div>
        {detail && detail.accountId && activeKey === "nativeAsset" && (
          <AccountAsset accountId={detail.accountId} isNative={true} />
        )}
        {detail && detail.accountId && activeKey === "crossAsset" && (
          <AccountAsset accountId={detail.accountId} isNative={false} />
        )}
        {detail && detail.accountId && activeKey === "nomination" && <AccountNomination accountId={detail.accountId} />}
        {detail && detail.accountId && activeKey === "orderList" && <AccountOrder accountId={detail.accountId} />}
      </div>
    </div>
  );
}
