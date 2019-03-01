import React from 'react';

import { NavLink } from 'react-router-dom';

const BlockLink = function BlockLink(props) {
  const { value } = props;
  return <NavLink to={`/${value}`}>{value}</NavLink>;
};

export default BlockLink;
