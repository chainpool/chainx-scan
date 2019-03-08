import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Home from "./Home";
import Blocks from "./Blocks";
import Txs from "./Txs";
import Events from "./Events";

export default function Main() {
  return (
    <div className="section">
      <section className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/txs" component={Txs} />
          <Route path="/events" component={Events} />
          <Redirect to="/" />
        </Switch>
      </section>
    </div>
  );
}
