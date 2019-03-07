import React, { Fragment } from "react";

export default function TxAction(props) {
  const { module, call } = props;
  console.log(props);
  return <Fragment>{`${module}${call ? "(" + call + ")" : ""}`}</Fragment>;
}
