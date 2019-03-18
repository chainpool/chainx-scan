import { useState, useEffect } from "react";

export default function useSubject(subject) {
  const [data, setData] = useState(subject.getValue());

  useEffect(() => {
    const subscription = subject.getState$().subscribe(state => setData(state));
    return () => subscription.unsubscribe();
  }, [subject]);

  return [data, subject.setState];
}
