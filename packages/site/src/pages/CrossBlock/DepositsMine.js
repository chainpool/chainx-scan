import React, { useEffect } from "react";

import { Table, Amount } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function DepositsMine() {
  const [{ dataSource, loading }, setState] = useRedux("depositsMine", { dataSource: [], loading: true });
  // const tableService = useMemo(() => new TableService(api.fetchDepositsMine$, tableData), []);

  useEffect(() => {
    const subscription = api.fetchDepositsMine$().subscribe(data => {
      setState({ dataSource: data, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);

  return <RenderDepositsMine {...{ dataSource, loading }} />;
}

export function RenderDepositsMine({ dataSource, loading }) {
  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={dataSource.map(data => {
        return {
          key: data.address,
          id: data.id,
          circulation: <Amount value={data.circulation} symbol={data.id} hideSymbol />,
          power: <Amount value={data.power} hideSymbol />,
          jackpot: <Amount value={data.jackpot} hideSymbol />,
          lastTotalDepositWeightUpdate: data.lastTotalDepositWeightUpdate,
          lastTotalDepositWeight: <Amount value={data.lastTotalDepositWeight} hideSymbol />
        };
      })}
      columns={[
        {
          title: "资产种类",
          dataIndex: "id"
        },
        {
          title: "全链总余额",
          dataIndex: "circulation"
        },
        {
          title: "挖矿算力(PCX)",
          dataIndex: "power"
        },
        {
          title: "折合投票数(PCX)",
          dataIndex: ""
        },
        {
          title: "奖池金额(PCX)",
          dataIndex: "jackpot"
        },
        {
          title: "奖池更新高度",
          dataIndex: "lastTotalDepositWeightUpdate"
        },
        {
          title: "历史总票龄",
          dataIndex: "lastTotalDepositWeight"
        }
      ]}
    />
  );
}
