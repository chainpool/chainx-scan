import { useState, useEffect, useRef, useMemo, useCallback } from "react";

import { take } from "rxjs/operators";
import SubjectState from "./SubjectState";

export default function useTable(initData, _fetchTable) {
  const subjectState = useMemo(() => {
    return new SubjectState({
      dataSource: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0
      },
      ...initData
    });
  }, []);

  const fetchTable = useCallback((...args) => _fetchTable(...args), []);

  const state$ = useMemo(() => {
    return subjectState.getState$();
  }, []);

  const handleChange = useCallback(
    ({ current, pageSize, total }) => {
      subjectState.setState({
        pagination: { current, pageSize, total }
      });
    },
    [subjectState]
  );

  const [{ pagination }, setData] = useState(subjectState.getValue());

  const ref = useRef();

  ref.current = pagination.current;

  useEffect(() => {
    const subscription = state$.subscribe(data => setData(data));
    return () => subscription.unsubscribe();
  }, [state$]);

  useEffect(() => {
    subjectState.setState({ loading: true });
    fetchTable({
      page: pagination.current - 1,
      pageSize: pagination.pageSize
    })
      .pipe(take(1))
      .subscribe(({ items, page, pageSize, total }) => {
        // ! 通过 ref 获取最新的 current
        if (pagination.current === ref.current) {
          subjectState.setState({
            dataSource: items,
            loading: false,
            pagination: {
              current: page + 1,
              pageSize,
              total
            }
          });
        }
      });
  }, [pagination.current, pagination.pageSize, fetchTable, subjectState]);

  return [state$, handleChange];
}
