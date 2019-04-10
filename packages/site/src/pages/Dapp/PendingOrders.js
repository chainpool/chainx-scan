import React from "react";
import classnames from "classnames";

import { Amount, AntSpinner as Spinner } from "../../components";

export default function PendingOrders(props) {
  const { loading, handicap, activePair } = props;
  const { precision, unit_precision: unitPrecision, currency_pair: currencyPair } = activePair || {};
  const min = !!handicap
    ? !!handicap.asks.length
      ? !!handicap.bids.length
        ? Math.min(handicap.asks[handicap.asks.length - 1].total, handicap.bids[0].total)
        : handicap.asks[handicap.asks.length - 1].total
      : handicap.bids[0].total
    : 0;
  const max = !!handicap
    ? !!handicap.asks.length
      ? !!handicap.bids.length
        ? Math.max(handicap.asks[0].total, handicap.bids[handicap.bids.length - 1].total)
        : handicap.asks[0].total
      : handicap.bids[handicap.bids.length - 1].total
    : 0;
  const derta = max - min || 1;
  return (
    <section className="panel">
      <div className="panel-heading">挂单列表</div>
      <div className="panel-block handicap" style={{ minHeight: 365 }}>
        <dl className="handicap-list">
          <dt className="handicap-header">
            <span className="price">价格({currencyPair ? currencyPair[1] : "---"})</span>
            <span className="amount">数量({currencyPair ? currencyPair[0] : "---"})</span>
            <span className="total">累计深度({currencyPair ? currencyPair[0] : "---"})</span>
          </dt>
          <dd className="handicap-content">
            {!loading ? (
              <div className="handicap-step">
                <div className="handicap-sell">
                  {handicap &&
                    handicap.asks &&
                    handicap.asks.map((item, index) => (
                      <div className={classnames("ask-item", { odd: !(index % 2) })} key={index}>
                        <div className="asks capstotal" style={{ width: `${((item.total - min) / derta) * 50}%` }} />
                        <span className="price">
                          <Amount
                            value={item.price}
                            precision={precision}
                            minDigits={precision - unitPrecision}
                            hideSymbol
                          />
                        </span>
                        <span className="amount">
                          <Amount value={item.amount} symbol={currencyPair[0]} hideSymbol />
                        </span>
                        <span className="total">
                          <Amount value={item.total} symbol={currencyPair[0]} hideSymbol />
                        </span>
                      </div>
                    ))}
                </div>
                <div className="handicap-now-price">
                  <span className="last-price">
                    <Amount
                      value={activePair.price.last_price}
                      precision={precision}
                      minDigits={precision - unitPrecision}
                      hideSymbol
                    />
                  </span>
                </div>
                <div className="handicap-buy">
                  {handicap &&
                    handicap.bids &&
                    handicap.bids.map((item, index) => (
                      <div className={classnames("bid-item", { odd: !(index % 2) })} key={index}>
                        <div className="bids capstotal" style={{ width: `${((item.total - min) / derta) * 80}%` }} />
                        <span className="price">
                          <Amount
                            value={item.price}
                            precision={precision}
                            minDigits={precision - unitPrecision}
                            hideSymbol
                          />
                        </span>
                        <span className="amount">
                          <Amount value={item.amount} symbol={currencyPair[0]} hideSymbol />
                        </span>
                        <span className="total">
                          <Amount value={item.total} symbol={currencyPair[0]} hideSymbol />
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex" }}>
                <Spinner />
              </div>
            )}
          </dd>
        </dl>
      </div>
    </section>
  );
}
