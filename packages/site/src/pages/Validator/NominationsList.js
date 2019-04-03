import React, { useEffect, useMemo } from "react";

import { AddressLink, Number, Spinner, Table, Amount } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function NominationsList() {
  const [{ tableData }, setState] = useRedux("nominationsList", { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchAccountNominations$, tableData), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  if (tableData && tableData.dataSource && tableData.dataSource.length > 0) {
    return <RenderNominationsList {...{ tableData, handleChange: tableService.handleChange }} />;
  }

  return <Spinner />;
}

export function RenderNominationsList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = { ...tableData, ...tableProps };
  const columns = [
    {
      title: "账户地址",
      dataIndex: "nominator"
    },
    {
      title: "投票数量",
      dataIndex: "nomination"
    },
    {
      title: "赎回冻结",
      dataIndex: "revocations"
    },
    {
      title: "票龄更新高度",
      dataIndex: "last_vote_weight_update"
    },
    {
      title: "历史总票数",
      dataIndex: "last_vote_weight"
    }
  ];

  const getRevocations = revocations => {
    return revocations.flat().reduce((a, b) => a + b, 0);
  };
  return (
    <Table
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: `${data.nominator}`,
          nominator: <AddressLink className="text-truncate" value={data.nominator} style={{ maxWidth: 140 }} />,
          revocations: <Amount value={getRevocations(data.revocations)} />,
          nomination: <Number value={data.nomination} />,
          last_vote_weight_update: <Number value={data.last_vote_weight_update} />,
          last_vote_weight: <Number value={data.last_vote_weight} />
        };
      })}
      columns={columns}
    />
  );
}

export function RenderSettingList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [] } = { ...tableData, ...tableProps };
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
