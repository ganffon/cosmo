import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import strGridJson from "./MonthlyLineCapaData.json";
import strJson from "./TimeRateData.json";
import GetTestValAndCreateAt, {
  GetTestValAndCreateAtDay,
  GetTestValAndCreateAtString,
  GetDateDay,
  GetDateMonth,
  GetTimeRate,
} from "pages/mes/dashboard/asdb";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import Grid from "@toast-ui/react-grid";
import * as timeSet from "./PerformanceRateSet";
import ContentsArea from "components/layout/common/ContentsArea";

const PerformanceRate = () => {
  LoginStateChk();
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    endDate: DateTime().dateFull,
  });
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const refSingleGrid = useRef(null);

  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  useEffect(() => {
    setResult(
      GetTimeRate(
        strJson,
        "create_at",
        "e1_timeOper",
        "e2_timeOper",
        "e3_timeOper",
        "total"
      )
    );
  }, []);
  const handleSearchButtonClick = () => {
    setSearchButtonClicked();
  };

  const categories = result.map((item) => item.create_at);
  const series1 = result.map((item) => item.testVal1);
  const series2 = result.map((item) => item.testVal2);
  const series3 = result.map((item) => item.testVal3);
  const series4 = result.map((item) => item.testVal4);

  const colors = [
    "#33b2df",
    "#546E7A",
    "#d4526e",
    "#13d8aa",
    "#A5978B",
    "#2b908f",
    "#f9a3a4",
    "#90ee7e",
    "#f48024",
    "#69d2e7",
  ];

  const tmpStr = strJson;

  const myValWithGoals = [];
  const myValWithGoals2 = [];
  const myValWithGoals3 = [];
  const myValWithGoals4 = [];
  for (let i = 0; i < series1.length; i++) {
    // myVal.push([{data:[{x:categories[0], y:series1[0], goals:[{name:"Expected", value: goal1[0], strokeHeight: 10, strokeColor: '#775DD0'}]}]}])
    myValWithGoals.push({ x: categories[i], y: series1[i] });
    myValWithGoals2.push({ x: categories[i], y: series2[i] });
    myValWithGoals3.push({ x: categories[i], y: series3[i] });
    myValWithGoals4.push({ x: categories[i], y: series4[i] });
  }

  const cWithMark = {
    series: [
      // 차트의 데이터를 담는 배열
      {
        name: "E1", // 시리즈(데이터) 이름
        data: myValWithGoals,
        // color:'#FFD700'
      },
      {
        name: "E2", // 시리즈(데이터) 이름
        data: myValWithGoals2,
        // color:'#00FF00'
      },
      {
        name: "E3", // 시리즈(데이터) 이름
        data: myValWithGoals3,
        // color:'#00FFFF'
      },
      {
        name: "total", // 시리즈(데이터) 이름
        data: myValWithGoals4,
        color: "#00FFFF",
      },
    ],
    Chart: {
      // 차트의 기본 설정
      height: 350, // 차트 높이
      // type: 'bar' // 차트 타입 (막대그래프)
    },
    plotOptions: {
      // 차트 시각화 옵션
      bar: {
        // 막대그래프 옵션
        columnWidth: "80%", // 막대 너비
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
    title: {
      text: "시간 가동률",
      floating: true,
      offsetY: 0,
      align: "top",
      style: {
        color: "#444",
      },
    },
  };

  const colTest = timeSet.getColTest();
  const header = timeSet.getTimeHeader();
  const tesdf = timeSet.getData(tmpStr);

  console.log(colTest);
  console.log(header);
  const handleSearchClick = () => {};

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.ContentsHeader>
            <S.Date
              datePickerSet={"single"}
              dateText={dateText}
              setDateText={setDateText}
            />
            <ButtonSearch onClickSearch={handleSearchButtonClick} />
          </S.ContentsHeader>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.Top>
        <Chart
          options={cWithMark}
          series={cWithMark.series}
          type="line"
          height={300}
        />
      </S.Top>
      <S.Bottom>
        <Grid columns={colTest} header={header} data={tesdf} />
      </S.Bottom>
      {/* <SplitterLayout vertical></SplitterLayout> */}
    </ContentsArea>
  );
};

export default PerformanceRate;
