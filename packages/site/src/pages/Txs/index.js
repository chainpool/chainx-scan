import React from "react";
import { Route, Switch } from "react-router";

import { BlockChainNav } from "../../components";
import TxsList from "./TxsList";
import TxDetail from "./TxDetail";

export default function Txs() {
  return (
    <Switch>
      <Route path="/txs/:txid" component={TxDetail} />
      <Route
        path="/txs"
        render={props => (
          <div className="box">
            <BlockChainNav activeKey="txs" />
            <TxsList {...props} />
          </div>
        )}
      />
    </Switch>
  );
}
