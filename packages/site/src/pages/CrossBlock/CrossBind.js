import React, { useMemo, useEffect } from "react";

import { Table, AddressLink, ExternalLink, ValidatorLink } from "../../components";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function CrossBind() {
  const [{ tableData }, setState] = useRedux("crossBind", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchBtcBind$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderCrossBind {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderCrossBind({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = tableData;

  return (
    <>
      <Table
        loading={loading}
        onChange={handleChange}
        pagination={pagination}
        dataSource={dataSource.map(data => {
          return {
            key: data.address,
            pcxAddress: <AddressLink style={{ maxWidth: 300 }} className="text-truncate" value={data.accountid} />,
            btcAddress: (
              <ExternalLink
                style={{ maxWidth: 300 }}
                className="text-truncate"
                type="btcAddress"
                value={data.address}
              />
            ),
            channel: <ValidatorLink value={data.accountid} name={data["intention.name"]} />
          };
        })}
        columns={[
          {
            title: (
              <>
                Bitcoin
                <FormattedMessage id="ADDRESS" />
              </>
            ),
            dataIndex: "btcAddress"
          },
          {
            title: (
              <>
                ChainX
                <FormattedMessage id="ADDRESS" />
              </>
            ),
            dataIndex: "pcxAddress"
          },
          {
            title: <FormattedMessage id="CHANNELNAME" />,
            dataIndex: "channel"
          }
        ]}
        {...tableProps}
      />
    </>
  );
}
