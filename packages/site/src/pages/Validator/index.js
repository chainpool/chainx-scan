import React, { useState } from "react";
import classnames from "classnames";
import Validators from "./Validators";

export default function Validator(props) {
  const [tabIndex, setIndex] = useState(0);
  const tabs = [
    { text: "验证节点", filter: null },
    { text: "Bitcoin信托节点", filter: "Bitcoin" },
    { text: "候选节点", filter: 1 }
  ];
  return (
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
  );
}
