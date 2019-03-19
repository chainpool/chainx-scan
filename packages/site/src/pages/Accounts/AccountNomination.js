import React, { useState, useEffect } from "react";

import { Table, Amount, AddressLink } from "../../components";
import api from "../../services/api";

export default function AccountNomination(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const subscription = api.fetchAccountNominations$(props.accountId).subscribe(data => setList(data));
    return () => subscription.unsubscribe();
  }, [props.accountId]);

  const getRevocations = revocations => {
    return JSON.parse(revocations)
      .flat()
      .reduce((a, b) => a + b, 0);
  };

  return (
    <Table
      pagination={false}
      dataSource={
        list &&
        list.map(data => {
          return {
            key: data.nominee,
            nominee: <AddressLink value={data.nominee} isValidator />,
            nomination: <Amount value={data.nomination} />,
            revocations: <Amount value={getRevocations(data.revocations)} />
          };
        })
      }
      columns={[
        {
          title: "节点名称",
          dataIndex: "nominee"
        },
        {
          title: "投票数",
          dataIndex: "nomination",
          align: "right"
        },
        {
          title: "赎回冻结",
          dataIndex: "revocations",
          align: "right"
        }
      ]}
    />
  );
}
