import React from "react";

import { NavLink } from "react-router-dom";

export default function AddressLink(props) {
  const { value } = props;
  return <NavLink to={`/${value}`}>{value}</NavLink>;
}
