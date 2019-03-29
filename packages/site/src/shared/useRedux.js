import { useState, useEffect, useCallback } from "react";

export default function useRedux(store) {
  const [data, setData] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(state => setData(store.getState()));
    return () => unsubscribe();
  }, [store]);

  const setState = useCallback(payload => {
    store.dispatch({ type: "SET_STATE", payload });
  }, []);

  return [data, setState, store];
}
