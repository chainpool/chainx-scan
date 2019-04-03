import React from "react";
import { Table } from "../../components";

export function RenderSettingList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = { ...tableData, ...tableProps };
  const columns = [
    {
      title: "链",
      dataIndex: "chain"
    },
    {
      title: "热公钥",
      dataIndex: "hot_entity"
    },
    {
      title: "冷公钥",
      dataIndex: "cold_entity"
    }
  ];
  return (
    <Table
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: `${data.chain}`,
          chain: data.chain,
          hot_entity: (
            <div className="text-truncate" style={{ maxWidth: 220 }} title={data.hot_entity}>
              {data.hot_entity}
            </div>
          ),
          cold_entity: (
            <div className="text-truncate" style={{ maxWidth: 220 }} title={data.cold_entity}>
              {data.cold_entity}
            </div>
          )
        };
      })}
      columns={columns}
    />
  );
}
