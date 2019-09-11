/**
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */
import React, { Component } from 'react';
import './echartsRadar.scss'; //引入组件依赖样式
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';

import ReactEcharts from 'echarts-for-react';
const mytextStyle = {
  color: '#333', //文字颜色
  fontStyle: 'normal', //italic斜体  oblique倾斜
  fontWeight: 'normal', //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
  fontSize: 12, //字体大小
};
export default class EchartsRadar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getOption() {
    return {
      title: {
        text: '商家消费情况',
      },
      //点击提示标签
      legend: {
        //图例文字展示
        data: [{ name: '今日更新投诉量' }, { name: '昨日更新投诉量' }],
        //图例显示在底部
        bottom: 0,
        //图例背景颜色
        backgroundColor: 'transparent',
        // 图例标记的图形宽度。[ default: 25 ]
        itemWidth: 14,
        // 图例标记的图形高度。[ default: 14 ]
        itemHeight: 10,
        //图例文字样式设置
        textStyle: mytextStyle,
      },
      radar: {
        //雷达图绘制类型，支持 'polygon' 和 'circle' [ default: 'polygon' ]
        shape: 'polygon',
        splitNumber: 3,
        center: ['50%', '50%'],
        radius: '60%',
        //指示器名称和指示器轴的距离。[ default: 15 ]
        nameGap: 5,
        triggerEvent: true,
        name: {
          textStyle: {
            color: '#999',
            backgroundColor: 'transparent',
          },
          formatter: function(value, indicator) {
            value = value.replace(/\S{4}/g, function(match) {
              return match + '\n';
            });
            // value = value + '\n' + indicator.value;
            return '{a|' + value + '}' + '\n' + '{b|' + indicator.value + '}';
          },
          //富文本编辑 修改文字展示样式
          rich: {
            a: {
              color: '#999',
              fontSize: 12,
              align: 'center',
            },
            b: {
              color: '#333',
              fontSize: 17,
              align: 'center',
            },
          },
        },
        // 设置雷达图中间射线的颜色
        axisLine: {
          lineStyle: {
            color: '#ddd',
          },
        },
        indicator: [
          { name: '车辆已售', value: 200, max: 10000 },
          { name: '商家冒充个人', value: 880, max: 900 },
          { name: '商家服务态度差', value: 650, max: 800 },
          { name: '电话无法接通', value: 690, max: 900 },
          { name: '走私套牌抵押车', value: 890, max: 800 },
          { name: '价格高于标价', value: 700, max: 900 },
          { name: '卖新车', value: 890, max: 900 },
          { name: '图片与车款不符合', value: 733, max: 800 },
        ],
        //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
        splitArea: {
          show: false,
          areaStyle: {
            color: 'rgba(255,0,0,0)', // 图表背景的颜色
          },
        },
      },
      series: [
        {
          name: '投诉统计',
          type: 'radar',
          //显示雷达图选中背景
          areaStyle: { normal: {} },
          data: [
            {
              value: [980, 800, 450, 800, 480, 200, 350, 833],
              // 设置区域边框和区域的颜色
              itemStyle: {
                normal: {
                  //雷达图背景渐变设置
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 1,
                      color: 'rgba(48,107, 231, 1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(73,168, 255, 0.7)',
                    },
                  ]),
                  //去除刻度
                  opacity: 0,
                  //雷达图边线样式
                  lineStyle: {
                    width: 0,
                    color: '#306BE7',
                  },
                },
              },
              name: '今日更新投诉量',
              id: 'jintian',
            },
            {
              value: [900, 550, 600, 700, 190, 680, 190, 400],
              // 设置区域边框和区域的颜色
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0.5,
                      color: 'rgba(139,241, 134, 0.7)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,208, 131, 1)',
                    },
                  ]),
                  opacity: 0,
                  lineStyle: {
                    width: 10,
                    color: '#8BF186',
                  },
                },
              },
              name: '昨日更新投诉量',
              id: 'zuotian',
            },
          ],
        },
      ],
    };
  }

  onChartClick(param, echarts) {
    console.log(param);
  }

  onChartLegendselectchanged(param, echarts) {
    console.log(param);
  }

  render() {
    let onEvents = {
      click: this.onChartClick.bind(this),
      legendselectchanged: this.onChartLegendselectchanged.bind(this),
    };
    return (
      <div className="echartsRadar">
        <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onEvents}
          style={{ width: '600px', height: '500px' }}
        />
      </div>
    );
  }
}
