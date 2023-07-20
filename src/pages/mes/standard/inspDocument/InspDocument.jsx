import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import InputPaper from "components/input/InputPaper";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import InspDocumentSet from "./InspDocumentSet";
import useInputSet from "custom/useInputSet";
import TextField from "@mui/material/TextField";
import * as S from "./InspDocument.styled";
import CN from "json/ColumnName.json";
import * as uSearch from "custom/useSearch";
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
import ModalNew from "./ModalNew";
import InputSearch from "components/input/InputSearch";
import GetPutParams from "api/GetPutParams";
import ModalAddInput from "./ModalAddInput";
import GetPostParams from "api/GetPostParams";
import ModalAddDetail from "./ModalAddDetail";

function InspDocument() {
  LoginStateChk();
  const { currentMenuName, isMenuSlide } = useContext(LayoutContext);

  const refGridSelect = useRef(null);
  const refGridHeader = useRef(null);
  const refGridInput = useRef(null);
  const refGridDetail = useRef(null);
  const refGridModalNewHeader = useRef(null);
  const refGridModalNewInput = useRef(null);
  const refGridModalNewDetail = useRef(null);
  const refGridModalAddHeader = useRef(null);
  const refGridModalAddInput = useRef(null);
  const refGridModalAddDetail = useRef(null);

  const targetGrid = useRef("");
  const targetRowKey = useRef("");
  const searchRowKey = useRef("");
  const searchRowID = useRef("");
  const deleteFlag = useRef("");

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeInput, setIsEditModeInput] = useState(false);
  const [isEditModeDetail, setIsEditModeDetail] = useState(false);
  const [isNewDocumentOpen, setIsNewDocumentOpen] = useState(false);
  const [isAddInputOpen, setIsAddInputOpen] = useState(false);
  const [isAddDetailOpen, setIsAddDetailOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectColumns, setSelectColumns] = useState([]);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataInput, setGridDataInput] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [gridDataAdd, setGridDataAdd] = useState(null);

  const [inputInfoValue, setInputInfoValue] = useState([]);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [inputSearch, setInputSearch] = useState({});
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [lineOpt, lineList] = Cbo.useLine();
  const [processOpt, processList] = Cbo.useProcess();
  const [equipmentOpt, equipmentList] = Cbo.useEquipment();
  const [inspMethodOpt, inspMethodList] = Cbo.useInspMethod();
  const [inspToolOpt, inspToolList] = Cbo.useInspTool();
  const [inspFilingOpt, inspFilingList] = Cbo.useInspFiling();

  const {
    columnsHeader,
    columnsInput,
    columnsDetail,
    columnsNewHeader,
    columnsNewInput,
    columnsNewDetail,
    columnsAddHeader,
    columnsSelectProd,
    columnsSelectInsp,
    columnsSelectEquipProc,
    columnsMemory,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    inputSet,
    inputInfo,
  } = InspDocumentSet(
    isEditModeHeader,
    isEditModeInput,
    isEditModeDetail,
    lineList,
    inspMethodList,
    inspToolList,
    inspFilingList,
    onApply,
    gridDataHeader
  );

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridInput?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    setTimeout(() => {
      onSearch();
    }, 100);
  }, []);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);
  const [disRowInput, setDisRowInput] = disRow.useDisableRowCheck(isEditModeInput, refGridInput);
  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(isEditModeDetail, refGridDetail);

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
    setGridDataSelect,
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
  const [actSelectMemory] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.infcMemory
  ); //➡️ Modal Select Search Memory

  const [actSelectEquipProc] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.equipment
  ); //➡️ Modal Select Search EquipProc

  const gridColumnHeader = columnsHeader.map((column) => {
    if (column.name === "apply") {
      // column.renderer.options.name = applyFgValue ? "적용" : "미적용"; // "apply_fg" 값을 조회하여 버튼 이름 설정
    }
    return column;
  });

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
    }
  };
  const onSearch = async () => {
    try {
      setIsBackDrop(true);
      let lineID, prodCD, prodNM, params;
      comboValue.line_id ? (lineID = `&line_id=${comboValue.line_id}`) : (lineID = "");
      inputSearch.prodCD ? (prodCD = `&prod_cd=${inputSearch.prodCD}`) : (prodCD = "");
      inputSearch.prodNM ? (prodNM = `&prod_cd=${inputSearch.prodNM}`) : (prodNM = "");

      const paramsMerge = lineID + prodCD + prodNM;
      if (paramsMerge) {
        params = paramsMerge.replace("&", "?");
      } else {
        params = "";
      }

      const result = await restAPI.get(restURI.inspDocument + params);

      setGridDataHeader(result?.data?.data?.rows);
      searchRowKey.current = "";
      searchRowID.current = "";
      setGridDataInput([]);
      setGridDataDetail([]);
      setInputInfoValue({});

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
  const handleInputTextChange = (e) => {
    setInputSearch({ ...inputSearch, [e?.target?.id]: e?.target?.value });
  };
  const onDblModalNewHeader = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["prod_cd", "prod_nm"])) {
        targetGrid.current = "newHeaderProd";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectProd);
        actSelectProd();
        setIsSelectOpen(true);
      }
    }
  };
  const onDblModalNewInput = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["prod_cd", "prod_nm"])) {
        targetGrid.current = "newInputProd";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectProd);
        actSelectProd();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["insp_item_nm"])) {
        targetGrid.current = "newInputInspItem";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectInsp);
        actSelectInsp();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["infc_memory_nm"])) {
        targetGrid.current = "newInputMemory";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsMemory);
        actSelectMemory();
        setIsSelectOpen(true);
      }
    }
  };
  const onDblModalNewDetail = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["proc_nm", "equip_nm"])) {
        targetGrid.current = "newDetailEquipment";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectEquipProc);
        actSelectEquipProc();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["insp_item_nm"])) {
        targetGrid.current = "newDetailInspItem";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectInsp);
        actSelectInsp();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["infc_memory_nm"])) {
        targetGrid.current = "newDetailMemory";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsMemory);
        actSelectMemory();
        setIsSelectOpen(true);
      }
    }
  };
  const onDblSelect = (e) => {
    if (e?.targetType === "cell") {
      let Grid;
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      switch (targetGrid?.current) {
        case "newHeaderProd":
          Grid = refGridModalNewHeader?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "prod_id", data?.prod_id);
          Grid.setValue(targetRowKey?.current, "prod_cd", data?.prod_cd);
          Grid.setValue(targetRowKey?.current, "prod_nm", data?.prod_nm);
          setIsSelectOpen(false);
          break;
        case "newInputProd":
          Grid = refGridModalNewInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "prod_id", data?.prod_id);
          Grid.setValue(targetRowKey?.current, "prod_cd", data?.prod_cd);
          Grid.setValue(targetRowKey?.current, "prod_nm", data?.prod_nm);
          setIsSelectOpen(false);
          break;
        case "newInputInspItem":
          Grid = refGridModalNewInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "insp_item_type_id", data?.insp_item_type_id);
          Grid.setValue(targetRowKey?.current, "insp_item_type_nm", data?.insp_item_type_nm);
          Grid.setValue(targetRowKey?.current, "insp_item_id", data?.insp_item_id);
          Grid.setValue(targetRowKey?.current, "insp_item_nm", data?.insp_item_nm);
          setIsSelectOpen(false);
          break;
        case "newInputMemory":
          Grid = refGridModalNewInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "infc_memory_id", data?.infc_memory_id);
          Grid.setValue(targetRowKey?.current, "infc_memory_nm", data?.infc_memory_nm);
          setIsSelectOpen(false);
          break;
        case "newDetailEquipment":
          Grid = refGridModalNewDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "proc_id", data?.proc_id);
          Grid.setValue(targetRowKey?.current, "proc_nm", data?.proc_nm);
          Grid.setValue(targetRowKey?.current, "equip_id", data?.equip_id);
          Grid.setValue(targetRowKey?.current, "equip_nm", data?.equip_nm);
          setIsSelectOpen(false);
          break;
        case "newDetailInspItem":
          Grid = refGridModalNewDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "insp_item_type_id", data?.insp_item_type_id);
          Grid.setValue(targetRowKey?.current, "insp_item_type_nm", data?.insp_item_type_nm);
          Grid.setValue(targetRowKey?.current, "insp_item_id", data?.insp_item_id);
          Grid.setValue(targetRowKey?.current, "insp_item_nm", data?.insp_item_nm);
          setIsSelectOpen(false);
          break;
        case "newDetailMemory":
          Grid = refGridModalNewDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "infc_memory_id", data?.infc_memory_id);
          Grid.setValue(targetRowKey?.current, "infc_memory_nm", data?.infc_memory_nm);
          setIsSelectOpen(false);
          break;
        case "editInputProd":
          Grid = refGridInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "prod_id", data?.prod_id);
          Grid.setValue(targetRowKey?.current, "prod_cd", data?.prod_cd);
          Grid.setValue(targetRowKey?.current, "prod_nm", data?.prod_nm);
          disRow.handleGridSelectCheck(refGridInput, targetRowKey?.current);
          setIsSelectOpen(false);
          break;
        case "editInputInspItem":
          Grid = refGridInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "insp_item_type_id", data?.insp_item_type_id);
          Grid.setValue(targetRowKey?.current, "insp_item_type_nm", data?.insp_item_type_nm);
          Grid.setValue(targetRowKey?.current, "insp_item_id", data?.insp_item_id);
          Grid.setValue(targetRowKey?.current, "insp_item_nm", data?.insp_item_nm);
          disRow.handleGridSelectCheck(refGridInput, targetRowKey?.current);
          setIsSelectOpen(false);
          break;
        case "editInputMemory":
          Grid = refGridInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "infc_memory_id", data?.infc_memory_id);
          Grid.setValue(targetRowKey?.current, "infc_memory_nm", data?.infc_memory_nm);
          disRow.handleGridSelectCheck(refGridInput, targetRowKey?.current);
          setIsSelectOpen(false);
          break;
        case "editDetailEquipment":
          Grid = refGridDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "proc_id", data?.proc_id);
          Grid.setValue(targetRowKey?.current, "proc_nm", data?.proc_nm);
          Grid.setValue(targetRowKey?.current, "equip_id", data?.equip_id);
          Grid.setValue(targetRowKey?.current, "equip_nm", data?.equip_nm);
          disRow.handleGridSelectCheck(refGridDetail, targetRowKey?.current);
          setIsSelectOpen(false);
          break;
        case "editDetailInspItem":
          Grid = refGridDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "insp_item_type_id", data?.insp_item_type_id);
          Grid.setValue(targetRowKey?.current, "insp_item_type_nm", data?.insp_item_type_nm);
          Grid.setValue(targetRowKey?.current, "insp_item_id", data?.insp_item_id);
          Grid.setValue(targetRowKey?.current, "insp_item_nm", data?.insp_item_nm);
          disRow.handleGridSelectCheck(refGridDetail, targetRowKey?.current);
          setIsSelectOpen(false);
          break;
        case "editDetailMemory":
          Grid = refGridDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "infc_memory_id", data?.infc_memory_id);
          Grid.setValue(targetRowKey?.current, "infc_memory_nm", data?.infc_memory_nm);
          disRow.handleGridSelectCheck(refGridDetail, targetRowKey?.current);
          setIsSelectOpen(false);
          break;
        case "addInputProd":
          Grid = refGridModalAddInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "prod_id", data?.prod_id);
          Grid.setValue(targetRowKey?.current, "prod_cd", data?.prod_cd);
          Grid.setValue(targetRowKey?.current, "prod_nm", data?.prod_nm);
          setIsSelectOpen(false);
          break;
        case "addInputInspItem":
          Grid = refGridModalAddInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "insp_item_type_id", data?.insp_item_type_id);
          Grid.setValue(targetRowKey?.current, "insp_item_type_nm", data?.insp_item_type_nm);
          Grid.setValue(targetRowKey?.current, "insp_item_id", data?.insp_item_id);
          Grid.setValue(targetRowKey?.current, "insp_item_nm", data?.insp_item_nm);
          setIsSelectOpen(false);
          break;
        case "addInputMemory":
          Grid = refGridModalAddInput?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "infc_memory_id", data?.infc_memory_id);
          Grid.setValue(targetRowKey?.current, "infc_memory_nm", data?.infc_memory_nm);
          setIsSelectOpen(false);
          break;
        case "addDetailEquipment":
          Grid = refGridModalAddDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "proc_id", data?.proc_id);
          Grid.setValue(targetRowKey?.current, "proc_nm", data?.proc_nm);
          Grid.setValue(targetRowKey?.current, "equip_id", data?.equip_id);
          Grid.setValue(targetRowKey?.current, "equip_nm", data?.equip_nm);
          setIsSelectOpen(false);
          break;
        case "addDetailInspItem":
          Grid = refGridModalAddDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "insp_item_type_id", data?.insp_item_type_id);
          Grid.setValue(targetRowKey?.current, "insp_item_type_nm", data?.insp_item_type_nm);
          Grid.setValue(targetRowKey?.current, "insp_item_id", data?.insp_item_id);
          Grid.setValue(targetRowKey?.current, "insp_item_nm", data?.insp_item_nm);
          setIsSelectOpen(false);
          break;
        case "addDetailMemory":
          Grid = refGridModalAddDetail?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "infc_memory_id", data?.infc_memory_id);
          Grid.setValue(targetRowKey?.current, "infc_memory_nm", data?.infc_memory_nm);
          setIsSelectOpen(false);
          break;
        default:
      }
    }
  };
  const onNewSave = async () => {
    refGridModalNewHeader?.current?.gridInst?.finishEditing();
    refGridModalNewInput?.current?.gridInst?.finishEditing();
    refGridModalNewDetail?.current?.gridInst?.finishEditing();
    let result = [];

    for (let i = 0; i < refGridModalNewInput?.current?.gridInst?.getRowCount(); i++) {
      result.push(refGridModalNewInput?.current?.gridInst?.getRowAt(i));
    }

    const dataInput = result.map((raw) => {
      return {
        sortby: String(raw.sortby) ? Number(raw.sortby) : null,
        prod_id: raw.prod_id,
        insp_item_id: raw.insp_item_id,
        insp_item_desc: raw.insp_item_desc,
        spec_std: raw.spec_std,
        spec_min: String(raw.spec_min) ? Number(raw.spec_min) : null,
        spec_max: String(raw.spec_max) ? Number(raw.spec_max) : null,
        spec_lcl: String(raw.spec_lcl) ? Number(raw.spec_lcl) : null,
        spec_ucl: String(raw.spec_ucl) ? Number(raw.spec_ucl) : null,
        infc_memory_id: raw.infc_memory_id,
        remark: raw.remark,
      };
    });

    result = [];
    for (let i = 0; i < refGridModalNewDetail?.current?.gridInst?.getRowCount(); i++) {
      result.push(refGridModalNewDetail?.current?.gridInst?.getRowAt(i));
    }

    const dataDetail = result.map((raw) => {
      return {
        sortby: String(raw.sortby) ? Number(raw.sortby) : null,
        proc_id: raw.proc_id,
        equip_id: raw.equip_id,
        insp_item_id: raw.insp_item_id,
        insp_item_desc: raw.insp_item_desc,
        spec_std: raw.spec_std,
        spec_min: String(raw.spec_min) ? Number(raw.spec_min) : null,
        spec_max: String(raw.spec_max) ? Number(raw.spec_max) : null,
        spec_lcl: String(raw.spec_lcl) ? Number(raw.spec_lcl) : null,
        spec_ucl: String(raw.spec_ucl) ? Number(raw.spec_ucl) : null,
        insp_filing_id: raw.insp_filing_id,
        insp_tool_id: raw.insp_tool_id,
        insp_method_id: raw.insp_method_id,
        special_property: raw.special_property,
        worker_sample_cnt: String(raw.worker_sample_cnt) ? Number(raw.worker_sample_cnt) : null,
        worker_insp_cycle: raw.worker_insp_cycle,
        inspector_sample_cnt: String(raw.inspector_sample_cnt) ? Number(raw.inspector_sample_cnt) : null,
        inspector_insp_cycle: raw.inspector_insp_cycle,
        infc_memory_id: raw.infc_memory_id,
        remark: raw.remark,
      };
    });
    const Grid = refGridModalNewHeader?.current?.gridInst;
    const dataHeader = {
      insp_document_no: Grid.getValue(0, "insp_document_no"),
      line_id: Grid.getValue(0, "line_id"),
      prod_id: Grid.getValue(0, "prod_id"),
      insp_document_reg_date: Grid.getValue(0, "insp_document_reg_date"),
      apply_date: Grid.getValue(0, "apply_date"),
      apply_fg: Grid.getValue(0, "apply_fg") ? true : false,
      contents: Grid.getValue(0, "contents"),
      remark: Grid.getValue(0, "remark"),
    };

    const query = {
      header: dataHeader,
      inputs: dataInput,
      details: dataDetail,
    };

    try {
      const result = await restAPI.post(restURI.inspDocument, query);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      onSearch();
      setIsNewDocumentOpen(false);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    }
  };
  const onClickHeader = async (e) => {
    if (e?.targetType === "cell") {
      if (!isEditModeHeader) {
        const Grid = refGridHeader?.current?.gridInst;
        searchRowID.current = Grid.getValue(e?.rowKey, "insp_document_id");
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
        if (searchRowKey.current !== e?.rowKey) {
          if (searchRowID.current !== "") {
            searchRowKey.current = e?.rowKey;
            setInputInfoValue([]);
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

          try {
            setIsBackDrop(true);
            const result = await restAPI.get(restURI.inspDocumentInput + `?insp_document_id=${searchRowID.current}`);
            setGridDataInput(result?.data?.data?.rows);
            const result2 = await restAPI.get(restURI.inspDocumentDetail + `?insp_document_id=${searchRowID.current}`);
            setGridDataDetail(result2?.data?.data?.rows);
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
      } else {
        disRow.handleClickGridCheck(e, isEditModeHeader, ["apply_fg"]);
      }
    }
  };
  const onEditingFinishHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishInput = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishDetail = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const handleReSearch = async (type = "header" | "input" | "detail") => {
    const Grid = refGridHeader?.current?.gridInst;
    searchRowID.current = Grid?.getValue(searchRowKey.current, "insp_document_id");
    try {
      setIsBackDrop(true);
      let result;
      switch (type) {
        case "header":
          result = await restAPI.get(restURI.inspDocument);
          setGridDataHeader(result?.data?.data?.rows);
          break;
        case "input":
          result = await restAPI.get(restURI.inspDocumentInput + `?insp_document_id=${searchRowID.current}`);
          setGridDataInput(result?.data?.data?.rows);
          break;
        case "detail":
          result = await restAPI.get(restURI.inspDocumentDetail + `?insp_document_id=${searchRowID.current}`);
          setGridDataDetail(result?.data?.data?.rows);
          break;
        default:
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
  };
  const onSaveHeader = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridHeader?.current?.gridInst;
      Grid?.finishEditing();

      const resultData = Grid?.getCheckedRows()?.map((raw) => GetPutParams("inspDocument", raw));

      if (resultData) {
        const result = await restAPI.put(restURI.inspDocument, resultData);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
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
  };
  const onSaveInput = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridInput?.current?.gridInst;
      Grid?.finishEditing();

      const resultData = Grid?.getCheckedRows()?.map((raw) => GetPutParams("inspDocumentInput", raw));

      if (resultData) {
        const result = await restAPI.put(restURI.inspDocumentInput, resultData);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
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
  };
  const onSaveDetail = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridDetail?.current?.gridInst;
      Grid?.finishEditing();

      const resultData = Grid?.getCheckedRows()?.map((raw) => GetPutParams("inspDocumentDetail", raw));

      if (resultData) {
        const result = await restAPI.put(restURI.inspDocumentDetail, resultData);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
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
  };
  async function onApply(e, rowKey) {
    try {
      setIsBackDrop(true);
      const Grid = refGridHeader?.current?.gridInst;
      const flag = Grid.getValue(rowKey, "apply_fg");
      const ID = Grid.getValue(rowKey, "insp_document_id");
      let result;
      let URI;
      if (flag === false) {
        URI = restURI.inspDocumentApply.replace("{id}", ID);
      } else {
        URI = restURI.inspDocumentCancel.replace("{id}", ID);
      }
      result = await restAPI.patch(URI);

      onSearch();

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
  }
  const onDblInput = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["prod_cd", "prod_nm"])) {
        targetGrid.current = "editInputProd";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectProd);
        actSelectProd();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["insp_item_nm"])) {
        targetGrid.current = "editInputInspItem";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectInsp);
        actSelectInsp();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["infc_memory_nm"])) {
        targetGrid.current = "editInputMemory";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsMemory);
        actSelectMemory();
        setIsSelectOpen(true);
      }
    }
  };
  const onDblDetail = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["proc_nm", "equip_nm"])) {
        targetGrid.current = "editDetailEquipment";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectEquipProc);
        actSelectEquipProc();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["insp_item_nm"])) {
        targetGrid.current = "editDetailInspItem";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectInsp);
        actSelectInsp();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["infc_memory_nm"])) {
        targetGrid.current = "editDetailMemory";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsMemory);
        actSelectMemory();
        setIsSelectOpen(true);
      }
    }
  };
  const moveHeader = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.inspDocument + `/${searchRowID.current}`);

      setGridDataAdd(result?.data?.data?.rows);
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
  const onDblAddInput = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["prod_cd", "prod_nm"])) {
        targetGrid.current = "addInputProd";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectProd);
        actSelectProd();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["insp_item_nm"])) {
        targetGrid.current = "addInputInspItem";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectInsp);
        actSelectInsp();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["infc_memory_nm"])) {
        targetGrid.current = "addInputMemory";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsMemory);
        actSelectMemory();
        setIsSelectOpen(true);
      }
    }
  };
  const onDblAddDetail = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["proc_nm", "equip_nm"])) {
        targetGrid.current = "addDetailEquipment";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectEquipProc);
        actSelectEquipProc();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["insp_item_nm"])) {
        targetGrid.current = "addDetailInspItem";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsSelectInsp);
        actSelectInsp();
        setIsSelectOpen(true);
      }
      if (Condition(e, ["infc_memory_nm"])) {
        targetGrid.current = "addDetailMemory";
        targetRowKey.current = e?.rowKey;
        setSelectColumns(columnsMemory);
        actSelectMemory();
        setIsSelectOpen(true);
      }
    }
  };
  const onAddInputSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridModalAddInput?.current?.gridInst;
      Grid?.finishEditing();
      let data = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        data.push(Grid?.getRowAt(i));
      }
      const resultData = data.map((raw) => GetPostParams("inspDocumentInput", raw));
      if (resultData) {
        const result = await restAPI.post(restURI.inspDocumentInput, resultData);
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        handleReSearch("input");
        setIsAddInputOpen(false);
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
  };
  const onAddDetailSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridModalAddDetail?.current?.gridInst;
      Grid?.finishEditing();
      let data = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        data.push(Grid?.getRowAt(i));
      }
      const resultData = data.map((raw) => GetPostParams("inspDocumentDetail", raw));
      if (resultData) {
        const result = await restAPI.post(restURI.inspDocumentDetail, resultData);
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        handleReSearch("detail");
        setIsAddDetailOpen(false);
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
  };
  const onDeleteHeader = (e) => {
    deleteFlag.current = "header";
    setIsDeleteAlertOpen(true);
  };
  const onDeleteInput = (e) => {
    deleteFlag.current = "input";
    setIsDeleteAlertOpen(true);
  };
  const onDeleteDetail = (e) => {
    deleteFlag.current = "detail";
    setIsDeleteAlertOpen(true);
  };
  const onDelete = async (deleteFlag = "header" | "input" | "detail") => {
    try {
      setIsBackDrop(true);
      let Grid, deleteFg, URI;
      switch (deleteFlag) {
        case "header":
          Grid = refGridHeader?.current?.gridInst;
          URI = restURI.inspDocument;
          deleteFg = "inspDocument";
          break;
        case "input":
          Grid = refGridInput?.current?.gridInst;
          URI = restURI.inspDocumentInput;
          deleteFg = "inspDocumentInput";
          break;
        case "detail":
          Grid = refGridDetail?.current?.gridInst;
          URI = restURI.inspDocumentDetail;
          deleteFg = "inspDocumentDetail";
          break;
        default:
      }

      Grid?.finishEditing();
      const data = Grid?.getCheckedRows()?.map((raw) => GetDeleteParams(deleteFg, raw));

      if (data) {
        const result = await restAPI.delete(URI, { data });

        switch (deleteFlag) {
          case "header":
            handleReSearch("header");
            setGridDataInput([]);
            setGridDataDetail([]);
            searchRowID.current = "";
            searchRowKey.current = "";
            break;
          case "input":
            handleReSearch("input");
            break;
          case "detail":
            handleReSearch("detail");
            break;
          default:
        }

        setIsDeleteAlertOpen(false);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
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
        onClickGrid={onClickHeader}
        onEditingFinish={onEditingFinishHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);
  const GridInput = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsInput}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataInput}
        draggable={false}
        refGrid={refGridInput}
        isEditMode={isEditModeInput}
        onEditingFinish={onEditingFinishInput}
        onDblClickGrid={onDblInput}
      />
    );
  }, [gridDataInput, isEditModeInput]);
  const GridDetail = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsDetail}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataDetail}
        draggable={false}
        refGrid={refGridDetail}
        isEditMode={isEditModeDetail}
        onEditingFinish={onEditingFinishDetail}
        onDblClickGrid={onDblDetail}
      />
    );
  }, [gridDataDetail, isEditModeDetail]);

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
          <S.Search
            id={"prodCD"}
            name={"품목코드"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onSearch}
            onKeyDown={onKeyDown}
          />
          <S.Search
            id={"prodNM"}
            name={"품목"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onSearch}
            onKeyDown={onKeyDown}
          />
        </S.SearchWrap>
        <S.ButtonWrap>
          <BtnComponent btnName={"Search"} onClick={onSearch} />
        </S.ButtonWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxHeader>
        <S.ShadowBoxButtonHeader>
          <S.Title>제품</S.Title>
          <S.ButtonWrap>
            {isEditModeHeader ? (
              <>
                <BtnComponent btnName={"Save"} onClick={onSaveHeader} />
                <BtnComponent
                  btnName={"Cancel"}
                  onClick={() => {
                    setDisRowHeader(!disRowHeader);
                    handleReSearch("input");
                    setIsEditModeHeader(false);
                  }}
                />
              </>
            ) : (
              <>
                <BtnComponent btnName={"New"} onClick={() => setIsNewDocumentOpen(true)} />
                <BtnComponent
                  btnName={"Edit"}
                  onClick={() => {
                    setDisRowHeader(!disRowHeader);
                    setIsEditModeHeader(true);
                  }}
                />
                <BtnComponent btnName={"Delete"} onClick={onDeleteHeader} />
              </>
            )}
          </S.ButtonWrap>
        </S.ShadowBoxButtonHeader>
        <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
      </S.ShadowBoxHeader>
      <S.ShadowBoxInput>
        <S.ShadowBoxButtonHeader>
          <S.Title>투입품</S.Title>
          <S.ButtonWrap>
            {isEditModeInput ? (
              <>
                <BtnComponent btnName={"Save"} onClick={onSaveInput} />
                <BtnComponent
                  btnName={"Cancel"}
                  onClick={() => {
                    setDisRowInput(!disRowInput);
                    handleReSearch("input");
                    setIsEditModeInput(false);
                  }}
                />
              </>
            ) : (
              <>
                <BtnComponent
                  btnName={"New"}
                  onClick={() => {
                    if (searchRowID.current !== "") {
                      moveHeader();
                      setIsAddInputOpen(true);
                    }
                  }}
                />
                <BtnComponent
                  btnName={"Edit"}
                  onClick={() => {
                    setDisRowInput(!disRowInput);
                    setIsEditModeInput(true);
                  }}
                />
                <BtnComponent btnName={"Delete"} onClick={onDeleteInput} />
              </>
            )}
          </S.ButtonWrap>
        </S.ShadowBoxButtonHeader>
        <S.GridInputWrap>{GridInput}</S.GridInputWrap>
      </S.ShadowBoxInput>
      <S.ShadowBoxDetail>
        <S.ShadowBoxInputInfo>
          <S.SearchWrap>{InputInfo}</S.SearchWrap>
        </S.ShadowBoxInputInfo>
        <S.ShadowBoxButtonDetail>
          <S.Title>검사기준서</S.Title>
          <S.ButtonWrap>
            {isEditModeDetail ? (
              <>
                <BtnComponent btnName={"Save"} onClick={onSaveDetail} />
                <BtnComponent
                  btnName={"Cancel"}
                  onClick={() => {
                    setDisRowDetail(!disRowDetail);
                    handleReSearch("detail");
                    setIsEditModeDetail(false);
                  }}
                />
              </>
            ) : (
              <>
                <BtnComponent
                  btnName={"New"}
                  onClick={() => {
                    if (searchRowID.current !== "") {
                      moveHeader();
                      setIsAddDetailOpen(true);
                    }
                  }}
                />
                <BtnComponent
                  btnName={"Edit"}
                  onClick={() => {
                    setDisRowDetail(!disRowDetail);
                    setIsEditModeDetail(true);
                  }}
                />
                <BtnComponent btnName={"Delete"} onClick={onDeleteDetail} />
              </>
            )}
          </S.ButtonWrap>
        </S.ShadowBoxButtonDetail>

        <S.GridDetailWrap>{GridDetail}</S.GridDetailWrap>
      </S.ShadowBoxDetail>
      {isNewDocumentOpen && (
        <ModalNew
          columnOptions={columnOptions}
          columnsHeader={columnsNewHeader}
          columnsInput={columnsNewInput}
          columnsDetail={columnsNewDetail}
          rowHeaders={rowHeadersNum}
          header={header}
          refGridHeader={refGridModalNewHeader}
          refGridInput={refGridModalNewInput}
          refGridDetail={refGridModalNewDetail}
          onModalNewClose={() => setIsNewDocumentOpen(false)}
          onDblModalNewHeader={onDblModalNewHeader}
          onDblModalNewInput={onDblModalNewInput}
          onDblModalNewDetail={onDblModalNewDetail}
          onNewSave={onNewSave}
        />
      )}
      {isAddInputOpen && (
        <ModalAddInput
          columnOptions={columnOptions}
          columnsHeader={columnsAddHeader}
          columnsDetail={columnsNewInput}
          rowHeaders={rowHeadersNum}
          header={header}
          data={gridDataAdd}
          refGridHeader={refGridModalAddHeader}
          refGridDetail={refGridModalAddInput}
          onModalAddClose={() => {
            setGridDataAdd([]);
            handleReSearch("input");
            setIsAddInputOpen(false);
          }}
          onDblAddDetail={onDblAddInput}
          onNewSave={onAddInputSave}
        />
      )}
      {isAddDetailOpen && (
        <ModalAddDetail
          columnOptions={columnOptions}
          columnsHeader={columnsAddHeader}
          columnsDetail={columnsNewDetail}
          rowHeaders={rowHeadersNum}
          header={header}
          data={gridDataAdd}
          refGridHeader={refGridModalAddHeader}
          refGridDetail={refGridModalAddDetail}
          onModalAddClose={() => {
            setGridDataAdd([]);
            handleReSearch("detail");
            setIsAddDetailOpen(false);
          }}
          onDblAddDetail={onDblAddDetail}
          onNewSave={onAddDetailSave}
        />
      )}
      {isSelectOpen && (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={() => {
            setIsSelectOpen(false);
          }}
          columns={selectColumns}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refSelectGrid={refGridSelect}
          onDblClickGridSelect={onDblSelect}
        />
      )}
      {isDeleteAlertOpen && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={() => onDelete(deleteFlag.current)}
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

export default InspDocument;
