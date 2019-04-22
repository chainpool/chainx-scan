export const MENU = {
  HOME: "HOME",
  BLOCKS: "BLOCKS",
  VALIDATORS: "VALIDATORS",
  CROSSBLOCKS: "CROSSBLOCKS",
  DEPOSITEAPP: "DEPOSITEAPP"
};
export const DASHBOARD = {
  chainStatus: "Chain Status",
  latestBlock: "Latest Block",
  confirmBlock: "Confirm Block",
  TransactionCount: "Transaction Count",
  accountCount: "Account Count",
  validatorVoteSession: "Validator Vote Session",
  validators: "Validators",
  releaseCount: "Release Count(PCX)",
  mortgageCount: "Mortgage Count(PCX)",
  userVoteCount: "User Vote Count(PCX)"
};
export const NEWESTBLOCK = {
  newestBlock: "Newest Block",
  block: "Block",
  validator: "Validator",
  transactionCount: "Transaction Count",
  showAll: "Show All"
};
export const NEWESTTRANSACTION = {
  newestTransaction: "Newest Transaction",
  transactionHash: "Transaction Hash",
  sender: "Sender",
  operation: "Operation"
};
export default {
  ...MENU,
  ...DASHBOARD,
  ...NEWESTBLOCK,
  ...NEWESTTRANSACTION
};
