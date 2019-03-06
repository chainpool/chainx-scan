import React from "react";

import { NavLink } from "react-router-dom";

export default function TxLink(props) {
  const { value } = props;
  return (
    <NavLink to={`/${value}`} className="nav-link">
      {value}
    </NavLink>
  );
}
