import React from "react";

import { NavLink } from "react-router-dom";

export default function BlockLink(props) {
  const { value } = props;
  return <NavLink to={`/${value}`}>{value}</NavLink>;
}
