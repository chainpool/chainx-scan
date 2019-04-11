import React, { useState, useEffect } from "react";

import { Table, Amount, ValidatorLink, Number } from "../../components";
import api from "../../services/api";

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
            updateHeight: <Number value={data.last_vote_weight_update} />,
            weight: <Number value={data.last_vote_weight} />
          };
        })
      }
      columns={[
        {
          title: "节点名",
          dataIndex: "nominee"
        },
        {
          title: "票龄更新高度",
          dataIndex: "updateHeight"
        },
        {
          title: "历史总票龄",
          dataIndex: "weight"
        },
        {
          title: "投票金额 (PCX)",
          dataIndex: "nomination"
        },
        {
          title: "赎回冻结 (PCX)",
          dataIndex: "revocations",
          align: "right"
        }
      ]}
    />
  );
}
