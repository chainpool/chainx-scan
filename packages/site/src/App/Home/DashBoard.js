import React from "react";

import { useSubcribe } from "../../common";

export default function DashBoard() {
  const [data] = useSubcribe("CHAIN_STATUS", "chainStatus");

  const dataSource = [
    {
      label: "最新高度",
      data: data.best
    },
    {
      label: "确认高度",
      data: data.finalized
    },
    {
      label: "交易总数",
      data: data.transactions
    },
    {
      label: "PCX 挖矿发行数量",
      data: data.pcx_issuance
    },
    {
      label: "PCX 销毁数量",
      data: data.pcx_destroy
    },
    {
      label: "充值挖矿难度",
      data: data.deposit_diff
    },
    {
      label: "投票挖矿难度",
      data: data.vote_diff
    },
    {
      label: "验证人数量",
      data: data.validators
    },
    {
      label: "总投票数",
      data: data.votes
    },
    {
      label: "当前分红周期",
      data: data.dividend_cycle
    },
    {
      label: "当前选举周期",
      data: data.vote_cycle
    }
  ];
  return (
    <section className="panel">
      <div className="panel-heading">链状态</div>
      <div className="panel-block" style={{ padding: 0 }}>
        <div className="columns is-multiline is-gapless" style={{ width: "100%" }}>
          {dataSource.map(item => (
            <div key={item.label} className="column is-3 dashboard-cell">
              <div className="dashboard-cell__title">{item.label}</div>
              <div className="dashboard-cell__content">{item.data}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// best: 45444
// deposit_diff: 0
// dividend_cycle: 302
// finalized: 0
// pcx_destroy: 0
// pcx_issuance: 1515000000000
// transactions: 39499
// validators: 7
// vote_cycle: 151
// vote_diff: 0
// votes: 37699000000
