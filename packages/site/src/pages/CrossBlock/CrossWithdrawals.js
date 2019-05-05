import React, { useMemo, useEffect } from "react";

import { Table, Hash, ExternalLink, AddressLink, Amount, TxLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { injectIntl, FormattedMessage } from "react-intl";

export default injectIntl(function CrossWithdrawals({ intl: { messages } }) {
  const [{ tableData }, setState] = useRedux("crossWithdrawals", { tableData: {} });

  const tableService = useMemo(() => new TableService(api.fetchBtcWithdrawals$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossWithdrawals {...{ tableData, handleChange: tableService.handleChange, messages }} />;
});

export function RenderCrossWithdrawals({ tableProps, tableData, handleChange, messages }) {
  const { pagination, dataSource = [], loading } = tableData;
  const processTxState = txstate => {
    switch (txstate) {
      case "0":
      case "NotApplying":
        return <FormattedMessage id="NOTAPPLYING" />;
      case "1":
      case "Applying":
        return <FormattedMessage id="APPLYING" />;
      case "2":
      case "Signing":
        return <FormattedMessage id="SIGNING" />;
      case "3":
      case "Broadcasting":
        return <FormattedMessage id="BROADCASTING" />;
      case "4":
      case "Processing":
        return <FormattedMessage id="PROCESSING" />;
      case "5":
      case "Confirming":
        return <FormattedMessage id="CONFIRMING" />;
      case "6":
      case "Confirmed":
        return <FormattedMessage id="CONFIRMED" />;
      case "Unknown":
      default:
        return <FormattedMessage id="UNKNOWN" />;
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
          address: (
            <ExternalLink type="btcAddress" style={{ width: 136 }} className="text-truncate" value={data.address} />
          ),
          token: data.token,
          balance: <Amount value={data.balance} precision={8} hideSymbol />,
          txstate: processTxState(data.txstate),
          memo: data.memo,
          chainx_tx: <TxLink style={{ width: 136 }} className="text-truncate" value={data.chainx_tx} />
        };
      })}
      columns={[
        {
          title: (
            <>
              ChainX
              <FormattedMessage id="APPLICATIONEXTRINSICHASH" />
            </>
          ),
          dataIndex: "chainx_tx"
        },
        {
          title: (
            <>
              ChainX
              <FormattedMessage id="APPLICATIONADDRESS" />
            </>
          ),
          dataIndex: "accountid"
        },
        {
          title: (
            <>
              Bitcoin
              <FormattedMessage id="TRANSACTIONHASH" />
            </>
          ),
          dataIndex: "txid"
        },
        {
          title: (
            <>
              <FormattedMessage id="TARGETADDRESS" />
            </>
          ),
          dataIndex: "address"
        },
        {
          title: <FormattedMessage id="ASSET" />,
          dataIndex: "token"
        },
        {
          title: <FormattedMessage id="BALANCE" />,
          dataIndex: "balance"
        },
        {
          title: <FormattedMessage id="WITHDRAWALSTATUS" />,
          dataIndex: "txstate"
        },
        {
          title: <FormattedMessage id="MEMO" />,
          dataIndex: "memo"
        }
      ]}
      {...tableProps}
    />
  );
}
