import encodeAddress from "@polkadot/keyring/address/encode";
import setAddressPrefix from "@polkadot/keyring/address/setPrefix";
import hexAddPrefix from "@polkadot/util/hex/hasPrefix";

setAddressPrefix(44);

export default function _encodeAddress(publicKey) {
  if (!publicKey) return publicKey;
  return encodeAddress(hexAddPrefix(publicKey));
}
