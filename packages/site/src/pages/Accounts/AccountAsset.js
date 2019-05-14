import React, { useState, useEffect } from "react";

import { Table, Amount, TokenName } from "../../components";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function AccountAsset(props) {
  const [list, setList] = useState([]);
  const isNative = props.isNative;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const subscription = api.fetchAccountAssset$(props.accountId, { native: isNative }).subscribe(data => {
      setList(data);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [props.accountId, isNative]);

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
      title: <FormattedMessage id="FREEBALANCE" />,
      dataIndex: "free",
      align: "right"
    },
    {
      title: <FormattedMessage id="WITHDRAWALRESERVED" />,
      dataIndex: "reservedWithdrawal",
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

  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={
        list &&
        list.map(data => {
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
      columns={isNative ? nativeColumns : crossColumns}
    />
  );
}
