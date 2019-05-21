import React from "react";
import classnames from "classnames";

import { Amount, AntSpinner as Spinner } from "../../components";
import { FormattedMessage } from "react-intl";

export default function PendingOrders(props) {
  const { loading, handicap = { asks: [], bids: [] }, activePair } = props;
  const { precision, unit_precision: unitPrecision, currency_pair: currencyPair } = activePair || {};
  const totalConcatArr = [...handicap.asks, ...handicap.bids].map(item => item.total);
  const max = Math.max(...totalConcatArr);

  return (
    <section className="panel">
      <div className="panel-heading">
        <FormattedMessage id="ORDERS" />
      </div>
      <div className="panel-block handicap" style={{ minHeight: 365 }}>
        <dl className="handicap-list">
          <dt className="handicap-header">
            <span className="price">
              <FormattedMessage id="PRICE" />({currencyPair ? currencyPair[1] : "-"})
            </span>
            <span className="amount">
              <FormattedMessage id="AMOUNT" />({currencyPair ? currencyPair[0] : "-"})
            </span>
            <span className="total">
              <FormattedMessage id="ACCUMULATIVEDEPTH" />({currencyPair ? currencyPair[0] : "-"})
            </span>
          </dt>
          <dd className="handicap-content">
            {!loading ? (
              <div className="handicap-step">
                <div className="handicap-sell">
                  {handicap.asks.map((item, index) => (
                    <div className={classnames("ask-item", { odd: !(index % 2) })} key={index}>
                      <div className="asks capstotal" style={{ width: `${(item.total / max) * 66.6}%` }} />
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
                  {handicap.bids.map((item, index) => (
                    <div className={classnames("bid-item", { odd: !(index % 2) })} key={index}>
                      <div className="bids capstotal" style={{ width: `${(item.total / max) * 66.6}%` }} />
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
