import React from "react";
import { Route, Switch } from "react-router";

import AccountDetail from "./AccountDetail";
import AccountsList from "./AccountsList";
import { BlockChainNav } from "../../components";

export default function Blocks() {
  return (
    <Switch>
      <Route path="/accounts/:accountId" component={AccountDetail} />
      <Route
        path="/accounts"
        render={props => (
          <div className="box">
            <BlockChainNav activeKey="accounts" />
            <AccountsList {...props} />
          </div>
        )}
      />
    </Switch>
  );
}
