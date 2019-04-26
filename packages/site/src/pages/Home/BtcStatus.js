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
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
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
            <FormattedMessage id="TRUSTEEVOTESESSION" />
          </div>
          <div className="btc_content">{status.trustee_session}</div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="MULTISIGTRUSTEEBALANCE" /> (<FormattedMessage id="HOTADDRESS" />)
          </div>
          <div className="btc_content">
            <ExternalLink
              value={status.hot_address}
              type="btcAddress"
              render={() => <Amount value={status.hot_balance} symbol="BTC" />}
            />
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="MULTISIGTRUSTEEBALANCE" /> (<FormattedMessage id="COLDADDRESS" />)
          </div>
          <div className="btc_content">
            <ExternalLink
              value={status.cold_address}
              type="btcAddress"
              render={() => <Amount value={status.cold_balance} symbol="BTC" />}
            />
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="DEPOSITETRANSACTIONCOUNT" />
          </div>
          <div className="btc_content">
            <NavLink to="/crossblocks/bitcoin/deposits">{status.deposit_count}</NavLink>
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="WIDTHDRAWALTRANSACTIONCOUNT" />
          </div>
          <div className="btc_content">
            <NavLink to="/crossblocks/bitcoin/withdrawals">{status.withdraw_count}</NavLink>
          </div>
        </div>
        <div className="column btc_status">
          <div className="btc_title">
            <FormattedMessage id="CROSSBINDADDRESSCOUNT" />
          </div>
          <div className="btc_content">
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
                <FormattedMessage id="BLOCKHEIGHT" />
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
          <IconChevronRight />
        </NavLink>
      </div>
    </section>
  );
}
