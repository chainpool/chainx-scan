import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useRedux } from "../../shared";
import api from "../../services/api";
import {
  AddressLink,
  DateShow,
  ExternalLink,
  Hash,
  NumberFormat,
  TxLink,
  AntSpinner as Spinner
} from "../../components";
import Bitcoin from "../../assets/tokens/btc.png";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";

export default function BtcStatus() {
  const [{ data }, setState] = useRedux("btcStatus", { data: [] });

  useEffect(() => {
    const subscription = api.fetchBtcStatus$().subscribe(data => setState({ data: data }));
    return () => subscription.unsubscribe();
  }, [api]);

  const getTxNumber = txid => {
    return JSON.parse(txid).length;
  };

  const loading = (
    <tr style={{ height: 370, background: "#fff" }}>
      <td colSpan="8" style={{ verticalAlign: "middle" }}>
        <Spinner />
      </td>
    </tr>
  );

  return (
    <section className="panel">
      <div className="panel-heading">
        <img src={Bitcoin} alt="Bitcoin" className="panel-heading-icon" />
        Bitcoin
      </div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>Bitcoin块高</th>
              <th>Bitcoin区块哈希</th>
              <th>Bitcoin出块时间</th>
              <th>nonce</th>
              <th>跨链交易数</th>
              <th>ChainX中继交易哈希</th>
              <th>ChainX中继人</th>
              <th>ChainX中继时间</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length
              ? data.map(btcBlock => (
                  <tr key={btcBlock.bitcoin_height}>
                    <td>
                      <ExternalLink
                        type="btcHash"
                        value={btcBlock.header}
                        render={() => {
                          return <NumberFormat value={btcBlock.bitcoin_height} />;
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
                    <td>{btcBlock.nonce}</td>
                    <td>{getTxNumber(btcBlock.txid)}</td>
                    <td>
                      <TxLink style={{ width: 136 }} className="text-truncate" value={btcBlock.chainx_tx} />
                    </td>
                    <td>
                      <AddressLink style={{ width: 136 }} className="text-truncate" value={btcBlock.relay} />
                    </td>
                    <td>
                      <DateShow value={btcBlock["block.time"]} />
                    </td>
                  </tr>
                ))
              : loading}
          </tbody>
        </table>
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <NavLink className="view-more" to="/crossblocks">
          查看全部
          <IconChevronRight />
        </NavLink>
      </div>
    </section>
  );
}
