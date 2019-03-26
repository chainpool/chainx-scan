import React, { useMemo, useEffect } from "react";

import { Table, BlockLink, TxAction } from "../components";
import { useSubject, SubjectState } from "../shared";
import TableService from "../services/tableService";
import api from "../services/api";

const subject = new SubjectState({ tableData: {} });

export default function Events() {
  const [{ tableData }, setState] = useSubject(subject);
  const tableService = useMemo(() => new TableService(api.fetchEvents$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderEvents {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderEvents({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = tableData;

  return (
    <Table
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
