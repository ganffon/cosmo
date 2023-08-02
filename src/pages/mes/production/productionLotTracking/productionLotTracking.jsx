import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as LS from "./productionLotTracking.styled";
import InputSearch from "components/input/InputSearch";
import * as S from "pages/mes/style/oneGrid.styled";
import DateTime from "components/datetime/DateTime";
import useInputSet from "custom/useInputSet";
import InputPaper from "components/input/InputPaper";
import ProductionLotTrackingSet from "./productionLotTrackingSet";
import * as disRow from "custom/useDisableRowCheck";
import GridSingle from "components/grid/GridSingle";
import * as uSearch from "custom/useSearch";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import * as Cbo from "custom/useCboSet";
import CN from "json/ColumnName.json";
import { TextField } from "@mui/material";

function ProductionLotTracking() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const refMainGrid = useRef(null);
  const refMiddleLeftGrid = useRef(null);
  const refMiddleRightGrid = useRef(null);
  const refBottomLeftGrid = useRef(null);
  const refBottomRightGrid = useRef(null);
  const refGridSelect = useRef(null);
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });

  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");

  const resetProd = () => {
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataMiddleLeft, setGridDataMiddleLeft] = useState(null);
  const [gridDataMiddleRight, setGridDataMiddleRight] = useState(null);
  const [gridDataBottomLeft, setGridDataBottomLeft] = useState(null);
  const [gridDataBottomRight, setGridDataBottomRight] = useState(null);
  const {
    rowHeaders,
    rowHeadersNum,
    header,
    columns,
    columnOptions,
    columnsMiddleLeft,
    columnsMiddleRight,
    columnsBottomLeft,
    columnsBottomRight,
    columnsSelectProd,
    inputSet,
  } = ProductionLotTrackingSet(onClickGridButton);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(false, refMainGrid);

  const [gridDataSelect, setGridDataSelect] = useState(null);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refMainGrid?.current !== null) {
      refMainGrid?.current?.gridInst?.refreshLayout();
    }
    if (refMiddleLeftGrid?.current !== null) {
      refMiddleLeftGrid?.current?.gridInst?.refreshLayout();
    }
    if (refMiddleRightGrid?.current !== null) {
      refMiddleRightGrid?.current?.gridInst?.refreshLayout();
    }
    if (refBottomLeftGrid?.current !== null) {
      refBottomLeftGrid?.current?.gridInst?.refreshLayout();
    }
    if (refBottomRightGrid?.current !== null) {
      refBottomRightGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  function onClickGridButton() {
    setIsSnackOpen({
      ...isSnackOpen,
      open: true,
      message: "버튼 기능은 준비중입니다.",
      severity: "warning",
    });
  }

  const [gridData, setGridData] = useState(null);
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickProdCancel = () => {
    resetProd();
    setInputSearchValue([]);
  };
  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };
  useEffect(() => {
    onClickSearch();
  }, []);

  const onClickSearch = () => {
    actSearch();
  };
  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product + `?use_fg=true`
  ); //➡️ Modal Select Search Prod

  const actSearch = async () => {
    setIsBackDrop(true);
    try {
      let conditionProdID, lineID;
      comboValue.line_id ? (lineID = `&line_id=${comboValue.line_id}`) : (lineID = "");
      prodCD.current !== "품목코드"
        ? (conditionProdID = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`)
        : (conditionProdID = "");
      let readURI =
        restURI.prdPacking +
        `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
        conditionProdID +
        lineID;

      let gridData = await restAPI.get(readURI);

      setGridDataHeader(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };
  const findLotInfo = async (e) => {
    if (e?.targetType === "cell") {
      try {
        const lotNo = e?.instance?.store?.data?.rawData[e?.rowKey].lot_no;
        setIsBackDrop(true);
        let readURI = `/std/income/erp?lot_no=${lotNo}`;

        let gridData = await restAPI.get(readURI);

        setGridDataBottomRight(gridData?.data?.data.rows);
      } catch (err) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: err?.response?.data?.message,
          severity: "error",
        });
      } finally {
        setDisableRowToggle(!disableRowToggle);
        setIsBackDrop(false);
      }
    }
  };
  const onClickGrid = (e) => {
    if (e?.columnName !== "button1" && e?.columnName !== "button2" && e?.targetType === "cell") {
      actSearchGrid(e);
    }
  };

  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;

    if (dblClickGrid === "Search") {
      setInputSearchValue([]);
      columnName = ["prod_cd", "prod_nm"];

      prodNM.current = "";
      for (let i = 0; i < columnName.length; i++) {
        setInputSearchValue((prevList) => {
          if (columnName[i] === "prod_cd") {
            prodCD.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
          }
          if (columnName[i] === "prod_nm") {
            prodNM.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
          }
        });
      }
    }
    setIsModalSelectOpen(false);
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
    //actSearchDetail(headerClickRowID);
  };

  const actSearchGrid = async (e) => {
    try {
      const workPackingID = e?.instance?.store?.data?.rawData[e?.rowKey].work_packing_id;
      const lotNo = e?.instance?.store?.data?.rawData[e?.rowKey].lot_no;
      setIsBackDrop(true);
      let readURI = restURI.prdLotTracking + `?work_packing_id=${workPackingID}&lot_no=${lotNo}&`;
      if (inputTextChange && inputBoxID) {
        let cnt = 1;
        //🔸inputBox 가 있다면?!
        if (inputBoxID.length > 0) {
          //🔸inputBox 갯수만큼 반복!
          for (let i = 0; i < inputBoxID.length; i++) {
            //🔸inputBox에 검색조건 있으면 가져오기
            if (inputTextChange[inputBoxID[i]]) {
              //🔸처음 가져오는 것이면 params에 ? 세팅
              if (cnt === 0) {
                readURI = "?";
                cnt++;
              }
              readURI = readURI + inputBoxID[i] + "=" + inputTextChange[inputBoxID[i]] + "&";
            }
          }
          //🔸마지막에 찍힌 & 기호 제거
          readURI = readURI.slice(0, readURI.length - 1);
        }
      } else {
        readURI = readURI.slice(0, readURI.length - 1);
      }
      let gridData = await restAPI.get(readURI);

      setGridDataMiddleLeft(gridData?.data?.data?.rows[0].weigh);
      setGridDataMiddleRight(gridData?.data?.data?.rows[0].weighDetail);
      setGridDataMiddleRight(gridData?.data?.data?.rows[0].weighDetail);
      setGridDataBottomLeft(gridData?.data?.data?.rows[0].subdivision);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const Grid = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columns}
        rowHeaders={rowHeaders}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refMainGrid}
        onClickGrid={onClickGrid}
      />
    );
  }, [gridDataHeader]);

  const onClickGridForIncome = async (e) => {
    const lotNo = e?.instance?.store?.data?.rawData[e?.rowKey].lot_no;
    let readURI = restURI.erpIncome + `?lot_no=${lotNo}`;
    let gridData;
    try {
      gridData = await restAPI.get(readURI);
    } catch {
      setGridDataBottomRight([]);
    }

    setGridDataBottomRight(gridData?.data?.data?.rows);
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <LS.ToolWrap>
          <LS.SearchWrap>
            <LS.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />

            {/* <InputSearch
              id={"line_nm"}
              name={"라인명"}
              handleInputTextChange={handleInputTextChange}
              onClickSearch={onClickSearch}
            /> */}
            <LS.ComboBox
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
            <LS.InputPaperWrap>
              <InputPaper width={"180px"} name={"품목코드"} value={prodCD.current || ""} btn={false} />
            </LS.InputPaperWrap>
            <LS.InputPaperWrap>
              <InputPaper
                width={"240px"}
                name={"품목"}
                value={prodNM.current || ""}
                btn={true}
                onClickSelect={onClickProd}
                onClickRemove={onClickProdCancel}
              />
            </LS.InputPaperWrap>
          </LS.SearchWrap>
          <LS.ButtonTop>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </LS.ButtonTop>
        </LS.ToolWrap>
      </S.ShadowBoxButton>
      <LS.ContentTop>
        <LS.TitleMid>생산품목</LS.TitleMid>
        <LS.TopGridWrap>{Grid}</LS.TopGridWrap>
      </LS.ContentTop>

      <LS.MiddleContentWrap>
        <LS.ContentMiddleLeft>
          <LS.TitleMid>계량 현황</LS.TitleMid>
          <LS.GridWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsMiddleLeft}
              rowHeaders={rowHeaders}
              header={header}
              data={gridDataMiddleLeft}
              draggable={false}
              refGrid={refMiddleRightGrid}
            />
          </LS.GridWrap>
        </LS.ContentMiddleLeft>

        <LS.ContentMiddleRight>
          <LS.TitleMid>투입 현황</LS.TitleMid>
          <LS.GridWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsMiddleRight}
              rowHeaders={rowHeaders}
              header={header}
              data={gridDataMiddleRight}
              draggable={false}
              refGrid={refMiddleLeftGrid}
              onClickGrid={findLotInfo}
            />
          </LS.GridWrap>
        </LS.ContentMiddleRight>
      </LS.MiddleContentWrap>

      <LS.BottomContentWrap>
        <LS.ContentBottomLeft>
          <LS.TitleMid>소분 현황</LS.TitleMid>
          <LS.GridWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsBottomLeft}
              rowHeaders={rowHeaders}
              header={header}
              data={gridDataBottomLeft}
              draggable={false}
              refGrid={refBottomLeftGrid}
              onClickGrid={findLotInfo}
            />
          </LS.GridWrap>
        </LS.ContentBottomLeft>
        <LS.ContentBottomRight>
          <LS.TitleMid>입고 현황</LS.TitleMid>
          <LS.GridWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsBottomRight}
              rowHeaders={rowHeaders}
              header={header}
              data={gridDataBottomRight}
              draggable={false}
              refGrid={refBottomRightGrid}
            />
          </LS.GridWrap>
        </LS.ContentBottomRight>
      </LS.BottomContentWrap>
      {isModalSelectOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelectProd}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default ProductionLotTracking;
