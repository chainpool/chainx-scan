const Address = require("btc-address");
const binConv = require("binstring");
const bitcoin = require("bitcoinjs-lib");

function bytesToRIHex(uint8arr) {
  if (!uint8arr) {
    return "";
  }
  var hexStr = "";
  for (var i = 0; i < uint8arr.length; i++) {
    var hex = (uint8arr[i] & 0xff).toString(16);
    hex = hex.length === 1 ? "0" + hex : hex;
    hexStr = hex + hexStr;
  }

  return hexStr.toLowerCase();
}

function hexToBytes(str) {
  if (!str) {
    return [];
  }
  var a = [];
  for (var i = str.startsWith("0x") ? 2 : 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return a;
}

//XAccounts_CrossChainAddressMapOf #ADDRESS
//->bitcoin address

function toBtcAddress(btc_layout) {
  let b = hexToBytes(btc_layout);
  let v = b.slice(0, 1);
  let h = b.slice(1, 21);
  let c = b.slice(22, 25);

  let n = "testnet";
  let t = "pubkeyhash";
  switch (v) {
    case 0:
      n = "mainnet";
      t = "pubkeyhash";
      break;
    case 5:
      n = "mainnet";
      t = "scripthash";
      break;
    case 111:
      n = "testnet";
      t = "pubkeyhash";
      break;
    case 196:
      n = "testnet";
      t = "scripthash";
      break;
    default:
      break;
  }

  var address = new Address(
    binConv(h, {
      in: "hex",
      out: "bytes"
    }),
    t,
    n
  );
  return address.toString();
}

function pubKeyToAddress(pubKey) {
  const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(pubKey, "hex"), network: bitcoin.networks.bitcoin });
  return address;
}

function hashToBtcAdress(hash, kind, network) {
  let h = hexToBytes(hash);
  let n = "testnet";
  let t = "pubkeyhash";

  switch (kind) {
    case "P2SH":
      t = "scripthash";
      break;
    default:
      t = "pubkeyhash";
      break;
  }
  switch (network) {
    case "Mainnet":
      n = "mainnet";
      break;
    default:
      n = "testnet";
      break;
  }

  var address = new Address(
    binConv(h, {
      in: "hex",
      out: "bytes"
    }),
    t,
    n
  );
  return address.toString();
}

function normalizeTxHash(hash) {
  return bytesToRIHex(hexToBytes(hash));
}

module.exports = {
  toBtcAddress,
  pubKeyToAddress,
  hashToBtcAdress,
  bytesToRIHex,
  normalizeTxHash
};
