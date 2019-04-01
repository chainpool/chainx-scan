import React, { useEffect, useMemo } from "react";

import { Spinner, Table, BlockLink, AddressLink, DateShow, Number } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";
import TableService from "../../services/tableService";

export default function BlocksList() {
  const [{ tableData }, setState] = useRedux("blocksList", { tableData: {} });

  const tableService = useMemo(() => new TableService(api.fetchBlocks$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  if (!tableData || !tableData.dataSource || tableData.dataSource.length <= 0) {
    return <Spinner />;
  }

  return (
    <Table
      onChange={tableService.handleChange}
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
            extrinsics: <Number value={data.extrinsics} />,
            eventCount: <Number value={data.event_count} />
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
          title: "出块时间",
          dataIndex: "time"
        },
        {
          title: "验证节点",
          dataIndex: "producer"
        },
        {
          title: "交易数",
          dataIndex: "extrinsics"
        },
        {
          title: "事件数",
          dataIndex: "eventCount"
        }
      ]}
    />
  );
}
