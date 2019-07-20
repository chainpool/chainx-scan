import React from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Guide } from "bizcharts";
import DataSet from "@antv/data-set";

class PowerCharts extends React.Component {
  render() {
    console.log();
    const { DataView } = DataSet;
    const { Html } = Guide;
    console.log(this.props.data.selfvote_count + this.props.data.votes);
    const data = [
      {
        item: "PCX",
        count: this.props.data.selfvote_count + this.props.data.votes
      },
      {
        item: "X-BTC",
        count: this.props.data.btc_power
      },
      {
        item: "L-BTC",
        count: this.props.data.lbtc_power
      },
      {
        item: "S-DOT",
        count: this.props.data.sdot_power
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
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart height={window.innerHeight} data={dv} scale={cols} padding={[80, 100, 80, 80]} forceFit>
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">全链算力占比</div>'
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default PowerCharts;
