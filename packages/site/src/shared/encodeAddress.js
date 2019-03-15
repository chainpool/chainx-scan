import { encodeAddress } from "@polkadot/keyring/address";
import { hexAddPrefix } from "@polkadot/util";

export default function _encodeAddress(publicKey) {
  if (!publicKey) return publicKey;
  return encodeAddress(hexAddPrefix(publicKey));
}
