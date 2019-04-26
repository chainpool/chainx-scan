import React from "react";
import classnames from "classnames";
import { injectIntl } from "react-intl";

export default injectIntl(function TxAction(props) {
  const {
    module,
    call,
    className,
    style,
    intl: { messages }
  } = props;
  return (
    <div className={classnames(className)} style={style}>{`${messages.moduleNameMap[module]}${
      call ? "(" + messages.callNameMap[call] + ")" : ""
    }`}</div>
  );
});
