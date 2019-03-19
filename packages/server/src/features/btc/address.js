const Address = require("btc-address");
const binConv = require("binstring");

function stringToBytes(s) {
  const data = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    data[i] = s.charCodeAt(i);
  }
  return data;
}

function toBtcAddress(btc_layout) {
  let b = stringToBytes(btc_layout.startsWith("0x") ? btc_layout.slice(2) : btc_layout);
  let v = b.slice(0, 1);
  let h = b.slice(1, 21);

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
  //console.log(n,t)

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

module.exports = {
  toBtcAddress
};
