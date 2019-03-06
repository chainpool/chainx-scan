import { useState, useEffect } from "react";
import fetch from "./fetch";

export default function useTableData(url, extra = {}) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });

  async function fetchData() {
    setLoading(true);
    const { items, page, pageSize, total } = await fetch(url, {
      page: pagination.current,
      pageSize: pagination.pageSize
    });
    setTableData(items);
    setPagination({
      current: page,
      pageSize,
      total
    });
    setLoading(false);
  }

  function handleChange({ current, pageSize, total }) {
    setPagination({
      current,
      pageSize,
      total
    });
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, [pagination.current]);

  return [
    {
      dataSource: tableData,
      loading,
      pagination
    },
    handleChange
  ];
}