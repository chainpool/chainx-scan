import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { TxLink, AddressLink, TxAction, AntSpinner as Spinner } from "../../components";
import { ReactComponent as Right } from "../../assets/right.svg";
import api from "../../services/api";
import { useRedux } from "../../shared";
import { FormattedMessage } from "react-intl";

export default function BestTransactions() {
  const [{ txs }, setState] = useRedux("bestTransactions", { txs: [] });

  useEffect(() => {
    const subscription = api.fetchLatestTxs$().subscribe(data => setState({ txs: data }));
    return () => subscription.unsubscribe();
  }, [api]);

  const loading = (
    <tr style={{ height: 222, background: "#fff" }}>
      <td colSpan="3" style={{ verticalAlign: "middle" }}>
        <Spinner />
      </td>
    </tr>
  );

  return (
    <section className="panel">
      <div className="panel-heading">
        <FormattedMessage id="NEWESTTRANSACTION" />
      </div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="TRANSACTIONHASH" />
              </th>
              <th>
                <FormattedMessage id="SENDER" />
              </th>
              <th className="has-text-right">
                <FormattedMessage id="ACTION" />
              </th>
            </tr>
          </thead>
          <tbody>
            {txs && txs.length
              ? txs.slice(0, 6).map(tx => (
                  <tr key={tx.hash}>
                    <td>
                      <TxLink style={{ width: 80 }} className="text-truncate" value={tx.hash} />
                    </td>
                    <td>
                      <AddressLink style={{ width: 80 }} className="text-truncate" value={tx.signed} />
                    </td>
                    <td className="has-text-right">
                      <div style={{ maxWidth: 180 }} className="text-truncate">
                        <TxAction module={tx.module} call={tx.call} />
                      </div>
                    </td>
                  </tr>
                ))
              : loading}
          </tbody>
        </table>
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <NavLink className="view-more" to="/txs">
          <FormattedMessage id="SHOWALL" />
          <Right className="right" />
        </NavLink>
      </div>
    </section>
  );
}
