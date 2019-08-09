import React, { useMemo, useEffect } from "react";

import { Table, ExternalLink, AddressLink, ValidatorLink } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function Lockaddress() {
  const [{ tableData }, setState] = useRedux("Lockaddress", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchBtcAddress$, tableData), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return (
    <>
      <Table
        onChange={tableService.handleChange}
        loading={tableData.loading}
        pagination={tableData.pagination}
        dataSource={
          tableData.dataSource &&
          tableData.dataSource.map((data, index) => {
            return {
              key: index,
              baddr: [...new Set(data.addresses)].map(address => (
                <div style={{ marginBottom: 4 }}>
                  <ExternalLink type="btcAddress" className="text-truncate" value={address} />
                </div>
              )),
              chainxaddr: <AddressLink className="text-truncate" value={data.accountid} />,
              nodename: <ValidatorLink value={data.channel} />
            };
          })
        }
        columns={[
          {
            title: <FormattedMessage id="chainxaddr" />,
            dataIndex: "chainxaddr"
          },
          {
            title: <FormattedMessage id="baddr" />,
            dataIndex: "baddr"
          },
          {
            title: <FormattedMessage id="nodename" />,
            dataIndex: "nodename"
          }
        ]}
      />
    </>
  );
}
