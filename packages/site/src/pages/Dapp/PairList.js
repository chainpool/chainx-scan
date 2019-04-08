import React from "react";
import classnames from "classnames";

import { Amount, AntSpinner as Spinner } from "../../components";
import BTC from "../../assets/tokens/btc.png";
import SDOT from "../../assets/tokens/sdot.png";
import PCX from "../../assets/tokens/pcx.png";

const pairMap = {
  BTC,
  SDOT,
  PCX
};

export default function PairList(props) {
  const { pairs, activePair, changeActivePairId = () => {} } = props;

  return (
    <section className="panel">
      <div className="panel-heading">交易对</div>
      <div className="panel-block pairs" style={{ minHeight: 365 }}>
        {activePair ? (
          <>
            <div className="pairs-items">
              {pairs
                .filter(pair => pair.online)
                .map(pair => {
                  const currency = pair.currency_pair[1];
                  const currencyImg = pairMap[currency];
                  return (
                    <div
                      className={classnames("pairs-item", { active: pair.pairid === activePair.pairid })}
                      onClick={() => changeActivePairId(pair.pairid)}
                      key={pair.pairid}
                    >
                      {currencyImg && <img src={currencyImg} className="pairs-item-icon" alt={currency} />}
                      {pair.currency_pair[1]}/{pair.currency_pair[0]}
                    </div>
                  );
                })}
            </div>
            <div className="pairs-content">
              <div className="pairs-content-item">
                <div className="pairs-content-item__label">最新成交价</div>
                <div className="pairs-content-item__value" style={{ fontSize: 24 }}>
                  <Amount
                    value={activePair.price && activePair.price.last_price}
                    precision={activePair.precision}
                    minDigits={activePair.precision - activePair.unit_precision}
                    symbol={activePair.currency_pair[0]}
                  />
                </div>
              </div>
              <div className="pairs-content-item">
                <div className="pairs-content-item__label">涨幅</div>
                <div className="pairs-content-item__value">-</div>
              </div>
              <div className="pairs-content-item">
                <div className="pairs-content-item__label">移动平均价</div>
                <div className="pairs-content-item__value">
                  <Amount
                    value={activePair.price && activePair.price.aver_price}
                    precision={activePair.precision}
                    minDigits={activePair.precision - activePair.unit_precision}
                    symbol={activePair.currency_pair[0]}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex" }}>
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
}
