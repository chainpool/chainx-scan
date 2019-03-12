import React from "react";

import { Table, TxLink, BlockLink, TxAction, DateShow } from "../../components";
import { useTableData } from "../../common";

export default function Txs(props) {
  const { path, tableProps } = props;
  const [tableData, handleChange] = useTableData(path || "/txs");

  return (
    <Table
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={tableData.dataSource.map(data => {
        return {
          key: data.hash,
          number: <BlockLink value={data.number} />,
          hash: <TxLink style={{ width: 136 }} className="text-truncate" value={data.hash} />,
          time: <DateShow value={data.time} format="HH:mm:ss" />,
          action: <TxAction module={data.module} call={data.call} />
        };
      })}
      columns={[
        {
          title: "区块高度",
          dataIndex: "number",
          key: "number"
        },
        {
          title: "交易哈希",
          dataIndex: "hash",
          key: "hash"
        },
        {
          title: "时间",
          dataIndex: "time",
          key: "time"
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action"
        }
      ]}
      {...tableProps}
    />
  );
}
