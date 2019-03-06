import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "antd/dist/antd.css";
import "./index.scss";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
