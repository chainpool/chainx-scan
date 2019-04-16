import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { BlockLink, NumberFormat, AntSpinner as Spinner, ValidatorLink } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";

export default function BestBlocks() {
  const [{ blocks }, setState] = useRedux("bestBlocks", { blocks: [] });
  useEffect(() => {
    const subscription = api.fetchLatestBlocks$().subscribe(({ result: data }) => setState({ blocks: data }));
    return () => subscription.unsubscribe();
  }, [api]);

  const loading = (
    <tr style={{ height: 370, background: "#fff" }}>
      <td colSpan="3" style={{ verticalAlign: "middle" }}>
        <Spinner />
      </td>
    </tr>
  );

  return (
    <section className="panel">
      <div className="panel-heading">最新区块</div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>块高</th>
              <th>验证人</th>
              <th className="has-text-right">交易数</th>
            </tr>
          </thead>
          <tbody>
            {blocks && blocks.length
              ? blocks.map(({ number, producer, extrinsics }) => (
                  <tr key={number}>
                    <td>
                      <BlockLink value={number} />
                    </td>
                    <td>
                      <ValidatorLink value={producer} />
                    </td>
                    <td className="has-text-right">
                      <NumberFormat value={extrinsics} />
                    </td>
                  </tr>
                ))
              : loading}
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
