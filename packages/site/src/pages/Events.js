import React, { useEffect, useMemo } from "react";

import { DateShow, Link, Phase, Table, TxAction, TxLink } from "../components";
import { useRedux } from "../shared";
import TableService from "../services/tableService";
import api from "../services/api";

export default function Events() {
  const [{ tableData }, setState] = useRedux("events", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchEvents$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderEvents {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderEvents({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], simpleMode = false, loading } = { ...tableData, ...tableProps };

  const optionalColumns = [
    {
      title: "区块高度",
      dataIndex: "number"
    },
    {
      title: "出块时间",
      dataIndex: "time"
    }
  ];
  const columns = [
    ...(simpleMode ? [] : optionalColumns),
    {
      title: "事件序号",
      dataIndex: "index"
    },
    {
      title: "交易哈希",
      dataIndex: "hash"
    },
    {
      title: "阶段",
      dataIndex: "event"
    },
    {
      title: "操作",
      dataIndex: "action"
    }
  ];

  return (
    <Table
      loading={loading}
      expandedRowRender={data => (
        <div>
          <span>事件参数：</span>
          <span>{data.args}</span>
        </div>
      )}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: `${data.number}${data.index}`,
          number: <BlockLink value={data.number} />,
          event: <Phase phase={data.phase && data.phase.option} />,
          index: data.index && data.index,
          phaseValue: data.phase && data.phase.value,
          action: <TxAction module={data.module} call={data.name} />,
          args: JSON.stringify(data.args),
          time: <DateShow value={data["block.time"]} />,
          hash: <TxLink style={{ width: 136 }} className="text-truncate" value={data.transaction_tx} />
        };
      })}
      columns={columns}
      {...tableProps}
    />
  );
}
