import React, { useEffect, useMemo } from "react";

import { AddressLink, NumberFormat, Table, Amount } from "../../components";
import TableService from "../../services/tableService";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function NominationsList({ nodeID, ...props }) {
  const [{ tableData }, setState] = useRedux(`nominationsList-${nodeID}`, { tableData: {} });
  const tableService = useMemo(() => new TableService(api.fetchNominations$, tableData, { nodeID }), []);

  useEffect(() => {
    const subscription = tableService.fetchTable$().subscribe(data => setState({ tableData: data }));
    return () => subscription.unsubscribe();
  }, [tableService]);

  return <RenderNominationsList {...{ tableData, handleChange: tableService.handleChange }} />;
}

export function RenderNominationsList({ tableProps, tableData, handleChange }) {
  const { pagination, dataSource = [], loading } = { ...tableData, ...tableProps };
  const columns = [
    {
      title: <FormattedMessage id="ACCOUNTADDRESS" />,
      dataIndex: "nominator"
    },
    {
      title: (
        <>
          <FormattedMessage id="TOTALNOMINATIONS" />
          (PCX)
        </>
      ),
      dataIndex: "nomination"
    },
    {
      title: (
        <>
          <FormattedMessage id="UNFREEZERESERVED" />
          (PCX)
        </>
      ),
      dataIndex: "revocations"
    },
    {
      title: <FormattedMessage id="UPDATEWEIGHT" />,
      dataIndex: "last_vote_weight_update"
    },
    {
      title: <FormattedMessage id="WEIGHT" />,
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
          nomination: <Amount value={data.nomination} hideSymbol />,
          last_vote_weight_update: <NumberFormat value={data.last_vote_weight_update} />,
          last_vote_weight: <Amount value={data.last_vote_weight} hideSymbol />
        };
      })}
      columns={columns}
    />
  );
}
