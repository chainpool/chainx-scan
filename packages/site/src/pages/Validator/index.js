import React, { useState } from "react";
import classnames from "classnames";
import Validators from "./Validators";

export default function Validator(props) {
  const [tabIndex, setIndex] = useState(0);
  const tabs = ["验证节点", "Bitcoin信托节点", "候选节点"];
  return (
    <div className="box">
      <ul className="tab">
        {tabs.map((tab, index) => (
          <li
            className={classnames({ "tab-active": index === tabIndex }, "tab-item")}
            key={index}
            onClick={() => setIndex(index)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <Validators {...props} tabIndex={tabIndex} />
    </div>
  );
}
