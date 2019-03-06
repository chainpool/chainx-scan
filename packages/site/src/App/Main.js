import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Home from "./Home";
import Blocks from "./Blocks";
import Txs from "./Txs";

export default function Main() {
  return (
    <div className="main">
      <section className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/txs" component={Txs} />
          <Redirect to="/" />
        </Switch>
      </section>
    </div>
  );
}
