import React, { useEffect, useCallback } from "react";

import { useSubject, SubjectState } from "../../shared";
import api from "../../services/api";
import { Hash, Number, DateShow, TxLink, ExternalLink } from "../../components";

const subject = new SubjectState({ data: [] });

export default function BtcStatus() {
  const [{ data }, setState] = useSubject(subject);

  useEffect(() => {
    const subscription = api.fetchBtcStatus$().subscribe(data => setState({ data: data }));
    return () => subscription.unsubscribe();
  }, [api]);

  const getTxNumber = txid => {
    return JSON.parse(txid).length;
  };

  return (
    <section className="panel">
      <div className="panel-heading">Bitcoin</div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>块高</th>
              <th>区块哈希</th>
              <th>时间</th>
              <th>中继人</th>
              <th>PCX 交易哈希</th>
              <th className="has-text-right">交易数</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(btcBlock => (
                <tr key={btcBlock.bitcoin_height}>
                  <td>
                    <ExternalLink
                      type="btcHash"
                      value={btcBlock.header}
                      render={() => {
                        return <Number value={btcBlock.bitcoin_height} />;
                      }}
                    />
                  </td>
                  <td>
                    <ExternalLink
                      type="btcHash"
                      value={btcBlock.header}
                      render={() => {
                        return <Hash style={{ width: 136 }} className="text-truncate" value={btcBlock.header} />;
                      }}
                    />
                  </td>
                  <td>
                    <DateShow value={btcBlock.time * 1000} />
                  </td>
                  <td>
                    <Hash style={{ width: 136 }} className="text-truncate" value={btcBlock.relay} />
                  </td>
                  <td>
                    <TxLink style={{ width: 136 }} className="text-truncate" value={btcBlock.chainx_tx} />
                  </td>
                  <td className="has-text-right">{getTxNumber(btcBlock.txid)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
