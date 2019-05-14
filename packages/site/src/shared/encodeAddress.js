import { encodeAddress, setAddressPrefix } from "@polkadot/keyring/address";
import { hexAddPrefix } from "@polkadot/util";

setAddressPrefix(44);

export default function _encodeAddress(publicKey) {
  if (!publicKey) return publicKey;
  return encodeAddress(hexAddPrefix(publicKey));
}
