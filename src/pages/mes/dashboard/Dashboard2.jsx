import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import { ChartData, ChartDataWithSeries} from "./ChartData";
import strJson from './data.json';
import GetTestValAndCreateAt from './asdb';
import { Container, Top, ChartDiv, OtherContent, Bottom, Footer } from "./Dashboard.styled";
import Chart from 'react-apexcharts';

const Dashboard2 = () => {
  const [result, setResult] = useState([]);
  const { isAllScreen } = useContext(LayoutContext);
  
  useEffect(() => {
    setResult(GetTestValAndCreateAt(strJson,"create_at","testVal","testVal2","testVal3","goal","goal2","goal3"));
  }, []);
  
  const categories = result.map((item) => item.create_at);
  const series1 = result.map((item) => item.testVal1);
  const series2 = result.map((item) => item.testVal2);
  const series3 = result.map((item) => item.testVal3);
  const goal1 = result.map((item) => item.goal1);
  const goal2 = result.map((item) => item.goal2);
  const goal3 = result.map((item) => item.goal3);
  const myVal = []
  const myVal2 = []
  const myVal3 = []
  for(let i=0; i<series1.length; i++){
    myVal.push({x:categories[i], y:series1[i], goals:[{name: "Expected", value:goal1[i], strokeHeight: 5, strokeColor: '#775DD0',strokeWidth: 15, }]})
    myVal2.push({x:categories[i], y:series2[i], goals:[{name: "Expected", value:goal2[i], strokeHeight: 5, strokeColor: '#775DD0',strokeWidth: 15, }]})
    myVal3.push({x:categories[i], y:series3[i], goals:[{name: "Expected", value:goal3[i], strokeHeight: 5, strokeColor: '#775DD0',strokeWidth: 15, }]})
  }

  const c = {
    series: [ // 차트의 데이터를 담는 배열
      {
        name: 'Actual', // 시리즈(데이터) 이름
        data: myVal,
        color:'#FFD700'
      },
      {
        name: 'Actual2', // 시리즈(데이터) 이름
        data: myVal2,
        color:'#00FF00'
      },
      {
        name: 'Actual3', // 시리즈(데이터) 이름
        data: myVal3,
        color:'#00FFFF'
      }
    ],
    Chart: { // 차트의 기본 설정
      height: 350, // 차트 높이
      type: 'bar' // 차트 타입 (막대그래프)
    },
    plotOptions: { // 차트 시각화 옵션
      bar: { // 막대그래프 옵션
        columnWidth: '80%' // 막대 너비
        // horizontal: true,
      }
    },
    colors: ['#00E396'], // 차트 색상
    // dataLabels: { // 데이터 라벨 옵션
    //   enabled: false // 데이터 라벨 표시 여부
    // },
    dataLabels: {
      // formatter: function(val, opt) {
      //   const goals =
      //     opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
      //       .goals
    
      //   if (goals && goals.length) {
      //     return `${val} / ${goals[0].value}`
      //   }
      //   return val
      // },
      // color : '#ffffff'
    },
    legend: { // 범례 옵션
      show: true, // 범례 표시 여부
      showForSingleSeries: true, // 단일 시리즈일 때도 범례 표시 여부
      customLegendItems: ['E1','E2','E3', 'Expected'], // 범례 항목 이름
      markers: { // 범례 마커 옵션
        fillColors: ['#00E396', '#775DD0'] // 마커 색상
      }
    },
    title: {
      text: '생산포장 라인 별 생산량(월)',
      floating: true,
      offsetY: 0,
      align: 'top',
      style: {
        color: '#444'
      }
    }
  }
  return (
    
    <Container> 
      {/* <Chart options={config} series={config.series} type="bar" height={350} /> */}
      <Chart options={c} series={c.series} type="bar" height={700} />
    </Container>
  );
};

export default Dashboard2;
