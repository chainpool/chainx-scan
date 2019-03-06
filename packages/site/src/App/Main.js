import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Home from "./Home";
import BlockChain from "./BlockChain";
import BlockDetail from "./BlockChain/BlockDetail";

const Main = function Main() {
  return (
    <div className="main">
      <section className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blocks" component={BlockDetail} />
          <Route path="/txs" component={BlockChain} />
          <Redirect to="/" />
        </Switch>
      </section>
    </div>
  );
};

export default Main;
