import React, { useEffect, useState, memo } from "react";
// 引入 ECharts 主模块
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
// import "echarts/lib/chart/lines";
import "echarts/lib/component/graphic";
import "echarts/lib/component/grid";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import api from "../../services/api";
import dayjs from "dayjs";
import { isEqual } from "lodash";
import { injectIntl } from "react-intl";

export default injectIntl(
  memo(
    function Transaction({ style, intl: { messages } }) {
      const [data, setData] = useState([]);
      const getOption = (data = []) => {
        let Transaction_list = [...data];
        //处理数据
        Transaction_list.reverse();
        Transaction_list.pop();
        const xAxis = Transaction_list.reduce((pre, cre) => {
          return pre.concat([dayjs(cre.day * 1000).format("YYYY-MM-DD")]);
        }, []);
        const yAxis = Transaction_list.reduce((pre, cre) => {
          return pre.concat([cre.num]);
        }, []);
        Transaction_list = xAxis.map((item, index) => ({
          value: [item, yAxis[index]]
        }));
        // 绘制图表
        return {
          title: {
            text: messages.OTHERS.DAILYTRADINGVOLUMEMAP,
            textStyle: {
              color: "#3f3f3f",
              fontSize: 14
            },
            top: 20,
            left: 10
          },
          grid: {
            left: 0,
            bottom: 0,
            right: 0
          },
          tooltip: {
            show: true,
            trigger: "axis",
            padding: 10,
            backgroundColor: "#d89601",
            formatter: value => `${value[0].value[0]}<br />${messages.OTHERS.TRADINGVOLUME}: ${value[0].value[1]}`
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            // Transaction_list: xAxis
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
            axisLabel: {
              show: false
            }
          },
          yAxis: {
            type: "value",
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
              show: false
            }
          },
          series: {
            data: Transaction_list,
            type: "line",
            smooth: true,
            color: "#d89601",
            symbolSize: 6,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,215,104,1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,250,234,1)" // 100% 处的颜色
                  }
                ]
              }
            },
            showSymbol: false,
            lineStyle: {
              width: 3
            }
          }
        };
      };

      useEffect(() => {
        const subscription = api.fetchTransaction$().subscribe(list => {
          setData(list);
        });
        return () => subscription.unsubscribe();
      }, []);
      return (
        <ReactEchartsCore echarts={echarts} option={getOption(data)} notMerge={true} lazyUpdate={true} style={style} />
      );
    },
    (pre, cre) => {
      return isEqual(pre, cre);
    }
  )
);
