import React from "react";

import { useAppContext } from "./AppContext";

export default function TokenChain(props) {
  const { value } = props;

  const [{ tokens }] = useAppContext();

  const token = tokens.find(t => t.token === value);

  return <div>{token.chain}</div>;
}
