import React, { useMemo, useEffect } from "react";

import { Table, DateShow, Hash, ExternalLink, AddressLink, TxLink, Amount, ValidatorLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function AccountBtcLock(props) {
  const [{ tableData }, setState] = useRedux("btcLockListAccount", { tableData: {} });

  const tableService = useMemo(
    () => new TableService(api.fetchAccountBtcLock$, tableData, { accountId: props.accountId }),
    [props.accountId]
  );

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderBtcLockList {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderBtcLockList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = tableData;

  return (
    <Table
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      expandedRowRender={data => {
        return (
          <div>
            <span>
              <FormattedMessage id="locktxhash" />： {data.locktxhash};
            </span>
            <span>
              <FormattedMessage id="outputindex" />：{data.outputindex};
            </span>
          </div>
        );
      }}
      dataSource={dataSource.map((data, index) => {
        return {
          key: index,
          txhash: (
            <ExternalLink
              type="btcTxid"
              value={data.hash}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.hash} />;
              }}
            />
          ),
          index: data.index,
          baddr: (
            <ExternalLink style={{ width: 136 }} type="btcAddress" className="text-truncate" value={data.address} />
          ),
          amount: (
            <>
              {data.type === 1 ? "-" : "+"}
              <Amount value={data.value} precision={8} hideSymbol />
            </>
          ),
          locktxhashrelay: <TxLink style={{ width: 136 }} className="text-truncate" value={data.relay_hash} />,
          chainxaddr: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.accountid} />,
          locktime: <DateShow value={data["block.time"]} />,
          locktxhash: data.pre_hash ? (
            <ExternalLink
              type="btcTxid"
              value={data.pre_hash}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.pre_hash} />;
              }}
            />
          ) : (
            "-"
          ),
          outputindex: data.pre_hash ? data.pre_index : "-",
          unlockChainxRelay: data.unlock_chainx_relay ? (
            <TxLink style={{ width: 136 }} className="text-truncate" value={data.unlock_chainx_relay} />
          ) : (
            "-"
          ),
          nodename: <ValidatorLink value={data.channel} />
        };
      })}
      columns={[
        {
          title: <FormattedMessage id="txhash" />,
          dataIndex: "txhash"
        },
        {
          title: <FormattedMessage id="index" />,
          dataIndex: "index"
        },
        {
          title: <FormattedMessage id="baddr" />,
          dataIndex: "baddr"
        },
        {
          title: <FormattedMessage id="amount" />,
          dataIndex: "amount"
        },
        {
          title: <FormattedMessage id="locktxhashrelay" />,
          dataIndex: "locktxhashrelay"
        },
        {
          title: <FormattedMessage id="locktime" />,
          dataIndex: "locktime"
        },
        {
          title: <FormattedMessage id="nodename" />,
          dataIndex: "nodename"
        }
      ]}
      {...tableProps}
    />
  );
}
