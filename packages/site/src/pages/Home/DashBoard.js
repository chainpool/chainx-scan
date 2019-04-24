import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FormattedMessage } from "react-intl";

import { useRedux } from "../../shared";
import api from "../../services/api";
import { Amount, NumberFormat, AntSpinner as Spinner } from "../../components";
import PCX from "../../assets/tokens/pcx.png";
import Transaction from "./Transaction";

export default function DashBoard() {
  const [{ data }, setState] = useRedux("dashBoard", { data: {} });

  useEffect(() => {
    const subscription = api.fetchChainStatus$().subscribe(result => setState({ data: result }));
    return () => subscription.unsubscribe();
  }, [api]);

  const dataSource = [
    {
      label: <FormattedMessage id="latestBlock" />,
      data: <NumberFormat value={data.best} />
    },
    {
      label: <FormattedMessage id="confirmBlock" />,
      data: <NumberFormat value={data.finalized} />
    },
    {
      label: (
        <>
          Chainx <FormattedMessage id="transactionCount" />
        </>
      ),
      data: <NumberFormat value={data.transactions} />
    },
    {
      label: <FormattedMessage id="accountCount" />,
      data: <NumberFormat value={data.account_count} />
    },
    {
      label: <FormattedMessage id="validatorVoteSession" />,
      data: <NumberFormat value={data.vote_cycle} />
    },
    {
      label: <FormattedMessage id="validators" />,
      data: (
        <NavLink to={`/validators`} className="nav-link">
          <NumberFormat value={data.validators} />
        </NavLink>
      )
    },
    {
      label: <FormattedMessage id="releaseCount" />,
      data: <Amount value={data.pcx_issuance} hideSymbol />
    },
    {
      label: <FormattedMessage id="mortgageCount" />,
      data: <Amount value={data.selfvote_count} hideSymbol />
    },
    {
      label: <FormattedMessage id="userVoteCount" />,
      data: <Amount value={data.votes} hideSymbol />
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
        <FormattedMessage id="chainStatus" />
      </div>
      <div className="panel-block flex-reverse align-start" style={{ padding: 0 }}>
        <Transaction style={{ width: "40%" }} />
        <div className="columns is-multiline is-gapless" style={{ width: "60%" }}>
          {dataSource && data && data.best
            ? dataSource.map((item, index) => (
                <div key={index} className="column is-4 dashboard-cell">
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
