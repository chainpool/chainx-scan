import React from "react";

import { Table, BlockLink, TxAction } from "../components";
import { useTableData } from "../shared";

export default function Txs(props) {
  const { path, tableProps } = props;

  const [tableData, handleChange] = useTableData(path || "/events");

  return (
    <Table
      expandedRowRender={data => (
        <div>
          <span>交易参数：</span>
          <span>{data.args}</span>
        </div>
      )}
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={tableData.dataSource.map(data => {
        return {
          key: `${data.number}${data.index}`,
          number: <BlockLink value={data.number} />,
          event: data.phase && data.phase.option,
          index: data.index && data.index,
          phaseValue: data.phase && data.phase.value,
          action: <TxAction module={data.module} call={data.name} />,
          args: JSON.stringify(data.args)
        };
      })}
      columns={[
        {
          title: "区块高度",
          dataIndex: "number"
        },
        {
          title: "阶段",
          dataIndex: "event"
        },
        {
          title: "交易序号",
          dataIndex: "phaseValue"
        },
        {
          title: "事件序号",
          dataIndex: "index"
        },
        {
          title: "操作",
          dataIndex: "action"
        }
      ]}
      {...tableProps}
    />
  );
}
