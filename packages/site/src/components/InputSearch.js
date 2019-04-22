import React, { useState, useCallback } from "react";
import Icon from "antd/lib/icon";

import api from "../services/api";

export default function InputSearch(props) {
  const { history } = props;

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
        placeholder="搜索区块高度/区块哈希/交易哈希/账户地址"
      />
      <Icon type="search" className="search" onClick={() => search(str)} />
    </span>
  );
}
