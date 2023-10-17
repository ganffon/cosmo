import { useContext, useState, useEffect, useRef, useMemo } from "react";

import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import ProductionOrderSet from "./ProductionOrderSet";
import useInputSet from "custom/useInputSet";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as uSave from "custom/useSave";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as disRow from "custom/useDisableRowCheck";
import * as S from "./ProductionOrder.styled";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsAreaHidden";
import BtnComponent from "components/button/BtnComponent";
import * as Cbo from "custom/useCboSet";
import { TextField } from "@mui/material";
import CN from "json/ColumnName.json";
import CreateOrder from "./createTheory";
import InputPaper from "components/input/InputPaper";
import EditTheory from "./editTheory";

export function ProductionOrder() {
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);

  const refGridHeader = useRef(null);
  const refGridMid = useRef(null);
  const refGridBottom = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalMid = useRef(null);
  const refGridModalBottom = useRef(null);
  const refGridSelect = useRef(null);
  const refTheoryGrid = useRef(null);

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeMid, setIsEditModeMid] = useState(false);
  const [isEditModeBottom, setIsEditModeBottom] = useState(false);

  const [isModalHeaderOpen, setIsModalHeaderOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isMidDeleteAlertOpen, setIsMidDeleteAlertOpen] = useState(false);

  const [isTopDeleteAlertOpen, setIsTopDeleteAlertOpen] = useState(false);
  const [isBottomDeleteAlertOpen, setIsBottomDeleteAlertOpen] = useState(false);

  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [columnsSelect, setColumnsSelect] = useState([]);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataMid, setGridDataMid] = useState(null);
  const [theoryData, setTheoryData] = useState({
    plasticity_length: "",
    roller_speed: "",
    plasticity_time: "",
    sagger_length: "",
    top_sagger_qty: "",
    top_sagger_theory_qty: "",
    top_sagger_filling_qty: "",
    top_sagger_filling_theory_qty: "",
    bottom_sagger_qty: "",
    bottom_sagger_theory_qty: "",
    bottom_sagger_filling_qty: "",
    bottom_sagger_filling_theory_qty: "",
    yield: "",
    theory_input_qty: "",
    theory_prod_qty: "",
  });

  const [gridDataBottom, setGridDataBottom] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [headerModalControl, setHeaderModalControl] = useState(null);

  const SWITCH_NAME_01 = "order";
  const SWITCH_NAME_02 = "orderInput";
  const SWITCH_NAME_03 = "orderDetail";

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditModeMid, refGridMid);

  const [disableRowToggleMid, setDisableRowToggleMid] = disRow.useDisableRowCheck(isEditModeMid, refGridMid);

  const [disableRowToggleTop, setDisableRowToggleTop] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);

  const [disableRowToggleBottom, setDisableRowToggleBottom] = disRow.useDisableRowCheck(
    isEditModeBottom,
    refGridBottom
  );

  const [disRowTop, setDisRowTop] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);

  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(isEditModeMid, refGridMid);

  const [disRowBottom, setDisRowBottom] = disRow.useDisableRowCheck(isEditModeBottom, refGridBottom);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [dateModal, setDateModal] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [theory, setTheory] = useState({
    plasticityLength: "",
    rollerSpeed: "",
    plasticityTime: "",
    saggerLength: "",
    topSaggerQty: "",
    topSaggerTheoryQty: "",
    topSaggerFillingQty: "",
    topSaggerFillingTheoryQty: "",
    bottomSaggerQty: "",
    bottomSaggerTheoryQty: "",
    bottomSaggerFillingQty: "",
    bottomSaggerFillingTheoryQty: "",
    yieldValue: "",
    theoryInputQty: "",
    theoryProdQty: "",
  });
  const resetTheory = () => {
    setTheory({
      ...theory,
      plasticityLength: "",
      rollerSpeed: "",
      plasticityTime: "",
      saggerLength: "",
      topSaggerQty: "",
      topSaggerTheoryQty: "",
      topSaggerFillingQty: "",
      topSaggerFillingTheoryQty: "",
      bottomSaggerQty: "",
      bottomSaggerTheoryQty: "",
      bottomSaggerFillingQty: "",
      bottomSaggerFillingTheoryQty: "",
      yieldValue: "",
      theoryInputQty: "",
      theoryProdQty: "",
    });
    setTheoryData({
      ...theoryData,
      plasticity_length: "",
      roller_speed: "",
      plasticity_time: "",
      sagger_length: "",
      top_sagger_qty: "",
      top_sagger_theory_qty: "",
      top_sagger_filling_qty: "",
      top_sagger_filling_theory_qty: "",
      bottom_sagger_qty: "",
      bottom_sagger_theory_qty: "",
      bottom_sagger_filling_qty: "",
      bottom_sagger_filling_theory_qty: "",
      yield: "",
      theory_input_qty: "",
      theory_prod_qty: "",
    });
    headerRowID.current = "";
  };
  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsMid,
    columnsBottom,
    columnsModalHeader,
    columnsSelectDocument,
    columnsSelectLineDept,
    inputSet,
  } = ProductionOrderSet(isEditModeHeader, isEditModeMid, isEditModeBottom);

  const headerRowID = useRef("");

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridMid?.current?.gridInst?.refreshLayout();
    refGridBottom?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  const onClickSearch = () => {
    headerRowID.current = "";
    resetTheory();
    actSearchGridTop();
    refGridMid?.current?.gridInst?.clear();
    refGridBottom?.current?.gridInst?.clear();
  };
  const onClickGridHeader = (e) => {
    if (e?.targetType === "cell") {
      headerRowID.current = e?.instance.getValue(e?.rowKey, "work_order_id");
      if (!isEditModeHeader) {
        if (headerRowID.current !== null) {
          actSearchTheory();
          actSearchMidDI();
          actSearchBottomDI();
        }
      } else {
        disRow.handleClickGridCheck(e, isEditModeHeader, ["complete_fg"]);
      }
    }
  };

  const onClickNewHeader = () => {
    setIsModalHeaderOpen(true);
  };
  function onClickModalCloseHeader() {
    setIsModalHeaderOpen(false);
    onClickSearch();
  }
  const onDblClickModalHeader = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm"])) {
      setModalSelectSize({ ...modalSelectSize, width: "80%", height: "90%" });
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setHeaderModalControl("document");
      setColumnsSelect(columnsSelectDocument);
      setIsModalSelectOpen(true);
      actSelectDocument();
    } else if (Condition(e, ["line_dept_nm"])) {
      const Grid = refGridModalHeader?.current?.gridInst;
      const lineID = Grid.getValue(e?.rowKey, "line_id");
      const param = lineID ? `?line_id=${lineID}` : "";
      setModalSelectSize({ ...modalSelectSize, width: "20%", height: "60%" });
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setHeaderModalControl("lineDept");
      setColumnsSelect(columnsSelectLineDept);
      setIsModalSelectOpen(true);
      actSelectLineDept(param);
    }
  };
  const onClickEditHeader = () => {
    setDisableRowToggleTop(!disableRowToggleTop);
    setIsEditModeHeader(true);
  };
  const onClickDeleteHeader = () => {
    const data = refGridHeader?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsTopDeleteAlertOpen(true);
    }
  };
  const onClickEditModeSaveHeader = () => {
    actEditHeader();
    setDisableRowToggleTop(disableRowToggleTop);
    setDisRowTop(!disRowTop);
  };
  const onClickEditModeExitHeader = () => {
    setIsEditModeHeader(false);
    setDisRowTop(!disRowTop);
  };

  const onClickMidDelete = () => {
    const data = refGridMid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsMidDeleteAlertOpen(true);
    }
  };

  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishGridMid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };

  const onEditingFinishGridBottom = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };

  const actSearchGridTop = async () => {
    try {
      setIsBackDrop(true);
      let lineID;

      comboValue.line_id ? (lineID = `&line_id=${comboValue.line_id}`) : (lineID = "");
      let readURI = restURI.prdOrder + `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` + lineID;

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

  const actSearchTheory = async () => {
    try {
      setIsBackDrop(true);
      const readURI = restURI.prdOrderTheoryProduction + `?work_order_id=${headerRowID.current}`;
      let theoryData = await restAPI.get(readURI);
      setTheoryData(theoryData?.data?.data?.rows[0]);
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

  const actSearchMidDI = async () => {
    try {
      setIsBackDrop(true);
      const readURI = `/prd/order-input?work_order_id=${headerRowID.current}`;
      let gridData = await restAPI.get(readURI);
      setGridDataMid(gridData?.data?.data?.rows);
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

  const actSearchBottomDI = async () => {
    try {
      setIsBackDrop(true);

      const readURI = `/prd/order-detail?work_order_id=${headerRowID.current}`;
      let gridData = await restAPI.get(readURI);
      setGridDataBottom(gridData?.data?.data?.rows);
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

  useEffect(() => {
    setInputTextChange();
    //actSearchHeaderDI("start_date", "end_date");
    actSearchGridTop();
  }, []);

  const onClickEditMid = () => {
    setDisableRowToggleMid(!disableRowToggleMid);
    setIsEditModeMid(true);
  };

  const onClickEditModeSaveMid = () => {
    actEditMid();
  };
  const onClickEditModeExitMid = () => {
    setIsEditModeMid(false);
    setDisRowDetail(!disRowDetail);
  };

  const onClickEditBottom = () => {
    setDisableRowToggleBottom(!disableRowToggleBottom);
    setIsEditModeBottom(true);
  };
  const onClickDeleteBottom = () => {
    const data = refGridBottom?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsBottomDeleteAlertOpen(true);
    }
  };
  const onClickEditModeSaveBottom = () => {
    actEditBottom();
  };
  const onClickEditModeExitBottom = () => {
    setIsEditModeBottom(false);
    setDisRowBottom(!disRowBottom);
  };

  const onClickModalSaveHeader = async (e) => {
    // actSave();
  };
  const onClickModalSelectClose = () => {
    setDateModal({ ...dateModal, startDate: DateTime(-7).dateFull, endDate: DateTime().dateFull });
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelect = async (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameDocument = ["insp_document_id", "line_id", "prod_id", "prod_cd", "prod_nm"];

    const columnNameLineDept = ["line_dept_id", "line_dept_nm"];

    const columnNameInspItem = ["insp_item_type_id", "insp_item_type_nm", "insp_item_id", "insp_item_nm"];

    if (dblClickGrid === "Search") {
    } else if (dblClickGrid === "Header") {
      refGrid = refGridHeader;
      columnName = columnNameDocument;
    } else if (dblClickGrid === "ModalHeader") {
      if (headerModalControl === "document") {
        refGrid = refGridModalHeader;
        columnName = columnNameDocument;
      } else {
        refGrid = refGridModalHeader;
        columnName = columnNameLineDept;
      }
    } else if (dblClickGrid === "ModalMid") {
      refGrid = refGridModalMid;
      columnName = columnNameInspItem;
    } else if (dblClickGrid === "ModalBottom") {
      refGrid = refGridModalBottom;
      columnName = columnNameDocument;
    }
    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
      );
    }

    disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  const [actSelectLineDept] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.lineDepartmentIncludeRework
  );
  const [actSelectDocument] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.inspDocument + `?apply_fg=true`
  );

  const [actSave] = uSave.useSave(
    refGridModalHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.prdOrder,
    onClickModalCloseHeader
  );

  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.prdOrder
  );

  const [actEditMid] = uEdit.useEditHeader(
    refGridMid,
    isEditModeMid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.prdOrderInput
  );

  const [actDeleteMid] = uDelete.useDeleteDetail(
    refGridMid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsMidDeleteAlertOpen,
    actSearchMidDI,
    actSearchMidDI,
    headerRowID,
    restURI.prdOrderInput,
    SWITCH_NAME_02
  );

  const [actDeleteBottom] = uDelete.useDeleteDetail(
    refGridBottom,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsBottomDeleteAlertOpen,
    actSearchBottomDI,
    actSearchBottomDI,
    headerRowID,
    restURI.prdOrderDetail,
    SWITCH_NAME_03
  );

  const [actDeleteTop] = uDelete.useDeleteDetail(
    refGridHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsTopDeleteAlertOpen,
    onClickSearch,
    onClickSearch,
    headerRowID,
    restURI.prdOrder,
    SWITCH_NAME_01
  );

  const [actEditBottom] = uEdit.useEditHeader(
    refGridBottom,
    isEditModeBottom,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_03,
    restURI.prdOrderDetail
  );
  const onEditTheory = () => {
    if (headerRowID.current !== "") {
      setIsTheoryOpen(true);
    }
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
        isEditMode={isEditModeHeader}
        onClickGrid={onClickGridHeader}
        onEditingFinish={onEditingFinishGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);

  const GridModal = useMemo(() => {
    return (
      <CreateOrder
        height={"85%"}
        onClickModalSave={onClickModalSaveHeader}
        onClickModalClose={onClickModalCloseHeader}
        onDblClickModalGrid={onDblClickModalHeader}
        columns={columnsModalHeader}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersNum}
        refModalGrid={refGridModalHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);

  return (
    <ContentsArea>
      <S.SearchCondition>
        <>
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
        </>
        <S.ButtonWrap>
          <BtnComponent btnName={"Search"} onClick={onClickSearch} />
        </S.ButtonWrap>
      </S.SearchCondition>

      <S.ContentTop>
        <S.TitleButtonWrap>
          <S.TitleMid>생산품목</S.TitleMid>
          <S.ButtonTop>
            {isEditModeHeader ? (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Save"} onClick={onClickEditModeSaveHeader} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExitHeader} />
                </S.InnerButtonWrap>
              </>
            ) : (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"New"} onClick={onClickNewHeader} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Edit"} onClick={onClickEditHeader} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Delete"} onClick={onClickDeleteHeader} />
                </S.InnerButtonWrap>
              </>
            )}
          </S.ButtonTop>
        </S.TitleButtonWrap>
        <S.GridTopWrap>{GridTop}</S.GridTopWrap>
      </S.ContentTop>
      <S.OrderTheoryProduction>
        <S.TitleButtonWrap>
          <S.TitleMid>이론생산량</S.TitleMid>
          <S.ButtonTop>
            <S.InnerButtonWrap>
              <BtnComponent btnName={"Edit"} onClick={onEditTheory} />
            </S.InnerButtonWrap>
          </S.ButtonTop>
        </S.TitleButtonWrap>
        <S.TheoryInputWrap>
          <S.InputWrap>
            <S.InputTitle>{"소성길이"}</S.InputTitle>
            <InputPaper
              id={"plasticityLength"}
              value={(theoryData?.plasticity_length ? theoryData?.plasticity_length + " mm" : "") || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"롤러속도"}</S.InputTitle>
            <InputPaper
              id={"rollerSpeed"}
              value={theoryData?.roller_speed ? theoryData?.roller_speed + " mm/min" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"소성시간(Day)"}</S.InputTitle>
            <InputPaper
              id={"plasticityTime"}
              value={theoryData?.plasticity_time ? theoryData?.plasticity_time + " cycle" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"사야길이"}</S.InputTitle>
            <InputPaper
              id={"saggerLength"}
              value={theoryData?.sagger_length ? theoryData?.sagger_length + " mm" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"사야수량(상)"}</S.InputTitle>
            <InputPaper
              id={"topSaggerQty"}
              value={theoryData?.top_sagger_qty ? theoryData?.top_sagger_qty + " ea" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"이론사야수량(상)"}</S.InputTitle>
            <InputPaper
              id={"topSaggerTheoryQty"}
              value={theoryData?.top_sagger_theory_qty ? theoryData?.top_sagger_theory_qty + " ea" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"충진량(상)"}</S.InputTitle>
            <InputPaper
              id={"topSaggerFillingQty"}
              value={theoryData?.top_sagger_filling_qty ? theoryData?.top_sagger_filling_qty + " kg" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"이론충진량(상)"}</S.InputTitle>
            <InputPaper
              id={"topSaggerFillingTheoryQty"}
              value={
                theoryData?.top_sagger_filling_theory_qty ? theoryData?.top_sagger_filling_theory_qty + " kg" : "" || ""
              }
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"사야수량(하)"}</S.InputTitle>
            <InputPaper
              id={"bottomSaggerQty"}
              value={theoryData?.bottom_sagger_qty ? theoryData?.bottom_sagger_qty + " ea" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"이론사야수량(하)"}</S.InputTitle>
            <InputPaper
              id={"bottomSaggerTheoryQty"}
              value={theoryData?.bottom_sagger_theory_qty ? theoryData?.bottom_sagger_theory_qty + " ea" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"충진량(하)"}</S.InputTitle>
            <InputPaper
              id={"bottomSaggerFillingQty"}
              value={theoryData?.bottom_sagger_filling_qty ? theoryData?.bottom_sagger_filling_qty + " kg" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"이론충진량(하)"}</S.InputTitle>
            <InputPaper
              id={"bottomSaggerFillingTheoryQty"}
              value={
                theoryData?.bottom_sagger_filling_theory_qty
                  ? theoryData?.bottom_sagger_filling_theory_qty + " kg"
                  : "" || ""
              }
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"수율"}</S.InputTitle>
            <InputPaper
              id={"yieldValue"}
              value={theoryData?.yield ? theoryData?.yield + " %" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"이론원부재투입량"}</S.InputTitle>
            <InputPaper
              id={"theoryInputQty"}
              value={theoryData?.theory_input_qty ? theoryData?.theory_input_qty + " kg" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.InputTitle>{"이론제품생산량"}</S.InputTitle>
            <InputPaper
              id={"theoryProdQty"}
              value={theoryData?.theory_prod_qty ? theoryData?.theory_prod_qty + " kg" : "" || ""}
              width={"120px"}
            />
          </S.InputWrap>
        </S.TheoryInputWrap>
      </S.OrderTheoryProduction>
      <S.ContentMid>
        <S.TitleButtonWrap>
          <S.TitleMid>투입품목</S.TitleMid>
          <S.ButtonMid>
            {isEditModeMid ? (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Save"} onClick={onClickEditModeSaveMid} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExitMid} />
                </S.InnerButtonWrap>
              </>
            ) : (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Edit"} onClick={onClickEditMid} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Delete"} onClick={onClickMidDelete} />
                </S.InnerButtonWrap>
              </>
            )}
          </S.ButtonMid>
        </S.TitleButtonWrap>
        <S.GridMidWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsMid}
            rowHeaders={rowHeadersNumCheck}
            header={header}
            data={gridDataMid}
            draggable={false}
            refGrid={refGridMid}
            isEditMode={isEditModeMid}
            onEditingFinish={onEditingFinishGridMid}
          />
        </S.GridMidWrap>
      </S.ContentMid>

      <S.ContentBottom>
        <S.TitleButtonWrap>
          <S.TitleBottom>점검기준서</S.TitleBottom>
          <S.ButtonBottom>
            {isEditModeBottom ? (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Save"} onClick={onClickEditModeSaveBottom} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExitBottom} />
                </S.InnerButtonWrap>
              </>
            ) : (
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Edit"} onClick={onClickEditBottom} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Delete"} onClick={onClickDeleteBottom} />
                </S.InnerButtonWrap>
              </>
            )}
          </S.ButtonBottom>
        </S.TitleButtonWrap>
        <S.GridBottomWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsBottom}
            rowHeaders={rowHeadersNumCheck}
            header={header}
            data={gridDataBottom}
            draggable={false}
            refGrid={refGridBottom}
            isEditMode={isEditModeBottom}
            onEditingFinish={onEditingFinishGridBottom}
          />
        </S.GridBottomWrap>
      </S.ContentBottom>

      {isModalHeaderOpen && GridModal}
      {isModalSelectOpen && (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelect}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersNum}
          gridDataSelect={gridDataSelect}
          refGridSelect={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      )}
      {isTheoryOpen && (
        <EditTheory
          onClose={() => {
            setIsTheoryOpen(false);
          }}
          height={"85%"}
          theoryData={theoryData}
          headerID={headerRowID.current}
          refTheoryGrid={refTheoryGrid}
          resetTheory={resetTheory}
        />
      )}
      {isMidDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={actDeleteMid}
          onCancel={() => {
            setIsMidDeleteAlertOpen(false);
          }}
        />
      ) : null}
      {isBottomDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={actDeleteBottom}
          onCancel={() => {
            setIsBottomDeleteAlertOpen(false);
          }}
        />
      ) : null}
      {isTopDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={actDeleteTop}
          onCancel={() => {
            setIsTopDeleteAlertOpen(false);
          }}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
