import encodeAddress from "@polkadot/keyring/address/encode";
import setAddressPrefix from "@polkadot/keyring/address/setPrefix";
import hexAddPrefix from "@polkadot/util/hex/addPrefix";

setAddressPrefix(process.env.REACT_APP_ENV === "test" ? 42 : 44);

export default function _encodeAddress(publicKey) {
  if (!publicKey) return publicKey;
  return encodeAddress(hexAddPrefix(publicKey));
}
