import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import "./index.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
