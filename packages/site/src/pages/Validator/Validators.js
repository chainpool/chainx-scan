import React, { useEffect, useMemo } from "react";

import ValidatorsTable from "./ValidatorsTable";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

export default function Validators(props) {
  const { tabFilter } = props;
  const [{ tableData }, setState] = useRedux(`validators-${tabFilter}`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 200,
        total: 0
      }
    }
  });
  const tableService = useMemo(() => new TableService(api.fetchIntentions$, tableData, { tabFilter }), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => {
      setState({ tableData: { ...data } });
    });
    return () => subscription.unsubscribe();
  }, [tabFilter]);

  return (
    <ValidatorsTable
      loading={tableData.loading}
      dataSource={tableData.dataSource}
      pagination={tableData.pagination}
      handleChange={tableService.handleChange}
    />
  );
}
