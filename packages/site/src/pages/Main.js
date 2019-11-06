import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Home from "./Home";
import Blocks from "./Blocks";
import Txs from "./Txs";
import Events from "./Events";
import Accounts from "./Accounts";
import Multisig from "./Multisig";
import Contracts from "./Contracts";
import Validator from "./Validator";
import CrossBlock from "./CrossBlock";
import Error from "./Error";
import Dapp from "./Dapp";
import Referendum from "./Referendum";
import { BlockChainNav, ScrollTop } from "../components";

export default function Main() {
  return (
    <div className="section main-content">
      <section className="container">
        <ScrollTop />
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
          <Route path="/multisig" component={Multisig} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/validators/:filter?/:node?" component={Validator} />
          <Route path="/crossblocks" component={CrossBlock} />
          <Route path="/referendum/underway" component={Referendum} />
          <Route path="/referendum/finished" component={Referendum} />
          <Route path="/dapp" component={Dapp} />
          <Route path="/error" component={Error} />
          <Redirect to="/" />
        </Switch>
      </section>
    </div>
  );
}
