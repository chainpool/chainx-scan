import React, { useMemo, useEffect } from "react";

import { Table, DateShow, Hash, ExternalLink, Number } from "../components";
import { useSubject, SubjectState } from "../shared";
import TableService from "../services/tableService";
import api from "../services/api";

const subject = new SubjectState({ tableData: {} });

export default function CrossTxs() {
  const [{ tableData }, setState] = useSubject(subject);
  const tableService = useMemo(() => new TableService(api.fetchBtcTxs$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossTxs {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderCrossTxs({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = tableData;

  return (
    <Table
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.txid,
          txid: (
            <ExternalLink
              type="btcTxid"
              value={data.txid}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.txid} />;
              }}
            />
          ),
          txType: data.tx_type,
          time: <DateShow value={data["block.time"]} />,
          relay: <Hash style={{ width: 136 }} className="text-truncate" value={data.relay} />
        };
      })}
      columns={[
        {
          title: "交易哈希",
          dataIndex: "txid"
        },
        {
          title: "交易类型",
          dataIndex: "txType"
        },
        {
          title: "块哈希",
          dataIndex: "version"
        },
        {
          title: "交易时间",
          dataIndex: "parent"
        },
        {
          title: "中继人",
          dataIndex: "relay"
        },
        {
          title: "中继提交时间",
          dataIndex: "time"
        }
      ]}
      {...tableProps}
    />
  );
}
