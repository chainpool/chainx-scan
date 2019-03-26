import React from "react";
import PCX from "../assets/tokens/pcx.png";
import BTC from "../assets/tokens/btc.png";
import XDOT from "../assets/tokens/xdot.png";

const iconMap = {
  PCX,
  BTC,
  XDOT
};

export default function TokenName(props) {
  const { value } = props;
  const findIcon = iconMap[value.toUpperCase()];
  return (
    <div>
      {findIcon ? (
        <img src={findIcon} style={{ marginTop: -9, marginRight: 8, marginBottom: -8, height: 16 }} alt="token" />
      ) : null}
      {value}
    </div>
  );
}
