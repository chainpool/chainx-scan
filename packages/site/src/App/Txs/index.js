import React from "react";
import { Route, Switch } from "react-router";

import BlockChainNav from "../BlockChainNav";
import TxsList from "./TxsList";

export default function Txs() {
  return (
    <div className="box">
      <BlockChainNav activeKey="txs" />
      <div>
        <Switch>
          <Route path="/txs" component={TxsList} />
        </Switch>
      </div>
    </div>
  );
}
