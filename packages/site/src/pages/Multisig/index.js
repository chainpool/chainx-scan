import React from "react";
import { Route, Switch } from "react-router";

import MultisigList from "./MultisigList";
import { BlockChainNav } from "../../components";

export default function Blocks() {
  return (
    <Switch>
      <Route
        path="/multisig"
        render={props => (
          <div className="box">
            <BlockChainNav activeKey="multisig" />
            <MultisigList {...props} />
          </div>
        )}
      />
    </Switch>
  );
}
