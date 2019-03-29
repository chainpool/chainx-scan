import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useRedux, createStore } from "../../shared";
import api from "../../services/api";
import { Amount, Number, Spinner } from "../../components";
import PCX from "../../assets/tokens/pcx.png";

const store = createStore({ data: {} });

export default function DashBoard() {
  const [{ data }, setState] = useRedux(store);

  useEffect(() => {
    const subscription = api.fetchChainStatus$().subscribe(result => setState({ data: result }));
    return () => subscription.unsubscribe();
  }, [api]);

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
      label: "ChainX 交易总数",
      data: <Number value={data.transactions} />
    },
    {
      label: "发行总数",
      data: <Amount value={data.pcx_issuance} />
    },
    {
      label: "验证节点数",
      data: (
        <NavLink to={`/validators`} className="nav-link">
          <Number value={data.validators} />
        </NavLink>
      )
    },
    {
      label: "用户投票总数",
      data: <Amount value={data.votes} />
    },
    {
      label: "验证节点选举届数",
      data: <Number value={data.vote_cycle} />
    }
  ];

  const loading = (
    <div style={{ height: 176, background: "#fff", width: "100%", display: "flex" }}>
      <Spinner />
    </div>
  );

  return (
    <section className="panel">
      <div className="panel-heading">
        <img src={PCX} alt="pcx" className="panel-heading-icon" />
        链状态
      </div>
      <div className="panel-block" style={{ padding: 0 }}>
        <div className="columns is-multiline is-gapless" style={{ width: "100%" }}>
          {dataSource && data && data.best
            ? dataSource.map(item => (
                <div key={item.label} className="column is-3 dashboard-cell">
                  <div className="dashboard-cell__title">{item.label}</div>
                  <div className="dashboard-cell__content">{item.data}</div>
                </div>
              ))
            : loading}
        </div>
      </div>
    </section>
  );
}
