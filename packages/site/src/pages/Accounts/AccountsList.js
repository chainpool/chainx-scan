import React from "react";

import { Table, AddressLink, Amount } from "../../components";
import { useTableData } from "../../shared";

export default function Accounts(props) {
  const { path, tableProps } = props;

  const [tableData, handleChange] = useTableData(path || "/accounts");

  return (
    <Table
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={tableData.dataSource.map(data => {
        return {
          key: data.accountid,
          accountid: <AddressLink value={data.accountid} />,
          pcx: <Amount symbol="PCX" value={data.pcx || 0} />,
          btc: <Amount symbol="BTC" value={data.btc || 0} />
        };
      })}
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
      {...tableProps}
    />
  );
}
