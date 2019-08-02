import React from "react";
import classnames from "classnames";
import { injectIntl } from "react-intl";

function trans_funname(source) {
  if (source.indexOf("-") < 0 && source.indexOf("_") < 0) {
    return source;
  }
  return source.replace(/[-_][^-_]/g, function(match) {
    return match.charAt(1).toUpperCase();
  });
}

export default injectIntl(function TxAction(props) {
  const {
    module,
    call,
    className,
    style,
    intl: { messages }
  } = props;

  Object.entries(messages.callNameMap).forEach(([key, value]) => {
    messages.callNameMap[trans_funname(key)] = value;
  });

  return (
    <div className={classnames(className)} style={style}>{`${messages.moduleNameMap[module] || module}${
      call ? "(" + (messages.callNameMap[call] || call) + ")" : ""
    }`}</div>
  );
});
