import { LayoutContext } from "components/layout/common/Layout";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./productionPackingView.styled";
import * as MS from "./productionPackingModel.styled";
import DateTime from "components/datetime/DateTime";
import InputPaper from "components/input/InputPaper";
import ProductionPackingViewSet from "./productionPackingViewSet";
import CloseIcon from "@mui/icons-material/Close";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import * as Cbo from "custom/useCboSet";
import CN from "json/ColumnName.json";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import ModalSelect from "components/modal/ModalSelect";
import ModalWrap from "components/modal/ModalWrap";
import GridModal from "components/grid/GridModal";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import BackDrop from "components/backdrop/BackDrop";
import { TextField } from "@mui/material";

function ProductionPackingView() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridSelect = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isInputSelectOpen, setIsInputSelectOpen] = useState(false);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const [gridDataModalHeader, setGridDataModalHeader] = useState(null);
  const [gridDataModalDetail, setGridDataModalDetail] = useState(null);

  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");

  const resetProd = () => {
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  const modalSelectHeaderRowID = useRef("");

  const [columnsSelect, setColumnsSelect] = useState([]);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refGridHeader?.current !== null) {
      refGridHeader?.current?.gridInst?.refreshLayout();
    }
    if (refGridDetail?.current !== null) {
      refGridDetail?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    inputSet,
    columnsSelectProd,
  } = ProductionPackingViewSet();
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  useEffect(() => {
    onClickSearch();
  }, []);
  const [isEnd, setIsEnd] = useState(false);
  const onClickSearch = () => {
    // actSearchHeader();
    const startDate = dateText.startDate;
    const endDate = dateText.endDate;
    if (startDate > endDate) {
      setIsEnd(true);
    } else {
      actSearchDetail();
    }
  };

  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
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
  };

  const onClickInputSelectClose = () => {
    setIsInputSelectOpen(false);
  };

  const onClickModalGridSelectGridHeader = (e) => {
    modalSelectHeaderRowID.current = e?.instance.getValue(e?.rowKey, "work_weigh_id");

    if (modalSelectHeaderRowID.current !== null) {
      actSearchModalSelectGridDetail();
    }
  };

  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const actSearchModalSelectGridDetail = async () => {
    try {
      setIsBackDrop(true);
      const readURI = `/prd/weigh-detail?work_weigh_id=${modalSelectHeaderRowID.current}`;

      let gridData = await restAPI.get(readURI);
      setGridDataModalDetail(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };

  const onClickProdCancel = () => {
    resetProd();
    setInputSearchValue([]);
  };

  const actSearchDetail = async () => {
    try {
      setIsBackDrop(true);
      let conditionProdID, conditionLineID;
      prodCD.current !== "품목코드"
        ? (conditionProdID = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`)
        : (conditionProdID = "");
      comboValue.line_id ? (conditionLineID = `&line_id=${comboValue.line_id}`) : (conditionLineID = "");

      let readURI =
        restURI.prdPackingDetail +
        `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
        conditionProdID +
        conditionLineID +
        `&complete_fg=true`;

      let gridData = await restAPI.get(readURI);
      setGridDataDetail(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
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

  return (
    <ContentsArea isAllScreen={isAllScreen}>
      <S.SearchCondition>
        <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
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
        <S.InputPaperWrap>
          <InputPaper width={"180px"} name={"품목코드"} value={prodCD.current || ""} btn={false} />
        </S.InputPaperWrap>
        <S.InputPaperWrap>
          <InputPaper
            width={"240px"}
            name={"품목"}
            value={prodNM.current || ""}
            btn={true}
            onClickSelect={onClickProd}
            onClickRemove={onClickProdCancel}
          />
        </S.InputPaperWrap>
        <S.ButtonTop>
          <BtnComponent btnName={"Search"} onClick={onClickSearch} />
        </S.ButtonTop>
      </S.SearchCondition>
      <S.ContentWrap>
        <S.TitleMid>포장 실적</S.TitleMid>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsDetail}
            rowHeaders={rowHeadersNum}
            header={header}
            data={gridDataDetail}
            draggable={false}
            refGrid={refGridDetail}
          />
        </S.GridWrap>
      </S.ContentWrap>
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
      {isInputSelectOpen ? (
        <ModalWrap width={"95%"} height={"95%"}>
          <MS.HeaderBox>
            <MS.TitleBox>투입일지</MS.TitleBox>
            <MS.ButtonClose color="primary" aria-label="close" onClick={onClickInputSelectClose}>
              <CloseIcon />
            </MS.ButtonClose>
          </MS.HeaderBox>
          <MS.GridBoxTop>
            <GridModal
              data={gridDataModalHeader}
              columns={columnsModalHeader}
              columnOptions={columnOptions}
              header={header}
              refGrid={refGridModalHeader}
              onClick={onClickModalGridSelectGridHeader}
            />
          </MS.GridBoxTop>
          <MS.GridBoxBottom>
            <GridModal
              data={gridDataModalDetail}
              columns={columnsModalDetail}
              columnOptions={columnOptions}
              header={header}
              refGrid={refGridModalDetail}
            />
          </MS.GridBoxBottom>
        </ModalWrap>
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default ProductionPackingView;
