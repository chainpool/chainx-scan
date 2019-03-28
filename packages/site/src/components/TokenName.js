import React from "react";
import PCX from "../assets/tokens/pcx.png";
import BTC from "../assets/tokens/btc.png";
import SDOT from "../assets/tokens/sdot.png";

const iconMap = {
  PCX,
  BTC,
  SDOT
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
