import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { TxLink, AddressLink, TxAction, AntSpinner as Spinner } from "../../components";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
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
    <tr style={{ height: 370, background: "#fff" }}>
      <td colSpan="3" style={{ verticalAlign: "middle" }}>
        <Spinner />
      </td>
    </tr>
  );

  return (
    <section className="panel">
      <div className="panel-heading">
        <FormattedMessage id="newestTransaction" />
      </div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="transactionHash" />
              </th>
              <th>
                <FormattedMessage id="sender" />
              </th>
              <th className="has-text-right">
                <FormattedMessage id="operation" />
              </th>
            </tr>
          </thead>
          <tbody>
            {txs && txs.length
              ? txs.map(tx => (
                  <tr key={tx.hash}>
                    <td>
                      <TxLink style={{ width: 136 }} className="text-truncate" value={tx.hash} />
                    </td>
                    <td>
                      <AddressLink style={{ width: 180 }} className="text-truncate" value={tx.signed} />
                    </td>
                    <td className="has-text-right">
                      <TxAction module={tx.module} call={tx.call} />
                    </td>
                  </tr>
                ))
              : loading}
          </tbody>
        </table>
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <NavLink className="view-more" to="/txs">
          <FormattedMessage id="showAll" />
          <IconChevronRight />
        </NavLink>
      </div>
    </section>
  );
}
