import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import BackDrop from "components/backdrop/BackDrop";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";
import * as Set from "./PerformanceRateSet";

const PerformanceRate = ({ toggle }) => {
  LoginStateChk();
  const refSingleGrid = useRef(null);
  const refSingleGrid2 = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [responseSysData, setResponseSysData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);
  const [e1OPTime, setE1OPTime] = useState(1440);
  const [e2OPTime, setE2OPTime] = useState(1440);
  const [e3OPTime, setE3OPTime] = useState(1440);
  const [e1OPTarget_qty, setE1OPTarget_qty] = useState(7500);
  const [e2OPTarget_qty, setE2OPTarget_qty] = useState(7500);
  const [e3OPTarget_qty, setE3OPTarget_qty] = useState(7500);

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetPerformanceRate();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, isModalOpen]);

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
  const handleE1TargerChange = (event) => {
    let targetVal = event.target.value;
    setE1OPTarget_qty(targetVal);
  };
  const handleE2TargerChange = (event) => {
    let targetVal = event.target.value;
    setE2OPTarget_qty(targetVal);
  };
  const handleE3TargerChange = (event) => {
    let targetVal = event.target.value;
    setE3OPTarget_qty(targetVal);
  };
  const GetPerformanceRate = () => {
    restAPI
      .get(restURI.performanceRate, {
        params: {
          start_date: dateText.startDate,
          end_date: dateText.endDate,
          e1_time: e1OPTime,
          e2_time: e2OPTime,
          e3_time: e3OPTime,
          e1_target_qty: e1OPTarget_qty,
          e2_target_qty: e2OPTarget_qty,
          e3_target_qty: e3OPTarget_qty,
        },
      })
      .then((response) => {
        console.log(response.data);
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
  const complexColumns = Set.getPerformanceHeader();
  const column = Set.getPerformanceCol();
  const customColumns = column;

  return (
    <ContentsArea>
      {isAuto === true && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
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
        <S.ShadowHeaderBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchColumnWrap>
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
              <S.SearchWrap>
                <S.InputText
                  id="outlined-number"
                  label="E1 목표량(KG)"
                  type="number"
                  onChange={handleE1TargerChange}
                  value={e1OPTarget_qty}
                  size="small"
                />
                <S.InputText
                  id="outlined-number"
                  label="E2 목표량(KG)"
                  type="number"
                  onChange={handleE2TargerChange}
                  value={e2OPTarget_qty}
                  size="small"
                />
                <S.InputText
                  id="outlined-number"
                  label="E3 목표량(KG)"
                  type="number"
                  onChange={handleE3TargerChange}
                  value={e3OPTarget_qty}
                  size="small"
                />
              </S.SearchWrap>
            </S.SearchColumnWrap>
          </S.ToolWrap>
        </S.ShadowHeaderBoxButton>
      )}
      <S.AllWrap>
        <S.PerformaceRateLeft>
          <S.TimeRateTop>
            <S.Title>성능가동률</S.Title>
            <S.ChartWrap2>
              {responseData && <Chart options={cOptions} series={responseData?.data?.rows[0].graph} type="line" height={350} />}
            </S.ChartWrap2>
          </S.TimeRateTop>
          <S.TimeRateBottom>
            <S.GridWrap>
              <GridSingle header={complexColumns} columns={customColumns} data={responseData?.data?.rows[0].grid} refGrid={refSingleGrid} />
            </S.GridWrap>
          </S.TimeRateBottom>
        </S.PerformaceRateLeft>
      </S.AllWrap>
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};

export default PerformanceRate;
