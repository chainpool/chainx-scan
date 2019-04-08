import React from "react";

export default function Spinner() {
  return (
    <div class="ant-spin-nested-loading spinner-wrap">
      <div>
        <div className="ant-spin ant-spin-spinning ant-table-without-pagination ant-table-spin-holder">
          <span className="ant-spin-dot ant-spin-dot-spin">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  );
}
