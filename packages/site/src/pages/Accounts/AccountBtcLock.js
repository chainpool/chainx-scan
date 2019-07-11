import React, { useEffect, useMemo } from "react";
import { useRedux } from "../../shared";
import TableService from "../../services/tableService";
import api from "../../services/api";
import { ExternalLink, Table, ValidatorLink } from "../../components";
import { FormattedMessage } from "react-intl";

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
    () => new TableService(api.fetchAccountBtcLock$, tableData, { accountId: props.accountId }),
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
        tableData.dataSource.map((data, index) => {
          return {
            key: index,
            chain: "Bitcoin",
            address: (
              <ExternalLink style={{ width: 136 }} type="btcAddress" className="text-truncate" value={data.address} />
            ),
            nodename: <ValidatorLink value={data.channel} />
          };
        })
      }
      channel
      columns={[
        {
          title: <FormattedMessage id="chain" />,
          dataIndex: "chain"
        },
        {
          title: <FormattedMessage id="address" />,
          dataIndex: "address"
        },
        {
          title: <FormattedMessage id="nodename" />,
          dataIndex: "nodename"
        }
      ]}
    />
  );
}
