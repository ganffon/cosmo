import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import DateTime from "components/datetime/DateTime";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import BackDrop from "components/backdrop/BackDrop";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";

export const CountChart = ({ toggle }) => {
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetCountChart();
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const GetCountChart = () => {
    restAPI
      .get(restURI.countChart, {
        params: { reg_date: dateText.startDate, line_nm: textInput },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직

        setResponseData(response?.data?.data?.rows[0].graph);
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
        borderRadius: 3,
        margin: 2,
        dataLabels: {
          position: "top", // top, center, bottom
        },
        columnWidth: "80%", // 막대 너비
        // horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        // fontSize: "12px",
        colors: ["#304758"],
      },
    },
  };

  return (
    <ContentsArea>
      {isAuto === true && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.Date datePickerSet={"single"} dateText={dateText} setDateText={setDateText} />
            </S.SearchWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton>
      )}
      <S.TopWrap>
        <S.countChartFirst>
          <S.Title>시간별 충진 Count</S.Title>
          <S.ChartWrap2>
            {responseData && <Chart options={cOptions} series={responseData} type="bar" height={"100%"} />}
          </S.ChartWrap2>
        </S.countChartFirst>
      </S.TopWrap>
      {/* <SplitterLayout vertical></SplitterLayout> */}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};
