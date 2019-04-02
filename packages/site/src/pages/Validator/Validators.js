import React, { useEffect, useMemo } from "react";

import { ValidatorsTable } from "../../components";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

export default function Validators(props) {
  const { tabFilter } = props;
  const [{ tableData }, setState] = useRedux(`validators-${tabFilter}`, { tableData: { tabFilter } });
  const tableService = useMemo(() => new TableService(api.fetchIntentions$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => {
      setState({ tableData: { ...data, tabFilter } });
    });
    return () => subscription.unsubscribe();
  }, [tabFilter]);

  return (
    <ValidatorsTable
      dataSource={tableData.dataSource}
      pagination={tableData.pagination}
      handleChange={tableData.handleChange}
    />
  );
}
