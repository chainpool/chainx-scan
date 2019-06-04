import React, { useEffect, useMemo } from "react";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { Address, AddressLink, Amount, DateShow, Table, TxLink } from "../../components";
import { FormattedMessage } from "react-intl";
import hexStripPrefix from "@polkadot/util/hex/stripPrefix";

export default function AccountTransfer(props) {
  const [{ tableData }, setTableData] = useRedux(`transferList`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  });

  const tableService = useMemo(
    () => new TableService(api.fetchAccountTransfers$, tableData, { accountId: props.accountId }),
    [props.accountId]
  );

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setTableData({ tableData: { ...data } }));
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  return (
    <Table
      onChange={tableService.handleChange}
      loading={tableData.loading}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map(data => {
          const from =
            hexStripPrefix(props.accountId) === data.signed ? (
              <Address style={{ width: 180 }} className="text-truncate" value={data.signed} />
            ) : (
              <AddressLink style={{ width: 180 }} className="text-truncate" value={data.signed} />
            );
          const to =
            hexStripPrefix(props.accountId) === data.payee ? (
              <Address style={{ width: 180 }} className="text-truncate" value={data.payee} />
            ) : (
              <AddressLink style={{ width: 180 }} className="text-truncate" value={data.payee} />
            );

          return {
            ...data,
            key: data.hash,
            from,
            to,
            hash: <TxLink style={{ width: 136 }} className="text-truncate" value={data.hash} />,
            time: <DateShow value={data.time} />,
            value: <Amount value={data.value} symbol={data.token} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="HEIGHT" />,
          dataIndex: "number"
        },
        {
          title: <FormattedMessage id="TIME" />,
          dataIndex: "time"
        },
        {
          title: <FormattedMessage id="TRANSACTIONHASH" />,
          dataIndex: "hash"
        },
        {
          title: <FormattedMessage id="SENDER" />,
          dataIndex: "from"
        },
        {
          title: <FormattedMessage id="TO" />,
          dataIndex: "to"
        },
        {
          title: <FormattedMessage id="TRANSFER_BALANCE" />,
          dataIndex: "value"
        },
        {
          title: <FormattedMessage id="MEMO" />,
          dataIndex: "memo"
        }
      ]}
    />
  );
}
