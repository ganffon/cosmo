import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import { ChartData, ChartDataWithSeries} from "./ChartData";
import strJson from './data.json';
import strJsonDay from './dayData.json';

import GetTestValAndCreateAt, { GetTestValAndCreateAtDay, GetTestValAndCreateAtString } from './asdb';
import { Container, Top, ChartDiv, OtherContent, Bottom, Footer } from "./Dashboard.styled";
import Chart from 'react-apexcharts';

const Dashboard4 = () => {
  const [result, setResult] = useState([]);
  const { isAllScreen } = useContext(LayoutContext);
  
  useEffect(() => {
    setResult(GetTestValAndCreateAtString(strJsonDay,"line_cd","testVal","testVal2","testVal3","goal","goal2","goal3"));
  }, []);
  
  const categories = result.map((item) => item.create_at);
  const series1 = result.map((item) => item.testVal1);
  const series2 = result.map((item) => item.testVal2);
  const series3 = result.map((item) => item.testVal3);
  const myVal = []
  const myVal2 = []
  const myVal3 = []
  const colors = ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e','#f48024', '#69d2e7']
  for(let i=0; i<series1.length; i++){
    // myVal.push([{data:[{x:categories[0], y:series1[0], goals:[{name:"Expected", value: goal1[0], strokeHeight: 10, strokeColor: '#775DD0'}]}]}])
    myVal.push({x:categories[i], y:series1[i]})
    myVal2.push({x:categories[i], y:series2[i]})
    myVal3.push({x:categories[i], y:series3[i]})
  }

  const c = {
    series: [ // 차트의 데이터를 담는 배열
      {
        name: 'Actual2', // 시리즈(데이터) 이름
        data: myVal2,
        // color:'#00FF00'
      }
    ],
    Chart: { // 차트의 기본 설정
      height: 350, // 차트 높이
      type: 'bar' // 차트 타입 (막대그래프)
    },
    colors: colors,
    plotOptions: { // 차트 시각화 옵션
      bar: { // 막대그래프 옵션
        // columnWidth: '80%', // 막대 너비
        horizontal: true,
      }
    },
    dataLabels: {
      style:{
        colors: ["black"]
      },
      enabled: true
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

export default Dashboard4;
