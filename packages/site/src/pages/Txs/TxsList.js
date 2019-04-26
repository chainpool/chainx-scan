import React, { useEffect, useMemo } from "react";

import { AddressLink, BlockLink, DateShow, NumberFormat, Table, TxAction, TxLink } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function TxsList() {
  const [{ tableData }, setState] = useRedux("txsList", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchTxs$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);
  return <RenderTxsList {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderTxsList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], simpleMode = false, showSigned = true, loading } = {
    ...tableData,
    ...tableProps
  };

  const optionalColumns = [
    {
      title: <FormattedMessage id="HEIGHT" />,
      dataIndex: "number"
    },
    {
      title: <FormattedMessage id="BLOCKTIME" />,
      dataIndex: "time"
    }
  ];
  const columns = [
    ...(simpleMode ? [] : optionalColumns),
    {
      title: <FormattedMessage id="EXTRINSICSNUMBER" />,
      dataIndex: "index"
    },
    {
      title: <FormattedMessage id="TRANSACTIONHASH" />,
      dataIndex: "hash"
    },
    ...(showSigned
      ? [
          {
            title: <FormattedMessage id="SENDER" />,
            dataIndex: "signed"
          }
        ]
      : []),
    {
      title: <FormattedMessage id="ACTION" />,
      dataIndex: "action"
    }
  ];
  return (
    <Table
      loading={loading}
      expandedRowRender={data => (
        <div>
          <span>
            <FormattedMessage id="PARAMETER" />：
          </span>
          <span>{data.args}</span>
        </div>
      )}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.hash,
          number: <BlockLink value={data.number} />,
          index: <NumberFormat value={data.index} />,
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
