import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import strJson from "./dayData.json";
import strGridJson from "./MonthlyLineCapaData.json";
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
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import InputSearch from "components/input/InputSearch";
import TextField from "@mui/material/TextField";
import BackDrop from "components/backdrop/BackDrop";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";

const DailyLineCapa = ({toggle}) => {
  LoginStateChk();
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    endDate: DateTime().dateFull,
  });
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    setResult(GetDateMonth(strGridJson, dateText.endDate));
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData(dateText.endDate);
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const GetMonthlyLineCapaData = (endDate) => {
    restAPI
      .get(restURI.dailyLine, {
        params: { reg_date: endDate, line_nm: textInput },
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
  const tmpDate = new Date(dateText.endDate);
  tmpDate.setDate(tmpDate.getDate() - 12);
  const dateHeaders = [];
  for (let i = 0; i < 12; i++) {
    tmpDate.setDate(tmpDate.getDate() + 1);
    const year = tmpDate.getFullYear();
    const month = (tmpDate.getMonth() + 1).toString().padStart(2, "0");
    const day = tmpDate.getDate().toString().padStart(2, "0");
    const dateString = year + "-" + month + "-" + day; // 년-월-일
    dateHeaders.push(dateString);
  }
  
  const columns = [
    { header: "라인", name: "line_cd" },
    ...dateHeaders.map((date, index) => {
      return { header: date, name: `D${index + 1}` };
    }),
    { header: "합계", name: "total" },
  ];
  // console.log(responseData.data.rows[0].graph)
  const tmpSeries = [];
  for (let i = 0; i < 12; i++) {
    tmpSeries.push({
      create_at: i + 1 + "월",
    });
  }

  return (
    <ContentsArea>
      {isAuto === true && <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
            <S.SearchWrap>
              <S.Date
                datePickerSet={"single"}
                dateText={dateText}
                setDateText={setDateText}
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
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick}/>
            </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>}
      <S.TopWrap>
        <S.LineCapaTop>
          <S.Title>생산포장 라인 별 생산량(일)</S.Title>
            <S.ChartWrap2>
            {responseData && (
              <Chart
                options={cOptions}
                series={responseData.data.rows[0].graph}
                type="line"
                height={350}
              />
            )}
            </S.ChartWrap2>
        </S.LineCapaTop>
        <S.LineCapaBottom>
          <S.GridWrap>
            {responseData && (
              <GridSingle columns={columns} data={responseData.data.rows[0].grid} refGrid={refSingleGrid}/>
            )}
            {!responseData && <GridSingle columns={columns} />}
          </S.GridWrap>
        </S.LineCapaBottom>
      </S.TopWrap>
      {/* <SplitterLayout vertical></SplitterLayout> */}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};

export default DailyLineCapa;
