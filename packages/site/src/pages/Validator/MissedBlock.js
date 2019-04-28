import React, { useState, useEffect } from "react";
import { AddressLink, NumberFormat, Table } from "../../components";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

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
          title: <FormattedMessage id="ERA" />,
          dataIndex: "period"
        },
        {
          title: <FormattedMessage id="VALIDATOR" />,
          dataIndex: "accountid"
        },
        {
          title: <FormattedMessage id="MISSEDBLOCKS" />,
          dataIndex: "missed"
        }
      ]}
    />
  );
}