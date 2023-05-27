import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import strJson from "./data.json";
import strGridJson from "./MonthlyLineCapaData.json";
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
import restURI from "json/restURI.json";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputSearch from "components/input/InputSearch";

const MonthlyLineCapa = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    endDate: DateTime().dateFull,
  });
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState([]);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    setResult(GetDateMonth(strGridJson, dateText.endDate));
    handleSearchButtonClick();
  }, []);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData(dateText.endDate, textInput);
  };
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const GetMonthlyLineCapaData = (endDate, textInput) => {
    restAPI
      .get(restURI.monthlyLine, {
        params: { reg_date: endDate.slice(0, 4), line_nm: textInput },
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
    title: {
      text: "생산포장 라인 별 생산량(월)",
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
    { header: "라인", name: "line_cd" },
    ...dateHeaders.map((date, index) => {
      return { header: date, name: `M${index + 1}` };
    }),
    { header: "합계", name: "total" },
  ];
  if (responseData) {
    console.log(cOptions);
    console.log(responseData.data.rows[0].graph);
    // console.log(responseData.data.rows[0].grid)
    // responseData.data.rows[0].graph[5].data[0].y = 5000
  }

  return (
    <S.ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.ContentsHeader>
            <S.ContentsHeaderWrap>
              <S.Date
                datePickerSet={"single"}
                dateText={dateText}
                setDateText={setDateText}
              />
              <InputSearch
                key={"line_nm"}
                id={"line_nm"}
                name={"라인"}
                handleInputTextChange={handleTextChange}
                onClickSearch={handleSearchButtonClick}
              />
            </S.ContentsHeaderWrap>
            <ButtonSearch onClickSearch={handleSearchButtonClick} />
          </S.ContentsHeader>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.Top>
        {responseData && (
          <Chart
            id={"chart"}
            options={cOptions}
            series={responseData.data.rows[0].graph}
            type="line"
            height={350}
          />
        )}
      </S.Top>
      <S.Bottom>
        {responseData && (
          <GridSingle columns={columns} data={responseData.data.rows[0].grid} />
        )}
      </S.Bottom>
      {/* <SplitterLayout vertical></SplitterLayout> */}
    </S.ContentsArea>
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
