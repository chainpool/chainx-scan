import React, { useEffect, useMemo } from "react";

import { AddressLink, Amount, DateShow, ExternalLink, Hash, Table, TxLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { FormattedMessage, injectIntl } from "react-intl";

export default injectIntl(function CrossTxs({ intl: { messages } }) {
  const [{ tableData }, setState] = useRedux("crossTxs", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchBtcTxs$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossTxs {...{ tableData, handleChange: tableService.handleChange, messages }} />;
});

export function RenderCrossTxs({ tableProps, tableData, handleChange, messages }) {
  const { pagination, dataSource = [], loading } = tableData;

  return (
    <Table
      loading={loading}
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
          txType: messages.txType[data.tx_type],
          blockTime: <DateShow value={data["block.time"]} />,
          relay: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.relay} />,
          value: <Amount value={data.value} precision={8} symbol={"BTC"} />,
          chainxHash: <TxLink style={{ width: 136 }} className="text-truncate" value={data.chainx_tx} />
        };
      })}
      columns={[
        {
          title: (
            <>
              Bitcoin
              <FormattedMessage id="BLOCKHASH" />
            </>
          ),
          dataIndex: "hash"
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
          title: <FormattedMessage id="EXTRINSICSTYPE" />,
          dataIndex: "txType"
        },
        {
          title: <FormattedMessage id="BALANCE" />,
          dataIndex: "value"
        },
        {
          title: (
            <>
              ChainX
              <FormattedMessage id="TRUNKTRANSACTIONHASH" />
            </>
          ),
          dataIndex: "chainxHash"
        },
        {
          title: (
            <>
              ChainX
              <FormattedMessage id="TRUNKTRANSACTIONER" />
            </>
          ),
          dataIndex: "relay"
        },
        {
          title: (
            <>
              ChainX
              <FormattedMessage id="TRUNKTRANSACTIONTIME" />
            </>
          ),
          dataIndex: "blockTime"
        }
      ]}
      {...tableProps}
    />
  );
}
