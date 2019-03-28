import { memo } from "react";
import { useAppContext } from "./AppContext";

function numberToAmount(
  number,
  { symbol = "", minDigits, hideSymbol = false, precision = 0, unsetDigits = false, useGrouping = true } = {}
) {
  if (number === null || number === undefined) return "";
  if (isNaN(number)) {
    throw new Error(`expect number but received ${number}`);
  }
  const options = {};

  if (!unsetDigits) {
    if (minDigits !== undefined) {
      options.minimumFractionDigits = minDigits;
    } else {
      options.minimumFractionDigits = precision;
    }
  }

  options.useGrouping = useGrouping;

  const value = (number / Math.pow(10, precision)).toLocaleString(undefined, options);

  if (!hideSymbol && symbol) {
    return `${value} ${symbol}`;
  }

  return value;
}

export default memo(function Amount(props) {
  const {
    value,
    precision,
    minDigits,
    symbol = "PCX",
    hideSymbol = false,
    unsetDigits = false,
    useGrouping = true
  } = props;
  const [{ tokens }] = useAppContext();

  let tokenPrecision = precision;
  if (tokenPrecision === undefined) {
    if (!tokens.length) return null;
    const findToken = tokens.find(token => token.token === symbol.toUpperCase());
    if (findToken) {
      tokenPrecision = findToken.precision;
    }
  }

  return numberToAmount(value, {
    symbol,
    hideSymbol,
    precision: tokenPrecision,
    unsetDigits,
    useGrouping,
    minDigits
  });
});
