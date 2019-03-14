import React from "react";

import { useTableData } from "../../common";
import { Table, BlockLink, AddressLink, DateShow, Number } from "../../components";

export default function BlocksList() {
  const [tableData, handleChange] = useTableData("/blocks");

  return (
    <Table
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={tableData.dataSource.map(data => {
        return {
          key: data.number,
          number: <BlockLink value={data.number} />,
          hash: <BlockLink style={{ width: 138 }} className="text-truncate" value={data.hash} />,
          time: <DateShow value={data.time} />,
          producer: <AddressLink isValidator style={{ width: 136 }} className="text-truncate" value={data.producer} />,
          extrinsics: <Number value={data.extrinsics} />
        };
      })}
      columns={[
        {
          title: "区块高度",
          dataIndex: "number"
        },
        {
          title: "区块哈希",
          dataIndex: "hash"
        },
        {
          title: "时间",
          dataIndex: "time"
        },
        {
          title: "验证人",
          dataIndex: "producer"
        },
        {
          title: "交易数",
          dataIndex: "extrinsics"
        }
      ]}
    />
  );
}
