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
  if (dataSource && dataSource.length >= 0) {
    return <RenderSettingList {...{ dataSource }} />;
  }

  return <Spinner />;
}

export function RenderSettingList({ tableProps, dataSource = [], handleChange }) {
  const { pagination } = { ...tableProps };
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
      onChange={handleChange}
      pagination={pagination}
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
