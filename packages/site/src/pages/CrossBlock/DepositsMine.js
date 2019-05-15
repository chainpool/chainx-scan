import React, { useEffect } from "react";

import { Table, Amount } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";
import { useAppContext } from "../../components/AppContext";

export default function DepositsMine() {
  const [{ dataSource, loading }, setState] = useRedux("depositsMine", { dataSource: [], loading: true });

  useEffect(() => {
    const subscription = api.fetchDepositsMine$().subscribe(data => {
      setState({ dataSource: data, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);

  return <RenderDepositsMine {...{ dataSource, loading }} />;
}

export function RenderDepositsMine({ dataSource, loading }) {
  return (
    <div className="box">
      <Table
        loading={loading}
        pagination={false}
        dataSource={dataSource.map(data => {
          return {
            key: data.id,
            id: data.id,
            circulation: <Amount value={data.circulation} symbol={data.id} hideSymbol />,
            power: <Amount value={data.power} hideSymbol />,
            vote: (
              <Amount
                value={
                  (data.power * data.circulation) / Math.pow(10, tokens.find(item => item.token === data.id).precision)
                }
                hideSymbol
              />
            ),
            jackpot: <Amount value={data.jackpot} hideSymbol />,
            lastTotalDepositWeightUpdate: data.lastTotalDepositWeightUpdate,
            lastTotalDepositWeight: <Amount value={data.lastTotalDepositWeight} hideSymbol />
          };
        })}
        columns={[
          {
            title: <FormattedMessage id="ASSETTYPE" />,
            dataIndex: "id"
          },
          {
            title: <FormattedMessage id="CHAINTOTALBALANCE" />,
            dataIndex: "circulation"
          },
          {
            title: (
              <>
                <FormattedMessage id="MININGPOWER" />
                (PCX)
              </>
            ),
            dataIndex: "power"
          },
          {
            title: (
              <>
                <FormattedMessage id="EQUIVALENTNOMINATIONS" />
                (PCX)
              </>
            ),
            dataIndex: "vote"
          },
          {
            title: (
              <>
                <FormattedMessage id="JACKPOTBALANCE" />
                (PCX)
              </>
            ),
            dataIndex: "jackpot"
          },
          {
            title: <FormattedMessage id="JACKPOTLASTUPDATE" />,
            dataIndex: "lastTotalDepositWeightUpdate"
          },
          {
            title: <FormattedMessage id="WEIGHT" />,
            dataIndex: "lastTotalDepositWeight"
          }
        ]}
      />
    </div>
  );
}
