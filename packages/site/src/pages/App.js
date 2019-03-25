import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { AppContextProvider } from "../components/AppContext";

export default function App() {
  return (
    <AppContextProvider>
      <Router>
        <React.Fragment>
          <Header />
          <Main />
          <Footer />
        </React.Fragment>
      </Router>
    </AppContextProvider>
  );
}
