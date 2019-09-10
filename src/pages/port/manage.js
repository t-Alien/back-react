/**
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 *  - ./src/layouts/SimpleLayout.js
 */
import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class EchartsTest extends Component {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main')); // 绘制图表
    myChart.setOption({
      title: { text: '用户购买情况' },
      tooltip: {},
      xAxis: {
        data: [
          '衬衫',
          '羊毛衫',
          '雪纺衫',
          '裤子',
          '高跟鞋',
          '袜子',
          '口红',
          '包包',
          '连衣裙',
          '零食',
        ],
      },

      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 30, 40, 18, 6],
        },
      ],
    });
  }
  render() {
    return (
      <div>
                
        <div
          id="main"
          style={{
            width: 700,
            height: 500,
          }}
        ></div>
              
      </div>
    );
  }
}

export default EchartsTest;
