import React from "react";
import NoDataImg from "../assets/noData.jpg";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";

export default injectIntl(function NoData({ id, intl: { messages } }) {
  return (
    <>
      <div className="no-data" style={{ padding: "10%", textAlign: "center" }}>
        <img className="no-data-item" src={NoDataImg} width={180} height={180} alt="" />
        <span className="no-data-item">"{id}"</span>
        <span className="nagtive no-data-item">{messages.OTHERS.NODATA}</span>
        <NavLink className="to-home no-data-item btn-primary" to="/">
          {messages.OTHERS.TOHOME}
        </NavLink>
      </div>
    </>
  );
});
