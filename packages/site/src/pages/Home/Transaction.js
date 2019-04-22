import React, { useEffect, useState } from "react";
// 引入 ECharts 主模块
import ReactEcharts from "echarts-for-react";
import "echarts";
import api from "../../services/api";
import dayjs from "dayjs";

export default function Transaction({ style }) {
  const [option, setData] = useState({});
  const getOption = (data = []) => {
    //处理数据
    data.reverse();
    data.pop();
    const xAxis = data.reduce((pre, cre) => {
      return pre.concat([dayjs(cre.day * 1000).format("YYYY-MM-DD")]);
    }, []);
    const yAxis = data.reduce((pre, cre) => {
      return pre.concat([cre.num]);
    }, []);
    data = xAxis.map((item, index) => ({
      value: [item, yAxis[index]]
    }));
    const max_num = Math.max(...yAxis);
    const min_num = Math.min(...yAxis);
    const max_length = max_num.toString().length;
    const min_length = min_num.toString().length;
    const max = parseInt(max_num / Math.pow(10, max_length - 2) + 1) * Math.pow(10, max_length - 2);
    const min = parseInt(min_num / Math.pow(10, min_length - 2) - 10) * Math.pow(10, min_length - 2);
    const interval = parseInt(((max - min) / Math.pow(10, max_length - 2)) * Math.pow(10, max_length - 2)) / 3;
    // 绘制图表
    return {
      title: {
        text: "交易量日线图",
        textStyle: {
          color: "#3f3f3f",
          fontSize: 14
        },
        top: 20,
        left: 10
      },
      tooltip: {
        show: true,
        trigger: "axis",
        padding: 10,
        formatter: value => `${value[0].value[0]}<br />交易量 ${value[0].value[1]}`
      },
      xAxis: {
        type: "time",
        // data: xAxis,
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        interval: new Date(1000 * 3600 * 24 * 3).getTime(),
        axisLabel: {
          formatter: value => dayjs(value).format("M.D")
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
        data,
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#979797",
          width: 3
        }
      }
    };
  };

  useEffect(() => {
    const subscription = api.fetchTransaction$().subscribe(list => {
      setData(getOption(list));
    });
    return () => subscription.unsubscribe();
  }, []);
  return <ReactEcharts option={option} notMerge={true} lazyUpdate={true} style={{ width: "40%" }} />;
}
