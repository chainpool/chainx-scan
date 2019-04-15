import React from "react";

export default function ExternalLink({ value, render, type }) {
  let href = "";
  if (!type) {
    type = false;
  }
  switch (type) {
    case "url":
    case false:
      try {
        const url = new URL(`http://${value}`);
        href = url.href;
      } catch {}
      break;
    case "btcHash":
      href = `https://live.blockcypher.com/btc-testnet/block/${value}/`;
      break;
    case "btcTxid":
      href = `https://live.blockcypher.com/btc-testnet/tx/${value}/`;
      break;
    case "btcAddress":
      href = `https://live.blockcypher.com/btc-testnet/address/${value}`;
      break;
    case "ethAddress":
      href = `https://etherscan.io/address/${value}`;
      break;
    default:
      break;
  }

  return href ? (
    <a className="nav-link" href={href} target="_blank" rel="noopener noreferrer">
      {render ? render(value) : value}
    </a>
  ) : (
    value
  );
}
