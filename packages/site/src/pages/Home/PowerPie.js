import React from "react";
import { Chart, Geom, Axis, Coord, Label, Guide } from "bizcharts";
import DataSet from "@antv/data-set";

export default function PowerPie() {
  const { DataView } = DataSet;
  const { Html } = Guide;
  const data = [
    {
      item: "PCX",
      count: 50
    },
    {
      item: "LBTC",
      count: 42.87
    },
    {
      item: "X-BTC",
      count: 5.13
    },
    {
      item: "S-DOT",
      count: 2
    }
  ];
  const dv = new DataView();
  dv.source(data).transform({
    type: "percent",
    field: "count",
    dimension: "item",
    as: "percent"
  });
  const cols = {
    percent: {
      formatter: val => {
        return val * 100 + "%";
      }
    }
  };

  return (
    <div style={{ width: "30%", height: "265px" }}>
      <Chart height={265} data={dv} scale={cols} padding={[40, 0, 0, 20]} forceFit>
        <Coord type={"theta"} radius={0.75} innerRadius={0.8} />
        <Axis name="percent" />
        <Guide>
          <Html
            position={["50%", "50%"]}
            html='<div style="color:#8c8c8c;font-size:16px;text-align: center;width: 10em;">全链算力占比</div>'
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom type="intervalStack" position="percent" color={["item", ["#F6C94A", "#46AEE2", "#34C69A", "#EA754B"]]}>
          <Label
            content="percent"
            formatter={(val, item) => {
              return item.point.item + " " + val;
            }}
          />
        </Geom>
      </Chart>
    </div>
  );
}
