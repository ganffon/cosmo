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
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import TextField from "@mui/material/TextField";
import InputSearch from "components/input/InputSearch";
import * as C from "./MonthlyPartCapa.styled"
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";

const DonutChart = ({ data }) => {
  const options = {
    series: data.map((item) => item.y),
    labels: data.map((item) => item.x),
    plotOptions: {
      pie: {
        donut: {
          size: '0%', // 도넛 차트의 크기
        },
      },
    },
    dataLabels: {
      style: {
        colors: ['black'],
      },
      enabled: true,
    },
    legend: {
      position: 'bottom',
    },
  };
  return (
    <div>
      <Chart options={options} series={options.series} type="donut" height={400} />
    </div>
  );
};

const MonthlyPartCapa = () => {
  LoginStateChk();
  const refSingleGrid = useRef(null);
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    endDate: DateTime().dateFull,
  });
  const [year, setYear] = useState(new Date().getFullYear());
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  
  useEffect(() => {
    handleSearchButtonClick();
  }, []);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData(dateText.endDate, textInput);
  };
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const GetMonthlyLineCapaData = (endDate, textInput) => {
    restAPI
      .get(restURI.monthlyProd, {
        params: { 
          reg_date: year
          , line_nm: textInput 
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
      
  };

  // GetMonthlyLineCapaData(dateText.endDate, textInput);
  const cOptions = {
    plotOptions: {
      // 차트 시각화 옵션
      bar: {
        // 막대그래프 옵션
        columnWidth: "80%", // 막대 너비
        // horizontal: true,
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
  };
  const dateHeaders = [];
  for (let i = 0; i < 12; i++) {
    dateHeaders.push(i + 1 + "월");
  }
  const columns = [
    { header: "품종", name: "prod_type_small_nm" },
    ...dateHeaders.map((date, index) => {
      return { header: date, name: `M${index + 1}` };
    }),
    { header: "합계", name: "total" },
  ];
  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.InputText
                id="outlined-number"
                label="년도"
                type="number"
                onChange={handleChange}
                defaultValue={year}
                size="small"
                />
            <S.InputText
                key={"line_nm"}
                id={"line_nm"}
                label={"라인"}
                size="small"
                handleInputTextChange={handleTextChange}
                onClickSearch={handleSearchButtonClick}
              />
            </S.SearchWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.TopWrap>
        <S.FlexTop>
          <S.PartCapaLeft>
            <S.Title>월별 생산량 추이</S.Title>
            <S.ChartWrap>
              {responseData && (
                <Chart
                  id={"chart"}
                  options={cOptions}
                  series={responseData.data.rows[0].lineGraph}
                  type="line"
                  height={350}
                />
              )}
            </S.ChartWrap>
          </S.PartCapaLeft>
          <S.PartCapaRight>
          <S.Title>생산량 점유율</S.Title>
            <S.ChartWrap>
              {responseData && (
                <DonutChart data={responseData.data.rows[0].pieGraph}/>
              )}
            </S.ChartWrap>
          </S.PartCapaRight>
        </S.FlexTop>
        <S.LineCapaBottom>
        <S.GridWrap2>
          {responseData && (
            <GridSingle columns={columns} data={responseData.data.rows[0].grid} refGrid={refSingleGrid}/>
          )}
        </S.GridWrap2>
      </S.LineCapaBottom>
      </S.TopWrap>
      
      {/* <SplitterLayout vertical></SplitterLayout> */}
    </ContentsArea>
  );
};

export default MonthlyPartCapa;
