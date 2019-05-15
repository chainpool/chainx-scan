import React, { useState, useCallback } from "react";
import { injectIntl } from "react-intl";

import api from "../services/api";

export default injectIntl(function InputSearch(props) {
  const {
    history,
    intl: { messages }
  } = props;

  const [str, setStr] = useState("");

  const search = useCallback(
    async str => {
      const result = await api.search(str);
      if (result.error) {
        alert(result.error.message);
      } else {
        history.push(result.result);
        setStr("");
      }
    },
    [api]
  );

  return (
    <span className="navbar-search">
      <input
        value={str}
        onChange={e => setStr(e.target.value)}
        onKeyPress={event => {
          if (event.key === "Enter") {
            search(str);
          }
        }}
        style={{ width: 350, paddingRight: 50 }}
        className="input is-rounded"
        type="text"
        placeholder={`${messages.SEARCH}${messages.HEIGHT}/${messages.HASH}/${messages.ACCOUNTADDRESS}`}
      />
      <i className="iconfont icon-search search" onClick={() => search(str)} />
    </span>
  );
});
