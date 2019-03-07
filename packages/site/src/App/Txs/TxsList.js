import React from "react";

import { Table } from "../../components";
import { useTableData } from "../../common";

export default function Txs() {
  const [tableData, handleChange] = useTableData("/txs");

  return (
    <div>
      <Table
        onChange={handleChange}
        pagination={tableData.pagination}
        dataSource={tableData.dataSource.map((data, index) => {
          return {
            key: index,
            data: data.data
          };
        })}
        columns={[
          {
            title: "交易哈希",
            dataIndex: "data",
            key: "data"
          },
          {
            title: "发起地址",
            dataIndex: "发起地址",
            key: "发起地址"
          },
          {
            title: "交易类型",
            dataIndex: "交易类型",
            key: "交易类型"
          },
          {
            title: "金额",
            dataIndex: "金额",
            key: "金额"
          },
          {
            title: "块哈希",
            dataIndex: "块哈希",
            key: "块哈希"
          },
          {
            title: "交易时间",
            dataIndex: "交易时间",
            key: "交易时间"
          },
          {
            title: "中继人",
            dataIndex: "中继人",
            key: "中继人"
          },
          {
            title: "中继提交时间",
            dataIndex: "中继提交时间",
            key: "中继提交时间"
          },
          {
            title: "OP_RETURN",
            dataIndex: "OP_RETURN",
            key: "OP_RETURN"
          }
        ]}
      />
    </div>
  );
}
