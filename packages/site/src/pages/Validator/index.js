import React, { useState } from "react";
import { Route, Switch } from "react-router";
import classnames from "classnames";
import Validators from "./Validators";
import ValidatorsDetail from "./ValidatorsDetail";

export default function Validator(props) {
  const [tabIndex, setIndex] = useState(0);
  const tabs = [
    { text: "验证节点", filter: "all" },
    { text: "候选节点", filter: "unsettled" },
    { text: "信托节点(Bitcoin)", filter: "Bitcoin" }
  ];
  return (
    <Switch>
      <Route path="/validators/:node" component={ValidatorsDetail} />
      <Route
        path="/validators"
        render={props => (
          <div className="box">
            <div className="tabs">
              <ul>
                {tabs.map((tab, index) => (
                  <li
                    className={classnames({ "is-active": index === tabIndex }, "tab-item")}
                    key={index}
                    onClick={() => setIndex(index)}
                  >
                    <a>{tab.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            {tabs.map((tab, index) => {
              if (index === tabIndex) return <Validators key={index} {...props} tabFilter={tabs[tabIndex].filter} />;
              else return null;
            })}
          </div>
        )}
      />
    </Switch>
  );
}
