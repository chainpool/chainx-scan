import React, { useMemo, useEffect } from "react";

import { Table, AddressLink, ExternalLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";

export default function CrossBind() {
  const [{ tableData }, setState] = useRedux("crossBind", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchBtcBind$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossBind {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderCrossBind({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = tableData;

  return (
    <Table
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.address,
          pcxAddress: <AddressLink value={data.accountid} />,
          btcAddress: <ExternalLink type="btcAddress" value={data.address} />,
          channel: data.channel
        };
      })}
      columns={[
        {
          title: "BTC 地址",
          dataIndex: "btcAddress"
        },
        {
          title: "PCX 地址",
          dataIndex: "pcxAddress"
        },
        {
          title: "渠道",
          dataIndex: "channel"
        }
      ]}
      {...tableProps}
    />
  );
}
