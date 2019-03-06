import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    </Router>
  );
}
