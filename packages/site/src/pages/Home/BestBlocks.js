import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { BlockLink, NumberFormat, AntSpinner as Spinner, ValidatorLink } from "../../components";
import { useRedux } from "../../shared";
import api from "../../services/api";
import { ReactComponent as IconChevronRight } from "../../assets/IconChevronRight.svg";
import { FormattedMessage } from "react-intl";

export default function BestBlocks() {
  const [{ blocks }, setState] = useRedux("bestBlocks", { blocks: [] });
  useEffect(() => {
    const subscription = api.fetchLatestBlocks$().subscribe(data => setState({ blocks: data }));
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
      <div className="panel-heading">
        <FormattedMessage id="NEWESTBLOCK" />
      </div>
      <div className="panel-block">
        <table className="table is-striped is-fullwidth data-table">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="BLOCKHEIGHT" />
              </th>
              <th>
                <FormattedMessage id="VALIDATOR" />
              </th>
              <th className="has-text-right">
                <FormattedMessage id="TRANSACTIONCOUNT" />
              </th>
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
          <FormattedMessage id="SHOWALL" />
          <IconChevronRight />
        </NavLink>
      </div>
    </section>
  );
}
