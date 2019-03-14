import React, { useState, useEffect } from "react";

import { fetch } from "../../common";
import { BlockLink, AddressLink, TxLink, TxAction } from "../../components";
import Events from "../Events";

export default function BlockDetail(props) {
  const { match } = props;

  const [data, setData] = useState([]);

  const queryPath = `/tx/${match.params.txid}`;

  useEffect(() => {
    fetchData();
  }, [queryPath]);

  async function fetchData() {
    const result = await fetch(queryPath);
    setData(result);
  }

  const list = [
    {
      label: "区块高度",
      data: <BlockLink value={data.number} />
    },
    {
      label: "序号",
      data: data.index
    },
    {
      label: "交易哈希",
      data: <TxLink value={data.hash} />
    },
    {
      label: "发送人",
      data: <AddressLink value={data.signed} />
    },
    {
      label: "签名",
      data: data.signature
    },
    {
      label: "操作",
      data: <TxAction module={data.module} call={data.call} />
    },
    {
      label: "版本",
      data: data.version
    },
    {
      label: "加速",
      data: data.acceleration
    },
    {
      label: "data",
      data: data.data
    }
  ];

  return (
    <div>
      <h4 className="title is-size-5">交易详情</h4>
      <section className="panel panel-list">
        {list.map(item => (
          <div className="panel-block panel-item" key={item.label}>
            <div className="panel-item__title">{item.label}</div>
            <div className="panel-item__content">{item.data}</div>
          </div>
        ))}
      </section>
      <div className="box">
        <div className="tabs">
          <ul>
            <li className="is-active">
              <a>事件列表</a>
            </li>
          </ul>
        </div>
        {data && data.number && <Events path={`/events?block=${data.number}`} tableProps={{ pagination: false }} />}
      </div>
    </div>
  );
}
