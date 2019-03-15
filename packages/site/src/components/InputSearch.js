import React, { useState } from "react";

import { hexStripPrefix, hexAddPrefix } from "@polkadot/util";
import { fetch } from "../shared";

export default function InputSearch(props) {
  const { history } = props;

  const [str, setStr] = useState("");

  async function search(input) {
    input = input.trim();
    if (!isNaN(input) && /^\d*$/.test(input)) {
      history.push(`/blocks/${input}`);
      setStr("");
      return;
    }
    try {
      const txResult = await fetch(`/tx/${hexStripPrefix(input)}`);
      if (txResult && !txResult.error) {
        setStr("");
        return history.push(`/txs/${hexAddPrefix(input)}`);
      }
      const blockResult = await fetch(`/block/${hexAddPrefix(input)}`);
      if (blockResult && !blockResult.error) {
        setStr("");
        return history.push(`/blocks/${hexAddPrefix(input)}`);
      }
      alert("找不到对应的交易或区块");
    } catch {
      alert("无效的值");
      return;
    }
  }

  return (
    <input
      value={str}
      onChange={e => setStr(e.target.value)}
      onKeyPress={event => {
        if (event.key === "Enter") {
          search(str);
        }
      }}
      style={{ minWidth: 350 }}
      className="input is-rounded"
      type="text"
      placeholder="搜索区块高度/区块哈希/交易哈希"
    />
  );
}
