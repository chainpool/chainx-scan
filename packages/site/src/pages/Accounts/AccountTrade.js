import React, { useState, useEffect } from "react";

import { RenderTxsList } from "../Txs/TxsList";
import api from "../../services/api";

export default function AccountTrade(props) {
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const subscription = api
      .fetchAccountTxs$(props.accountId)
      .subscribe(({ items }) => setTableData({ dataSource: items }));
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  return <RenderTxsList tableData={tableData} tableProps={{ pagination: false }} />;
}
