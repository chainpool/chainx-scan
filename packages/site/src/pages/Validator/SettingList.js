import React, { useEffect } from "react";
import { Table, Spinner } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function SettingList({ nodeID, ...props }) {
  const [{ dataSource }, setState] = useRedux(`settingList-${nodeID}`, { dataSource: [] });

  useEffect(() => {
    const subscription = api.fetchTrusteeSettingList$(nodeID).subscribe(dataSource => setState({ dataSource }));
    return () => subscription.unsubscribe();
  }, [nodeID]);
  const columns = [
    {
      title: "链",
      dataIndex: "chain"
    },
    {
      title: "热公钥",
      dataIndex: "hot_entity"
    },
    {
      title: "冷公钥",
      dataIndex: "cold_entity"
    }
  ];
  return (
    <Table
      dataSource={dataSource.map(data => {
        return {
          key: `${data.chain}`,
          chain: data.chain,
          hot_entity: (
            <div className="text-truncate" style={{ maxWidth: 220 }} title={data.hot_entity}>
              {data.hot_entity}
            </div>
          ),
          cold_entity: (
            <div className="text-truncate" style={{ maxWidth: 220 }} title={data.cold_entity}>
              {data.cold_entity}
            </div>
          )
        };
      })}
      columns={columns}
    />
  );
}
