import React, { useMemo, useEffect } from "react";

import { Table, AddressLink } from "../components";
import { useSubject, SubjectState } from "../shared";
import TableService from "../services/tableService";
import api from "../services/api";

const subject = new SubjectState({ tableData: {} });

export default function CrossBind() {
  const [{ tableData }, setState] = useSubject(subject);
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
          key: data.accountid,
          pcxAddress: <AddressLink value={data.accountid} />,
          btcAddress: data.address,
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
