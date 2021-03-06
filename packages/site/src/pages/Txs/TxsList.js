import React, { useEffect, useMemo } from "react";

import { FormattedMessage } from "react-intl";

import { AddressLink, BlockLink, DateShow, NumberFormat, Table, TxAction, TxLink } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { ReactComponent as Success } from "../../assets/success.svg";
import { ReactComponent as Error } from "../../assets/error.svg";

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
    },
    {
      title: <FormattedMessage id="RESULT" />,
      dataIndex: "status"
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
          args: JSON.stringify(data.args.reduce((result, c) => Object.assign(result, { [c.name]: c.data }), {})),
          signed: <AddressLink style={{ width: 180 }} className="text-truncate" value={data.signed} />,
          status: {
            ExtrinsicSuccess: (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Success style={{ marginRight: 4, height: "1.2em" }} />
                <FormattedMessage id="ExtrinsicSuccess" />
              </div>
            ),
            ExtrinsicFailed: (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Error style={{ marginRight: 4, height: "1.2em" }} />
                <FormattedMessage id="ExtrinsicFailed" />
              </div>
            )
          }[data.status]
        };
      })}
      columns={columns}
    />
  );
}
