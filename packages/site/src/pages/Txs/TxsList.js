import React, { useMemo, useEffect } from "react";

import { Table, TxLink, BlockLink, TxAction, DateShow, Number } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function TxsList() {
  const [{ tableData }, setState] = useRedux("txsList", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchTxs$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderTxsList {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderTxsList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = { ...tableData, ...tableProps };

  return (
    <Table
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.hash,
          number: <BlockLink value={data.number} />,
          index: <Number value={data.index} />,
          hash: <TxLink style={{ width: 136 }} className="text-truncate" value={data.hash} />,
          time: <DateShow value={data.time} />,
          action: <TxAction module={data.module} call={data.call} />
        };
      })}
      columns={[
        {
          title: "区块高度",
          dataIndex: "number"
        },
        {
          title: "出块时间",
          dataIndex: "time"
        },
        {
          title: "交易序号",
          dataIndex: "index"
        },
        {
          title: "交易哈希",
          dataIndex: "hash"
        },
        {
          title: "操作",
          dataIndex: "action"
        }
      ]}
    />
  );
}
