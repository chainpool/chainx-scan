import React from "react";

import { Table, BlockLink, TxAction } from "../components";
import { useTableData } from "../common";

export default function Txs(props) {
  const { path, tableProps } = props;

  const [tableData, handleChange] = useTableData(path || "/events");

  return (
    <Table
      expandedRowRender={data => data.args}
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={tableData.dataSource.map(data => {
        return {
          key: `${data.number}${data.index}`,
          number: <BlockLink value={data.number} />,
          phase: data.phase && data.phase.value,
          index: data.index && data.index,
          phaseOption: data.phase && data.phase.option,
          action: <TxAction module={data.module} call={data.name} />,
          args: JSON.stringify(data.args)
        };
      })}
      columns={[
        {
          title: "区块高度",
          dataIndex: "number",
          key: "number"
        },
        {
          title: "阶段",
          dataIndex: "phase",
          key: "phase"
        },
        {
          title: "交易状态",
          dataIndex: "phaseOption",
          key: "phaseOption"
        },
        {
          title: "事件序号",
          dataIndex: "index",
          key: "index"
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
