import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GetTestValAndCreateAt, { GetTestValAndCreateAtDay, GetTestValAndCreateAtString, GetDateDay, GetDateMonth } from "pages/mes/dashboard/asdb";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import InputSearch from "components/input/InputSearch";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";

const MonthlyTempHumidChart = ({ toggle }) => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().year + "-" + DateTime().month,
  });
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);

  const handleSearchButtonClick = () => {
    GetMonthlyLineCapaData();
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.monthlyChangeChart, {
        params: {
          reg_date: dateText.startDate,
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data.data.rows);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  // useMemo를 사용하여 responseData 값을 고정시킴
  const chartOptions = {
    chart: {
      type: "rangeArea",
      width: "100%",
      height: "100%",
    },
    xaxis: {
      tickAmount: 15,
      lines: {
        show: false, // y축 선 표시 여부
        borderColor: "#e5e5e5", // y축 선 색상
        strokeDashArray: 2, // y축 선의 선 스타일 (점선)
        lineWidth: 1, // y축 선의 두께
      },
    },
    colors: ["#4d33df", "#4d33df", "#db6666", "#db6666"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.24, 1, 0.24, 1],
    },
    forecastDataPoints: {
      count: 2,
    },
    stroke: {
      curve: "straight",
      width: [0, 2, 0, 2],
    },
    markers: {
      hover: {
        sizeOffset: 5,
      },
    },
    yaxis: {
      tickAmount: 3,
    },
    grid: {
      yaxis: {
        lines: {
          show: false, // y축 선 표시 여부
          lineWidth: 30,
        },
      },
    },
  };
  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  const chart1 = useMemo(() => {
    return <S.ChartWrap2>{responseData && <Chart options={chartOptions} series={responseData[0]} type="rangeArea" height={"100%"} />}</S.ChartWrap2>;
  }, [responseData]);
  const chart2 = useMemo(() => {
    return <S.ChartWrap2>{responseData && <Chart options={chartOptions} series={responseData[1]} type="rangeArea" height={"100%"} />}</S.ChartWrap2>;
  }, [responseData]);
  const chart3 = useMemo(() => {
    return <S.ChartWrap2>{responseData && <Chart options={chartOptions} series={responseData[2]} type="rangeArea" height={"100%"} />}</S.ChartWrap2>;
  }, [responseData]);
  const chart4 = useMemo(() => {
    return <S.ChartWrap2>{responseData && <Chart options={chartOptions} series={responseData[3]} type="rangeArea" height={"100%"} />}</S.ChartWrap2>;
  }, [responseData]);
  const chart5 = useMemo(() => {
    return <S.ChartWrap2>{responseData && <Chart options={chartOptions} series={responseData[4]} type="rangeArea" height={"100%"} />}</S.ChartWrap2>;
  }, [responseData]);
  return (
    <ContentsArea>
      {isAuto === true && (
        <S.ShadowBoxButton2 isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.InputText
                id="startDate"
                type="month"
                format="yyyy-MM"
                defaultValue={dateText.startDate}
                InputProps={{ sx: { height: 40 } }}
                onChange={datePickerChange}
                height="40px"
                label="날짜"
              />
            </S.SearchWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton2>
      )}
      <S.HumidFlexTop>
        <S.HumidLeft>
          <S.Title>자재창고</S.Title>
          {chart1}
        </S.HumidLeft>
        <S.HumidRight>
          <S.Title>제품창고</S.Title>
          {chart2}
        </S.HumidRight>
      </S.HumidFlexTop>

      <S.HumidFlexLast>
        <S.GridContainer>
          <S.GridWrap>
            <S.TempHumidTitle>투입실</S.TempHumidTitle>
            {chart3}
          </S.GridWrap>
          <S.GridWrap>
            <S.TempHumidTitle>첨가제 계량실</S.TempHumidTitle>
            {chart4}
          </S.GridWrap>
          <S.GridWrap>
            <S.TempHumidTitle>소성로</S.TempHumidTitle>
            {chart5}
          </S.GridWrap>
        </S.GridContainer>
      </S.HumidFlexLast>
    </ContentsArea>
  );
};

export default MonthlyTempHumidChart;
