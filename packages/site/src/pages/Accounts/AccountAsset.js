import React, { useState, useEffect } from "react";

import { Table, Amount, TokenName } from "../../components";
import api from "../../services/api";

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
      title: "资产名称",
      dataIndex: "token"
    },
    {
      title: "可用余额",
      dataIndex: "free",
      align: "right"
    },
    {
      title: "投票冻结",
      dataIndex: "reservedStaking",
      align: "right"
    },
    {
      title: "赎回冻结",
      dataIndex: "reservedStakingRevocation",
      align: "right"
    },
    {
      title: "交易冻结",
      dataIndex: "reservedDexSpot",
      align: "right"
    },
    {
      title: "总余额",
      dataIndex: "total",
      align: "right"
    }
  ];

  const crossColumns = [
    {
      title: "资产名称",
      dataIndex: "token"
    },
    {
      title: "可用余额",
      dataIndex: "free",
      align: "right"
    },
    {
      title: "提现冻结",
      dataIndex: "reservedWithdrawal",
      align: "right"
    },
    {
      title: "赎回冻结",
      dataIndex: "reservedStakingRevocation",
      align: "right"
    },
    {
      title: "交易冻结",
      dataIndex: "reservedDexSpot",
      align: "right"
    },
    {
      title: "总余额",
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
