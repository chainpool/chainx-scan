import { decodeAddress } from "@polkadot/keyring/address";
import { u8aToHex } from "@polkadot/util";

export default function _decodeAddress(address) {
  if (!address) return address;
  return u8aToHex(decodeAddress(address));
}
