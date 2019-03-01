import React from 'react';

import { NavLink } from 'react-router-dom';

const AddressLink = function AddressLink(props) {
  const { value } = props;
  return <NavLink to={`/${value}`}>{value}</NavLink>;
};

export default AddressLink;
