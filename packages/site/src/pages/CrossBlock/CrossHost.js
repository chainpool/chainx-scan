import React, { useEffect } from "react";

import { Table, ValidatorLink, ExternalLink } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

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
            trustee: <ValidatorLink value={data.trustee} />,
            hotAddress: <ExternalLink value={data.hotAddress} type="btcAddress" />,
            coldAddress: <ExternalLink value={data.coldAddress} type="btcAddress" />
          };
        })}
        columns={[
          {
            title: <FormattedMessage id="ERA" />,
            dataIndex: "id"
          },
          {
            title: <FormattedMessage id="TRUSTEES" />,
            dataIndex: "trustee"
          },
          {
            title: <FormattedMessage id="HOTADDRESS" />,
            dataIndex: "hotAddress"
          },
          {
            title: <FormattedMessage id="COLDADDRESS" />,
            dataIndex: "coldAddress"
          }
        ]}
      />
    </>
  );
}
