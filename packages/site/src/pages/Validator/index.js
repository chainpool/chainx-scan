import React from "react";
import { Route, Switch } from "react-router";
import classnames from "classnames";
import Validators from "./Validators";
import MissedBlock from "./MissedBlock";
import ValidatorsDetail from "./ValidatorsDetail";
import { NavLink } from "react-router-dom";

export default function Validator(props) {
  const filter = props.match.params.filter || "all";
  const tabs = [
    { text: "验证节点", filter: "all" },
    { text: "候选节点", filter: "unsettled" },
    { text: "信托节点(Bitcoin)", filter: "Bitcoin" },
    { text: "漏块统计", filter: "missed" }
  ];
  return (
    <Switch>
      <Route
        exact
        path="/validators/:filter?"
        render={props => (
          <div className="box">
            <div className="tabs">
              <ul>
                {tabs.map((tab, index) => (
                  <li className={classnames({ "is-active": tab.filter === filter }, "tab-item")} key={index}>
                    <NavLink to={`/validators/${tab.filter}`}>{tab.text}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {tabs.map((tab, index) => {
              if (tab.filter === filter) {
                if (tab.filter !== "missed") {
                  return <Validators key={index} {...props} tabFilter={tab.filter} />;
                } else {
                  return <MissedBlock key={index} />;
                }
              } else return null;
            })}
          </div>
        )}
      />
      <Route path="/validators/:filter?/:node?" component={ValidatorsDetail} />
    </Switch>
  );
}
