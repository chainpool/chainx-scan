export const MENU = {
  home: "Home",
  blocks: "Chain",
  validators: "Trustee Node",
  crossBlocks: "Cross-chain Light Client",
  DAPP: "DEX"
};
export const DASHBOARD = {
  chainStatus: "Chain Statistics",
  latestBlock: "Latest Block",
  confirmBlock: "Finalized Block",
  transactionCount: "Total Extrinsics",
  accountCount: "Total Accounts",
  validatorVoteSession: "Validator Elections",
  validators: "Total Validators",
  releaseCount: "Total Issuance(PCX)",
  mortgageCount: "Total Intention-Bonded(PCX)",
  userVoteCount: "Total Bonded(PCX)"
};
export const NEWESTBLOCK = {
  newestBlock: "Latest Block",
  block: "Block",
  validator: "Validator",
  showAll: "See All"
};
export const NEWESTTRANSACTION = {
  newestTransaction: "Latest Extrinsic",
  transactionHash: "Extrinsic Hash",
  sender: "Sender",
  operation: "Action"
};
export const BITCOIN = {
  trusteeVoteSession: "Trustee Elections",
  multiSigTrusteeBalance: "MultiSig Balance",
  hotAddress: "Hot Address",
  coldAddress: "Cold Address",
  DepositeTransactionCount: "Total Deposit Extrinsics",
  withdrawalTransactionCount: "Total Withdrawal Extrinsics",
  crossBindAddressCount: "Binded Addresses",
  blockHash: "Block Hash",
  blockTime: "Block Time",
  crossTransaction: " Total Cross-chain Extrinsics",
  trunkTransactionHash: " Relay Extrinsic Hash",
  trunkTransactioner: " Relay Extrinsic Hash",
  trunkTransactionTime: " Relay Extrinsic Hash"
};
export default {
  ...MENU,
  ...DASHBOARD,
  ...NEWESTBLOCK,
  ...NEWESTTRANSACTION,
  ...BITCOIN
};
