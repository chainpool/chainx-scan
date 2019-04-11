import React, { useMemo, useEffect } from "react";

import { RenderTxsList } from "../Txs/TxsList";
import api from "../../services/api";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";

export default function AccountTrade(props) {
  const [{ tableData }, setTableData] = useRedux(`accountTrade`, {
    tableData: {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  });
  const tableService = useMemo(
    () => new TableService(api.fetchAccountTxs$, tableData, { accountId: props.accountId }),
    []
  );
  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setTableData({ tableData: { ...data } }));
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  return (
    <RenderTxsList
      handleChange={tableService.handleChange}
      loading={tableData.loading}
      tableData={tableData}
      tableProps={{ pagination: tableData.pagination, showSigned: false }}
    />
  );
}
