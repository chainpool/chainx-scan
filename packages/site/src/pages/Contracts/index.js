import React from "react";
import { Route, Switch } from "react-router";

import ContractsList from "./ContractsList";
import ContractDetail from "./ContractDetailil";
import { BlockChainNav } from "../../components";

export default function Blocks() {
  return (
    <Switch>
      <Route path="/contracts/:accountId" component={ContractDetail} />
      <Route
        path="/contracts"
        render={props => (
          <div className="box">
            <BlockChainNav activeKey="contracts" />
            <ContractsList {...props} />
          </div>
        )}
      />
    </Switch>
  );
}
