import React, { useEffect, useMemo } from "react";

import { AddressLink, TxLink, TxAction, DateShow, Table } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function AccountsList() {
  const [{ tableData }, setState] = useRedux("multisig-records", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchMultisigRecords$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

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
            txid: <TxLink style={{ width: 136 }} className="text-truncate" value={data.txid} />,
            addr: (
              <AddressLink
                style={{ maxWidth: 136 }}
                className="text-truncate"
                value={data.addr}
                render={x => {
                  if (data.addr === "67df26a755e0c31ac81e2ed530d147d7f2b9a3f5a570619048c562b1ed00dfdd") {
                    return <FormattedMessage id="council" />;
                  } else if (data.addr === "6193a00c655f836f9d8a62ed407096381f02f8272ea3ea0df0fd66c08c53af81") {
                    return <FormattedMessage id="team" />;
                  }
                  return x;
                }}
              />
            ),
            accountid: <AddressLink style={{ maxWidth: 136 }} className="text-truncate" value={data.accountid} />,
            multisigid: (
              <div style={{ maxWidth: 136 }} className="text-truncate">
                {data.multisigid}
              </div>
            ),
            action:
              data.call === "set_code" ? (
                <FormattedMessage id="setcode" />
              ) : (
                <TxAction module={data.module} call={data.call} />
              ),
            status:
              data.yet_needed === 0 ? (
                <FormattedMessage id="pass" />
              ) : (
                <div>
                  <FormattedMessage id="yetneded" />({data.yet_needed})
                </div>
              ),
            args: JSON.stringify(data.args)
          };
        })
      }
      expandedRowRender={data => {
        return <div>{data.args}</div>;
      }}
      columns={[
        {
          title: <FormattedMessage id="TIME" />,
          dataIndex: "time"
        },
        {
          title: <FormattedMessage id="TRANSACTIONHASH" />,
          dataIndex: "txid"
        },
        {
          title: <FormattedMessage id="multisigaddress" />,
          dataIndex: "addr"
        },
        {
          title: <FormattedMessage id="proposer" />,
          dataIndex: "accountid"
        },
        {
          title: <FormattedMessage id="proposalId" />,
          dataIndex: "multisigid"
        },
        {
          title: <FormattedMessage id="proposalContent" />,
          dataIndex: "action"
        },
        {
          title: <FormattedMessage id="status" />,
          dataIndex: "status"
        }
      ]}
    />
  );
}
