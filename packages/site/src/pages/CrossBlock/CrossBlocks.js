import React, { useMemo, useEffect } from "react";

import { Table, DateShow, Hash, ExternalLink, NumberFormat, AddressLink, TxLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function CrossBlocks() {
  const [{ tableData }, setState] = useRedux("crossBlocks", { tableData: {} });

  const tableService = useMemo(() => new TableService(api.fetchBtcBlocks$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossBlocks {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderCrossBlocks({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = tableData;

  return (
    <Table
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.bitcoin_height,
          txid: data.txid.length,
          height: (
            <ExternalLink
              type="btcHash"
              value={data.header}
              render={() => {
                return <NumberFormat value={data.bitcoin_height} />;
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
          chainx_tx: <TxLink style={{ width: 136 }} className="text-truncate" value={data.chainx_tx} />,
          time: <DateShow value={data.time * 1000} />,
          bits: data.bits,
          nonce: data.nonce,
          relay: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.relay} />,
          blockTime: <DateShow value={data["block.time"]} />
        };
      })}
      columns={[
        {
          title: (
            <>
              Bitcoin
              <FormattedMessage id="HEIGHT" />
            </>
          ),
          dataIndex: "height"
        },
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
              <FormattedMessage id="BLOCKTIME" />
            </>
          ),
          dataIndex: "time"
        },
        {
          title: "nonce",
          dataIndex: "nonce"
        },
        {
          title: <FormattedMessage id="CROSSTRANSACTION" />,
          dataIndex: "txid"
        },
        {
          title: (
            <>
              ChainX
              <FormattedMessage id="TRUNKTRANSACTIONHASH" />
            </>
          ),
          dataIndex: "chainx_tx"
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
