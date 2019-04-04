const moduleNameMap = {
  XTokens: "充值挖矿",
  Sudo: "超级权限",
  Withdrawal: "提现",
  XSpot: "币币交易",
  XStaking: "投票选举",
  XSystem: "系统",
  System: "核心",
  XBridgeOfBTC: "Bitcoin桥",
  Timestamp: "时间戳",
  XAssets: "资产",
  XBridgeOfSDOT: "SDOT桥",
  finality_tracker: "确认高度"
};

export function getModuleName(module) {
  return moduleNameMap[module] || module;
}

const callNameMap = {
  unnominate: "撤销投票",
  sudo: "设置",
  set_block_producer: "设置出块人",
  push_header: "提交块头",
  final_hint: "设置",
  claim: "提息",
  set: "设置",
  setup_trustee: "信托设置",
  withdraw: "提现",
  nominate: "投票",
  create_withdraw_tx: "申请提现",
  sign_withdraw_tx: "响应提现",
  cancel_order: "撤单",
  register: "注册节点",
  put_order: "挂单",
  unfreeze: "解冻",
  push_transaction: "提交交易",
  transfer: "转账",
  refresh: "更新节点",
  Claimed: "领取SDOT",
  Sudid: "已设置",
  Deposit: "充值",
  WithdrawalFinish: "提现结束",
  Unfreeze: "撤回解冻",
  Move: "转移资产",
  Destory: "销毁资产",
  Unnominate: "撤票",
  WithdrawalFatalErr: "提现错误",
  NewAuthorities: "新验证人",
  DeployMultiSig: "部署多签账户",
  ExtrinsicSuccess: "交易完全成功",
  FillOrder: "成交订单",
  NewTrustees: "更新信托节点",
  MissedBlocksOfOfflineValidatorPerSession: "每个 session 掉线节点及漏块数",
  Refresh: "更新节点信息",
  Rotation: "验证人轮换",
  Withdrawal: "提现",
  InsertTx: "新增交易",
  Nominate: "注册节点",
  NewAccountIndex: "新建账户索引",
  UpdateOrderPair: "更新交易对",
  CreateWithdrawalProposal: "构造提现交易",
  NewAccount: "创建新账户",
  ExtrinsicFailed: "交易失败",
  UpdateSignWithdrawTx: "更新信托节点签名状态",
  Reward: "分红周期分发奖励",
  Claim: "提息",
  UpdateOrder: "更新订单",
  Issue: "发行资产",
  InsertHeader: "新增块头",
  WithdrawalApply: "提现申请",
  PutOrder: "挂单",
  NewSession: "开始新的 session"
};

export function getCallName(call) {
  return callNameMap[call] || call;
}
