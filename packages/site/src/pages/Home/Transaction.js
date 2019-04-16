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
  const max_num = Math.max(...yAxis);
  const min_num = Math.min(...yAxis);
  const max_length = max_num.toString().length;
  const min_length = min_num.toString().length;
  const max = parseInt(max_num / Math.pow(10, max_length - 2) + 1) * Math.pow(10, max_length - 2);
  const min = parseInt(min_num / Math.pow(10, min_length - 2) - 1) * Math.pow(10, min_length - 2);
  const interval = parseInt(((max - min) / Math.pow(10, max_length - 2)) * Math.pow(10, max_length - 2)) / 4;
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
      trigger: "axis",
      padding: 10,
      formatter: "{b0}<br />交易量 {c0}"
    },
    xAxis: {
      type: "category",
      data: xAxis,
      splitNumber: 2,
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      max,
      min,
      interval,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: (value, index) => {
          const length = value.toString().length;
          switch (true) {
            case length > 9:
              return parseInt(value / Math.pow(10, 9)) + "b";
            case length > 6:
              return parseInt(value / Math.pow(10, 6)) + "m";
            case length > 3:
              return parseInt(value / Math.pow(10, 3)) + "k";
            default:
              return value;
          }
        }
      }
    },
    series: {
      data: yAxis,
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: {
        color: "#979797"
      }
    }
  });
};

export default function Transaction({ style }) {
  useEffect(() => {
    const subscription = api.fetchTransaction$().subscribe(list => {
      initChart("chart", list);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <div id="chart" style={style} />;
}
