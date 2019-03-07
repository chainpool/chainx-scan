import React from "react";

import { TxLink, AddressLink, TxAction } from "../../components";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
import { useSubcribe } from "../../common";

export default function BestTransactions() {
  const [txs] = useSubcribe("LATEST_TRANSACTIONS_ROOM", "latestTxs");

  console.log(txs);

  return (
    <section className="panel">
      <div className="panel-heading">最新交易列表</div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>交易哈希</th>
              <th>发送人</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {txs.map(tx => (
              <tr key={tx.hash}>
                <td>
                  <TxLink value={tx.hash} />
                </td>
                <td>
                  <AddressLink value={tx.signed} />
                </td>
                <td>
                  <TxAction module={tx.module} call={tx.call} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <a className="view-more">
          查看全部
          <IconChevronRight />
        </a>
      </div>
    </section>
  );
}
