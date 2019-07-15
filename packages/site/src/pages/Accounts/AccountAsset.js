import React, { useState, useEffect } from "react";

import { Table, Amount, TokenName, TokenChain } from "../../components";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function AccountAsset(props) {
  const [nativeList, setNativeList] = useState([]);
  const [crossList, setCrossList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchAccountAssset$(props.accountId).subscribe(data => {
      setNativeList(data.filter(x => x.token === "PCX"));
      setCrossList(data.filter(x => x.token !== "PCX"));
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  const nativeColumns = [
    {
      title: <FormattedMessage id="ASSETNAME" />,
      dataIndex: "token"
    },
    {
      title: <FormattedMessage id="FREEBALANCE" />,
      dataIndex: "free",
      align: "right"
    },
    {
      title: <FormattedMessage id="STAKINGRESERVED" />,
      dataIndex: "reservedStaking",
      align: "right"
    },
    {
      title: <FormattedMessage id="UNFREEZERESERVED" />,
      dataIndex: "reservedStakingRevocation",
      align: "right"
    },
    {
      title: <FormattedMessage id="DEXRESERVED" />,
      dataIndex: "reservedDexSpot",
      align: "right"
    },
    {
      title: <FormattedMessage id="BLOCKTOTALBALANCE" />,
      dataIndex: "total",
      align: "right"
    }
  ];

  const crossColumns = [
    {
      title: <FormattedMessage id="ASSETNAME" />,
      dataIndex: "token"
    },
    {
      title: <FormattedMessage id="CHAINNAME" />,
      dataIndex: "chain",
      align: "right"
    },
    {
      title: <FormattedMessage id="FREEBALANCE" />,
      dataIndex: "free",
      align: "right"
    },
    {
      title: <FormattedMessage id="WITHDRAWALRESERVED" />,
      dataIndex: "reservedWithdrawal",
      align: "right"
    },
    // {
    //   title: <FormattedMessage id="UNFREEZERESERVED" />,
    //   dataIndex: "reservedStakingRevocation",
    //   align: "right"
    // },
    {
      title: <FormattedMessage id="DEXRESERVED" />,
      dataIndex: "reservedDexSpot",
      align: "right"
    },
    {
      title: <FormattedMessage id="BLOCKTOTALBALANCE" />,
      dataIndex: "total",
      align: "right"
    }
  ];

  return (
    <div>
      <div className="asset-title">
        <FormattedMessage id="CHAINX_ASSET" />
      </div>
      <Table
        loading={loading}
        pagination={false}
        dataSource={
          nativeList &&
          nativeList.map(data => {
            return {
              key: data.token,
              token: <TokenName value={data.token} />,
              free: <Amount value={data.Free} symbol={data.token} hideSymbol={true} />,
              reservedStaking: <Amount value={data.ReservedStaking} symbol={data.token} hideSymbol={true} />,
              reservedStakingRevocation: (
                <Amount value={data.ReservedStakingRevocation} symbol={data.token} hideSymbol={true} />
              ),
              reservedDexSpot: <Amount value={data.ReservedDexSpot} symbol={data.token} hideSymbol={true} />,
              reservedWithdrawal: <Amount value={data.ReservedWithdrawal} symbol={data.token} hideSymbol={true} />,
              total: (
                <Amount
                  value={
                    data.Free +
                    data.ReservedStaking +
                    data.ReservedStakingRevocation +
                    data.ReservedDexSpot +
                    data.ReservedWithdrawal
                  }
                  symbol={data.token}
                  hideSymbol={true}
                />
              )
            };
          })
        }
        columns={nativeColumns}
      />
      <div className="asset-title">
        <FormattedMessage id="CROSS_ASSET" />
      </div>
      <Table
        loading={loading}
        pagination={false}
        dataSource={
          crossList &&
          crossList.map(data => {
            return {
              key: data.token,
              chain: <TokenChain value={data.token} />,
              token: <TokenName value={data.token} />,
              free: <Amount value={data.Free} symbol={data.token} hideSymbol={true} />,
              reservedStaking: <Amount value={data.ReservedStaking} symbol={data.token} hideSymbol={true} />,
              reservedStakingRevocation: (
                <Amount value={data.ReservedStakingRevocation} symbol={data.token} hideSymbol={true} />
              ),
              reservedDexSpot: <Amount value={data.ReservedDexSpot} symbol={data.token} hideSymbol={true} />,
              reservedWithdrawal: <Amount value={data.ReservedWithdrawal} symbol={data.token} hideSymbol={true} />,
              total: (
                <Amount
                  value={
                    data.Free +
                    data.ReservedStaking +
                    data.ReservedStakingRevocation +
                    data.ReservedDexSpot +
                    data.ReservedWithdrawal
                  }
                  symbol={data.token}
                  hideSymbol={true}
                />
              )
            };
          })
        }
        columns={crossColumns}
      />
    </div>
  );
}
