import React from "react";
import { Redirect, Route, Switch } from "react-router";

import Home from "./Home";
import Blocks from "./Blocks";
import Txs from "./Txs";
import Events from "./Events";
import Accounts from "./Accounts";
import Validators from "./Validators";
import CrossBlocks from "./CrossBlocks";
import CrossTxs from "./CrossTxs";
import CrossBind from "./CrossBind";
import { BlockChainNav, CrossChainNav } from "../components";

export default function Main() {
  return (
    <div className="section">
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
          <Route
            path="/validators"
            render={props => (
              <div className="box">
                <Validators {...props} />
              </div>
            )}
          />
          <Route
            path="/crossblocks"
            render={props => (
              <div className="box">
                <CrossChainNav activeKey="crossblocks" />
                <CrossBlocks {...props} />
              </div>
            )}
          />
          <Route
            path="/crosstxs"
            render={props => (
              <div className="box">
                <CrossChainNav activeKey="crosstxs" />
                <CrossTxs {...props} />
              </div>
            )}
          />
          <Route
            path="/crossbind"
            render={props => (
              <div className="box">
                <CrossChainNav activeKey="crossbind" />
                <CrossBind {...props} />
              </div>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </section>
    </div>
  );
}
