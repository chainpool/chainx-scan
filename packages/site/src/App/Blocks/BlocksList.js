import React from "react";

import { useTableData } from "../../common";
import { Table, BlockLink, AddressLink, DateShow } from "../../components";

export default function BlocksList() {
  const [tableData, handleChange] = useTableData("/blocks");

  return (
    <div>
      <Table
        onChange={handleChange}
        pagination={tableData.pagination}
        dataSource={tableData.dataSource.map(data => {
          return {
            key: data.number,
            number: <BlockLink value={data.number} />,
            hash: <BlockLink style={{ width: 136 }} className="text-truncate" value={data.hash} />,
            time: <DateShow value={data.time} format="HH:mm:ss" />,
            producer: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.producer} />,
            extrinsics: data.extrinsics
          };
        })}
        columns={[
          {
            title: "区块高度",
            dataIndex: "number",
            key: "number"
          },
          {
            title: "区块哈希",
            dataIndex: "hash",
            key: "hash"
          },
          {
            title: "时间",
            dataIndex: "time",
            key: "time"
          },
          {
            title: "出块人",
            dataIndex: "producer",
            key: "producer"
          },
          {
            title: "交易数",
            dataIndex: "extrinsics",
            key: "extrinsics"
          }
        ]}
      />
    </div>
  );
}
