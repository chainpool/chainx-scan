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

  async function fetchData({ signal } = {}) {
    setLoading(true);
    const { items, page, pageSize, total } = await fetch(
      url,
      {
        page: pagination.current - 1,
        pageSize: pagination.pageSize
      },
      { signal }
    );
    setTableData(items);
    setPagination({
      current: page + 1,
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
    const controller = new AbortController();
    fetchData({ signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, [pagination.current, url]);

  return [
    {
      dataSource: tableData,
      loading,
      pagination
    },
    handleChange
  ];
}
