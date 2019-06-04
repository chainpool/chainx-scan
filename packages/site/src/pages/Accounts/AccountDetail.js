import React, { useEffect, useState } from "react";
import classnames from "classnames";

import api from "../../services/api";
import {
  AddressLink,
  Breadcrumb,
  ExternalLink,
  NumberFormat,
  PanelList,
  AntSpinner as Spinner,
  NoData
} from "../../components";
import AccountAsset from "./AccountAsset";
import AccountNomination from "./AccountNomination";
import AccountOrder from "./AccountOrder";
import AccountTrade from "./AccountTrade";
import BindAddressList from "./BindAddressList";
import FillOrderList from "./FillOrderList";
import AccountTransfer from "./AccountTransfer";
import { FormattedMessage } from "react-intl";

export default function Account(props) {
  const { match } = props;
  const {
    params: { accountId }
  } = match;

  const [detail, setDetail] = useState({});
  const [activeKey, setActiveKey] = useState("nativeAsset");

  useEffect(() => {
    const subscription = api.fetchAccountDetail$(accountId).subscribe(data => setDetail(data), data => setDetail(data));
    return () => subscription.unsubscribe();
  }, [accountId]);

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: "/accounts", label: <FormattedMessage id="ACCOUNTS" /> },
        { label: <FormattedMessage id="ACCOUNTDETAILS" /> }
      ]}
    />
  );
  if (!detail.code && !detail.accountId) {
    return (
      <>
        {breadcrumb}
        <div style={{ paddingTop: "30%" }}>
          <Spinner />
        </div>
      </>
    );
  } else if (!!detail.code) {
    return <NoData id={accountId} />;
  }
  return (
    <>
      {breadcrumb}
      <PanelList
        dataSource={[
          {
            label: <FormattedMessage id="ACCOUNTADDRESS" />,
            data: <AddressLink value={detail.accountId} />
          },
          {
            label: <FormattedMessage id="PUBLICKEY" />,
            data: detail.accountId
          },
          {
            label: <FormattedMessage id="TRANSACTIONCOUNT" />,
            data: <NumberFormat value={detail.txCount} />
          },
          {
            label: (
              <>
                BTC
                <FormattedMessage id="DEPOSITADDRESS" />
              </>
            ),
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
              <a>
                ChainX <FormattedMessage id="ASSETS" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("crossAsset")}
              className={classnames({ "is-active": activeKey === "crossAsset" })}
            >
              <a>
                <FormattedMessage id="CROSSCHAINASSETS" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("transfer")}
              className={classnames({ "is-active": activeKey === "transfer" })}
            >
              <a>
                <FormattedMessage id="TRANSFERS" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("nomination")}
              className={classnames({ "is-active": activeKey === "nomination" })}
            >
              <a>
                <FormattedMessage id="NOMINATIONS" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("orderList")}
              className={classnames({ "is-active": activeKey === "orderList" })}
            >
              <a>
                <FormattedMessage id="OPENORDERS" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("fillOrderList")}
              className={classnames({ "is-active": activeKey === "fillOrderList" })}
            >
              <a>
                <FormattedMessage id="ORDERHISTORY" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("accountTrade")}
              className={classnames({ "is-active": activeKey === "accountTrade" })}
            >
              <a>
                <FormattedMessage id="EXTRINSICS" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("bindAddresses")}
              className={classnames({ "is-active": activeKey === "bindAddresses" })}
            >
              <a>
                <FormattedMessage id="BINDEDADDRESSES" />
              </a>
            </li>
          </ul>
        </div>
        {detail && detail.accountId && activeKey === "nativeAsset" && (
          <AccountAsset accountId={detail.accountId} isNative={true} />
        )}
        {detail && detail.accountId && activeKey === "crossAsset" && (
          <AccountAsset accountId={detail.accountId} isNative={false} />
        )}
        {detail && detail.accountId && activeKey === "transfer" && <AccountTransfer accountId={detail.accountId} />}
        {detail && detail.accountId && activeKey === "nomination" && <AccountNomination accountId={detail.accountId} />}
        {detail && detail.accountId && activeKey === "orderList" && <AccountOrder accountId={detail.accountId} />}
        {detail && detail.accountId && activeKey === "accountTrade" && <AccountTrade accountId={detail.accountId} />}
        {detail && detail.accountId && activeKey === "fillOrderList" && <FillOrderList accountId={detail.accountId} />}
        {detail && detail.accountId && activeKey === "bindAddresses" && (
          <BindAddressList accountId={detail.accountId} />
        )}
      </div>
    </>
  );
}
