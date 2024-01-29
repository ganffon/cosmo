import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";

import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import SettingsIcon from "@mui/icons-material/Settings";
import DateTime from "components/datetime/DateTime";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

import { Icon } from "@mui/material";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";
import { MonthlyTempHumidChartModal } from "./modal/MonthlyTempHumidChartModal";
import BackDrop from "components/backdrop/BackDrop";
import { MonthlyTempHumidChartSettingModal } from "./modal/MonthlyTempHumidChartSettingModal";

export const MonthlyTempHumidChart = ({ toggle }) => {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().year + "-" + DateTime().month,
  });
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  const [selectedChart, setSelectedChart] = useState({});
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [chartVisible, setChartVisible] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  //상하한 데이터 변수
  const [tmpUCL, setTmpUCL] = useState(0);
  const [tmpLCL, setTmpLCL] = useState(0);
  const [huUCL, setHuUCL] = useState(0);
  const [huLCL, setHuLCL] = useState(0);

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);

  const handleSearchButtonClick = () => {
    setIsButtonVisible(false);
    GetMonthlyLineCapaData();
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const GetMonthlyLineCapaData = () => {
    setIsBackDrop(true);
    setChartVisible(false);
    restAPI
      .get(restURI.monthlyChangeChart, {
        params: {
          reg_date: dateText.startDate,
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직

        setResponseData(response.data.data.rows);
        setIsBackDrop(false);
        setChartVisible(true);
        setIsButtonVisible(true);
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
    colors: ["#4d33df", "#4d33df", "#2962FF", "#2962FF", "#db6666", "#db6666", "#C51162", "#C51162"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.24, 1, 1, 1, 0.24, 1, 1, 1],
    },
    forecastDataPoints: {
      count: 0,
    },
    stroke: {
      curve: "straight",
      width: [0, 2, 2, 2, 0, 2, 2, 2],
      dashArray: [0, 0, 5, 5, 0, 0, 5, 5],
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
    return (
      <S.ChartWrap2>
        {responseData && <Chart options={chartOptions} series={responseData[0]} type="rangeArea" height={"100%"} />}
      </S.ChartWrap2>
    );
  }, [responseData]);
  const chart2 = useMemo(() => {
    return (
      <S.ChartWrap2>
        {responseData && <Chart options={chartOptions} series={responseData[1]} type="rangeArea" height={"100%"} />}
      </S.ChartWrap2>
    );
  }, [responseData]);
  const chart3 = useMemo(() => {
    return (
      <S.ChartWrap2>
        {responseData && <Chart options={chartOptions} series={responseData[2]} type="rangeArea" height={"100%"} />}
      </S.ChartWrap2>
    );
  }, [responseData]);
  const chart4 = useMemo(() => {
    return (
      <S.ChartWrap2>
        {responseData && <Chart options={chartOptions} series={responseData[3]} type="rangeArea" height={"100%"} />}
      </S.ChartWrap2>
    );
  }, [responseData]);
  const chart5 = useMemo(() => {
    return (
      <S.ChartWrap2>
        {responseData && <Chart options={chartOptions} series={responseData[4]} type="rangeArea" height={"100%"} />}
      </S.ChartWrap2>
    );
  }, [responseData]);

  const innerBtnClicked = (title) => {
    let kindVal = 0;
    setModalTitle(title);
    switch (title) {
      case "자재창고":
        setSelectedChart(chart1);
        kindVal = 0;
        break;
      case "제품창고":
        setSelectedChart(chart2);
        kindVal = 1;
        break;
      case "투입실":
        setSelectedChart(chart3);
        kindVal = 2;
        break;
      case "첨가제 계량실":
        setSelectedChart(chart4);
        kindVal = 3;
        break;
      case "소성로":
        setSelectedChart(chart5);
        kindVal = 4;
        break;
      default:
        break;
    }
    //온습도 상한 하한 설정
    //온도 상한
    setTmpUCL(responseData[kindVal][2]?.data[0].y);
    //온도 하한
    setTmpLCL(responseData[kindVal][3]?.data[0].y);
    //습도 상한
    setHuUCL(responseData[kindVal][6]?.data[0].y);
    //습도 하한
    setHuLCL(responseData[kindVal][7]?.data[0].y);
    //온습도 상한 하한 설정 끝

    //모달용 데이터 설정
    setModalData(responseData[kindVal]);

    setIsModalOpen(true);
  };
  const modalClose = () => {
    setIsModalOpen(false);
  };

  const settingModalOpen = () => {
    setIsSettingModalOpen(true);
  };

  const settingModalClose = () => {
    setIsSettingModalOpen(false);
  };

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
              <S.InnerBtnComponent onClick={settingModalOpen} height={"34px"}>
                <SettingsIcon sx={{ color: "rgba(20, 145, 206, 1)" }} /> 설정
              </S.InnerBtnComponent>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton2>
      )}
      <S.HumidFlexTop>
        <S.HumidLeft>
          <S.InnerButtonTitleWrap>
            <S.Title>자재창고</S.Title>
            <S.InnerButtonWrap>
              {isButtonVisible ? (
                <BtnComponent
                  btnName={"Detail"}
                  onClick={() => {
                    innerBtnClicked("자재창고");
                  }}
                />
              ) : null}
            </S.InnerButtonWrap>
          </S.InnerButtonTitleWrap>
          {chartVisible ? chart1 : null}
        </S.HumidLeft>
        <S.HumidRight>
          <S.InnerButtonTitleWrap>
            <S.Title>제품창고</S.Title>
            <S.InnerButtonWrap>
              {isButtonVisible ? (
                <BtnComponent
                  btnName={"Detail"}
                  onClick={() => {
                    innerBtnClicked("제품창고");
                  }}
                />
              ) : null}
            </S.InnerButtonWrap>
          </S.InnerButtonTitleWrap>
          {chartVisible ? chart2 : null}
        </S.HumidRight>
      </S.HumidFlexTop>

      <S.HumidFlexLast>
        <S.GridContainer>
          <S.GridWrap>
            <S.InnerButtonTitleWrap>
              <S.TempHumidTitle>투입실</S.TempHumidTitle>
              <S.InnerButtonWrap>
                {isButtonVisible ? (
                  <BtnComponent
                    btnName={"Detail"}
                    onClick={() => {
                      innerBtnClicked("투입실");
                    }}
                  />
                ) : null}
              </S.InnerButtonWrap>
            </S.InnerButtonTitleWrap>

            {chartVisible ? chart3 : null}
          </S.GridWrap>
          <S.GridWrap>
            <S.InnerButtonTitleWrap>
              <S.TempHumidTitle>첨가제 계량실</S.TempHumidTitle>
              <S.InnerButtonWrap>
                {isButtonVisible ? (
                  <BtnComponent
                    btnName={"Detail"}
                    onClick={() => {
                      innerBtnClicked("첨가제 계량실");
                    }}
                  />
                ) : null}
              </S.InnerButtonWrap>
            </S.InnerButtonTitleWrap>
            {chartVisible ? chart4 : null}
          </S.GridWrap>
          <S.GridWrap>
            <S.InnerButtonTitleWrap>
              <S.TempHumidTitle>소성로</S.TempHumidTitle>
              <S.InnerButtonWrap>
                {isButtonVisible ? (
                  <BtnComponent
                    btnName={"Detail"}
                    onClick={() => {
                      innerBtnClicked("소성로");
                    }}
                  />
                ) : null}
              </S.InnerButtonWrap>
            </S.InnerButtonTitleWrap>
            {chartVisible ? chart5 : null}
          </S.GridWrap>
        </S.GridContainer>
      </S.HumidFlexLast>
      {isModalOpen ? (
        <MonthlyTempHumidChartModal
          width={"95%"}
          height={"90%"}
          title={modalTitle}
          chart={selectedChart}
          setModal={modalClose}
          searchDate={dateText.startDate}
          tmpUSL={tmpUCL}
          tmpLSL={tmpLCL}
          huUSL={huUCL}
          huLSL={huLCL}
          dataList={modalData}
        />
      ) : null}

      {isSettingModalOpen ? (
        <MonthlyTempHumidChartSettingModal
          width={"30%"}
          height={"40%"}
          setModal={settingModalClose}
          dataList={responseData}
          setIsSettingModalOpen={setIsSettingModalOpen}
          handleSearchButtonClick={handleSearchButtonClick}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};
