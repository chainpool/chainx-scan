import React, { useEffect } from "react";
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入 线 模块
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/axis";
import api from "../../services/api";
import dayjs from "dayjs";

const initChart = (name, data) => {
  // 初始化
  var myChart = echarts.init(document.getElementById(name));
  data.reverse();
  //处理数据
  const xAxis = data.reduce((pre, cre) => {
    return pre.concat([dayjs(cre.day * 1000).format("YYYY-MM-DD")]);
  }, []);
  const yAxis = data.reduce((pre, cre) => {
    return pre.concat([cre.num]);
  }, []);
  // 绘制图表
  myChart.setOption({
    title: {
      text: "交易量日线图",
      textStyle: {
        color: "#3f3f3f"
      }
    },
    tooltip: {
      show: true,
      padding: 10,
      formatter: "{b0}<br />交易量 {c0}"
    },
    xAxis: {
      type: "category",
      data: xAxis,
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      splitNumber: 4,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: {
      data: yAxis,
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#979797"
      }
    }
  });
};

export default function Transaction({ style }) {
  useEffect(() => {
    const subscription = api.fetchTransaction$().subscribe(({ result: list }) => {
      initChart("chart", list);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <div id="chart" style={style} />;
}
