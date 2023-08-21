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
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import TextField from "@mui/material/TextField";
import BackDrop from "components/backdrop/BackDrop";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";
import * as Cbo from "custom/useCboSet";
import CN from "json/ColumnName.json";
import NoticeSnack from "components/alert/NoticeSnack";

export const DailyLineCapa = ({ toggle }) => {
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
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
    setResult(GetDateMonth(strGridJson, dateText.startDate));
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData(dateText.startDate);
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
  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const GetMonthlyLineCapaData = async (endDate) => {
    try {
      setIsBackDrop(true);

      let lineID;
      comboValue.line_id ? (lineID = `&line_id=${comboValue.line_id}`) : (lineID = "");
      const result = await restAPI.get(restURI.dailyLine + `?reg_date=${endDate}` + lineID);

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
  const tmpDate = new Date(dateText.startDate);
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
      {isAuto === true && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.Date datePickerSet={"single"} dateText={dateText} setDateText={setDateText} />
              {/* <S.InputText key={"line_nm"} id={"line_nm"} label={"라인"} size="small" onKeyDown={onKeyPress} onChange={handleTextChange} /> */}
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
          <S.Title>생산포장 라인 별 생산량(일)</S.Title>
          <S.ChartWrap2>
            {responseData && (
              <Chart options={cOptions} series={responseData.data.rows[0].graph} type="line" height={350} />
            )}
          </S.ChartWrap2>
        </S.LineCapaTop>
        <S.LineCapaBottom>
          <S.GridWrap>
            {responseData && (
              <GridSingle
                rowHeaders={["rowNum"]}
                columns={columns}
                data={responseData.data.rows[0].grid}
                refGrid={refSingleGrid}
              />
            )}
            {!responseData && <GridSingle columns={columns} />}
          </S.GridWrap>
        </S.LineCapaBottom>
      </S.TopWrap>
      {/* <SplitterLayout vertical></SplitterLayout> */}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};
