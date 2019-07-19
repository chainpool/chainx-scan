import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useRedux } from "../../shared";
import api from "../../services/api";
import {
  AddressLink,
  DateShow,
  ExternalLink,
  Hash,
  Amount,
  NumberFormat,
  TxLink,
  AntSpinner as Spinner
} from "../../components";
import Bitcoin from "../../assets/tokens/btc.png";
import { ReactComponent as Right } from "../../assets/right.svg";
import { FormattedMessage } from "react-intl";

export default function BtcStatus() {
  const [{ data }, setState] = useRedux("btcStatus", { data: [] });
  const [status, setList] = useState({});

  useEffect(() => {
    const subscription = api.fetchBtcStatus$().subscribe(data => setState({ data }));
    return () => subscription.unsubscribe();
  }, [api]);

  useEffect(() => {
    const subscription = api.fetchHTTPBtcStatus$().subscribe(status => setList(status));
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
      <div className="columns btc_block">
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="MULTISIGTRUSTEEHOTBALANCE" />
          </div>
          <div className="btc_content">
            <ExternalLink
              value={status.hot_address}
              type="btcAddress"
              render={() => <Amount value={status.hot_balance} symbol="BTC" hideSymbol />}
            />
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="MULTISIGTRUSTEECOLDBALANCE" />
          </div>
          <div className="btc_content">
            <ExternalLink
              value={status.cold_address}
              type="btcAddress"
              render={() => <Amount value={status.cold_balance} symbol="BTC" hideSymbol />}
            />
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="lockbtcstatusbalance" />
          </div>
          <div className="btc_content">
            <NavLink to="/crossblocks/bitcoin/locklist">
              <Amount value={status.lockup_balance} symbol="BTC" hideSymbol />
            </NavLink>
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="BITCOIN_DEPOSIT" /> / {""}
            <FormattedMessage id="BITCOIN_WITHDRAWAL" /> / {""}
            <FormattedMessage id="BITCOIN_LOCK" />
            <FormattedMessage id="BITCOIN_TX_COUNT" />
          </div>
          <div className="btc_content">
            <NavLink to="/crossblocks/bitcoin/deposits">{status.deposit_count}</NavLink> / {""}
            <NavLink to="/crossblocks/bitcoin/withdrawals">{status.withdraw_count}</NavLink> / {""}
            <NavLink to="/crossblocks/bitcoin/locklist">{status.lockup_count}</NavLink>
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="BITCOIN_CROSS_CHAIN_ADDR" />
          </div>
          <div className="btc_content">
            <NavLink to="/crossblocks/bitcoin/locklist">{status.lockup_address_count}</NavLink> /{" "}
            <NavLink to="/crossblocks/bitcoin/crossbind">{status.bind_count}</NavLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>
                Bitcoin
                <FormattedMessage id="HEIGHT" />
              </th>
              <th>
                Bitcoin
                <FormattedMessage id="BLOCKHASH" />
              </th>
              <th>
                Bitcoin
                <FormattedMessage id="BLOCKTIME" />
              </th>
              <th>nonce</th>
              <th>
                <FormattedMessage id="CROSSTRANSACTION" />
              </th>
              <th>
                ChainX
                <FormattedMessage id="TRUNKTRANSACTIONHASH" />
              </th>
              <th>
                ChainX
                <FormattedMessage id="TRUNKTRANSACTIONER" />
              </th>
              <th>
                ChainX
                <FormattedMessage id="TRUNKTRANSACTIONTIME" />
              </th>
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
          <FormattedMessage id="SHOWALL" />
          <Right className="right" />
        </NavLink>
      </div>
    </section>
  );
}
