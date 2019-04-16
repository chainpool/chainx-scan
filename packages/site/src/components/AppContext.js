import React, { useContext, useReducer, useEffect } from "react";
import api from "../services/api";

const AppContext = React.createContext();

const initialState = { tokens: [], intentions: [] };

function reducer(state, action) {
  switch (action.type) {
    case "setToken":
      return { ...state, tokens: action.payload };
    case "setIntentions":
      return { ...state, intentions: action.payload };
    default:
      throw new Error("cant found type");
  }
}

export function AppContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = api.fetchTokens$().subscribe(({ result }) => {
      dispatch({ type: "setToken", payload: result });
    });
    const intentions = api.fetchIntentions$({ pageSize: 200 }).subscribe(({ result }) => {
      dispatch({ type: "setIntentions", payload: result && result.items ? result.items : [] });
    });
    return () => {
      token.unsubcription();
      intentions.unsubcription();
    };
  }, [api]);

  return <AppContext.Provider value={[state, dispatch]}>{props.children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);

export default AppContext;
