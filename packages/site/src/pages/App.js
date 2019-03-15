import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import { AppContextProvider } from "../services/Context";

export default function App() {
  return (
    <AppContextProvider>
      <Router>
        <React.Fragment>
          <Header />
          <Main />
        </React.Fragment>
      </Router>
    </AppContextProvider>
  );
}
