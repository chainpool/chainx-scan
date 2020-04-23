import React, { useState } from "react";
import { useRedux } from "../../shared";
import { ReactComponent as Up } from "../../assets/open.svg";
import classnames from "classnames";
import apiService from "../../services/api";

export default function() {
  const apis = ["https://api.chainx.org.cn", "https://api.chainx.org"];
  const [{ api }, setApi] = useRedux("api");

  const [active, setActive] = useState(false);

  const handleChange = targetApi => {
    if (targetApi === api) {
      return;
    }

    apiService.setEndpoint(targetApi);
    setApi({ api: targetApi });
    localStorage.setItem("api", targetApi);
    setActive(false);

    window.location.reload();
  };

  return (
    <div className="api-selector">
      <div className="show-lang" onClick={() => setActive(!active)}>
        {api} <Up className={classnames("select-arrow", { active: true })} />
      </div>
      <ul className={classnames("selector", { active })}>
        {apis.map(item => (
          <li className={classnames("select-item")} onClick={() => handleChange(item)} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
