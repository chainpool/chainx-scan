import React from "react";
import { NavLink } from "react-router-dom";

export default function Breadcrumb(props) {
  const { dataSource = [] } = props;

  return (
    <nav className="breadcrumb">
      <ul>
        {dataSource.map((item, index) => {
          if (index !== dataSource.length - 1) {
            return (
              <li key={item.label}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            );
          }
          return (
            <li key={item.label} className="is-active">
              <a href="#">{item.label}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
