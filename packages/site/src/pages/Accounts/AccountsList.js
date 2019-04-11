import React, { useEffect, useMemo } from "react";

import { AddressLink, Amount, NumberFormat, Table } from "../../components";
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
      loading={tableData.loading}
      onChange={tableService.handleChange}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map(data => {
          return {
            key: data.accountid,
            accountid: <AddressLink style={{ maxWidth: 300 }} className="text-truncate" value={data.accountid} />,
            pcxFree: <Amount symbol="PCX" value={data.pcx_free || 0} hideSymbol />,
            pcx: <Amount symbol="PCX" value={data.pcx || 0} hideSymbol />,
            btc: <Amount symbol="BTC" value={data.btc || 0} hideSymbol />,
            sdot: <Amount symbol="SDOT" value={data.sdot || 0} hideSymbol />,
            nonce: <NumberFormat value={data.nonce} />
          };
        })
      }
      columns={[
        {
          title: "账户地址",
          dataIndex: "accountid"
        },
        {
          title: "PCX可用余额",
          dataIndex: "pcxFree",
          align: "right"
        },
        {
          title: "PCX总余额",
          dataIndex: "pcx",
          align: "right"
        },
        {
          title: "BTC总余额",
          dataIndex: "btc",
          align: "right"
        },
        {
          title: "SDOT总余额",
          dataIndex: "sdot",
          align: "right"
        },
        {
          title: "交易数",
          dataIndex: "nonce",
          align: "right"
        }
      ]}
    />
  );
}
