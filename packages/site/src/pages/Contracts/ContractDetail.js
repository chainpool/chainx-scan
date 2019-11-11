import React, { useEffect, useState } from "react";

import api from "../../services/api";
import { AddressLink, Breadcrumb, BlockLink, PanelList, AntSpinner as Spinner } from "../../components";
import { encodeAddress } from "../../shared";
import ContractTx from "./ContractTx";
import { FormattedMessage } from "react-intl";

export default function ContractDetail(props) {
  const { match } = props;
  const {
    params: { accountId }
  } = match;

  const [detail, setDetail] = useState({});

  useEffect(() => {
    const subscription = api
      .fetchContractDetail$(accountId)
      .subscribe(data => setDetail(data), data => setDetail(data));
    return () => subscription.unsubscribe();
  }, [accountId]);

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: "/contracts", label: <FormattedMessage id="智能合约列表" /> },
        { label: <FormattedMessage id="智能合约详情" /> }
      ]}
    />
  );

  if (!detail.account) {
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
            label: <FormattedMessage id="合约地址" />,
            data: encodeAddress(`0x${detail.contract}`)
          },
          {
            label: <FormattedMessage id="代码哈希" />,
            data: `0x${detail.code_hash}`
          },
          {
            label: <FormattedMessage id="区块高度" />,
            data: <BlockLink value={detail.height} />
          },
          {
            label: <FormattedMessage id="部署账户" />,
            data: <AddressLink value={detail.account} />
          },
          {
            label: <FormattedMessage id="ABI" />,
            data: detail.abi
          }
        ]}
      />
      <div className="box">
        <ContractTx accountId={accountId} />
      </div>
    </>
  );
}
