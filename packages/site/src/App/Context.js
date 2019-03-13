import React, { useContext, useReducer, useEffect } from "react";
import { fetch } from "../common";

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

  async function fetTokens() {
    const result = await fetch("/tokens");
    dispatch({ type: "setToken", payload: result });
  }

  async function fetchIntentions() {
    const result = await fetch("/intentions");
    dispatch({ type: "setIntentions", payload: result });
  }

  useEffect(() => {
    fetTokens();
    fetchIntentions();
  }, []);

  return <AppContext.Provider value={[state, dispatch]}>{props.children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);

export default AppContext;
