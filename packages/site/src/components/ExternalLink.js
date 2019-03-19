import React from "react";

export default function ExternalLink(props) {
  const { value, render, type } = props;

  let href = "";

  if (!type || type === "url") {
    try {
      const url = new URL(`http://${value}`);
      href = url.href;
    } catch {}
  } else if (type === "btcHash") {
    href = `https://live.blockcypher.com/btc-testnet/block/${value}/`;
  } else if (type === "btcTxid") {
    href = `https://live.blockcypher.com/btc-testnet/tx/${value}/`;
  }

  return href ? (
    <a className="nav-link" href={href} target="_blank" rel="noopener noreferrer">
      {render ? render(value) : value}
    </a>
  ) : (
    value
  );
}
