import React, { useMemo, useEffect } from "react";

import { Table, AddressLink, Amount } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function AccountsList() {
  const [{ tableData }, setState] = useRedux("accountsList", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchAccounts$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return (
    <Table
      onChange={tableService.handleChange}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map(data => {
          return {
            key: data.accountid,
            accountid: <AddressLink value={data.accountid} />,
            pcx: <Amount symbol="PCX" value={data.pcx || 0} />,
            btc: <Amount symbol="BTC" value={data.btc || 0} />
          };
        })
      }
      columns={[
        {
          title: "账户地址",
          dataIndex: "accountid"
        },
        {
          title: "PCX 总余额",
          dataIndex: "pcx",
          align: "right"
        },
        {
          title: "BTC 总余额",
          dataIndex: "btc",
          align: "right"
        }
      ]}
    />
  );
}
