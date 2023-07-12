import { useContext, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import InputPaper from "components/input/InputPaper";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import DocumentSet from "pages/mes/standard/document/DocumentSet";
import useInputSet from "custom/useInputSet";
import TextField from "@mui/material/TextField";
import * as S from "./Document.styled";
import CN from "json/ColumnName.json";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uSave from "custom/useSave";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import { LayoutContext } from "components/layout/common/Layout";
import restAPI from "api/restAPI";
import GetDeleteParams from "api/GetDeleteParams";
import ContentsAreaHidden from "components/layout/common/ContentsAreaHidden";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import Modaldocument from "./ModalDocument";

function Document() {
  LoginStateChk();
  const { currentMenuName, isMenuSlide } = useContext(LayoutContext);

  const prodID = useRef("");
  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");

  const resetProd = () => {
    prodID.current = "";
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };

  const requireColumn = [
    "insp_document_no",
    "prod_id",
    "insp_document_reg_date",
    "apply_fg",
    "sortby",
    "insp_proc_gbn",
    "insp_item_id",
    "insp_filing_id",
  ];

  const targetRowKey = useRef(null);
  const targetGrid = useRef(null);

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const refGridSelect = useRef(null);
  const refGridSelectProd = useRef(null);

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeDetail, setIsEditModeDetail] = useState(false);
  const [isNewDetail, setIsNewDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [gridDataSelectProd, setGridDataSelectProd] = useState(null);
  const [gridDataModalDetail, setGridDataModalDetail] = useState(null);
  const headerClickRowID = useRef("");

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [inputInfoValue, setInputInfoValue] = useState([]);

  const [lineOpt, lineList] = Cbo.useLine();
  const [inspMethodOpt, inspMethodList] = Cbo.useInspMethod();
  const [inspToolOpt, inspToolList] = Cbo.useInspTool();
  const [inspFilingOpt, inspFilingList] = Cbo.useInspFiling();

  const {
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnsSelectProd,
    columnsDataLoadProd,
    columnsSelectInsp,
    columnsSelectEquipProc,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    inputSet,
    inputInfo,
  } = DocumentSet(
    isEditModeHeader,
    isEditModeDetail,
    isNewDetail,
    lineList,
    inspMethodList,
    inspToolList,
    inspFilingList
  );
  const SWITCH_NAME_01 = "document";
  const SWITCH_NAME_02 = "documentDetail";
  const modalDetailClickRowKey = useRef("");

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const [searchToggle, setSearchToggle] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);
  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(isEditModeDetail, refGridDetail);
  const [isDataLoadOpen, setIsDataLoadOpen] = useState(false);

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product + `?use_fg=true`
  ); //➡️ Modal Select Search Prod
  const [actDataLoadProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectProd,
    restURI.inspDocument
  );
  const [actSelectInsp] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.inspItem
  ); //➡️ Modal Select Search Insp

  const [actSelectEquipProc] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.equipment
  ); //➡️ Modal Select Search EquipProc

  const [actSave] = uSave.useSaveMulti(
    refGridModalHeader,
    refGridModalDetail,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    SWITCH_NAME_02,
    restURI.inspDocument,
    onClickModalClose
  );
  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.inspDocument
  );
  const [actEditDetail] = uEdit.useEditDetail(
    refGridDetail,
    isEditModeDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.inspDocumentDetail
  );
  const [actSaveDetail] = uSave.useSaveDetail(
    refGridModalDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.inspDocumentDetail,
    onClickModalDetailClose
  );
  const [actSearchDetail] = uSearch.useSearchDetail(
    setGridDataDetail,
    restURI.inspDocumentDetail + "?insp_document_id=",
    disRowDetail,
    setDisRowDetail
  );
  const [actSearchEditHeader] = uSearch.useSearchEditHeader(
    isBackDrop,
    setIsBackDrop,
    setGridDataHeaderRowID,
    restURI.inspDocument
  );
  const onDataLoad = async () => {
    const Grid = refGridModalHeader?.current?.gridInst;
    Grid?.finishEditing();
    const lineId = Grid.getValue(0, "line_id");
    if (lineId) {
      actDataLoadProd(`?line_id=${lineId}`);
      setIsDataLoadOpen(true);
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "라인을 먼저 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
    }
  };
  const handleDataLoad = async (lineId, prodCd, prodNm) => {
    if (lineId) {
      try {
        setIsBackDrop(true);
        const header = await restAPI.get(
          restURI.inspDocument + `?line_id=${lineId}&prod_cd=${prodCd}&prod_nm=${prodNm}`
        );
        if (header?.data?.data?.count !== 0) {
          const documentId = header?.data?.data?.rows[0].insp_document_id;

          try {
            const detail = await restAPI.get(restURI.inspDocumentDetail + `?insp_document_id=${documentId}`);

            setGridDataModalDetail(detail?.data?.data?.rows);
            setIsDataLoadOpen(false);
          } catch (err) {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: err?.response?.data?.message,
              severity: "error",
              location: "bottomRight",
            });
          }
        } else {
          setGridDataModalDetail([]);
        }
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
    }
  };

  const onDeleteDetail = async () => {
    const data = refGridDetail?.current?.gridInst?.getCheckedRows()?.map((raw) => GetDeleteParams(SWITCH_NAME_02, raw));

    try {
      setIsBackDrop(true);
      const result = await restAPI.delete(restURI.inspDocumentDetail, { data });
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
      onClickSearch();
      handleInputInfo();
      setIsDeleteAlertOpen(false);
    }
  };
  /**
   * 🔥Header Screen Button Event
   */
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEditHeader = () => {
    setIsEditModeHeader(true);
    setDisRowHeader(!disRowHeader);
  };
  const onClickEditNew = () => {
    if (inputInfoValue.length !== 0) {
      setIsNewDetail(true);
      setIsModalOpen(true);
      actSearchEditHeader(headerClickRowID.current);
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "검사기준서를 먼저 선택하세요",
        severity: "warning",
        location: "BottomRight",
      });
    }
  };
  const onClickEditDetail = () => {
    setIsEditModeDetail(true);
    setDisRowDetail(!disRowDetail);
  };
  const onClickDelete = () => {
    const data = refGridDetail?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const onClickProd = () => {
    targetGrid.current = "Search";
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };
  const onClickProdRemove = () => {
    resetProd();
    setInputSearchValue([]);
  };
  async function onClickSearch() {
    try {
      setIsBackDrop(true);
      let conditionLine;
      let conditionProd;
      let condition;

      comboValue.line_id ? (conditionLine = `line_id=${comboValue.line_id}`) : (conditionLine = "");
      prodCD.current !== "품목코드"
        ? (conditionProd = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`)
        : (conditionProd = "");

      if (conditionLine !== "" && conditionProd !== "") {
        condition = restURI.inspDocument + "?" + conditionLine + "&" + conditionProd;
      } else if (conditionLine !== "" && conditionProd === "") {
        condition = restURI.inspDocument + "?" + conditionLine;
      } else if (conditionLine === "" && conditionProd !== "") {
        condition = restURI.inspDocument + "?" + conditionProd;
      } else {
        condition = restURI.inspDocument;
      }

      const result = await restAPI.get(condition);
      setGridDataHeader(result?.data?.data?.rows);
      setGridDataDetail([]);
      setInputInfoValue([]);
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
  }

  const onClickEditModeSave = () => {
    actEditHeader();
    setIsEditModeDetail(false);
  };
  const onClickEditModeExit = () => {
    setIsEditModeHeader(false);
    setSearchToggle(!searchToggle);
    setDisRowHeader(!disRowHeader);
  };
  const onClickEditSaveDetail = () => {
    actEditDetail();
  };
  const onClickEditExitDetail = () => {
    setIsEditModeDetail(false);
    actSearchDetail(headerClickRowID.current);
    setDisRowDetail(!disRowDetail);
  };

  function handleInputInfo() {
    const inputInfoValueList = [
      "insp_document_no",
      "line_nm",
      "prod_cd",
      "prod_nm",
      "insp_document_reg_date",
      "apply_date",
      "apply_fg",
      "contents",
      "remark",
    ];
    actSearchDetail(headerClickRowID.current);
    for (let i = 0; i < inputInfoValueList.length; i++) {
      let data = refGridHeader?.current?.gridInst?.getValue(targetRowKey.current, inputInfoValueList[i]);
      if (data === false) {
        //🔸false 인 경우 데이터 안찍혀서 강제로 찍음
        data = "false";
      }
      setInputInfoValue((prevList) => {
        return [...prevList, data];
      });
    }
  }
  const onClickGridHeader = async (e) => {
    if (!isEditModeHeader) {
      const inputInfoValueList = [
        "insp_document_no",
        "line_nm",
        "prod_cd",
        "prod_nm",
        "insp_document_reg_date",
        "apply_date",
        "apply_fg",
        "contents",
        "remark",
      ];
      if (headerClickRowID.current !== e?.instance.getValue(e?.rowKey, "insp_document_id")) {
        const rowID = e?.instance.getValue(e?.rowKey, "insp_document_id");
        if (rowID !== null) {
          headerClickRowID.current = rowID;
          targetRowKey.current = e?.rowKey;
          setInputInfoValue([]);
          actSearchDetail(rowID);
          for (let i = 0; i < inputInfoValueList.length; i++) {
            let data = e?.instance.getValue(e?.rowKey, inputInfoValueList[i]);
            if (data === false) {
              //🔸false 인 경우 데이터 안찍혀서 강제로 찍음
              data = "미적용";
            } else if (data === true) {
              data = "적용";
            }
            setInputInfoValue((prevList) => {
              return [...prevList, data];
            });
          }
        }
      }
    } else {
      disRow.handleClickGridCheck(e, isEditModeHeader, ["apply_fg"]);
    }
  };
  const onDblClickGridHeader = (e) => {
    if (isEditModeHeader) {
      // if (Condition(e, ["prod_cd", "prod_nm"])) {
      //   targetRowKey.current = e?.rowKey;
      //   targetGrid.current = "Header";
      //   setModalSelectSize({ ...modalSelectSize, width: "40%", height: "90%" });
      //   setColumnsSelect(columnsSelectProd);
      //   setIsModalSelectOpen(true);
      //   actSelectProd();
      // }
      // 기능제거 20230627
    }
  };
  const onDblClickGridDetail = (e) => {
    if (isEditModeDetail) {
      if (Condition(e, ["insp_item_type_nm", "insp_item_nm"])) {
        targetRowKey.current = e?.rowKey;
        targetGrid.current = "Detail";
        setColumnsSelect(columnsSelectInsp);
        setIsModalSelectOpen(true);
        actSelectInsp();
      }

      if (Condition(e, ["proc_nm", "equip_nm"])) {
        targetRowKey.current = e?.rowKey;
        targetGrid.current = "DetailEquip";
        setColumnsSelect(columnsSelectEquipProc);
        setIsModalSelectOpen(true);
        actSelectEquipProc();
      }
    }
  };
  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishGridDetail = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onClickModalAddRow = () => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    Header?.finishEditing();
    Detail?.finishEditing();
    Detail?.appendRow();
    if (isNewDetail === true) {
      for (let i = 0; i < Detail.store.viewport.rows.length; i++) {
        Detail?.setValue(
          Detail.store.viewport.rows[i].rowKey,
          "insp_document_id",
          Header.getValue(0, "insp_document_id")
        );
      }
    }
    const currentRowKey = Detail.getRowCount() - 1;
    Detail.setValue(currentRowKey, "insp_proc_gbn", "공정");
  };
  const onClickGridModalDetail = (e) => {
    modalDetailClickRowKey.current = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    //onst gridEvent = refGridModalDetail?.current?.gridInst;
    //gridEvent?.removeRow(modalDetailClickRowKey.current);
    // modalDetailClickRowKey.current = "";

    if (modalDetailClickRowKey.current) {
      // 선택한 Row가 있는 경우, 해당 Row의 키를 기반으로 데이터에서 찾아 제거
      const gridInstance = refGridModalDetail.current?.getInstance();
      // 선택한 Row가 있는 경우, 해당 Row 삭제
      gridInstance?.removeRow(modalDetailClickRowKey.current);
    } else {
      // 선택한 Row가 없는 경우, 마지막 Row 제거
      const gridInstance = refGridModalDetail.current?.getInstance();
      const rowCount = refGridModalDetail.current?.getInstance()?.getData()?.length;
      if (rowCount > 0) {
        const lastRowKey = gridInstance.getRowAt(rowCount - 1).rowKey;
        gridInstance?.removeRow(lastRowKey);
      }
    }
    modalDetailClickRowKey.current = "";
  };
  const onClickModalSave = () => {
    actSave();
    setGridDataModalDetail([]);
  };
  function onClickModalClose() {
    headerClickRowID.current = "";
    setIsModalOpen(false);
    setIsEditModeHeader(false);
    setSearchToggle(!searchToggle);
    setGridDataModalDetail([]);
  }
  function onClickModalDetailClose() {
    setIsModalOpen(false);
    setIsNewDetail(false);
    actSearchDetail(headerClickRowID.current);
  }

  const onDblClickGridModalHeader = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm"])) {
      targetRowKey.current = e?.rowKey;
      targetGrid.current = "ModalHeader";
      setModalSelectSize({ ...modalSelectSize, width: "40%", height: "90%" });
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onDblClickGridModalDetail = (e) => {
    if (Condition(e, ["insp_item_type_nm", "insp_item_nm"])) {
      targetRowKey.current = e?.rowKey;
      targetGrid.current = "ModalDetail";
      setColumnsSelect(columnsSelectInsp);
      setIsModalSelectOpen(true);
      actSelectInsp();
    }
    if (Condition(e, ["proc_nm", "equip_nm"])) {
      targetRowKey.current = e?.rowKey;
      targetGrid.current = "ModalDetailEquip";
      setColumnsSelect(columnsSelectEquipProc);
      setIsModalSelectOpen(true);
      actSelectEquipProc();
    }
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickModalSelectCloseProd = () => {
    setIsDataLoadOpen(false);
  };
  const onDblClickGridSelect = (e) => {
    if (e?.targetType === "cell") {
      //🔸Select Grid에서 DblClick
      let refGrid;
      let columnName;
      const columnNameProd = ["prod_id", "prod_cd", "prod_nm"];
      const columnNameInspItem = ["insp_item_type_id", "insp_item_type_nm", "insp_item_id", "insp_item_nm"];

      const columnNameEquipProc = ["proc_nm", "equip_nm", "proc_id", "equip_id"];

      if (targetGrid.current === "Search") {
        // setInputSearchValue([]);
        // columnName = ["prod_cd", "prod_nm"];
        // for (let i = 0; i < columnName.length; i++) {
        //   setInputSearchValue((prevList) => {
        //     return [...prevList, e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]];
        //   });
        // }
        const data = e?.instance?.store?.data?.rawData[e?.rowKey];
        prodID.current = data.prod_id;
        prodCD.current = data.prod_cd;
        prodNM.current = data.prod_nm;
      } else {
        if (targetGrid.current === "Header") {
          refGrid = refGridHeader;
          columnName = columnNameProd;
        } else if (targetGrid.current === "ModalHeader") {
          refGrid = refGridModalHeader;
          columnName = columnNameProd;
        } else if (targetGrid.current === "Detail") {
          refGrid = refGridDetail;
          columnName = columnNameInspItem;
        } else if (targetGrid.current === "DetailEquip") {
          refGrid = refGridDetail;
          columnName = columnNameEquipProc;
        } else if (targetGrid.current === "ModalDetailEquip") {
          refGrid = refGridModalDetail;
          columnName = columnNameEquipProc;
        } else if (targetGrid.current === "ModalDetail") {
          refGrid = refGridModalDetail;
          columnName = columnNameInspItem;
        }
        for (let i = 0; i < columnName.length; i++) {
          refGrid?.current?.gridInst?.setValue(
            targetRowKey.current,
            columnName[i],
            e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
          );
        }
        disRow.handleGridSelectCheck(refGrid, targetRowKey.current);
      }
      setIsModalSelectOpen(false);
    }
  };
  const onDblClickGridSelectProd = (e) => {
    if (e?.targetType === "cell") {
      const Grid = refGridSelect?.current?.gridInst;
      const lineId = Grid?.getValue(e?.rowKey, "line_id");
      const prodCd = Grid?.getValue(e?.rowKey, "prod_cd");
      const prodNm = Grid?.getValue(e?.rowKey, "prod_nm");
      handleDataLoad(lineId, prodCd, prodNm);
    }
  };

  const onClickEditModalSave = () => {
    actSaveDetail();
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const GridHeader = useMemo(() => {
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
        onDblClickGrid={onDblClickGridHeader}
        onEditingFinish={onEditingFinishGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);

  const GridModal = useMemo(() => {
    return (
      <Modaldocument
        isNewDetail={isNewDetail}
        gridDataHeaderRowID={gridDataHeaderRowID}
        gridDataDetail={gridDataModalDetail}
        onClickModalAddRow={onClickModalAddRow}
        onClickModalCancelRow={onClickModalCancelRow}
        onClickModalSave={onClickModalSave}
        onClickModalClose={onClickModalClose}
        onClickEditModalSave={onClickEditModalSave}
        onClickModalDetailClose={onClickModalDetailClose}
        onDataLoad={onDataLoad}
        columnsModalHeader={columnsModalHeader}
        columnsModalDetail={columnsModalDetail}
        columnOptions={columnOptions}
        header={header}
        rowHeadersHeader={rowHeadersNum}
        rowHeadersDetail={rowHeadersNum}
        refGridModalHeader={refGridModalHeader}
        refGridModalDetail={refGridModalDetail}
        requireColumns={requireColumn}
        onClickGridModalDetail={onClickGridModalDetail}
        onDblClickGridModalHeader={onDblClickGridModalHeader}
        onDblClickGridModalDetail={onDblClickGridModalDetail}
      />
    );
  }, [isNewDetail, lineList, onClickModalClose]);

  const InputInfo = useMemo(() => {
    return inputInfo.map((v, idx) => {
      return <InputPaper key={v.id} id={v.id} name={v.name} value={inputInfoValue[idx] || ""} />;
    });
  }, [inputInfoValue]);

  return (
    <ContentsAreaHidden>
      <S.ShadowBoxButton>
        <S.SearchWrap>
          <S.ComboWrap>
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
              onKeyDown={onKeyDown}
            />
          </S.ComboWrap>
          {/* {inputSet.map((v, idx) => (
            <InputPaper
              key={v.id}
              id={v.id}
              name={v.name}
              value={inputSearchValue[v.id] || ""}
              onKeyDown={onKeyDown}
              width={idx === 1 ? "220px" : "180px"}
              btn={idx === 1 ? true : false}
              onClickSelect={onClickProd}
              onClickRemove={onClickProdRemove}
            />
          ))} */}
          <InputPaper
            width={"180px"}
            name={"품목코드"}
            namePositionTop={"-12px"}
            value={prodCD.current || ""}
            btn={false}
          />
          <InputPaper
            width={"240px"}
            name={"품목"}
            namePositionTop={"-12px"}
            value={prodNM.current || ""}
            btn={true}
            onClickSelect={onClickProd}
            onClickRemove={onClickProdRemove}
          />
        </S.SearchWrap>
        <S.ButtonWrap>
          <BtnComponent btnName={"Search"} onClick={onClickSearch} />
        </S.ButtonWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxHeader>
        <S.ShadowBoxButtonHeader>
          <S.Title>검사기준서</S.Title>
          <S.ButtonWrap>
            {isEditModeHeader ? (
              <>
                <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
                <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
              </>
            ) : (
              <>
                <BtnComponent btnName={"New"} onClick={onClickNew} />
                <BtnComponent btnName={"Edit"} onClick={onClickEditHeader} />
              </>
            )}
          </S.ButtonWrap>
        </S.ShadowBoxButtonHeader>
        <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
      </S.ShadowBoxHeader>
      <S.ShadowBoxDetail>
        <S.ShadowBoxInputInfo>
          <S.SearchWrap>{InputInfo}</S.SearchWrap>
        </S.ShadowBoxInputInfo>
        <S.ShadowBoxButtonDetail>
          <S.Title>검사기준서 세부내용</S.Title>
          <S.ButtonWrap>
            {isEditModeDetail ? (
              <>
                <BtnComponent btnName={"Save"} onClick={onClickEditSaveDetail} />
                <BtnComponent btnName={"Cancel"} onClick={onClickEditExitDetail} />
              </>
            ) : (
              <>
                <BtnComponent btnName={"New"} onClick={onClickEditNew} />
                <BtnComponent btnName={"Edit"} onClick={onClickEditDetail} />
                <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
              </>
            )}
          </S.ButtonWrap>
        </S.ShadowBoxButtonDetail>

        <S.GridDetailWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsDetail}
            rowHeaders={rowHeadersNumCheck}
            header={header}
            data={gridDataDetail}
            draggable={false}
            refGrid={refGridDetail}
            isEditMode={isEditModeDetail}
            onDblClickGrid={onDblClickGridDetail}
            onEditingFinish={onEditingFinishGridDetail}
          />
        </S.GridDetailWrap>
      </S.ShadowBoxDetail>
      {isModalOpen ? GridModal : null}
      {isModalSelectOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelect}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refSelectGrid={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      {isDataLoadOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectCloseProd}
          columns={columnsDataLoadProd}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelectProd}
          rowHeaders={rowHeadersNum}
          refSelectGrid={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelectProd}
        />
      ) : null}
      {isDeleteAlertOpen && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={onDeleteDetail}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsAreaHidden>
  );
}

export default Document;
