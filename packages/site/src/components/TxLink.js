import React from 'react';

import { NavLink } from 'react-router-dom';

const TxLink = function TxLink(props) {
  const { value } = props;
  return <NavLink to={`/${value}`}>{value}</NavLink>;
};

export default TxLink;
