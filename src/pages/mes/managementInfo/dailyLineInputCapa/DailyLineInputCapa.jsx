import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
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
import * as C from "./DailyLineInputCapa.styled";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";

const DailyLineInputCapa = ({ toggle }) => {
  LoginStateChk();
  const refSingleGrid = useRef(null);
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime().dateFull,
  });
  const [year, setYear] = useState(new Date().getFullYear());
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData();
  };
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.monthlyProd, {
        params: {
          reg_date: year,
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
  const stackedOptions = {
    colors: ["rgb(107, 232, 168)", "rgb(80, 151, 244)", "rgb(233, 204, 71)", "rgb(225, 73, 124)"],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: "60%", // 막대 너비
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
  };
  const stackedTmpData = [
    {
      name: "반제품",
      data: [
        {
          x: "2023-07-09",
          y: 1753,
        },
        {
          x: "2023-07-10",
          y: 0,
        },
        {
          x: "2023-07-11",
          y: 0,
        },
        {
          x: "2023-07-12",
          y: 700,
        },
        {
          x: "2023-07-13",
          y: 654,
        },
        {
          x: "2023-07-14",
          y: 606,
        },
        {
          x: "2023-07-15",
          y: 700,
        },
        {
          x: "2023-07-16",
          y: 654,
        },
        {
          x: "2023-07-17",
          y: 606,
        },
      ],
    },
    {
      name: "전구체",
      data: [
        {
          x: "2023-07-09",
          y: 1753,
        },
        {
          x: "2023-07-10",
          y: 1356,
        },
        {
          x: "2023-07-11",
          y: 1234,
        },
        {
          x: "2023-07-12",
          y: 700,
        },
        {
          x: "2023-07-13",
          y: 654,
        },
        {
          x: "2023-07-14",
          y: 606,
        },
        {
          x: "2023-07-15",
          y: 700,
        },
        {
          x: "2023-07-16",
          y: 654,
        },
        {
          x: "2023-07-17",
          y: 606,
        },
      ],
    },
    {
      name: "리튬",
      data: [
        {
          x: "2023-07-09",
          y: 3987,
        },
        {
          x: "2023-07-10",
          y: 3022,
        },
        {
          x: "2023-07-11",
          y: 3012,
        },
        {
          x: "2023-07-12",
          y: 700,
        },
        {
          x: "2023-07-13",
          y: 654,
        },
        {
          x: "2023-07-14",
          y: 606,
        },
        {
          x: "2023-07-15",
          y: 700,
        },
        {
          x: "2023-07-16",
          y: 654,
        },
        {
          x: "2023-07-17",
          y: 606,
        },
      ],
    },
    {
      name: "첨가제",
      data: [
        {
          x: "2023-07-09",
          y: 700,
        },
        {
          x: "2023-07-10",
          y: 654,
        },
        {
          x: "2023-07-11",
          y: 606,
        },
        {
          x: "2023-07-12",
          y: 700,
        },
        {
          x: "2023-07-13",
          y: 654,
        },
        {
          x: "2023-07-14",
          y: 606,
        },
        {
          x: "2023-07-15",
          y: 700,
        },
        {
          x: "2023-07-16",
          y: 654,
        },
        {
          x: "2023-07-17",
          y: 606,
        },
      ],
    },
  ];
  const cOptions = {
    colors: ["rgb(107, 232, 168)", "rgb(80, 151, 244)"],
    plotOptions: {
      // 차트 시각화 옵션
      bar: {
        // 막대그래프 옵션
        columnWidth: "50%", // 막대 너비
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
  // GetMonthlyLineCapaData(dateText.endDate, textInput);

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
      {isAuto === true && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.Date datePickerSet={"single"} dateText={dateText.endDate} setDateText={setDateText} />
            </S.SearchWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton>
      )}
      <S.TopWrap>
        <S.FlexTop>
          <S.PartCapaLeft>
            <S.Title>투입량</S.Title>
            <S.ChartWrap>
              {responseData && <Chart id={"chart"} options={stackedOptions} series={stackedTmpData} type="bar" height={350} />}
            </S.ChartWrap>
          </S.PartCapaLeft>
          <S.PartCapaRight>
            <S.Title>생산량</S.Title>
            <S.ChartWrap>
              {responseData && <Chart id={"chart"} options={cOptions} series={responseData.data.rows[0].lineGraph} type="bar" height={350} />}
            </S.ChartWrap>
          </S.PartCapaRight>
        </S.FlexTop>
        <S.LineCapaBottom>
          <S.GridWrap2>{responseData && <GridSingle columns={columns} data={responseData.data.rows[0].grid} refGrid={refSingleGrid} />}</S.GridWrap2>
        </S.LineCapaBottom>
      </S.TopWrap>

      {/* <SplitterLayout vertical></SplitterLayout> */}
    </ContentsArea>
  );
};

export default DailyLineInputCapa;
