import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import strJson from "./data.json";
import strGridJson from "./MonthlyPartCapaData.json";
import GetTestValAndCreateAt, {
  GetTestValAndCreateAtDay,
  GetTestValAndCreateAtString,
  GetDateDay,
  GetDateMonth,
} from "pages/mes/dashboard/asdb";
import * as S from "pages/mes/dashboard/Dashboard.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";

const MonthlyPartCapa = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    endDate: DateTime().dateFull,
  });
  const [result, setResult] = useState([]);
  const [resultStr, setResultStr] = useState([]);
  const refSingleGrid = useRef(null);

  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  useEffect(() => {
    setResult(GetDateMonth(strGridJson, dateText.endDate));
    setResultStr(
      GetTestValAndCreateAtString(
        strGridJson,
        "prod_cd",
        "testVal",
        "testVal2",
        "testVal3",
        "goal",
        "goal2",
        "goal3"
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
  const goal1 = result.map((item) => item.goal1);
  const goal2 = result.map((item) => item.goal2);
  const goal3 = result.map((item) => item.goal3);

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
  console.log(resultStr);
  const tmpStr = strGridJson;
  const categoriesStr = resultStr.map((item) => item.create_at);
  const seriesStr1 = resultStr.map((item) => item.testVal1);
  const seriesStr2 = resultStr.map((item) => item.testVal2);
  const seriesStr3 = resultStr.map((item) => item.testVal3);

  const myValWithGoals = [];
  const myValWithGoals2 = [];
  const myValWithGoals3 = [];
  for (let i = 0; i < series1.length; i++) {
    // myVal.push([{data:[{x:categories[0], y:series1[0], goals:[{name:"Expected", value: goal1[0], strokeHeight: 10, strokeColor: '#775DD0'}]}]}])
    myValWithGoals.push({ x: categories[i], y: series1[i] });
  }

  const myValStr = [];

  for (let i = 0; i < seriesStr1.length; i++) {
    myValStr.push({ x: categoriesStr[i], y: seriesStr1[i] });
  }

  const cWithHorizontal = {
    series: [], // 차트의 데이터를 담는 배열
    chart: {
      // 차트의 기본 설정
      height: 350, // 차트 높이
      type: "bar", // 차트 타입 (막대그래프)
      sparkline: {
        enabled: true,
        borderColor: "#FF0000", // 테두리 색상 설정
      },
    },
    colors: colors,
    plotOptions: {
      // 차트 시각화 옵션
      bar: {
        // 막대그래프 옵션
        columnWidth: "100%", // 막대 너비
        horizontal: true,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
    title: {
      text: "생산포장 품종 별 생산량(월)",
      floating: true,
      // offsetY: 0,
      align: "top",
      style: {
        color: "#444",
      },
    },
  };
  for (let i = 0; i < myValWithGoals.length; i++) {
    cWithHorizontal.series.push({
      name: categoriesStr[i],
      data: [myValWithGoals[i]],
    });
  }

  const cWithMark = {
    series: [
      // 차트의 데이터를 담는 배열
      {
        name: "E1", // 시리즈(데이터) 이름
        data: myValWithGoals,
        color: "#FFD700",
      },
      {
        name: "E2", // 시리즈(데이터) 이름
        data: myValWithGoals2,
        color: "#00FF00",
      },
      {
        name: "E3", // 시리즈(데이터) 이름
        data: myValWithGoals3,
        color: "#00FFFF",
      },
    ],
    Chart: {
      // 차트의 기본 설정
      height: 350, // 차트 높이
      type: "bar", // 차트 타입 (막대그래프)
    },
    plotOptions: {
      // 차트 시각화 옵션
      bar: {
        // 막대그래프 옵션
        columnWidth: "80%", // 막대 너비
        horizontal: true,
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
    legend: {
      // 범례 옵션
      show: true, // 범례 표시 여부
      showForSingleSeries: true, // 단일 시리즈일 때도 범례 표시 여부
      customLegendItems: ["E1", "E2", "E3", "Expected"], // 범례 항목 이름
      markers: {
        // 범례 마커 옵션
        fillColors: ["#FFD700", "#00FF00", "#00FFFF", "#775DD0"], // 마커 색상
      },
    },
    title: {
      text: "생산포장 품종 별 생산량(월)",
      floating: true,
      offsetY: 0,
      align: "top",
      style: {
        color: "#444",
      },
    },
  };

  const dateHeaders = [];
  for (let i = 0; i < 12; i++) {
    dateHeaders.push(i + 1 + "월");
  }
  const columns = [
    { header: "라인", name: "prod_cd" },
    ...dateHeaders.map((date, index) => {
      return { header: date, name: `month${index + 1}` };
    }),
  ];

  const data = tmpStr.data.rows.map((row) => {
    const rowData = { prod_cd: row.prod_cd };
    for (let i = 1; i <= 12; i++) {
      const dayKey = `month${i}`;
      rowData[dayKey] = row[dayKey];
    }
    return rowData;
  });
  const handleSearchClick = () => {};

  return (
    <S.ContentsArea>
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
          options={cWithHorizontal}
          series={cWithHorizontal.series}
          type="bar"
          height={350}
        />
      </S.Top>
      <S.Bottom>
        <GridSingle columns={columns} data={data} />;
      </S.Bottom>
      {/* <SplitterLayout vertical></SplitterLayout> */}
    </S.ContentsArea>
  );
};

export default MonthlyPartCapa;
