export const MENU = {
  HOME: "首页",
  CHAIN: "区块链",
  VALIDTORS: "验证节点",
  CROSSBLOCKS: "跨链轻节点",
  DAPP: "币币交易"
};
export const DASHBOARD = {
  CHAINSTATUS: "链状态",
  LATESTBLOCK: "最新高度",
  CONFIRMBLOCK: "确认高度",
  TransactionCount: "交易总数",
  ACCOUNTCOUNT: "账户总数",
  VALIDATORVOTESESSION: "验证节点选举届数",
  VALIDATORS: "验证节点数",
  RELEASECOUNT: "发行总量(PCX)",
  MORTGAGECOUNT: "节点抵押总数(PCX)",
  USERVOTECOUNT: "用户投票总数(PCX)"
};
export const NEWESTBLOCK = {
  NEWESTBLOCK: "最新块高",
  BLOCKHEIGHT: "块高",
  VALIDATOR: "验证人",
  TRANSACTIONCOUNT: "交易数",
  SHOWALL: "查看全部"
};
export const NEWESTTRANSACTION = {
  NEWESTTRANSACTION: "最新交易",
  TRANSACTIONHASH: "交易哈希",
  SENDER: "发送人",
  ACTION: "操作"
};
export const BITCOIN = {
  TRUSTEEVOTESESSION: "信托节点选举届数",
  MULTISIGTRUSTEEBALANCE: "多签托管余额",
  HOTADDRESS: "热地址",
  COLDADDRESS: "冷地址",
  DEPOSITETRANSACTIONCOUNT: "充值交易总数",
  WIDTHDRAWALTRANSACTIONCOUNT: "提现交易总数",
  CROSSBINDADDRESSCOUNT: "跨链绑定地址数",
  BLOCKHASH: "区块哈希",
  BLOCKTIME: "出块时间",
  CROSSTRANSACTION: "跨链交易数",
  TRUNKTRANSACTIONHASH: "中继交易哈希",
  TRUNKTRANSACTIONER: "中继人",
  TRUNKTRANSACTIONTIME: "中继时间"
};
export const BLOCKCHAIN = {
  BLOCKS: "区块列表",
  EVENTS: "事件列表",
  EVENTSCOUNT: "事件数",
  EXTRINSICS: "交易列表",
  ACCOUNTS: "账户列表",
  HEIGHT: "区块高度",
  EVENTNUMBER: "事件序号",
  EXTRINSICSNUMBER: "交易序号",
  PHRASE: "阶段",
  CATEGORY: "类别",
  FREEBALANCE: "可用余额",
  TOTALBALANCE: "总余额",
  BLOCKDETAILS: "区块详情",
  EXTRINSICDetails: "交易详情",
  ACCOUNTDetails: "账户详情",
  PARENTHASH: "父哈希",
  TRIEROOT: "状态根",
  EXTRINSICROOT: "交易根",
  VERSION: "版本",
  DEPOSITADDRESS: "充值地址",
  ASSETNAME: "资产名称",
  INTENSIONNAME: "节点名",
  UPDATEWEIGHT: "票龄更新高度",
  WEIGHT: "历史总票龄",
  BONDED: "投票金额",
  ORDERNUMBER: "委托编号",
  CREATEAT: "创建时间",
  LASTUPDATE: "最后更新时间"
};
export default {
  ...MENU,
  ...DASHBOARD,
  ...NEWESTBLOCK,
  ...NEWESTTRANSACTION,
  ...BITCOIN,
  ...BLOCKCHAIN
};
