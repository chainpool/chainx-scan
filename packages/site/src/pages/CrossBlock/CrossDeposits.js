import React, { useMemo, useEffect } from "react";

import { Table, DateShow, Hash, ExternalLink, AddressLink, TxLink, Amount } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function CrossDeposits() {
  const [{ tableData }, setState] = useRedux("crossDeposits", { tableData: {} });

  const tableService = useMemo(() => new TableService(api.fetchBtcDeposits$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossDeposits {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderCrossDeposits({ tableProps, tableData, handleChange }) {
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
              type="btcTxid"
              value={data.txid}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.txid} />;
              }}
            />
          ),
          chainx_tx: <TxLink style={{ width: 136 }} className="text-truncate" value={data.chainx_tx} />,
          accountid: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.accountid} />,
          token: data.token,
          balance: <Amount value={data.balance} precision={8} hideSymbol />,
          address: <ExternalLink type="btcAddress" value={data.address} />,
          blockTime: <DateShow value={data["block.time"]} />
        };
      })}
      columns={[
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
              Bitcoin
              <FormattedMessage id="BITCOINADDRESS" />
            </>
          ),
          dataIndex: "address"
        },
        {
          title: (
            <>
              ChainX
              <FormattedMessage id="ISSUEADDRESS" />
            </>
          ),
          dataIndex: "accountid"
        },
        {
          title: <FormattedMessage id="ASSET" />,
          dataIndex: "token"
        },
        {
          title: <FormattedMessage id="BALANCE" />,
          dataIndex: "balance"
        }
      ]}
      {...tableProps}
    />
  );
}
