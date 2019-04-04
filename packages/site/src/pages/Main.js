import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Home from "./Home";
import Blocks from "./Blocks";
import Txs from "./Txs";
import Events from "./Events";
import Accounts from "./Accounts";
import Validator from "./Validator";
import CrossBlock from "./CrossBlock";
import Dapp from "./Dapp";
import { BlockChainNav } from "../components";

export default function Main() {
  return (
    <div className="section main-content">
      <section className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/txs" component={Txs} />
          <Route
            path="/events"
            render={props => (
              <div className="box">
                <BlockChainNav activeKey="events" />
                <Events {...props} />
              </div>
            )}
          />
          <Route path="/accounts" component={Accounts} />
          <Route path="/validators" component={Validator} />
          <Route path="/crossblocks" component={CrossBlock} />
          <Route path="/dapp" component={Dapp} />
          <Redirect to="/" />
        </Switch>
      </section>
    </div>
  );
}
