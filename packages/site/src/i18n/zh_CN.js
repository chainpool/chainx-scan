export const MENU = {
  HOME: "首页",
  BLOCKS: "区块链",
  VALIDATORS: "验证节点",
  CROSSBLOCKS: "跨链轻节点",
  DEPOSITEAPP: "币币交易"
};
export const DASHBOARD = {
  chainStatus: "链状态",
  latestBlock: "最新高度",
  confirmBlock: "确认高度",
  TransactionCount: "交易总数",
  accountCount: "账户总数",
  validatorVoteSession: "验证节点选举届数",
  validators: "验证节点数",
  releaseCount: "发行总量(PCX)",
  mortgageCount: "节点抵押总数(PCX)",
  userVoteCount: "用户投票总数(PCX)"
};
export const NEWESTBLOCK = {
  newestBlock: "最新块高",
  block: "块高",
  validator: "验证人",
  transactionCount: "交易数",
  showAll: "查看全部"
};
export const NEWESTTRANSACTION = {
  newestTransaction: "最新交易",
  transactionHash: "交易哈希",
  sender: "发送人",
  operation: "操作"
};
export const BITCOIN = {
  trusteeVoteSession: "信托节点选举届数",
  multiSigTrusteeBalance: "多签托管余额",
  hotAddress: "热地址",
  coldAddress: "冷地址",
  DepositeTransactionCount: "充值交易总数",
  withdrawalTransactionCount: "提现交易总数",
  crossBindAddressCount: "跨链绑定地址数",
  blockHash: "区块哈希",
  blockTime: "出块时间",
  crossTransaction: "跨链交易数",
  trunkTransactionHash: "中继交易哈希"
};
export default {
  ...MENU,
  ...DASHBOARD,
  ...NEWESTBLOCK,
  ...NEWESTTRANSACTION
};
