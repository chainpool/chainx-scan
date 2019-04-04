import React, { useEffect, useMemo } from "react";

import { AddressLink, Amount, DateShow, ExternalLink, Hash, Table } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";

export default function CrossTxs() {
  const [{ tableData }, setState] = useRedux("crossTxs", { tableData: {} });
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
          hash: (
            <ExternalLink
              type="btcHash"
              value={data.header}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.header} />;
              }}
            />
          ),
          txType: data.tx_type,
          blockTime: <DateShow value={data["block.time"]} />,
          relay: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.relay} />,
          value: <Amount value={data.value} precision={8} symbol={"BTC"} />
        };
      })}
      columns={[
        {
          title: "Bitcoin区块哈希",
          dataIndex: "hash"
        },
        {
          title: "Bitcoin交易哈希",
          dataIndex: "txid"
        },
        {
          title: "交易类型",
          dataIndex: "txType"
        },
        {
          title: "金额",
          dataIndex: "value"
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
