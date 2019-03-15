import { useState, useEffect, useRef } from "react";
import fetch from "./fetch";

export default function useTableData(url, extra = {}) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });
  const ref = useRef();

  async function fetchData({ current, url, signal, currentPageSize } = {}) {
    setLoading(true);
    const { items, page, pageSize, total } = await fetch(
      url,
      {
        page: current - 1,
        pageSize: currentPageSize
      },
      { signal }
    );
    // ! 通过 ref 获取最新的 current
    if (current === ref.current) {
      setTableData(items);
      setPagination({
        current: page + 1,
        pageSize,
        total
      });
    }
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
    ref.current = pagination.current;
    fetchData({ current: pagination.current, url, signal: controller.signal, currentPageSize: pagination.pageSize });
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
