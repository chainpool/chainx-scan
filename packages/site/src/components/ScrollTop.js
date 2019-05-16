import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

export default withRouter(function ScrollToTop({ location }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
});
