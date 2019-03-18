import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { BlockLink, AddressLink, Number } from "../../components";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
import { useSubject, SubjectState } from "../../shared";
import api from "../../services/api";

const subject = new SubjectState({ blocks: [] });

export default function Blocks() {
  const [{ blocks }, setState] = useSubject(subject);

  useEffect(() => {
    const subscription = api.fetchLatestBlocks$().subscribe(data => setState({ blocks: data }));
    return () => subscription.unsubscribe();
  }, [api]);

  return (
    <section className="panel">
      <div className="panel-heading">最新区块</div>
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
                  <AddressLink isValidator value={producer} />
                </td>
                <td className="has-text-right">
                  <Number value={extrinsics} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel-block panel-footer-link" style={{ justifyContent: "center" }}>
        <NavLink className="view-more" to="/blocks">
          查看全部
          <IconChevronRight />
        </NavLink>
      </div>
    </section>
  );
}
