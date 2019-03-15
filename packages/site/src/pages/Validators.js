import React from "react";

import { Table, AddressLink, ExternalLink, Amount } from "../components";
import { useTableData } from "../shared";

export default function Validators(props) {
  const { path, tableProps } = props;

  const [tableData, handleChange] = useTableData(path || "/intentions");

  return (
    <Table
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={tableData.dataSource.map(data => {
        return {
          key: `${data.accountid}${data.height}`,
          name: <AddressLink isValidator value={data.accountid} />,
          url: <ExternalLink value={data.url} />,
          address: <AddressLink value={data.accountid} style={{ maxWidth: 136 }} className="text-truncate" />,
          selfVote: <Amount value={data.selfVote} />,
          totalNomination: <Amount value={data.totalNomination} />,
          jackpot: <Amount value={data.jackpot} />
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
        },
        {
          title: "自抵押数",
          dataIndex: "selfVote",
          align: "right"
        },
        {
          title: "总得票数",
          dataIndex: "totalNomination",
          align: "right"
        },
        {
          title: "奖池金额",
          dataIndex: "jackpot",
          align: "right"
        }
      ]}
      {...tableProps}
    />
  );
}
