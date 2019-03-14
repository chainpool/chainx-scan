import React from "react";

import { Table, AddressLink, ExternalLink } from "../components";
import { useTableData } from "../common";

export default function Validators(props) {
  const { path, tableProps } = props;

  const [tableData, handleChange] = useTableData(path || "/intentions");

  return (
    <Table
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={tableData.dataSource.map(data => {
        return {
          key: data.name,
          name: <AddressLink isValidator value={data.profile.accountid} />,
          url: <ExternalLink value={data.profile.url} />,
          address: <AddressLink value={data.profile.accountid} />
        };
      })}
      columns={[
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "网址",
          dataIndex: "url"
        },
        {
          title: "账户地址",
          dataIndex: "address"
        }
      ]}
      {...tableProps}
    />
  );
}
