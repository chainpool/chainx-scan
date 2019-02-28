import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "./Home";
import Block from "./Block";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/block" component={Block} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Main;
