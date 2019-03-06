import React from "react";
import { Route, Switch } from "react-router";

import BlockChainNav from "../BlockChainNav";
import BlocksList from "./BlocksList";
import BlockDetail from "./BlockDetail";

export default function Blocks() {
  return (
    <div className="box">
      <BlockChainNav activeKey="blocks" />
      <div>
        <Switch>
          <Route path="/blocks/:block" component={BlockDetail} />
          <Route path="/blocks" component={BlocksList} />
        </Switch>
      </div>
    </div>
  );
}
