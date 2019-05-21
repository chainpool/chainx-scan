import React, { useMemo, useEffect } from "react";

import { Table, AddressLink, ExternalLink, ValidatorLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function EtherumBind() {
  const [{ tableData }, setState] = useRedux("etherumBind", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchEtherumBind$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderEtherumBind {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderEtherumBind({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = tableData;

  return (
    <div className="box">
      <Table
        loading={loading}
        onChange={handleChange}
        pagination={pagination}
        dataSource={dataSource.map(data => {
          return {
            key: data.address,
            address: <ExternalLink type="ethAddress" value={data.address} />,
            accountid: <AddressLink value={data.accountid} />,
            channel: <ValidatorLink value={data.channel} />
          };
        })}
        columns={[
          {
            title: (
              <>
                Etherum
                <FormattedMessage id="ADDRESS" />
              </>
            ),
            dataIndex: "address"
          },
          {
            title: (
              <>
                ChainX
                <FormattedMessage id="SENDADDRESS" />
              </>
            ),
            dataIndex: "accountid"
          },
          {
            title: <FormattedMessage id="CHANNELNAME" />,
            dataIndex: "channel"
          }
        ]}
        {...tableProps}
      />
    </div>
  );
}
