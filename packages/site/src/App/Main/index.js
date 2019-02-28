import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "./Home";
import Block from "./Block";
import "./index.scss";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <section className="body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/block" component={Block} />
            <Redirect to="/" />
          </Switch>
        </section>
      </div>
    );
  }
}

export default Main;
