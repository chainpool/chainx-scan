import React, { useMemo, useEffect } from "react";

import { Table, Hash, ExternalLink, AddressLink, Amount, TxLink } from "../../components";
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
  const processTxState = txstate => {
    switch (txstate) {
      case "0":
      case "NotApplying":
        return "未申请";
      case "1":
      case "Applying":
        return "申请中";
      case "2":
      case "Signing":
        return "签名中";
      case "3":
      case "Broadcasting":
        return "广播中";
      case "4":
      case "Processing":
        return "处理中";
      case "5":
      case "Confirming":
        return "确认中";
      case "6":
      case "Confirmed":
        return "已确认";
      default:
        return "未知";
    }
  };
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
              type="btcTxid"
              value={data.txid}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.txid} />;
              }}
            />
          ),
          accountid: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.accountid} />,
          token: data.token,
          balance: <Amount value={data.balance} precision={8} hideSymbol />,
          txstate: processTxState(data.txstate),
          memo: data.memo,
          chainx_tx: <TxLink style={{ width: 136 }} className="text-truncate" value={data.chainx_tx} />
        };
      })}
      columns={[
        {
          title: "ChainX申请交易哈希",
          dataIndex: "chainx_tx"
        },
        {
          title: "ChainX申请地址",
          dataIndex: "accountid"
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
