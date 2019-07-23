import React, { useEffect, memo } from "react";
import { Chart, Geom, Axis, Coord, Label, Guide } from "bizcharts";
import DataSet from "@antv/data-set";
import api from "../../services/api";
import { useRedux } from "../../shared";
import { injectIntl } from "react-intl";

const powerPie = function({ intl }) {
  const [{ data }, setState] = useRedux("powerPercent", { data: [] });

  useEffect(() => {
    const subscription = api.fetchPowerPercent$().subscribe(result => {
      setState({
        data: result.map(item => ({
          ...item,
          item: item.token
        }))
      });
    });
    return () => subscription.unsubscribe();
  }, [api]);

  const { DataView } = DataSet;
  const { Html } = Guide;
  const dv = new DataView();
  dv.source(data).transform({
    type: "percent",
    field: "power",
    dimension: "token",
    as: "percent"
  });
  const cols = {
    percent: {
      formatter: val => {
        return (val * 100).toFixed(1) + "%";
      }
    }
  };

  const html = `
  <div style="color:#000;font-size:16px;text-align: center;width: 10em;">${intl.messages.POWER_DISTRIBUTION}</div>
  `;

  return (
    <div style={{ width: "30%", height: "265px" }}>
      <Chart height={265} data={dv} scale={cols} padding={[30, 0, 0, 0]} forceFit>
        <Coord type={"theta"} radius={0.75} innerRadius={0.7} />
        <Axis name="percent" />
        <Guide>
          <Html position={["50%", "50%"]} html={html} alignX="middle" alignY="middle" />
        </Guide>
        <Geom type="intervalStack" position="percent" color={["token", ["#F6C94A", "#46AEE2", "#34C69A", "#EA754B"]]}>
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
};

export default injectIntl(memo(powerPie));
