import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import strGridJson from "./MonthlyLineCapaData.json";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";

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
import * as Set from "./TimeRateSet";
import Grid from "@toast-ui/react-grid";

export const TimeRate = ({ toggle }) => {
  const refSingleGrid = useRef(null);
  const refSingleGrid2 = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().year + "-" + DateTime().month,
  });
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [responseSysData, setResponseSysData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);
  const [e1OPTime, setE1OPTime] = useState(1440);
  const [e2OPTime, setE2OPTime] = useState(1440);
  const [e3OPTime, setE3OPTime] = useState(1440);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetTimeRate();
    GetSysTimeRate();
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
    refSingleGrid2?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, isModalOpen]);
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleE1Change = (event) => {
    let targetVal = event.target.value;
    if (event.target.value > 1440) {
      targetVal = 1440;
    } else if (event.target.value < 1) {
      targetVal = 1;
    }
    setE1OPTime(targetVal);
  };
  const handleE2Change = (event) => {
    let targetVal = event.target.value;
    if (event.target.value > 1440) {
      targetVal = 1440;
    } else if (event.target.value < 1) {
      targetVal = 1;
    }
    setE2OPTime(targetVal);
  };
  const handleE3Change = (event) => {
    let targetVal = event.target.value;
    if (event.target.value > 1440) {
      targetVal = 1440;
    } else if (event.target.value < 1) {
      targetVal = 1;
    }
    setE3OPTime(targetVal);
  };
  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };
  const GetTimeRate = () => {
    restAPI
      .get(restURI.timeRate, {
        params: { reg_date: dateText.startDate, e1_time: e1OPTime, e2_time: e2OPTime, e3_time: e3OPTime },
      })
      .then((response) => {
        // console.log(response.data);
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  const GetSysTimeRate = () => {
    restAPI
      .get(restURI.sysTimeRate, {
        params: { reg_date: dateText.startDate, e1_time: e1OPTime, e2_time: e2OPTime, e3_time: e3OPTime },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        // console.log(response.data);
        setResponseSysData(response.data);
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
        colors: ["balck"],
      },
      enabled: false,
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
    yaxis: {
      max: 100,
      min: 0,
    },
  };
  const complexColumns = Set.getTimeHeader();
  const column = Set.getCol();
  const customColumns = column;
  const autoComplexColumns = Set.getAutoTimeHeader();
  const autoColumn = Set.getAutoCol();

  return (
    <ContentsArea>
      {isAuto === true && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
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
              <S.BtnComponent height={"34px"} width={"145px"} onClick={openModal}>
                <S.SearchTitle>기준값 Setting</S.SearchTitle>
              </S.BtnComponent>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton>
      )}
      {isModalOpen && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.InputText
                id="outlined-number"
                label="E1 조업시간(분)"
                type="number"
                onChange={handleE1Change}
                value={e1OPTime}
                max={1440}
                size="small"
              />
              <S.InputText
                id="outlined-number"
                label="E2 조업시간(분)"
                type="number"
                onChange={handleE2Change}
                value={e2OPTime}
                max={1440}
                size="small"
              />
              <S.InputText
                id="outlined-number"
                label="E3 조업시간(분)"
                type="number"
                onChange={handleE3Change}
                value={e3OPTime}
                max={1440}
                size="small"
              />
            </S.SearchWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton>
      )}
      <S.AllWrap>
        <S.TimeRateLeft>
          <S.TimeRateTop>
            <S.Title>비가동 입력 데이터 기준</S.Title>
            <S.ChartWrap2>
              {responseData && (
                <Chart options={cOptions} series={responseData?.data?.rows[0]?.graph} type="line" height={350} />
              )}
            </S.ChartWrap2>
          </S.TimeRateTop>
          <S.TimeRateBottom>
            <S.GridWrap>
              {responseData && (
                <GridSingle
                  header={complexColumns}
                  columns={customColumns}
                  data={responseData?.data?.rows[0]?.grid}
                  refGrid={refSingleGrid2}
                />
              )}
            </S.GridWrap>
          </S.TimeRateBottom>
        </S.TimeRateLeft>
        <S.TimeRateRight>
          <S.TimeRateTop>
            <S.Title>충진 자동 카운트 데이터 기준</S.Title>
            <S.ChartWrap2>
              {responseSysData && (
                <Chart options={cOptions} series={responseSysData?.data?.rows[0]?.graph} type="line" height={350} />
              )}
            </S.ChartWrap2>
          </S.TimeRateTop>
          <S.TimeRateBottom>
            <S.GridWrap>
              {responseSysData && (
                <GridSingle
                  header={autoComplexColumns}
                  columns={autoColumn}
                  data={responseSysData?.data?.rows[0]?.grid}
                  refGrid={refSingleGrid}
                />
              )}
            </S.GridWrap>
          </S.TimeRateBottom>
        </S.TimeRateRight>
      </S.AllWrap>
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};
