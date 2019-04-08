import React, { useEffect, useMemo } from "react";

import { AddressLink, Number, Table, Amount } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";

export default function NominationsList({ nodeID, ...props }) {
  const [{ tableData }, setState] = useRedux(`nominationsList-${nodeID}`, { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchNominations$, tableData, { nodeID }), []);

  useEffect(() => {
    const subscription = tableService.getState$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderNominationsList {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderNominationsList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = { ...tableData, ...tableProps };
  const columns = [
    {
      title: "账户地址",
      dataIndex: "nominator"
    },
    {
      title: "投票数量(PCX)",
      dataIndex: "nomination"
    },
    {
      title: "赎回冻结(PCX)",
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
      loading={loading}
      onChange={handleChange}
      pagination={pagination}
      dataSource={dataSource.map(data => {
        return {
          key: `${data.nominator}`,
          nominator: <AddressLink className="text-truncate" value={data.nominator} style={{ maxWidth: 140 }} />,
          revocations: <Amount value={getRevocations(data.revocations)} hideSymbol />,
          nomination: <Number value={data.nomination} />,
          last_vote_weight_update: <Number value={data.last_vote_weight_update} />,
          last_vote_weight: <Number value={data.last_vote_weight} />
        };
      })}
      columns={columns}
    />
  );
}
