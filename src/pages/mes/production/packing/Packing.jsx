import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import PackingSet from "./PackingSet";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as disRow from "custom/useDisableRowCheck";
import * as RE from "custom/RegularExpression";
import * as S from "./Packing.styled";
import InputPaper from "components/input/InputPaper";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import DateRange from "components/datetime/DateRange";
import InputSearch from "components/input/InputSearch";
import ModalNew from "components/modal/ModalNew";
import ModalSelectDate from "components/modal/ModalSelectDate";
import GetPutParams from "api/GetPutParams";
import ModalSelectMulti from "components/modal/ModalSelectMulti";
import GetDeleteParams from "api/GetDeleteParams";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import PackingModal from "./PackingModal";

function Packing() {
  LoginStateChk();
  const { isMenuSlide } = useContext(LayoutContext);

  const prodID = useRef("");
  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");
  const workOrderID = useRef("");
  const workWeighID = useRef("");
  const workPackingID = useRef("");
  const currentRow = useRef("");
  const targetGrid = useRef("");
  const targetRowKey = useRef("");

  const resetProd = () => {
    prodID.current = "";
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalSelectDateOpen, setIsModalSelectDateOpen] = useState(false);
  const [isModalSelectMultiOpen, setIsModalSelectMultiOpen] = useState(false);
  const [isDeleteHeaderAlertOpen, setIsDeleteHeaderAlertOpen] = useState(false);
  const [isDeleteDetailAlertOpen, setIsDeleteDetailAlertOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [selectedOption, setSelectedOption] = useState("S");
  const [barcodeValue, setBarcodeValue] = useState("");
  const [isModalPrintOpen, setIsModalPrintOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const opeModalPrintOpen = () => {
    setIsModalPrintOpen(true);
  };
  const [barcodePrintInfo, setBarcodePrintInfo] = useState({});
  const closeModalPrintOpen = () => {
    setIsModalPrintOpen(false);
  };
  const [isWarning, setIsWarning] = useState({
    open: false,
    title: "",
    message: "",
  });

  const handleWarning = () => {
    setIsWarning({
      ...isWarning,
      open: false,
    });
  };
  const barcodePrintDetail = async (rowKey) => {
    const gridDetailId = refGridDetail?.current?.gridInst.store.data.rawData[rowKey].work_subdivision_detail_id;

    const data = GetPostParams("createSubdivisionDetailBarcode", gridDetailId);
    if (data !== undefined) {
      if (data.length !== 0) {
        setIsBackDrop(true);
        await restAPI
          .post(restURI.createSubdivisionBarcode, data)
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.message,
              severity: "success",
            });
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.message ? res?.message : res?.response?.data?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };

  const onPrintClick = async (rowKey) => {
    try {
      const result = await restAPI.post(restURI.createBarcode, {
        barcode_type: "PACKING",
        reference_id: refGridHeader?.current?.gridInst.store.data.rawData[rowKey].work_packing_id,
      });

      setBarcodePrintInfo({
        prodCD: result?.data?.data?.rows[0].prod_cd,
        prodNM: result?.data?.data?.rows[0].prod_type_small_nm,
        lot: result?.data?.data?.rows[0].lot_no,
        cnt: result?.data?.data?.rows[0].packing_cnt,
        qty: result?.data?.data?.rows[0].packing_qty,
        date: result?.data?.data?.rows[0].work_packing_date,
        barcodeNo: result?.data?.data?.rows[0].barcode_no,
        gubn: selectedOption,
      });
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    }
    setIsModalPrintOpen(true);
    setModalData(refGridHeader?.current?.gridInst.store.data.rawData[rowKey]);
  };

  const barcodePrintHeader = async (rowKey) => {
    const gridHeaderId = refGridHeader?.current?.gridInst.store.data.rawData[rowKey].work_subdivision_id;

    const data = GetPostParams("createSubdivisionBarcode", gridHeaderId);
    if (data !== undefined) {
      if (data.length !== 0) {
        setIsBackDrop(true);
        await restAPI
          .post(restURI.createSubdivisionBarcode, data)
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.message,
              severity: "success",
            });
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.message ? res?.message : res?.response?.data?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsHeaderNew,
    columnsDetailNew,
    columnsSelectOrder,
    columnsSelectProd,
    columnsSelectEmp,
    columnsSelectWeight,
    columnsSelectWeightDetail,
    columnsSelectStore,
  } = PackingSet(isEditModeHeader, barcodePrintDetail, barcodePrintHeader, onPrintClick);

  let modalDetailClickRowKey = null;

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridHeaderNew = useRef(null);
  const refGridDetailNew = useRef(null);
  const refGridSelectMultiHeader = useRef(null);
  const refGridSelectMultiDetail = useRef(null);

  const refGridSelect = useRef(null);
  const refGridSelectDate = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [gridDataSelectDate, setGridDataSelectDate] = useState(null);
  const [gridDataSelectHeader, setGridDataSelectHeader] = useState(null);
  const [gridDataSelectDetail, setGridDataSelectDetail] = useState(null);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [dateOrder, setDateOrder] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const [columnsSelect, setColumnsSelect] = useState([]);
  const [inputTextChange, setInputTextChange] = useState({});

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    onClickSearch();
  }, []);

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  );
  const [actSelectOrder] = uSearch.useSearchSelect(
    refGridSelectDate,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectDate,
    restURI.prdOrder
  );
  const [actSelectEmp] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.employee + `?use_fg=true&worker_fg=true`
  );
  const [actSelectStore] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.storeIncludeLocation
  );
  const [actSelectWeight] = uSearch.useSearchSelect(
    refGridSelectMultiHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectHeader,
    restURI.prdWeight,
    null
  );
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEditHeader = () => {
    setIsEditModeHeader(true);
    setDisRowHeader(!disRowHeader);
  };
  const [removeToggle, setRemoveToggle] = useState(false);
  const onClickRemoveProd = () => {
    resetProd();
    setRemoveToggle(!removeToggle);
  };
  const onClickSelectProd = () => {
    targetGrid.current = "Search";
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };
  const onClickEditModeSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridHeader?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid.getCheckedRows().map((raw) => GetPutParams("packing", raw));
      const res = await restAPI.put(restURI.prdPacking, data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      setIsModalOpen(false);
      disRow.handleCheckReset(isEditModeHeader, refGridHeader);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const onClickEditModeExit = () => {
    setIsEditModeHeader(false);
    setDisRowHeader(!disRowHeader);
    onClickSearch();
  };
  const onClickSearch = async () => {
    try {
      setIsBackDrop(true);
      let conditionLine;
      let conditionProdID;
      inputTextChange.line_nm ? (conditionLine = `&line_nm=${inputTextChange.line_nm}`) : (conditionLine = "");
      prodCD.current !== "품목코드"
        ? (conditionProdID = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`)
        : (conditionProdID = "");
      const result = await restAPI.get(
        restURI.prdPacking +
          `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
          conditionLine +
          conditionProdID
      );
      setGridDataHeader(result?.data?.data?.rows);
      setGridDataDetail([]);
      currentRow.current = "";
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
      if (isEditModeHeader) {
        setDisRowHeader(!disRowHeader);
      }
      setIsBackDrop(false);
    }
  };
  const onClickNewDetail = () => {
    if (workOrderID.current) {
      setIsModalDetailOpen(true);
    } else {
      setIsWarning({
        ...isWarning,
        open: true,
        title: "Warning",
        message: "생산품목을 선택해주세요!",
      });
    }
  };
  const handleDeleteHeader = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridHeader?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid.getCheckedRows().map((raw) => GetDeleteParams("packing", raw));
      const res = await restAPI.delete(restURI.prdPacking, { data });
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      onClickSearch();
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
      });
    } finally {
      setIsDeleteHeaderAlertOpen(false);
      setIsBackDrop(false);
    }
  };
  const handleDelete = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridDetail?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid.getCheckedRows().map((raw) => GetDeleteParams("packingDetail", raw));
      const res = await restAPI.delete(restURI.prdPackingDetail, { data });
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      handleGridHeaderClick();
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
      });
    } finally {
      setIsDeleteDetailAlertOpen(false);
      setIsBackDrop(false);
    }
  };
  const onClickDeleteHeader = () => {
    const Grid = refGridHeader?.current?.gridInst;
    if (Grid.getCheckedRows().length !== 0) {
      setIsDeleteHeaderAlertOpen(true);
    }
  };
  const onClickDeleteDetail = () => {
    const Grid = refGridDetail?.current?.gridInst;
    if (Grid.getCheckedRows().length !== 0) {
      setIsDeleteDetailAlertOpen(true);
    }
  };
  const onClickModalAddRow = () => {
    const Grid = refGridHeaderNew?.current?.gridInst;
    Grid?.finishEditing();
    Grid?.appendRow();
    Grid?.setValue(Grid.getRowCount() - 1, "work_packing_date", DateTime().dateFull);
    Grid?.setValue(Grid.getRowCount() - 1, "packing_cnt", 1);
  };
  const onClickModalDetailAddRow = () => {
    const Grid = refGridDetailNew?.current?.gridInst;
    Grid?.finishEditing();
    Grid?.appendRow();
    Grid?.setValue(Grid.getRowCount() - 1, "work_packing_id", workPackingID.current);
  };
  const onClickModalGrid = (e) => {
    modalDetailClickRowKey = e.rowKey;
  };
  const onClickModalDetailGrid = (e) => {
    modalDetailClickRowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    const gridEvent = refGridHeaderNew?.current?.gridInst;
    gridEvent?.removeRow(modalDetailClickRowKey);
    modalDetailClickRowKey = null;
  };
  const onClickModalDetailCancelRow = () => {
    const gridEvent = refGridDetailNew?.current?.gridInst;
    gridEvent?.removeRow(modalDetailClickRowKey);
    modalDetailClickRowKey = null;
  };
  const onClickModalDetailSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridDetailNew?.current?.gridInst;
      Grid?.finishEditing();
      let result = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        result.push(Grid?.getRowAt(i));
      }
      const data = result.map((raw) => GetPostParams("packingDetail", raw));
      const res = await restAPI.post(restURI.prdPackingDetail, data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      workOrderID.current = "";
      currentRow.current = "";
      setIsModalDetailOpen(false);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const onClickModalSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridHeaderNew?.current?.gridInst;
      Grid?.finishEditing();
      let result = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        result.push(Grid?.getRowAt(i));
      }
      const data = result.map((raw) => GetPostParams("packing", raw));
      const res = await restAPI.post(restURI.prdPacking, data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      setIsModalOpen(false);
      onClickSearch();
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const onDblClickModalGrid = (e) => {
    if (Condition(e, ["work_order_no", "line_dept_nm", "line_nm", "prod_cd", "prod_nm"])) {
      targetGrid.current = "Order";
      targetRowKey.current = e?.rowKey;
      setIsModalSelectDateOpen(true);
      actSelectOrder(`?start_date=${dateOrder.startDate}&end_date=${dateOrder.endDate}`);
    }
    if (Condition(e, ["packing_emp_nm"])) {
      targetGrid.current = "Emp";
      targetRowKey.current = e?.rowKey;
      setColumnsSelect(columnsSelectEmp);
      setIsModalSelectOpen(true);
      actSelectEmp();
    }
    if (Condition(e, ["store_nm", "location_nm"])) {
      targetGrid.current = "Store";
      targetRowKey.current = e?.rowKey;
      setColumnsSelect(columnsSelectStore);
      setIsModalSelectOpen(true);
      actSelectStore();
    }
  };
  const onDblClickModalDetailGrid = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm", "lot_no", "store_nm", "location_nm"])) {
      targetGrid.current = "Weight";
      targetRowKey.current = e?.rowKey;
      setIsModalSelectMultiOpen(true);
      actSelectWeight(`?complete_fg=COMPLETE&work_order_id=${workOrderID.current}`);
    }
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setIsEditModeHeader(false);
  }
  const onClickModalDetailClose = () => {
    setIsModalDetailOpen(false);
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickModalSelectDateClose = () => {
    setDateOrder({
      ...dateOrder,
      startDate: DateTime(-7).dateFull,
      endDate: DateTime().dateFull,
    });
    setIsModalSelectDateOpen(false);
  };
  const onClickModalSelectMultiClose = () => {
    refGridSelectMultiDetail?.current?.gridInst?.clear();
    setIsModalSelectMultiOpen(false);
  };
  const onClickModalSelectMulti = async (e) => {
    const Grid = refGridSelectMultiHeader?.current?.gridInst;
    if (workWeighID.current !== Grid?.getValue(e?.rowKey, "work_weigh_id")) {
      workWeighID.current = Grid?.getValue(e?.rowKey, "work_weigh_id");
      try {
        setIsBackDrop(true);
        const result = await restAPI.get(restURI.prdWeightDetail + `?work_weigh_id=${workWeighID.current}`);
        setGridDataSelectDetail(result?.data?.data?.rows);
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
  const onDblClickSelectMulti = (e) => {
    const data = e?.instance?.store?.data?.rawData[e?.rowKey];
    const Grid = refGridDetailNew?.current?.gridInst;
    Grid?.setValue(targetRowKey.current, "work_weigh_id", data.work_weigh_id);
    Grid?.setValue(targetRowKey.current, "prod_id", data.prod_id);
    Grid?.setValue(targetRowKey.current, "prod_cd", data.prod_cd);
    Grid?.setValue(targetRowKey.current, "prod_nm", data.prod_nm);
    Grid?.setValue(targetRowKey.current, "lot_no", data.lot_no);
    // Grid?.setValue(targetRowKey.current, "input_qty", data.total_qty);
    Grid?.setValue(targetRowKey.current, "inv_to_store_id", data.inv_to_store_id);
    Grid?.setValue(targetRowKey.current, "store_nm", data.store_nm);
    Grid?.setValue(targetRowKey.current, "inv_to_location_id", data.inv_to_location_id);
    Grid?.setValue(targetRowKey.current, "location_nm", data.location_nm);
    workWeighID.current = "";
    targetRowKey.current = "";
    refGridSelectMultiDetail?.current?.gridInst?.clear();
    setIsModalSelectMultiOpen(false);
  };
  const onDblClickGridSelect = (e) => {
    const data = e?.instance?.store?.data?.rawData[e?.rowKey];
    if (targetGrid.current === "Search") {
      prodID.current = data.prod_id;
      prodCD.current = data.prod_cd;
      prodNM.current = data.prod_nm;
    } else if (targetGrid.current === "Emp") {
      const Grid = refGridHeaderNew?.current?.gridInst;
      Grid?.setValue(targetRowKey.current, "packing_emp_id", data.emp_id);
      Grid?.setValue(targetRowKey.current, "packing_emp_nm", data.emp_nm);
    } else if (targetGrid.current === "GridHeader") {
      const Grid = refGridHeader?.current?.gridInst;
      Grid?.setValue(targetRowKey.current, "packing_emp_id", data.emp_id);
      Grid?.setValue(targetRowKey.current, "packing_emp_nm", data.emp_nm);
      disRow.handleGridSelectCheck(refGridHeader, targetRowKey.current);
    } else if (targetGrid.current === "Store") {
      const Grid = refGridHeaderNew?.current?.gridInst;
      Grid?.setValue(targetRowKey.current, "inv_to_store_id", data.store_id);
      Grid?.setValue(targetRowKey.current, "store_nm", data.store_nm);
      Grid?.setValue(targetRowKey.current, "inv_to_location_id", data.location_id);
      Grid?.setValue(targetRowKey.current, "location_nm", data.location_nm);
    }
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelectDate = (e) => {
    const data = e?.instance?.store?.data?.rawData[e?.rowKey];
    if (targetGrid.current === "Order") {
      const Grid = refGridHeaderNew?.current?.gridInst;
      Grid?.setValue(targetRowKey.current, "work_order_id", data.work_order_id);
      Grid?.setValue(targetRowKey.current, "work_order_no", data.work_order_no);
      Grid?.setValue(targetRowKey.current, "line_dept_id", data.line_dept_id);
      Grid?.setValue(targetRowKey.current, "line_dept_nm", data.line_dept_nm);
      Grid?.setValue(targetRowKey.current, "line_id", data.line_id);
      Grid?.setValue(targetRowKey.current, "line_nm", data.line_nm);
      Grid?.setValue(targetRowKey.current, "prod_id", data.prod_id);
      Grid?.setValue(targetRowKey.current, "prod_cd", data.prod_cd);
      Grid?.setValue(targetRowKey.current, "prod_nm", data.prod_nm);
      Grid?.setValue(targetRowKey.current, "inv_to_store_id", data.inv_to_store_id);
      Grid?.setValue(targetRowKey.current, "store_nm", data.store_nm);
      Grid?.setValue(targetRowKey.current, "inv_to_location_id", data.inv_to_location_id);
      Grid?.setValue(targetRowKey.current, "location_nm", data.location_nm);
    }
    setIsModalSelectDateOpen(false);
  };
  const options = [
    { label: "S", value: "S" },
    { label: "R", value: "R" },
    { label: "X", value: "X" },
  ];

  const handleOptionChange = (optionValue) => {
    setSelectedOption(optionValue);
  };
  const onClickSearchSelectDate = () => {
    actSelectOrder(`?start_date=${dateOrder.startDate}&end_date=${dateOrder.endDate}`);
  };
  const handleGridHeaderClick = async () => {
    if (workPackingID.current) {
      try {
        setIsBackDrop(true);
        const result = await restAPI.get(restURI.prdPackingDetail + `?work_packing_id=${workPackingID.current}`);
        setGridDataDetail(result?.data?.data?.rows);
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
  const onClickGridHeader = async (e) => {
    if (!isEditModeHeader) {
      if (currentRow.current !== e?.rowKey) {
        currentRow.current = e?.rowKey;
        workOrderID.current = e?.instance.getValue(e?.rowKey, "work_order_id");
        workPackingID.current = e?.instance.getValue(e?.rowKey, "work_packing_id");
        handleGridHeaderClick();
      }
    }
  };
  const onDblClickGridHeader = (e) => {
    if (Condition(e, ["packing_emp_nm"])) {
      targetGrid.current = "GridHeader";
      targetRowKey.current = e?.rowKey;
      setColumnsSelect(columnsSelectEmp);
      setIsModalSelectOpen(true);
      actSelectEmp();
    }
  };
  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
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
        onClickGrid={onClickGridHeader}
        onDblClickGrid={onDblClickGridHeader}
        onEditingFinish={onEditingFinishGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader, selectedOption]);
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
      />
    );
  }, [gridDataDetail]);
  const GridHeaderNew = useMemo(() => {
    return (
      <ModalNew
        width={"90%"}
        height={"90%"}
        title={"생산품목 추가"}
        onClickModalClose={onClickModalClose}
        columns={columnsHeaderNew}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersNum}
        refModalGrid={refGridHeaderNew}
        onClickModalAddRow={onClickModalAddRow}
        onClickModalCancelRow={onClickModalCancelRow}
        onClickModalSave={onClickModalSave}
        onClickModalGrid={onClickModalGrid}
        onDblClickModalGrid={onDblClickModalGrid}
      />
    );
  }, [refGridHeaderNew]);
  const GridDetailNew = useMemo(() => {
    return (
      <ModalNew
        width={"90%"}
        height={"90%"}
        title={"투입품목 추가"}
        onClickModalClose={onClickModalDetailClose}
        columns={columnsDetailNew}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersNum}
        refModalGrid={refGridDetailNew}
        onClickModalAddRow={onClickModalDetailAddRow}
        onClickModalCancelRow={onClickModalDetailCancelRow}
        onClickModalSave={onClickModalDetailSave}
        onClickModalGrid={onClickModalDetailGrid}
        onDblClickModalGrid={onDblClickModalDetailGrid}
      />
    );
  }, [refGridDetailNew]);

  const GridModalSelect = useMemo(() => {
    return (
      <ModalSelect
        width={modalSelectSize.width}
        height={modalSelectSize.height}
        onClickModalSelectClose={onClickModalSelectClose}
        columns={columnsSelect}
        columnOptions={columnOptions}
        header={header}
        gridDataSelect={gridDataSelect}
        rowHeaders={rowHeadersNum}
        refGridSelect={refGridSelect}
        onDblClickGridSelect={onDblClickGridSelect}
      />
    );
  }, [gridDataSelect, columnsSelect]);
  const GridModalSelectDate = useMemo(() => {
    return (
      <ModalSelectDate
        height={"60%"}
        onClickModalSelectDateClose={onClickModalSelectDateClose}
        columns={columnsSelectOrder}
        columnOptions={columnOptions}
        header={header}
        gridDataSelect={gridDataSelectDate}
        rowHeaders={rowHeadersNum}
        refGridSelect={refGridSelectDate}
        onDblClickGridSelectDate={onDblClickGridSelectDate}
        dateText={dateOrder}
        setDateText={setDateOrder}
        onClickSearch={onClickSearchSelectDate}
      />
    );
  }, [gridDataSelectDate, dateOrder]);
  const GridModalSelectMulti = useMemo(() => {
    return (
      <ModalSelectMulti
        height={"70%"}
        onClickModalSelectClose={onClickModalSelectMultiClose}
        refGridSelect={refGridSelectMultiHeader}
        columns={columnsSelectWeight}
        columnsDetail={columnsSelectWeightDetail}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersNum}
        gridDataSelect={gridDataSelectHeader}
        gridDataDetail={gridDataSelectDetail}
        onDblClickGridSelect={onDblClickSelectMulti}
        onClickSelectGrid={onClickModalSelectMulti}
      />
    );
  }, [gridDataSelectHeader, gridDataSelectDetail]);

  return (
    <ContentsArea>
      <S.TopWrap>
        <S.SearchWrap>
          <DateRange dateText={dateText} setDateText={setDateText} onClickSearch={onClickSearch} />
          <InputSearch
            id={"line_nm"}
            name={"라인명"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
          <S.InputPaperWrap>
            <InputPaper
              width={"180px"}
              name={"품목코드"}
              namePositionTop={"-12px"}
              value={prodCD.current || ""}
              btn={false}
            />
          </S.InputPaperWrap>
          <S.InputPaperWrap>
            <InputPaper
              width={"240px"}
              name={"품목"}
              namePositionTop={"-12px"}
              value={prodNM.current || ""}
              btn={true}
              onClickSelect={onClickSelectProd}
              onClickRemove={onClickRemoveProd}
            />
          </S.InputPaperWrap>
          <S.SearchButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.SearchButtonWrap>
        </S.SearchWrap>

        <S.ContentsHeader>
          <S.TitleButtonWrap>
            <S.TitleMid>생산품목</S.TitleMid>
            <S.ButtonWrap>
              <S.RadioTitle>바코드 출력 옵션</S.RadioTitle>
              <S.RadioButton options={options} selectedOption={selectedOption} onChange={handleOptionChange} />
              {isEditModeHeader ? (
                <>
                  <S.InnerButtonWrap>
                    <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
                  </S.InnerButtonWrap>
                  <S.InnerButtonWrap>
                    <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
                  </S.InnerButtonWrap>
                </>
              ) : (
                <>
                  <S.InnerButtonWrap>
                    <BtnComponent btnName={"New"} onClick={onClickNew} />
                  </S.InnerButtonWrap>
                  <S.InnerButtonWrap>
                    <BtnComponent btnName={"Edit"} onClick={onClickEditHeader} />
                  </S.InnerButtonWrap>
                  <S.InnerButtonWrap>
                    <BtnComponent btnName={"Delete"} onClick={onClickDeleteHeader} />
                  </S.InnerButtonWrap>
                </>
              )}
            </S.ButtonWrap>
          </S.TitleButtonWrap>
          <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
        </S.ContentsHeader>
      </S.TopWrap>
      <S.BottomWrap>
        <S.ContentsHeader>
          <S.TitleButtonWrap>
            <S.TitleBottom>투입품목</S.TitleBottom>
            <S.ButtonWrap>
              <>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"New"} onClick={onClickNewDetail} />
                </S.InnerButtonWrap>

                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Delete"} onClick={onClickDeleteDetail} />
                </S.InnerButtonWrap>
              </>
            </S.ButtonWrap>
          </S.TitleButtonWrap>
          <S.GridDetailWrap>{GridDetail}</S.GridDetailWrap>
        </S.ContentsHeader>
      </S.BottomWrap>
      {/*🔸🔸🔸Header New*/}
      {isModalOpen ? GridHeaderNew : null}
      {/*🔸🔸🔸Detail New*/}
      {isModalDetailOpen ? GridDetailNew : null}
      {isModalSelectOpen ? GridModalSelect : null}
      {isModalSelectDateOpen ? GridModalSelectDate : null}
      {isModalSelectMultiOpen ? GridModalSelectMulti : null}
      {isModalPrintOpen && <PackingModal onClose={closeModalPrintOpen} data={barcodePrintInfo} />}
      {isDeleteHeaderAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteHeaderAlertOpen(false);
          }}
        />
      ) : null}
      {isDeleteDetailAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteDetailAlertOpen(false);
          }}
        />
      ) : null}
      {isWarning.open ? (
        <NoticeAlertModal
          textContent={isWarning.message}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isConfirm={true}
          onConfirm={() => {
            setIsWarning(false);
          }}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default Packing;
