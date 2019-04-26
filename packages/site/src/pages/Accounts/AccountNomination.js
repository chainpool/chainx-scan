import React, { useState, useEffect } from "react";

import { Table, Amount, ValidatorLink, NumberFormat } from "../../components";
import api from "../../services/api";
import { FormattedMessage } from "react-intl";

export default function AccountNomination(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = api.fetchAccountNominations$(props.accountId).subscribe(data => {
      setLoading(false);
      setList(data);
    });
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  const getRevocations = revocations => {
    return JSON.parse(revocations)
      .flat()
      .reduce((a, b) => a + b, 0);
  };

  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={
        list &&
        list.map(data => {
          return {
            key: data.nominee,
            nominee: <ValidatorLink value={data.nominee} />,
            nomination: <Amount value={data.nomination} hideSymbol />,
            revocations: <Amount value={getRevocations(data.revocations)} hideSymbol />,
            updateHeight: <NumberFormat value={data.last_vote_weight_update} />,
            weight: <NumberFormat value={data.last_vote_weight} />
          };
        })
      }
      columns={[
        {
          title: <FormattedMessage id="INTENSIONNAME" />,
          dataIndex: "nominee"
        },
        {
          title: <FormattedMessage id="UPDATEWEIGHT" />,
          dataIndex: "updateHeight"
        },
        {
          title: <FormattedMessage id="WEIGHT" />,
          dataIndex: "weight"
        },
        {
          title: (
            <>
              <FormattedMessage id="BONDED" />
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
          dataIndex: "revocations",
          align: "right"
        }
      ]}
    />
  );
}
