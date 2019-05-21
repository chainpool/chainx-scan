import React, { useEffect, useMemo } from "react";
import { NumberFormat, Table } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function DetailMissedBlock({ nodeId }) {
  const [{ tableData }, setState] = useRedux("detailMissed", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchDetailMissed$, tableData, { nodeId }), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, []);

  return <RenderDetailMissedBlock {...{ tableData, handleChange: tableService.handleChange }} />;
}
export function RenderDetailMissedBlock({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = { ...tableData, ...tableProps };

  return (
    <Table
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      dataSource={
        dataSource &&
        dataSource.map((data, index) => {
          return {
            key: `${data.period}`,
            period: data.period,
            missed: <NumberFormat value={data.missed} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="SHAREERA" />,
          dataIndex: "period"
        },
        {
          title: <FormattedMessage id="MISSEDBLOCKS" />,
          dataIndex: "missed"
        }
      ]}
    />
  );
}
