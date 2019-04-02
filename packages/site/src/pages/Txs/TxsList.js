import React, { useEffect, useMemo } from "react";

import { AddressLink, BlockLink, DateShow, Number, Spinner, Table, TxAction, TxLink } from "../../components";
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

  if (tableData && tableData.dataSource && tableData.dataSource.length > 0) {
    return <RenderTxsList {...{ tableData, handleChange: tableService.handleChange }} />;
  }

  return <Spinner />;
}

export function RenderTxsList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], simpleMode = false } = { ...tableData, ...tableProps };

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
      title: "交易序号",
      dataIndex: "index"
    },
    {
      title: "交易哈希",
      dataIndex: "hash"
    },
    {
      title: "发送人",
      dataIndex: "signed"
    },
    {
      title: "操作",
      dataIndex: "action"
    }
  ];

  return (
    <Table
      expandedRowRender={data => (
        <div>
          <span>参数：</span>
          <span>{data.args}</span>
        </div>
      )}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.hash,
          number: <BlockLink value={data.number} />,
          index: <Number value={data.index} />,
          hash: <TxLink style={{ width: 136 }} className="text-truncate" value={data.hash} />,
          time: <DateShow value={data.time} />,
          action: <TxAction module={data.module} call={data.call} />,
          args: JSON.stringify(data.args),
          signed: <AddressLink style={{ width: 180 }} className="text-truncate" value={data.signed} />
        };
      })}
      columns={columns}
    />
  );
}
