import React, { useEffect, useState } from "react";
import classnames from "classnames";

import api from "../../services/api";
import { AddressLink, Breadcrumb, ExternalLink, Number, PanelList, Spinner } from "../../components";
import AccountAsset from "./AccountAsset";
import AccountNomination from "./AccountNomination";
import AccountOrder from "./AccountOrder";
import AccountTrade from "./AccountTrade";
import BindAddressList from "./BindAddressList";

export default function Account(props) {
  const { match } = props;
  const {
    params: { accountId }
  } = match;

  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("nativeAsset");

  useEffect(() => {
    setLoading(true);
    const subscription = api.fetchAccountDetail$(accountId).subscribe(data => {
      setDetail(data);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [accountId]);

  const breadcrumb = <Breadcrumb dataSource={[{ to: "/accounts", label: "账户列表" }, { label: "账户详情" }]} />;

  if (loading) {
    return (
      <>
        {breadcrumb}
        <div style={{ paddingTop: "30%" }}>
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      {breadcrumb}
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
            data: (
              <>
                {detail.btcAddresses &&
                  detail.btcAddresses.map((address, index) => (
                    <div key={index}>
                      <ExternalLink type="btcAddress" value={address} />
                    </div>
                  ))}
              </>
            )
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
              <a>当前委托列表</a>
            </li>
            <li
              onClick={() => setActiveKey("accountTrade")}
              className={classnames({ "is-active": activeKey === "accountTrade" })}
            >
              <a>交易列表</a>
            </li>
            <li
              onClick={() => setActiveKey("bindAddresses")}
              className={classnames({ "is-active": activeKey === "bindAddresses" })}
            >
              <a>地址绑定列表</a>
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
        {detail && detail.accountId && activeKey === "accountTrade" && <AccountTrade accountId={detail.accountId} />}
        {detail && detail.accountId && activeKey === "bindAddresses" && (
          <BindAddressList accountId={detail.accountId} />
        )}
      </div>
    </>
  );
}
