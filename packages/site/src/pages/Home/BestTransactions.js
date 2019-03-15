import React from "react";
import { NavLink } from "react-router-dom";

import { TxLink, AddressLink, TxAction } from "../../components";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
import { useSubcribe } from "../../common";

export default function BestTransactions() {
  const [txs] = useSubcribe("LATEST_TRANSACTIONS_ROOM", "latestTxs");

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
