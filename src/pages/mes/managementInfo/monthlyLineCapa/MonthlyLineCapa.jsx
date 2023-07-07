import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import strJson from "./data.json";
import strGridJson from "./MonthlyLineCapaData.json";
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
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputSearch from "components/input/InputSearch";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";

const MonthlyLineCapa = ({ toggle }) => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [year, setYear] = useState(new Date().getFullYear());
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const refSingleGrid = useRef(null);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData(dateText.startDate, textInput);
  };
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const GetMonthlyLineCapaData = (endDate, textInput) => {
    restAPI
      .get(restURI.monthlyLine, {
        params: {
          reg_date: year, //endDate.slice(0, 4)
          line_nm: textInput,
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
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
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
    { header: "라인", name: "line_cd" },
    ...dateHeaders.map((date, index) => {
      return { header: date, name: `M${index + 1}` };
    }),
    { header: "합계", name: "total" },
  ];

  return (
    <ContentsArea>
      {isAuto === true && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.InputText id="outlined-number" label="년도" type="number" onChange={handleChange} defaultValue={year} size="small" />
              <S.InputText
                key={"line_nm"}
                id={"line_nm"}
                label={"라인"}
                size="small"
                variant="outlined"
                onKeyDown={onKeyPress}
                onChange={handleTextChange}
              />
            </S.SearchWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton>
      )}
      <S.TopWrap>
        <S.LineCapaTop>
          <S.Title>라인별 생산량(월)</S.Title>
          <S.ChartWrap2>
            {responseData && <Chart id={"chart"} options={cOptions} series={responseData.data.rows[0].graph} type="line" height={350} />}
          </S.ChartWrap2>
        </S.LineCapaTop>
        <S.LineCapaBottom>
          <S.GridWrap>{responseData && <GridSingle columns={columns} data={responseData.data.rows[0].grid} refGrid={refSingleGrid} />}</S.GridWrap>
        </S.LineCapaBottom>
      </S.TopWrap>
    </ContentsArea>
  );
};

export default MonthlyLineCapa;

const InputBox = styled("div")`
  display: flex;
`;

const InputSet = styled(TextField)`
  width: 60px;
  margin-left: 10px;
  margin-top: 5px;
`;
