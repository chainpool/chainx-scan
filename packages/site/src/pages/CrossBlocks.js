import React, { useMemo, useEffect } from "react";

import { Table, DateShow, Hash, ExternalLink, Number, AddressLink } from "../components";
import { useSubject, SubjectState } from "../shared";
import TableService from "../services/tableService";
import api from "../services/api";

const subject = new SubjectState({ tableData: {} });

export default function CrossBlocks() {
  const [{ tableData }, setState] = useSubject(subject);
  const tableService = useMemo(() => new TableService(api.fetchBtcBlocks$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossBlocks {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderCrossBlocks({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = tableData;

  return (
    <Table
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.bitcoin_height,
          version: data.version,
          height: (
            <ExternalLink
              type="btcHash"
              value={data.header}
              render={() => {
                return <Number value={data.bitcoin_height} />;
              }}
            />
          ),
          hash: (
            <ExternalLink
              type="btcHash"
              value={data.header}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.header} />;
              }}
            />
          ),
          parent: (
            <ExternalLink
              type="btcHash"
              value={data.parent}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.parent} />;
              }}
            />
          ),
          merkle: <Hash style={{ width: 136 }} className="text-truncate" value={data.merkle} />,
          time: <DateShow value={data.time * 1000} />,
          bits: data.bits,
          relay: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.relay} />,
          blockTime: <DateShow value={data["block.time"]} />
        };
      })}
      columns={[
        {
          title: "区块高度",
          dataIndex: "height"
        },
        {
          title: "区块哈希",
          dataIndex: "hash"
        },
        {
          title: "版本",
          dataIndex: "version"
        },
        {
          title: "父哈希",
          dataIndex: "parent"
        },
        {
          title: "默克尔根",
          dataIndex: "merkle"
        },
        {
          title: "区块时间",
          dataIndex: "time"
        },
        {
          title: "bits",
          dataIndex: "bits"
        },
        {
          title: "中继人",
          dataIndex: "relay"
        },
        {
          title: "中继提交时间",
          dataIndex: "blockTime"
        }
      ]}
      {...tableProps}
    />
  );
}
