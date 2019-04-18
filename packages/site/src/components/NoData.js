import React from "react";
import NoDataImg from "../assets/noData.jpg";
import { NavLink } from "react-router-dom";

export default function NoData({ id }) {
  return (
    <>
      <div className="no-data" style={{ padding: "10%", textAlign: "center" }}>
        <img className="no-data-item" src={NoDataImg} width={180} height={180} alt="" />
        <span className="no-data-item">"{id}"</span>
        <span className="nagtive no-data-item">暂时没有您要的信息</span>
        <NavLink className="to-home no-data-item btn-primary" to="/">
          返回首页
        </NavLink>
      </div>
    </>
  );
}
