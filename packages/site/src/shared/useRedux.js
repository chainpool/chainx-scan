import { useState, useEffect, useCallback, useMemo } from "react";
import createStore, { createCommonReducer } from "./createStore";

const store = createStore();

export default function useRedux(namespace, initState) {
  const state = useMemo(() => {
    let reduxState = store.getState();
    if (!reduxState[namespace]) {
      store.injectReducer(namespace, createCommonReducer(namespace, initState));
    }
    reduxState = store.getState();
    return reduxState[namespace];
  }, [namespace, store]);

  const [data, setData] = useState(state);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      setData(state[namespace]);
    });
    return () => unsubscribe();
  }, [store]);

  const setState = useCallback(
    payload => {
      store.dispatch({ type: `${namespace}/setState`, payload });
    },
    [namespace]
  );

  return [data, setState, store];
}
