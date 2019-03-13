import { memo } from "react";
import { useAppContext } from "../App/Context";

function numberToAmount(
  number,
  { symbol = "", hideSymbol = false, precision = 0, unsetDigits = false, useGrouping = false } = {}
) {
  if (number === null || number === undefined) return "";
  if (isNaN(number)) {
    throw new Error(`expect number but received ${number}`);
  }
  const options = {};

  if (!hideSymbol && symbol) {
    options.style = "currency";
    options.currencyDisplay = "name";
    options.currency = symbol;
  }

  if (!unsetDigits) {
    options.minimumFractionDigits = precision;
  }

  options.useGrouping = useGrouping;

  return (number / Math.pow(10, precision)).toLocaleString(undefined, options);
}

export default memo(function Amount(props) {
  const { value, symbol = "PCX", hideSymbol = false, unsetDigits = false, useGrouping = false } = props;
  const [{ tokens }] = useAppContext();
  if (!tokens.length) return null;
  const { precision } = tokens.find(token => token.token === symbol.toUpperCase());
  return numberToAmount(value, { symbol, hideSymbol, precision, unsetDigits, useGrouping });
});
