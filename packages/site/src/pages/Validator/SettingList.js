import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function SettingList({ nodeID, ...props }) {
  const [{ dataSource }, setState] = useRedux(`settingList-${nodeID}`, { dataSource: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchTrusteeSettingList$(nodeID).subscribe(dataSource => {
      setLoading(false);
      setState({ dataSource });
    });
    return () => subscription.unsubscribe();
  }, [nodeID]);

  const columns = [
    {
      title: <FormattedMessage id="CHAIN" />,
      dataIndex: "chain"
    },
    {
      title: <FormattedMessage id="HOTKEY" />,
      dataIndex: "hot_entity"
    },
    {
      title: <FormattedMessage id="COLDKEY" />,
      dataIndex: "cold_entity"
    }
  ];

  return (
    <Table
      loading={loading}
      dataSource={
        !!dataSource &&
        dataSource.map(data => {
          return {
            key: `${data.chain}`,
            chain: data.chain,
            hot_entity: (
              <div className="text-truncate" style={{ maxWidth: 360 }} title={data.hot_entity}>
                {data.hot_entity}
              </div>
            ),
            cold_entity: (
              <div className="text-truncate" style={{ maxWidth: 360 }} title={data.cold_entity}>
                {data.cold_entity}
              </div>
            )
          };
        })
      }
      columns={columns}
    />
  );
}
