import React from "react";

import { BlockLink, AddressLink } from "../../components";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
import { useSubcribe } from "../../common";

export default function Blocks() {
  const [blocks] = useSubcribe("LATEST_BLOCKS_ROOM", "latestBlocks");

  return (
    <section className="panel">
      <div className="panel-heading">最新区块列表</div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>高度</th>
              <th>验证人</th>
              <th className="has-text-right">交易数</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map(({ number, producer, extrinsics }) => (
              <tr key={number}>
                <td>
                  <BlockLink value={number} />
                </td>
                <td>
                  <AddressLink className="text-truncate" value={producer} />
                </td>
                <td className="has-text-right">{extrinsics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <a className="view-more">
          查看全部
          <IconChevronRight />
        </a>
      </div>
    </section>
  );
}
