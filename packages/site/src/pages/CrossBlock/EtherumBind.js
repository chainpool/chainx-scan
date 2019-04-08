import React, { useMemo, useEffect } from "react";

import { Table, AddressLink, EtherumLink, Spinner } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";

export default function EtherumBind() {
  const [{ tableData }, setState] = useRedux("etherumBind", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchEtherumBind$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);
  // if (tableData.loading) return <Spinner />;
  return <RenderEtherumBind {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderEtherumBind({ tableProps, tableData, handleChange, loading }) {
  const { pagination, dataSource = [] } = tableData;

  return (
    <Table
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.address,
          address: <EtherumLink value={data.address} />,
          accountid: <AddressLink value={data.accountid} />,
          channel: data.channel
        };
      })}
      columns={[
        {
          title: "Etherum地址",
          dataIndex: "address"
        },
        {
          title: "ChainX发送地址",
          dataIndex: "accountid"
        },
        {
          title: "渠道的节点名称",
          dataIndex: "channel"
        }
      ]}
      {...tableProps}
    />
  );
}
