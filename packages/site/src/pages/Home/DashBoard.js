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
      label: <FormattedMessage id="LATESTBLOCK" />,
      data: <NumberFormat value={data.best} />
    },
    {
      label: <FormattedMessage id="CONFIRMBLOCK" />,
      data: <NumberFormat value={data.finalized} />
    },
    {
      label: (
        <>
          ChainX
          <FormattedMessage id="TRANSACTIONCOUNT" />
        </>
      ),
      data: <NumberFormat value={data.transactions} />
    },
    {
      label: <FormattedMessage id="ACCOUNTCOUNT" />,
      data: <NumberFormat value={data.account_count} />
    },
    {
      label: <FormattedMessage id="VALIDATORVOTESESSION" />,
      data: <NumberFormat value={data.vote_cycle} />
    },
    {
      label: <FormattedMessage id="VALIDATORS" />,
      data: (
        <NavLink to={`/validators`} className="nav-link">
          <NumberFormat value={data.validators} />
        </NavLink>
      )
    },
    {
      label: <FormattedMessage id="RELEASECOUNT" />,
      data: <Amount value={data.pcx_issuance} hideSymbol />
    },
    {
      label: <FormattedMessage id="MORTGAGECOUNT" />,
      data: <Amount value={data.selfvote_count} hideSymbol />
    },
    {
      label: <FormattedMessage id="USERVOTECOUNT" />,
      data: <Amount value={data.votes} hideSymbol />
    },
    {
      label: <FormattedMessage id="ELECTIONRATE" />,
      data: (
        <NumberFormat
          value={(data.selfvote_count + data.votes) / data.pcx_issuance}
          options={{ style: "percent", minimumFractionDigits: 2 }}
        />
      )
    },
    {
      label: <FormattedMessage id="TRADEPRICE" />,
      // 写死了精度 9
      data: <Amount value={data.last_price} symbol="BTC" precision={9} />
    },
    {
      label: <FormattedMessage id="BTCMINING" />,
      data: <Amount value={data.btc_power} hideSymbol />
    },
    {
      label: <FormattedMessage id="SDOTMINING" />,
      data: <Amount value={data.sdot_power} hideSymbol />
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
        <FormattedMessage id="CHAINSTATUS" />
      </div>
      <div className="panel-block flex-reverse align-start" style={{ padding: 0 }}>
        <Transaction style={{ width: "40%", height: "353px" }} />
        <div className="columns is-multiline is-gapless" style={{ width: "60%" }}>
          {dataSource && data && data.best
            ? dataSource.map((item, index) => (
                <div key={index} className="column is-3 dashboard-cell">
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
