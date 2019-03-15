import React from "react";

export default function PanelList(props) {
  const { dataSource = [] } = props;
  return (
    <section className="panel panel-list">
      {dataSource.map(item => (
        <div className="panel-block panel-item" key={item.label}>
          <div className="panel-item__title">{item.label}</div>
          <div className="panel-item__content">{item.data}</div>
        </div>
      ))}
    </section>
  );
}
