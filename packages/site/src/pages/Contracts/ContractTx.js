import React, { useMemo, useEffect } from "react";

import {
  Table,
  DateShow,
  Hash,
  BlockLink,
  ExternalLink,
  TxAction,
  AddressLink,
  TxLink,
  Amount
} from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function ContractTx({ accountId }) {
  const [{ tableData }, setState] = useRedux(`contractTx-${accountId}`, { tableData: {} });

  const tableService = useMemo(() => new TableService(api.fetchContractTx$, tableData, { accountId: accountId }), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <ContractTxList {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function ContractTxList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = tableData;
  console.log(dataSource);
  return (
    <Table
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: data.hash,
          height: <BlockLink value={data.number} />,
          time: <DateShow value={data.time} />,
          txhash: <TxLink style={{ width: 136 }} className="text-truncate" value={`0x${data.hash}`} />,
          action: <TxAction module={data.module} call={data.call} />
        };
      })}
      columns={[
        {
          title: <FormattedMessage id="区块高度" />,
          dataIndex: "height"
        },
        {
          title: <FormattedMessage id="时间" />,
          dataIndex: "time"
        },
        {
          title: <FormattedMessage id="交易哈希" />,
          dataIndex: "txhash"
        },
        {
          title: <FormattedMessage id="操作" />,
          dataIndex: "action"
        },
        {
          title: <FormattedMessage id="结果" />,
          dataIndex: "balance"
        }
      ]}
      {...tableProps}
    />
  );
}
