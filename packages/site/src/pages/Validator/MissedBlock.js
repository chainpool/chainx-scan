import React, { useState, useEffect } from "react";
import { AddressLink, NumberFormat, Table } from "../../components";
import api from "../../services/api";

export default function MissedBlock() {
  const [{ dataSource, loading }, setState] = useState({ dataSource: [], loading: true });
  useEffect(() => {
    const subscription = api.fetchIntendtionMissed$().subscribe(data => {
      setState({ dataSource: data, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);
  return <RenderMissedBlock dataSource={dataSource} loading={loading} />;
}
export function RenderMissedBlock(props) {
  const { dataSource = [], pagination = false, handleChange = null, loading = true } = props;
  return (
    <Table
      loading={loading}
      onchange={handleChange}
      pagination={pagination}
      dataSource={
        dataSource &&
        dataSource.map((data, index) => {
          return {
            key: `${data.accountid}-${data.period}`,
            missed: data.missed,
            accountid: <AddressLink value={data.accountid} />,
            period: <NumberFormat value={data.period} />
          };
        })
      }
      columns={[
        {
          title: "届数",
          dataIndex: "period"
        },
        {
          title: "验证人",
          dataIndex: "accountid"
        },
        {
          title: "漏块数",
          dataIndex: "missed"
        }
      ]}
    />
  );
}
