import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { AppContextProvider } from "../components/AppContext";

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <AppContextProvider>
          <Main />
        </AppContextProvider>
        <Footer />
      </React.Fragment>
    </Router>
  );
}
