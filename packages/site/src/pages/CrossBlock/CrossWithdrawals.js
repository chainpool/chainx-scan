import React, { useMemo, useEffect } from "react";

import { Table, Hash, ExternalLink, AddressLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";

export default function CrossWithdrawals() {
  const [{ tableData }, setState] = useRedux("crossWithdrawals", { tableData: {} });

  const tableService = useMemo(() => new TableService(api.fetchBtcWithdrawals$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossWithdrawals {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderCrossWithdrawals({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = tableData;

  return (
    <Table
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map((data, index) => {
        return {
          key: index,
          txid: (
            <ExternalLink
              type="btcHash"
              value={data.txid}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.txid} />;
              }}
            />
          ),
          accountid: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.accountid} />,
          token: data.token,
          balance: data.balance,
          txstate: data.txstate,
          memo: data.memo,
          address: <ExternalLink type="btcAddress" value={data.address} />
        };
      })}
      columns={[
        {
          title: "ChainX申请交易哈希",
          dataIndex: "accountid"
        },
        {
          title: "ChainX申请地址",
          dataIndex: "address"
        },
        {
          title: "Bitcoin交易哈希",
          dataIndex: "txid"
        },
        {
          title: "资产",
          dataIndex: "token"
        },
        {
          title: "金额",
          dataIndex: "balance"
        },
        {
          title: "提现状态",
          dataIndex: "txstate"
        },
        {
          title: "备注",
          dataIndex: "memo"
        }
      ]}
      {...tableProps}
    />
  );
}
