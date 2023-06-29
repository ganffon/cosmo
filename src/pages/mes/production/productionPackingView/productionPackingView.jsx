import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./productionPackingView.styled";
import * as MS from "./productionPackingModel.styled";
import DateTime from "components/datetime/DateTime";
import InputPaper from "components/input/InputPaper";
import ProductionPackingViewSet from "./productionPackingViewSet";
import ButtonSearch from "components/button/ButtonSearch";
import * as disRow from "custom/useDisableRowCheck";
import CloseIcon from "@mui/icons-material/Close";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";

import InputSearch from "components/input/InputSearch";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import ModalSelect from "components/modal/ModalSelect";
import ModalWrap from "components/modal/ModalWrap";
import GridModal from "components/grid/GridModal";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import BackDrop from "components/backdrop/BackDrop";

function ProductionPackingView() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridSelect = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isInputSelectOpen, setIsInputSelectOpen] = useState(false);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const [gridDataModalHeader, setGridDataModalHeader] = useState(null);
  const [gridDataModalDetail, setGridDataModalDetail] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);

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

  const headerRowID = useRef("");
  const modalSelectHeaderRowID = useRef("");

  const [columnsSelect, setColumnsSelect] = useState([]);

  const onClickDetailInputButton = async (rowKey) => {
    const gridDetailId = refGridDetail?.current?.gridInst.store.data.rawData[rowKey].work_weigh_id;
    setIsBackDrop(true);
    let readURI = `/prd/weigh/${gridDetailId}`;
    console.log(readURI);
    let gridData = await restAPI.get(readURI);
    setGridDataModalHeader(gridData?.data?.data?.rows);

    setIsInputSelectOpen(true);
    setIsBackDrop(false);
  };

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
  } = ProductionPackingViewSet(onClickDetailInputButton);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  useEffect(() => {
    onClickSearch();
  }, []);

  const onClickSearch = () => {
    actSearchHeader();
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

  const onClickInputSelectClose = () => {
    setIsInputSelectOpen(false);
    //actSearchDetail(headerClickRowID);
  };
  const onClickRemoveProd = () => {
    setInputSearchValue([(prodCD.current = ""), (prodNM.current = "")]);
  };

  const onClickGridHeader = (e) => {
    headerRowID.current = e?.instance.getValue(e?.rowKey, "work_packing_id");

    if (headerRowID.current !== null) {
      actSearchDetail();
    }
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

  const actSearchHeader = async () => {
    setIsBackDrop(true);
    try {
      let conditionProdID;
      prodCD.current !== "품목코드"
        ? (conditionProdID = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`)
        : (conditionProdID = "");
      let readURI = `/prd/packing?start_date=${dateText.startDate}&end_date=${dateText.endDate}&` + conditionProdID;

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

      setGridDataHeader(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
      setGridDataDetail([]);
    }
  };

  const actSearchModalSelectGridDetail = async () => {
    try {
      setIsBackDrop(true);
      const readURI = `/prd/weigh-detail?work_weigh_id=${modalSelectHeaderRowID.current}`;
      console.log(readURI);
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
      const readURI = `/prd/packing-detail?work_packing_id=${headerRowID.current}`;

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
  const GridTop = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataHeader]);

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
    restURI.product
  ); //➡️ Modal Select Search Prod

  return (
    <ContentsArea isAllScreen={isAllScreen}>
      <S.SearchCondition>
        <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
        <InputSearch
          id={"line_nm"}
          name={"라인명"}
          handleInputTextChange={handleInputTextChange}
          onClickSearch={onClickSearch}
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
        <S.ContentTop>
          <S.TitleMid>생산 품목</S.TitleMid>
          <S.GridTopWrap>{GridTop}</S.GridTopWrap>
        </S.ContentTop>
        <S.ContentBottom>
          <S.TitleMid>투입 품목</S.TitleMid>
          <S.GridBottomWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsDetail}
              rowHeaders={rowHeadersNumCheck}
              header={header}
              data={gridDataDetail}
              draggable={false}
              refGrid={refGridDetail}
            />
          </S.GridBottomWrap>
        </S.ContentBottom>
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
