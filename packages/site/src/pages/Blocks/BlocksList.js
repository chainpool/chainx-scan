import React, { useEffect } from "react";

import { Table, BlockLink, AddressLink, DateShow, Number } from "../../components";
import { useTable, useSubject, SubjectState } from "../../shared";
import api from "../../services/api";

const subject = new SubjectState({ tableData: {} });

export default function BlocksList() {
  const [{ tableData }, setState] = useSubject(subject);

  const [tableData$, handleChange] = useTable(tableData, (...args) => api.fetchBlocks$(...args));

  useEffect(() => {
    const subscription = tableData$.subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableData$]);

  return (
    <Table
      onChange={handleChange}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map(data => {
          return {
            key: data.number,
            number: <BlockLink value={data.number} />,
            hash: <BlockLink style={{ width: 138 }} className="text-truncate" value={data.hash} />,
            time: <DateShow value={data.time} />,
            producer: <AddressLink isValidator value={data.producer} />,
            extrinsics: <Number value={data.extrinsics} />
          };
        })
      }
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
