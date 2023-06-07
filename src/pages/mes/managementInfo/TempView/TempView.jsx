import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ButtonSearch from "components/button/ButtonSearch";
import RadialBarChart, { RadialBarChartModule } from "./TempViewSet";
import ReactApexChart from "react-apexcharts";

const TempView = () => {
  LoginStateChk();
  const [e1Data, setE1Data] = useState({ series: [27.4], total: 100 });
  const [e2Data, setE2Data] = useState({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
  const [e3Data, setE3Data] = useState({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
  const [e4Data, setE4Data] = useState({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
  const [e5Data, setE5Data] = useState({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });

  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [containerWidth, setContainerWidth] = useState(1446);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 90;
      setContainerWidth(width);
    };

    // 초기 렌더링 시 창 크기로 너비 설정
    handleResize();

    // 창 크기 변경 시에도 너비 업데이트
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setE1Data({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
      setE2Data({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
      setE3Data({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
      setE4Data({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
      setE5Data({ series: [Math.floor(Math.random() * 100) + 1], total: 100 });
      const newData_1 = {
        series: [Math.floor(Math.random() * 100) + 1],
        total: 100,
      };
      const newData2_1 = {
        series: [Math.floor(Math.random() * 100) + 1],
        total: 100,
      };
      const newData3_1 = {
        series: [Math.floor(Math.random() * 100) + 1],
        total: 100,
      };
      const newData4_1 = {
        series: [Math.floor(Math.random() * 100) + 1],
        total: 100,
      };
      const newData5_1 = {
        series: [Math.floor(Math.random() * 100) + 1],
        total: 100,
      };
      // Series 데이터를 업데이트
    }, 10000);

    return () => clearInterval(interval);
  }, [e1Data, e2Data]);

  const handleChange = (event) => {};
  const handleSearchButtonClick = () => {
    // GetMonthlyLineCapaData();
    // GetDailyLineCapaData();
  };

  const e1HumidityData = {
    series: [55], // 라디얼 바의 값
    total: 100, // 전체 값
  };
  const e2HumidityData = {
    series: [37], // 라디얼 바의 값
    total: 100, // 전체 값
  };
  const e3HumidityData = {
    series: [61], // 라디얼 바의 값
    total: 100, // 전체 값
  };
  const e4HumidityData = {
    series: [49], // 라디얼 바의 값
    total: 100, // 전체 값
  };
  const e5HumidityData = {
    series: [45], // 라디얼 바의 값
    total: 100, // 전체 값
  };
  return (
    <S.ContentsArea>
      {/* <div style={{ display: "flex", width: containerWidth }}>
        <RadialBarChartModule
          data={e1Data}
          minText={23}
          maxText={70}
          Line={"A"}
          containerWidth={containerWidth}
          isTemp="temp"
        />
        <RadialBarChartModule
          data={e2Data}
          minText={22}
          maxText={70}
          Line={"B"}
          containerWidth={containerWidth}
          isTemp="temp"
        />
        <RadialBarChartModule
          data={e3Data}
          minText={26}
          maxText={70}
          Line={"C"}
          containerWidth={containerWidth}
          isTemp="temp"
        />
        <RadialBarChartModule
          data={e4Data}
          minText={29}
          maxText={70}
          Line={"D"}
          containerWidth={containerWidth}
          isTemp="temp"
        />
        <RadialBarChartModule
          data={e5Data}
          minText={21}
          maxText={70}
          Line={"E"}
          containerWidth={containerWidth}
          isTemp="temp"
        />
      </div>
      <div style={{ display: "flex", width: containerWidth }}>
        <RadialBarChartModule
          data={e1HumidityData}
          minText={23}
          maxText={99}
          Line={"A"}
          containerWidth={containerWidth}
        />
        <RadialBarChartModule
          data={e2HumidityData}
          minText={23}
          maxText={99}
          Line={"B"}
          containerWidth={containerWidth}
        />
        <RadialBarChartModule
          data={e3HumidityData}
          minText={23}
          maxText={99}
          Line={"C"}
          containerWidth={containerWidth}
        />
        <RadialBarChartModule
          data={e4HumidityData}
          minText={23}
          maxText={99}
          Line={"D"}
          containerWidth={containerWidth}
        />
        <RadialBarChartModule
          data={e5HumidityData}
          minText={23}
          maxText={99}
          Line={"E"}
          containerWidth={containerWidth}
        />
      </div> */}
    </S.ContentsArea>
  );
};

export default TempView;
