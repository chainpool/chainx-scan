import React, { useEffect } from "react";

import { Table, AddressLinkVilidator } from "@src/components";
import { useAppContext } from "@src/components/AppContext";
import { hexAddPrefix } from "@polkadot/util";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function CrossHost() {
  const [{ dataSource, loading }, setState] = useRedux("crossHost", { dataSource: [], loading: true });

  const [{ intentions = [] }] = useAppContext();
  useEffect(() => {
    if (!!intentions.length) {
      const subscription = api.fetchTrusteeList$().subscribe(data => {
        data = data.map(item => {
          const hexValue = hexAddPrefix(item.trustee);
          const { name = "" } = intentions.find(({ accountid }) => accountid === hexValue) || {};
          item.name = name;
          return item;
        });
        setState({ dataSource: data, loading: false });
      });
      return () => subscription.unsubscribe();
    }
  }, [intentions]);

  return (
    <>
      <Table
        loading={loading}
        pagination={false}
        dataSource={dataSource.map((data, index) => {
          return {
            key: index,
            id: data.id,
            trustee: <AddressLinkVilidator hexValue={data.trustee} value={data.name} />
          };
        })}
        columns={[
          {
            title: "届数",
            dataIndex: "id"
          },
          {
            title: "信托节点",
            dataIndex: "trustee"
          }
        ]}
      />
    </>
  );
}
