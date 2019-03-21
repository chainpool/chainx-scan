import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { TxLink, AddressLink, TxAction } from "../../components";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
import api from "../../services/api";
import { useSubject, SubjectState } from "../../shared";

const subject = new SubjectState({ txs: [] });

export default function BestTransactions() {
  const [{ txs }, setState] = useSubject(subject);

  useEffect(() => {
    const subscription = api.fetchLatestTxs$().subscribe(data => setState({ txs: data }));
    return () => subscription.unsubscribe();
  }, [api]);

  return (
    <section className="panel">
      <div className="panel-heading">最新交易</div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>交易哈希</th>
              <th>发送人</th>
              <th className="has-text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {txs.map(tx => (
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <NavLink className="view-more" to="/txs">
          查看全部
          <IconChevronRight />
        </NavLink>
      </div>
    </section>
  );
}