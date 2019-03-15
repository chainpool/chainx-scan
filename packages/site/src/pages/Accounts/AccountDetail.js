import React, { useEffect } from "react";

import api from "../../services/api";

export default function Account() {
  useEffect(() => {
    api
      .fetchAccountDetail$("0x26ffbe3b99cbc9063f8cd04caaefc86dfe57f7cf58149d0ab50c06a3c8396b34")
      .subscribe(
        res => console.log("HTTP response", res),
        err => console.log("HTTP Error", err),
        () => console.log("HTTP request completed.")
      );
  }, []);
  return <div />;
}
