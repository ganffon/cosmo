import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ButtonSearch from "components/button/ButtonSearch";
import CountRawsSet from "./CountRawsSet";
import * as C from './CountRaws.styled'
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import CountRawsModal from './CountRawsModal';
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";

const TempRaws = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime().dateFull,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const weighID = useRef("");
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridDetail2 = useRef(null);
  const refGridDetail3 = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [grid2DataDetail, setGrid2DataDetail] = useState(null);
  const [grid3DataDetail, setGrid3DataDetail] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData();
  };
  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.countRaws, {
        params: { 
          reg_date: dateText.startDate
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
        setGridDataDetail(response?.data?.data?.rows[0].E1);
        setGrid2DataDetail(response?.data?.data?.rows[1].E2);
        setGrid3DataDetail(response?.data?.data?.rows[2].E3);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: response?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
      })
      .catch((err) => {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: err?.response?.data?.message,
          severity: "error",
          location: "bottomRight",
        });
      })
      .finally(() => {
        setIsBackDrop(false);
      })
      
  };
  useEffect(() => {
    GetMonthlyLineCapaData();
  }, []);

  const { columnsDetail, columnOptions, rowHeadersNum, header } = CountRawsSet();
  const columnsHeader = ({
    height: 80,
    complexColumns: [
      {
        header: "E1",
        name: "A",
        childNames: ["scan_dt", "scan_value"],
      },
    ],
  });
  const columnsHeader2 = ({
    height: 80,
    complexColumns: [
      {
        header: "E2",
        name: "E2",
        childNames: ["scan_dt", "scan_value"],
      },
    ],
  });
  const columnsHeader3 = ({
    height: 80,
    complexColumns: [
      {
        header: "E3",
        name: "E3",
        childNames: ["scan_dt", "scan_value"],
      },
    ],
  });
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
    refGridDetail2?.current?.gridInst?.refreshLayout();
    refGridDetail3?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  
  
  return (
    <ContentsArea>
      <C.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <C.ToolWrap>
          <C.SearchWrap>
          <C.Date
            datePickerSet={"single"}
            dateText={dateText.startDate}
            setDateText={setDateText}
          />  
        </C.SearchWrap>
          <C.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
          </C.ButtonWrap>
        </C.ToolWrap>
      </C.ShadowBoxButton>
      <C.ShadowBoxGrid isAllScreen={isAllScreen}>
        <C.GridContainer>
          <C.CntTextWrapper >
            <C.GridWrap isAllScreen={isAllScreen}>
              {gridDataDetail && (
              <GridSingle
                columnOptions={columnOptions}
                columns={columnsDetail}
                rowHeaders={rowHeadersNum}
                header={columnsHeader}
                data={gridDataDetail}
                refGrid={refGridDetail}
              />
              )}
            </C.GridWrap >
          </C.CntTextWrapper>
          <C.CntTextWrapper >
            <C.GridWrap isAllScreen={isAllScreen}>
            {gridDataDetail && (
              <GridSingle
                columnOptions={columnOptions}
                columns={columnsDetail}
                rowHeaders={rowHeadersNum}
                header={columnsHeader2}
                data={grid2DataDetail}
                refGrid={refGridDetail2}
              />
            )}
            </C.GridWrap>
          </C.CntTextWrapper>
          <C.CntTextWrapper >
            <C.GridWrap isAllScreen={isAllScreen}>
              {gridDataDetail && (
                <GridSingle
                  columnOptions={columnOptions}
                  columns={columnsDetail}
                  rowHeaders={rowHeadersNum}
                  header={columnsHeader3}
                  data={grid3DataDetail}
                  refGrid={refGridDetail3}
                />
              )}
            </C.GridWrap>
          </C.CntTextWrapper>
        </C.GridContainer>
      </C.ShadowBoxGrid>
        
        
        
    </ContentsArea>
  );
};

export default TempRaws;
