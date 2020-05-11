import React from "react";
import { Route, Switch } from "react-router";
import { BlockChainNav } from "../../components";
import CouncilTransferList from "./CouncilTransferList";

export default function CouncilTransfers() {
  return (
    <Switch>
      <Route
        path="/council_transfers"
        render={props => (
          <div className="box">
            <BlockChainNav activeKey="council_transfers" />
            <CouncilTransferList {...props} />
          </div>
        )}
      />
    </Switch>
  );
}
