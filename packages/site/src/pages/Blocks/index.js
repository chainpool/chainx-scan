import React from "react";
import { Route, Switch } from "react-router";

import BlocksList from "./BlocksList";
import BlockDetail from "./BlockDetail";
import { BlockChainNav } from "../../components";

export default function Blocks() {
  return (
    <Switch>
      <Route path="/blocks/:block" component={BlockDetail} />
      <Route
        path="/blocks"
        render={props => (
          <div className="box">
            <BlockChainNav activeKey="blocks" />
            <BlocksList {...props} />
          </div>
        )}
      />
    </Switch>
  );
}
