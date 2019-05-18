import React, { useEffect, useMemo, memo } from "react";

import { DateShow, BlockLink, Phase, Table, TxAction, TxLink } from "../components";
import { useRedux, shallowEqual } from "../shared";
import TableService from "../services/tableService";
import api from "../services/api";
import { FormattedMessage } from "react-intl";

export default memo(
  function Events({ tableProps, block }) {
    const [{ tableData }, setState] = useRedux("events", { tableData: { ...tableProps } });
    const tableService = useMemo(() => new TableService(api.fetchEvents$, tableData, { block }), []);
    useEffect(() => {
      const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
      return () => subscription.unsubscribe();
    }, [tableService]);
    return <RenderEvents {...{ tableData, handleChange: tableService.handleChange, tableProps }} />;
  },
  (pre, cre) => {
    return shallowEqual(pre.block, cre.block);
  }
);

export function RenderEvents({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], simpleMode = false, loading } = { ...tableProps, ...tableData };
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
      title: <FormattedMessage id="EVENTNUMBER" />,
      dataIndex: "index"
    },
    {
      title: <FormattedMessage id="TRANSACTIONHASH" />,
      dataIndex: "hash"
    },
    {
      title: <FormattedMessage id="PHRASE" />,
      dataIndex: "event"
    },
    {
      title: <FormattedMessage id="CATEGORY" />,
      dataIndex: "action"
    }
  ];
  return (
    <Table
      loading={loading}
      expandedRowRender={data => (
        <div>
          <span>
            <FormattedMessage id="CATEGORY" />：
          </span>
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
    />
  );
}
