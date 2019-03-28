import { useState, useEffect, useCallback, useMemo } from "react";
import { take } from "rxjs/operators";

export default function useSubject(subject) {
  // 获取初始状态
  const initValue = useMemo(() => {
    let value;
    subject
      .getState$()
      .pipe(take(1))
      .subscribe(result => {
        value = result;
      });
    subject.setState(value);
    return value;
  }, []);

  const [data, setData] = useState(initValue);

  useEffect(() => {
    const subscription = subject.getState$().subscribe(state => setData(state));
    return () => subscription.unsubscribe();
  }, [subject]);

  const setState = useCallback(
    (...args) => {
      return subject.setState(...args);
    },
    [subject]
  );

  return [data, setState];
}
