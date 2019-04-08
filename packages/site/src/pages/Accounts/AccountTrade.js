import React, { useState, useEffect } from "react";

import { RenderTxsList } from "../Txs/TxsList";
import api from "../../services/api";

export default function AccountTrade(props) {
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchAccountTxs$(props.accountId).subscribe(({ items }) => {
      setLoading(false);
      setTableData({ dataSource: items });
    });
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  return (
    <RenderTxsList loading={loading} tableData={tableData} tableProps={{ pagination: false, showSigned: false }} />
  );
}
