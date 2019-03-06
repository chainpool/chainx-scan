import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";
import "antd/dist/antd.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
