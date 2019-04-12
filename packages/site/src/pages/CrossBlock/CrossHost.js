import React, { useEffect } from "react";

import { Table, ValidatorLink } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function CrossHost() {
  const [{ dataSource, loading }, setState] = useRedux("crossHost", { dataSource: [], loading: true });
  useEffect(() => {
    const subscription = api.fetchTrusteeList$().subscribe(data => {
      setState({ dataSource: data, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Table
        loading={loading}
        pagination={false}
        dataSource={dataSource.map((data, index) => {
          return {
            key: index,
            id: data.id,
            trustee: <ValidatorLink value={data.trustee} name={data.name} />
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
