import React, { useEffect, useState } from "react";
import { Amount, ExternalLink, Hash, Table } from "../../components";
import api from "../../services/api";
import { hexStripPrefix } from "@polkadot/util";

export default function CrossClaim() {
  const [{ dataSource, loading }, setState] = useState({ dataSource: [], loading: true });

  useEffect(() => {
    const subscription = api.fetchDepositClaim$().subscribe(data => setState({ dataSource: data, loading: false }));
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={dataSource.map(data => {
        return {
          key: data.txid,
          hash: (
            <ExternalLink
              type="btcTxid"
              value={hexStripPrefix(data.txid)}
              render={() => {
                return <Hash style={{ width: 136 }} className="text-truncate" value={data.txid} />;
              }}
            />
          ),
          address: <ExternalLink type="btcAddress" value={data.address} />,
          balance: <Amount value={data.balance} hideSymbol />
        };
      })}
      columns={[
        {
          title: "Bitcoin交易哈希",
          dataIndex: "hash"
        },
        {
          title: "Bitcoin来源地址",
          dataIndex: "address"
        },
        {
          title: "金额",
          dataIndex: "balance"
        }
      ]}
    />
  );
}
