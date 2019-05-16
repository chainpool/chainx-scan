import decodeAddress from "@polkadot/keyring/address/decode";
import u8aToHex from "@polkadot/util/u8a/toHex";

export default function _decodeAddress(address) {
  if (!address) return address;
  return u8aToHex(decodeAddress(address));
}
