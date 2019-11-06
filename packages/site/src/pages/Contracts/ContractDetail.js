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
import { FormattedMessage } from "react-intl";

export default function ContractDetail(props) {
  const { match } = props;
  const {
    params: { accountId }
  } = match;

  const [detail, setDetail] = useState({});
  const [activeKey, setActiveKey] = useState("assets");

  useEffect(() => {
    const subscription = api.fetchAccountDetail$(accountId).subscribe(data => setDetail(data), data => setDetail(data));
    return () => subscription.unsubscribe();
  }, [accountId]);

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: "/accounts", label: <FormattedMessage id="智能合约列表" /> },
        { label: <FormattedMessage id="智能合约详情" /> }
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
            <li onClick={() => setActiveKey("assets")} className={classnames({ "is-active": activeKey === "assets" })}>
              <a>
                <FormattedMessage id="ASSETS" />
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
                <FormattedMessage id="ACCOUNT_DETAIL_EXTRINSIC" />
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
            <li
              onClick={() => setActiveKey("accountCrossDeposit")}
              className={classnames({ "is-active": activeKey === "accountCrossDeposit" })}
            >
              <a>
                <FormattedMessage id="DEPOSITELIST" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("btcLockAddr")}
              className={classnames({ "is-active": activeKey === "btcLockAddr" })}
            >
              <a>
                <FormattedMessage id="btclockList" />
              </a>
            </li>
            <li
              onClick={() => setActiveKey("accountCrossWithdrawals")}
              className={classnames({ "is-active": activeKey === "accountCrossWithdrawals" })}
            >
              <a>
                <FormattedMessage id="WITHDRAWALS" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
