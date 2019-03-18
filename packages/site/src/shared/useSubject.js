import { useState, useEffect, useCallback } from "react";

export default function useSubject(subject) {
  const [data, setData] = useState(subject.getValue());

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
