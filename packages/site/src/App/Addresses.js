import React from "react";

const Addresses = React.memo(function(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>账户地址</th>
            <th>PCX 总余额</th>
            <th>BTC 总余额</th>
          </tr>
        </thead>
        <tbody>
          {data.map(() => {
            return (
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default Addresses;
