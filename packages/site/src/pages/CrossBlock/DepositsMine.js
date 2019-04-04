import React, { useMemo, useEffect } from "react";

import { Table } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";

export default function DepositsMine() {
  const [{ tableData }, setState] = useRedux("depositsMine", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchDepositsMine$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderDepositsMine {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderDepositsMine({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = tableData;

  return (
    <Table
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.address,
          id: data.id,
          circulation: data.circulation,
          power: data.power,
          jackpot: data.jackpot,
          lastTotalDepositWeightUpdate: data.lastTotalDepositWeightUpdate,
          lastTotalDepositWeight: data.lastTotalDepositWeight
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
          title: "挖矿算力",
          dataIndex: "power"
        },
        {
          title: "折合投票数",
          dataIndex: ""
        },
        {
          title: "奖池金额",
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
      {...tableProps}
    />
  );
}
