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
              <FormattedMessage id="unlocktxhash" />： {data.unlockHash};
            </span>
            <span>
              <FormattedMessage id="inputindex" />：{data.inputIndex};
            </span>
            <span>
              <FormattedMessage id="unlockrelayhash" />：{data.unlockChainxRelay};
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
              value={data.lock_hash}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.lock_hash} />;
              }}
            />
          ),
          outputindex: data.output_index,
          baddr: (
            <ExternalLink style={{ width: 136 }} type="btcAddress" className="text-truncate" value={data.address} />
          ),
          amount: <Amount value={data.value} precision={8} hideSymbol />,
          locktxhashrelay: <TxLink style={{ width: 136 }} className="text-truncate" value={data.lock_chainx_relay} />,
          chainxaddr: <AddressLink style={{ width: 136 }} className="text-truncate" value={data.accountid} />,
          locktime: <DateShow value={data.lock_time} />,
          unlocktime: <DateShow value={data.unlock_time} />,
          unlockHash: data.unlock_hash ? (
            <ExternalLink
              type="btcTxid"
              value={data.unlock_hash}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.unlock_hash} />;
              }}
            />
          ) : (
            "-"
          ),
          inputIndex: data.unlock_hash ? data.input_index : "-",
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
          title: <FormattedMessage id="outputindex" />,
          dataIndex: "outputindex"
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
          title: <FormattedMessage id="unlocktime" />,
          dataIndex: "unlocktime"
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
