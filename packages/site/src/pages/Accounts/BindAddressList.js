import React, { useEffect, useState } from "react";
import api from "@src/services/api";
import { Table } from "@src/components";

export default function BindAddressList(props) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchAccountBindAddresses$(props.accountId).subscribe(data => {
      setLoading(false);
      setTableData(data);
    });
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={
        tableData &&
        tableData.map(data => {
          return {
            key: data.address,
            chain: data.chain,
            address: data.address,
            channel: data.channel
          };
        })
      }
      columns={[
        {
          title: "链",
          dataIndex: "chain"
        },
        {
          title: "地址",
          dataIndex: "address"
        },
        {
          title: "渠道的节点名称",
          dataIndex: "channel"
        }
      ]}
    />
  );
}
