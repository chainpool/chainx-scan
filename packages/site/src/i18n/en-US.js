export const MENU = {
  HOME: "Home",
  BLOCKCHAIN: "Chain",
  VALIDTORS: "Trustee Node",
  CROSSBLOCKS: "Cross-chain Light Client",
  DAPP: "DEX"
};
export const DASHBOARD = {
  CHAINSTATUS: "Chain Statistics",
  LATESTBLOCK: "Latest Block",
  CONFIRMBLOCK: "Finalized Block",
  TRANSACTIONCOUNT: "Total Extrinsics",
  ACCOUNTCOUNT: "Total Accounts",
  VALIDATORVOTESESSION: "Validator Elections",
  VALIDATORS: "Total Validators",
  RELEASECOUNT: "Total Issuance(PCX)",
  MORTGAGECOUNT: "Total Intention-Bonded(PCX)",
  USERVOTECOUNT: "Total Bonded(PCX)"
};
export const NEWESTBLOCK = {
  NEWESTBLOCK: "Latest Block",
  BLOCKHEIGHT: "Block Height",
  VALIDATOR: "Validator",
  SHOWALL: "See All"
};
export const NEWESTTRANSACTION = {
  NEWESTTRANSACTION: "Latest Extrinsic",
  TRANSACTIONHASH: "Extrinsic Hash",
  SENDER: "Sender",
  ACTION: "Action"
};
export const BITCOIN = {
  TRUSTEEVOTESESSION: "Trustee Elections",
  MULTISIGTRUSTEEBALANCE: "MultiSig Balance",
  HOTADDRESS: "Hot Address",
  COLDADDRESS: "Cold Address",
  DEPOSITETRANSACTIONCOUNT: "Total Deposit Extrinsics",
  WIDTHDRAWALTRANSACTIONCOUNT: "Total Withdrawal Extrinsics",
  CROSSBINDADDRESSCOUNT: "Binded Addresses",
  BLOCKHASH: "Block Hash",
  BLOCKTIME: "Block Time",
  CROSSTRANSACTION: " Total Cross-chain Extrinsics",
  TRUNKTRANSACTIONHASH: " Relay Extrinsic Hash",
  TRUNKTRANSACTIONER: " Relay Extrinsic Hash",
  TRUNKTRANSACTIONTIME: " Relay Extrinsic Hash"
};
export const BLOCKCHAIN = {
  BLOCKS: "Blocks",
  EVENTS: "Events",
  EVENTSCOUNT: "Events  Count",
  EXTRINSICS: "Extrinsics",
  ACCOUNTS: "Accounts",
  HEIGHT: "Block Height",
  EVENTNUMBER: "Event Number",
  EXTRINSICSNUMBER: "Extrinsic Number",
  EVENTPARAMETERS: "Event Parameters",
  PHRASE: "Phrase",
  CATEGORY: "Category",
  TOTALBALANCE: "TOTAL Balance",
  FREEBALANCE: "Free Balance",
  BLOCKDETAILS: "Block Details",
  EXTRINSICDetails: "Extrinsic Details",
  ACCOUNTDetails: "Account Details",
  PARENTHASH: "Parent Hash",
  TRIEROOT: "Trie Root",
  EXTRINSICROOT: "Extrinsic Root",
  VERSION: "Version",
  DEPOSITADDRESS: "Deposit Address",
  ASSETNAME: "Asset Name",
  INTENSIONNAME: "Intention Name",
  UPDATEWEIGHT: "Last Vote Weight Update",
  WEIGHT: "Last Total Vote Weight",
  BONDED: "Bonded",
  ORDERNUMBER: "Order Number",
  CREATEAT: "AT",
  LASTUPDATE: "Last Update"
};
export const FOOTER = {
  WALLET: "Wallet"
};
export default {
  ...MENU,
  ...DASHBOARD,
  ...NEWESTBLOCK,
  ...NEWESTTRANSACTION,
  ...BITCOIN,
  ...FOOTER
};
