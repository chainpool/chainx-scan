import React from "react";
import classnames from "classnames";
import { getModuleName, getCallName } from "../shared";

export default function TxAction(props) {
  const { module, call, className, style } = props;
  return (
    <div className={classnames(className)} style={style}>{`${getModuleName(module)}${
      call ? "(" + getCallName(call) + ")" : ""
    }`}</div>
  );
}
