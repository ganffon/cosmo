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
import * as S from "../manage.styled";
import Chart from "react-apexcharts";

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
import * as Cbo from "custom/useCboSet";
import CN from "json/ColumnName.json";
import { BackDrop } from "components/backdrop/BackDrop.styled";
import NoticeSnack from "components/alert/NoticeSnack";

const MonthlyLineCapa = ({ toggle }) => {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
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
  const GetMonthlyLineCapaData = async (endDate, textInput) => {
    try {
      setIsBackDrop(true);
      let lineID;
      comboValue.line_id ? (lineID = `&line_id=${comboValue.line_id}`) : (lineID = "");
      const result = await restAPI.get(restURI.monthlyLine + `?reg_date=${year}` + lineID);

      setResponseData(result?.data);

      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
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
              <S.InputText
                id="outlined-number"
                label="년도"
                type="number"
                onChange={handleChange}
                defaultValue={year}
                size="small"
              />
              {/* <S.InputText
                key={"line_nm"}
                id={"line_nm"}
                label={"라인"}
                size="small"
                variant="outlined"
                onKeyDown={onKeyPress}
                onChange={handleTextChange}
              /> */}
              <S.ComboBox
                disablePortal
                id="lineCbo"
                size="small"
                key={(option) => option?.line_id}
                options={lineOpt || null}
                getOptionLabel={(option) => option?.line_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    line_id: newValue?.line_id === undefined ? null : newValue?.line_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
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
            {responseData && (
              <Chart
                id={"chart"}
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
              <GridSingle columns={columns} data={responseData.data.rows[0].grid} refGrid={refSingleGrid} />
            )}
          </S.GridWrap>
        </S.LineCapaBottom>
      </S.TopWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
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
