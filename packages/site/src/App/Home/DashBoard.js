import React from "react";

import { useSubcribe } from "../../common";
import { Amount, Number } from "../../components";

export default function DashBoard() {
  const [data] = useSubcribe("CHAIN_STATUS", "chainStatus");

  const dataSource = [
    {
      label: "最新高度",
      data: <Number value={data.best} />
    },
    {
      label: "确认高度",
      data: <Number value={data.finalized} />
    },
    {
      label: "交易总数",
      data: <Number value={data.transactions} />
    },
    {
      label: "PCX 挖矿发行数量",
      data: <Amount value={data.pcx_issuance} />
    },
    {
      label: "验证人数量",
      data: <Number value={data.validators} />
    },
    {
      label: "总投票数",
      data: <Amount value={data.votes} />
    },
    {
      label: "当前分红周期",
      data: <Number value={data.dividend_cycle} />
    },
    {
      label: "当前选举周期",
      data: <Number value={data.vote_cycle} />
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
