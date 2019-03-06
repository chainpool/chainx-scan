import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Home from "./Home";
import BlockChain from "./BlockChain";

const Main = function Main() {
  return (
    <div className="main">
      <section className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blockchain" component={BlockChain} />
          <Redirect to="/" />
        </Switch>
      </section>
    </div>
  );
};

export default Main;
