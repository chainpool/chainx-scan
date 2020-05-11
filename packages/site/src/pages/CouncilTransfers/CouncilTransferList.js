import React, { useEffect, useMemo } from "react";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { useRedux } from "../../shared";
import { AddressLink, Amount, DateShow, Table, TxLink } from "../../components";
import { FormattedMessage } from "react-intl";

export default function() {
  const [{ tableData }, setState] = useRedux("council-transfers", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchCouncilTransfers$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  console.log("transfers", tableData);

  return (
    <Table
      loading={tableData.loading}
      onChange={tableService.handleChange}
      pagination={tableData.pagination}
      dataSource={
        tableData.dataSource &&
        tableData.dataSource.map((data, index) => {
          return {
            key: index,
            time: <DateShow value={data["block.time"]} />,
            addr: <AddressLink style={{ maxWidth: 136 }} className="text-truncate" value={data.dest} />,
            value: <Amount value={data.value} />,
            txid: <TxLink style={{ width: 136 }} className="text-truncate" value={data.txid} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="TIME" />,
          dataIndex: "time"
        },
        {
          title: <FormattedMessage id="dest_address" />,
          dataIndex: "addr"
        },
        {
          title: <FormattedMessage id="TRANSFER_BALANCE" />,
          dataIndex: "value"
        },
        {
          title: <FormattedMessage id="TRANSACTIONHASH" />,
          dataIndex: "txid"
        },
        {
          title: <FormattedMessage id="MEMO" />,
          className: "limit-memo",
          dataIndex: "memo"
        }
      ]}
    />
  );
}
