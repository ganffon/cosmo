import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import { ChartData, ChartDataWithSeries} from "./ChartData";
import strJson from './data.json';
import strJsonDay from './dayData.json';
import strJsonStr from './dayData copy.json';
import GetTestValAndCreateAt, { GetTestValAndCreateAtDay, GetTestValAndCreateAtString } from './asdb';
import { Container, Top, ChartDiv, OtherContent, Bottom, Footer } from "./Dashboard.styled";
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const [result, setResult] = useState([]);
  const [resultDay, setResultDay] = useState([]);
  const [resultStr, setResultStr] = useState([]);
  const { isAllScreen } = useContext(LayoutContext);
  
  useEffect(() => {
    setResult(GetTestValAndCreateAt(strJson,"create_at","testVal","testVal2","testVal3","goal","goal2","goal3"));
    setResultDay(GetTestValAndCreateAtDay(strJsonDay,"create_at","testVal","testVal2","testVal3","goal","goal2","goal3"));
    setResultStr(GetTestValAndCreateAtString(strJsonStr,"line_cd","testVal","testVal2","testVal3","goal","goal2","goal3"));
  }, []);
  
  const categories = result.map((item) => item.create_at);
  const series1 = result.map((item) => item.testVal1);
  const series2 = result.map((item) => item.testVal2);
  const series3 = result.map((item) => item.testVal3);
  const goal1 = result.map((item) => item.goal1);
  const goal2 = result.map((item) => item.goal2);
  const goal3 = result.map((item) => item.goal3);
  
  const categoriesDay = resultDay.map((item) => item.create_at);
  const seriesDay1 = resultDay.map((item) => item.testVal1);
  const seriesDay2 = resultDay.map((item) => item.testVal2);
  const seriesDay3 = resultDay.map((item) => item.testVal3);
  const colors = ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e','#f48024', '#69d2e7']
  const myVal = []
  const myVal2 = []
  const myVal3 = []
  for(let i=0; i<seriesDay1.length; i++){
    // myVal.push([{data:[{x:categories[0], y:series1[0], goals:[{name:"Expected", value: goal1[0], strokeHeight: 10, strokeColor: '#775DD0'}]}]}])
    myVal.push({x:categoriesDay[i], y:seriesDay1[i]})
    myVal2.push({x:categoriesDay[i], y:seriesDay2[i]})
    myVal3.push({x:categoriesDay[i], y:seriesDay3[i]})
  }

  const categoriesStr = resultStr.map((item) => item.create_at);
  const seriesStr1 = resultStr.map((item) => item.testVal1);
  const seriesStr2 = resultStr.map((item) => item.testVal2);
  const seriesStr3 = resultStr.map((item) => item.testVal3);
  const myValStr = []
  const myValStr2 = []
  const myValStr3 = []
  console.log(categoriesStr)
  for(let i=0; i<seriesDay1.length; i++){
    // myVal.push([{data:[{x:categories[0], y:series1[0], goals:[{name:"Expected", value: goal1[0], strokeHeight: 10, strokeColor: '#775DD0'}]}]}])
    myValStr.push({x:categoriesStr[i], y:seriesStr1[i]})
    myValStr2.push({x:categoriesStr[i], y:seriesStr2[i]})
    myValStr3.push({x:categoriesStr[i], y:seriesStr3[i]})
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
    dataLabels: {
      style:{
        colors: ["black"]
      },
      enabled: true
    },
    legend: { // 범례 옵션
      show: true, // 범례 표시 여부
      showForSingleSeries: true, // 단일 시리즈일 때도 범례 표시 여부
      customLegendItems: ['E1','E2','E3'], // 범례 항목 이름
      markers: { // 범례 마커 옵션
        fillColors: ['#FFD700','#00FF00','#00FFFF', '#775DD0'] // 마커 색상
      }
    },
    title: {
      text: '생산포장 라인 별 생산량(일)',
      floating: true,
      offsetY: 0,
      align: 'top',
      style: {
        color: '#444'
      }
    }
  }
  const cWithHorizontal = {
    series: [], // 차트의 데이터를 담는 배열
    chart: { // 차트의 기본 설정
      height: 350, // 차트 높이
      type: 'bar', // 차트 타입 (막대그래프)
      sparkline: {
        enabled: true,
        borderColor: '#FF0000' // 테두리 색상 설정
      }
    },
    colors: colors,
    plotOptions: { // 차트 시각화 옵션
      bar: { // 막대그래프 옵션
        columnWidth: '100%', // 막대 너비
        horizontal: true,
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    dataLabels: {
      style: {
        colors: ['black']
      },
      enabled: true
    },
    title: {
      text: '생산포장 품목 별 생산량(월)',
      floating: true,
      // offsetY: 0,
      align: 'top',
      style: {
        color: '#444'
      }
    }
  };
  
  for (let i = 0; i < myValStr.length; i++) {
    cWithHorizontal.series.push({
      name: categoriesStr[i],
      data: [myValStr[i]],
    });
  }
  console.log(JSON.stringify(cWithHorizontal))
  const myValWithGoals = []
  const myValWithGoals2 = []
  const myValWithGoals3 = []
  for(let i=0; i<series1.length; i++){
    // myVal.push([{data:[{x:categories[0], y:series1[0], goals:[{name:"Expected", value: goal1[0], strokeHeight: 10, strokeColor: '#775DD0'}]}]}])
    myValWithGoals.push({x:categories[i], y:series1[i], goals:[{name: "Expected", value:goal1[i], strokeHeight: 5, strokeColor: '#775DD0',strokeWidth: 15, }]})
    myValWithGoals2.push({x:categories[i], y:series2[i], goals:[{name: "Expected", value:goal2[i], strokeHeight: 5, strokeColor: '#775DD0',strokeWidth: 15, }]})
    myValWithGoals3.push({x:categories[i], y:series3[i], goals:[{name: "Expected", value:goal3[i], strokeHeight: 5, strokeColor: '#775DD0',strokeWidth: 15, }]})
  }

  
  const cWithMark = {
    series: [ // 차트의 데이터를 담는 배열
      {
        name: 'Actual', // 시리즈(데이터) 이름
        data: myValWithGoals,
        color:'#FFD700'
      },
      {
        name: 'Actual2', // 시리즈(데이터) 이름
        data: myValWithGoals2,
        color:'#00FF00'
      },
      {
        name: 'Actual3', // 시리즈(데이터) 이름
        data: myValWithGoals3,
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
    dataLabels: {
      style:{
        colors: ["black"]
      },
      enabled: true
    },
    legend: { // 범례 옵션
      show: true, // 범례 표시 여부
      showForSingleSeries: true, // 단일 시리즈일 때도 범례 표시 여부
      customLegendItems: ['E1','E2','E3', 'Expected'], // 범례 항목 이름
      markers: { // 범례 마커 옵션
        fillColors: ['#FFD700','#00FF00','#00FFFF', '#775DD0'] // 마커 색상
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
      <Top>
        <ChartDiv>
          {/* <ChartDataWithSeries categories={categories} series={mySeries} type={"bar"}></ChartDataWithSeries> */}
          <Chart options={c} series={c.series} type="bar" height={350} />
        </ChartDiv>
        <OtherContent>
          {/* <ChartDataWithSeries categories={categories} series={mySeries} type={"line"}></ChartDataWithSeries> */}
          <Chart options={cWithHorizontal} series={cWithHorizontal.series} type="bar" height={350} />
        </OtherContent>
      </Top>
      <Bottom>
      <Chart options={cWithMark} series={cWithMark.series} type="bar" height={350} />
      </Bottom>
    </Container>
  );
};

export default Dashboard;
