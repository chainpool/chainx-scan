import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames";

import PairList from "./PairList";
import PendingOrders from "./PendingOrders";
import CurrentEntrust, { RenderCurrentEntrust } from "./CurrentEntrust";
import HistoryEntrust, { RenderHistoryEntrust } from "./HistoryEntrust";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function Dapp() {
  const [activeKey, setActiveKey] = useState("currentEntrust");
  const [{ pairs, activePairId, loadingHandicap, handicap }, setState] = useRedux("dapp", {
    pairs: [],
    loadingHandicap: true
  });

  const activePair = useMemo(() => {
    const pair = pairs.find(pair => pair.pairid === activePairId) || pairs[0];
    return pair;
  }, [pairs, activePairId]);

  useEffect(() => {
    const subcription = api.fetchPairs$().subscribe(({ result }) =>
      setState({
        pairs: result.sort((a, b) => a.pairid - b.pairid)
      })
    );
    return () => subcription.unsubscribe();
  }, []);

  useEffect(() => {
    setState({
      loadingHandicap: true
    });
    if (activePair) {
      const subcription = api.fetchHandicap$(activePair.pairid).subscribe(({ result }) => {
        if (result) {
          let bidSum = 0;
          for (const item of result.bids) {
            bidSum += item.amount;
            item.total = bidSum;
          }
          let askSum = 0;
          for (const item of result.asks) {
            askSum += item.amount;
            item.total = askSum;
          }
          result.asks.reverse();
        }
        setState({
          loadingHandicap: false,
          handicap: result
        });
      });
      return () => subcription.unsubscribe();
    }
  }, [activePair && activePair.pairid]);

  return (
    <>
      <div className="columns">
        <div className="column">
          <PairList
            activePair={activePair}
            pairs={pairs}
            changeActivePairId={pairId =>
              setState({
                activePairId: pairId
              })
            }
          />
        </div>
        <div className="column">
          <PendingOrders loading={loadingHandicap} handicap={handicap} activePair={activePair} />
        </div>
      </div>
      <div className="box">
        <div className="tabs">
          <ul>
            <li
              onClick={() => setActiveKey("currentEntrust")}
              className={classnames({ "is-active": activeKey === "currentEntrust" })}
            >
              <a>当前委托列表</a>
            </li>
            <li
              onClick={() => setActiveKey("historyEntrust")}
              className={classnames({ "is-active": activeKey === "historyEntrust" })}
            >
              <a>历史成交列表</a>
            </li>
          </ul>
        </div>
        <>
          {activeKey === "currentEntrust" &&
            (!activePair ? <RenderCurrentEntrust /> : <CurrentEntrust activePair={activePair} />)}
          {activeKey === "historyEntrust" &&
            (!activePair ? <RenderHistoryEntrust /> : <HistoryEntrust activePair={activePair} />)}
        </>
      </div>
    </>
  );
}
