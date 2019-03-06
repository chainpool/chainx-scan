import React from "react";

import { Table } from "../../components";
import { useTableData } from "../../utils";

const Blocks = function Blocks() {
  const [tableData, handleChange] = useTableData("/blocks");

  return (
    <div>
      <Table
        onChange={handleChange}
        pagination={tableData.pagination}
        dataSource={tableData.dataSource.map(data => {
          return {
            key: data.number,
            number: data.number,
            hash: data.hash
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
            dataIndex: "出块人",
            key: "出块人"
          },
          {
            title: "签名数量",
            dataIndex: "signatureNumber",
            key: "signatureNumber"
          },
          {
            title: "交易数",
            dataIndex: "txNumber",
            key: "txNumber"
          },
          {
            title: "最终性",
            dataIndex: "finalise",
            key: "finalise"
          }
        ]}
      />
    </div>
  );
};

export default Blocks;
