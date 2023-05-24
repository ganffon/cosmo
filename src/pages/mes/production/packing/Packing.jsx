import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import PackingSet from "./PackingSet";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
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
import ButtonModule from "components/button/ButtonModule";
import ModalNew from "components/modal/ModalNew";
import ModalSelectDate from "components/modal/ModalSelectDate";
import GetPutParams from "api/GetPutParams";
import ModalSelectMulti from "components/modal/ModalSelectMulti";
import GetDeleteParams from "api/GetDeleteParams";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";

function Packing() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  const prodID = useRef("");
  const prodCD = useRef("");
  const prodNM = useRef("");
  const workOrderID = useRef("");
  const workWeighID = useRef("");
  const workPackingID = useRef("");

  const resetProd = () => {
    prodID.current = "";
    prodCD.current = "";
    prodNM.current = "";
  };

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalSelectDateOpen, setIsModalSelectDateOpen] = useState(false);
  const [isModalSelectMultiOpen, setIsModalSelectMultiOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  // const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  // const [headerClickRowID, setHeaderClickRowID] = useState(null);

  const barcodePrintDetail = async (rowKey) => {
    const gridDetailId =
      refGridDetail?.current?.gridInst.store.data.rawData[rowKey]
        .work_subdivision_detail_id;

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
              message: res?.message
                ? res?.message
                : res?.response?.data?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };

  const barcodePrintHeader = async (rowKey) => {
    const gridHeaderId =
      refGridHeader?.current?.gridInst.store.data.rawData[rowKey]
        .work_subdivision_id;

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
              message: res?.message
                ? res?.message
                : res?.response?.data?.message,
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
  } = PackingSet(isEditModeHeader, barcodePrintDetail, barcodePrintHeader);

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
  const dblClickTarget = useRef("");
  const dblClickRowKey = useRef("");

  const [columnsSelect, setColumnsSelect] = useState([]);
  const [inputTextChange, setInputTextChange] = useState({});

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(
    isEditModeHeader,
    refGridHeader
  );

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
    restURI.prdOrder +
      `?start_date=${dateOrder.startDate}&end_date=${dateOrder.endDate}`
  );
  const [actSelectEmp] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.employee
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
    dblClickTarget.current = "Search";
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };
  const onClickEditModeSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridHeader?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid.getCheckedRows().map((raw) =>
        GetPutParams("packing", raw)
      );
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
      inputTextChange.line_nm
        ? (conditionLine = `&line_nm=${inputTextChange.line}`)
        : (conditionLine = "");
      prodID.current
        ? (conditionProdID = `&prod_id=${prodID.current}`)
        : (conditionProdID = "");
      const result = await restAPI.get(
        restURI.prdPacking +
          `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
          conditionLine +
          conditionProdID
      );
      setGridDataHeader(result?.data?.data?.rows);
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
      alert("생산품목 선택해라 새캬");
    }
  };
  const handleDelete = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridDetail?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid.getCheckedRows().map((raw) =>
        GetDeleteParams("packingDetail", raw)
      );
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
      setIsDeleteAlertOpen(false);
      setIsBackDrop(false);
    }
  };
  const onClickDeleteDetail = () => {
    const Grid = refGridDetail?.current?.gridInst;
    if (Grid.getCheckedRows().length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const onClickModalAddRow = () => {
    const Grid = refGridHeaderNew?.current?.gridInst;
    Grid?.finishEditing();
    Grid?.appendRow();
    Grid?.setValue(
      Grid.getRowCount() - 1,
      "work_packing_date",
      DateTime().dateFull
    );
    Grid?.setValue(Grid.getRowCount() - 1, "packing_cnt", 1);
  };
  const onClickModalDetailAddRow = () => {
    const Grid = refGridDetailNew?.current?.gridInst;
    Grid?.finishEditing();
    Grid?.appendRow();
    Grid?.setValue(
      Grid.getRowCount() - 1,
      "work_packing_id",
      workPackingID.current
    );
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
    if (
      Condition(e, [
        "work_order_no",
        "line_dept_nm",
        "line_nm",
        "prod_cd",
        "prod_nm",
      ])
    ) {
      dblClickTarget.current = "Order";
      dblClickRowKey.current = e?.rowKey;
      setIsModalSelectDateOpen(true);
      actSelectOrder();
    }
    if (Condition(e, ["packing_emp_nm"])) {
      dblClickTarget.current = "Emp";
      dblClickRowKey.current = e?.rowKey;
      setColumnsSelect(columnsSelectEmp);
      setIsModalSelectOpen(true);
      actSelectEmp();
    }
    if (Condition(e, ["store_nm", "location_nm"])) {
      dblClickTarget.current = "Store";
      dblClickRowKey.current = e?.rowKey;
      setColumnsSelect(columnsSelectStore);
      setIsModalSelectOpen(true);
      actSelectStore();
    }
  };
  const onDblClickModalDetailGrid = (e) => {
    if (
      Condition(e, ["prod_cd", "prod_nm", "lot_no", "store_nm", "location_nm"])
    ) {
      dblClickTarget.current = "Weight";
      dblClickRowKey.current = e?.rowKey;
      setIsModalSelectMultiOpen(true);
      actSelectWeight(
        `?complete_fg=COMPLETE&work_order_id=${workOrderID.current}`
      );
    }
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setIsEditModeHeader(false);
  };
  const onClickModalDetailClose = () => {
    workOrderID.current = "";
    setIsModalDetailOpen(false);
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickModalSelectDateClose = () => {
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
        const result = await restAPI.get(
          restURI.prdWeightDetail + `?work_weigh_id=${workWeighID.current}`
        );
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
    Grid?.setValue(dblClickRowKey.current, "work_weigh_id", data.work_weigh_id);
    Grid?.setValue(dblClickRowKey.current, "prod_id", data.prod_id);
    Grid?.setValue(dblClickRowKey.current, "prod_cd", data.prod_cd);
    Grid?.setValue(dblClickRowKey.current, "prod_nm", data.prod_nm);
    Grid?.setValue(dblClickRowKey.current, "lot_no", data.lot_no);
    Grid?.setValue(dblClickRowKey.current, "input_qty", data.total_qty);
    Grid?.setValue(
      dblClickRowKey.current,
      "inv_to_store_id",
      data.inv_to_store_id
    );
    Grid?.setValue(dblClickRowKey.current, "store_nm", data.store_nm);
    Grid?.setValue(
      dblClickRowKey.current,
      "inv_to_location_id",
      data.inv_to_location_id
    );
    Grid?.setValue(dblClickRowKey.current, "location_nm", data.location_nm);
    workWeighID.current = "";
    dblClickRowKey.current = "";
    refGridSelectMultiDetail?.current?.gridInst?.clear();
    setIsModalSelectMultiOpen(false);
  };
  const onDblClickGridSelect = (e) => {
    const data = e?.instance?.store?.data?.rawData[e?.rowKey];
    if (dblClickTarget.current === "Search") {
      prodID.current = data.prod_id;
      prodCD.current = data.prod_cd;
      prodNM.current = data.prod_nm;
    } else if (dblClickTarget.current === "Emp") {
      const Grid = refGridHeaderNew?.current?.gridInst;
      Grid?.setValue(dblClickRowKey.current, "packing_emp_id", data.emp_id);
      Grid?.setValue(dblClickRowKey.current, "packing_emp_nm", data.emp_nm);
    } else if (dblClickTarget.current === "Store") {
      const Grid = refGridHeaderNew?.current?.gridInst;
      Grid?.setValue(dblClickRowKey.current, "inv_to_store_id", data.store_id);
      Grid?.setValue(dblClickRowKey.current, "store_nm", data.store_nm);
      Grid?.setValue(
        dblClickRowKey.current,
        "inv_to_location_id",
        data.location_id
      );
      Grid?.setValue(dblClickRowKey.current, "location_nm", data.location_nm);
    }
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelectDate = (e) => {
    const data = e?.instance?.store?.data?.rawData[e?.rowKey];
    if (dblClickTarget.current === "Order") {
      const Grid = refGridHeaderNew?.current?.gridInst;
      Grid?.setValue(
        dblClickRowKey.current,
        "work_order_id",
        data.work_order_id
      );
      Grid?.setValue(
        dblClickRowKey.current,
        "work_order_no",
        data.work_order_no
      );
      Grid?.setValue(dblClickRowKey.current, "line_dept_id", data.line_dept_id);
      Grid?.setValue(dblClickRowKey.current, "line_dept_nm", data.line_dept_nm);
      Grid?.setValue(dblClickRowKey.current, "line_id", data.line_id);
      Grid?.setValue(dblClickRowKey.current, "line_nm", data.line_nm);
      Grid?.setValue(dblClickRowKey.current, "prod_id", data.prod_id);
      Grid?.setValue(dblClickRowKey.current, "prod_cd", data.prod_cd);
      Grid?.setValue(dblClickRowKey.current, "prod_nm", data.prod_nm);
    }
    setIsModalSelectDateOpen(false);
  };

  const onClickSearchSelectDate = () => {
    actSelectOrder();
  };
  const handleGridHeaderClick = async () => {
    if (workPackingID.current) {
      try {
        setIsBackDrop(true);
        const result = await restAPI.get(
          restURI.prdPackingDetail + `?work_packing_id=${workPackingID.current}`
        );
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
      workOrderID.current = e?.instance.getValue(e?.rowKey, "work_order_id");
      workPackingID.current = e?.instance.getValue(
        e?.rowKey,
        "work_packing_id"
      );
      handleGridHeaderClick();
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
        // onDblClickGrid={onDblClickGridHeader}
        onEditingFinish={onEditingFinishGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);
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
  }, [gridDataSelectDate]);
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
    <>
      <S.ContentsArea isAllScreen={isAllScreen}>
        <S.TopWrap>
          <S.SearchWrap>
            <DateRange
              dateText={dateText}
              setDateText={setDateText}
              onClickSearch={onClickSearch}
            />
            <InputSearch
              id={"line_nm"}
              name={"라인명"}
              handleInputTextChange={handleInputTextChange}
              onClickSearch={onClickSearch}
            />
            <InputPaper
              width={"180px"}
              name={"품목코드"}
              value={prodCD.current || ""}
              btn={false}
            />
            <InputPaper
              width={"240px"}
              name={"품목"}
              value={prodNM.current || ""}
              btn={true}
              onClickSelect={onClickSelectProd}
              onClickRemove={onClickRemoveProd}
            />
          </S.SearchWrap>

          <S.ContentsHeader>
            <S.TitleMid>❇️ 생산품목</S.TitleMid>
            <S.ButtonWrap>
              {isEditModeHeader ? (
                <ButtonModule
                  saveBtn={true}
                  exitBtn={true}
                  searchBtn={true}
                  onClickSave={onClickEditModeSave}
                  onClickExit={onClickEditModeExit}
                  onClickSearch={onClickSearch}
                />
              ) : (
                <ButtonModule
                  newBtn={true}
                  editBtn={true}
                  searchBtn={true}
                  onClickNew={onClickNew}
                  onClickEdit={onClickEditHeader}
                  onClickSearch={onClickSearch}
                />
              )}
            </S.ButtonWrap>
          </S.ContentsHeader>
          <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
        </S.TopWrap>
        <S.BottomWrap>
          <S.ContentsHeader>
            <S.TitleMid>❇️ 투입품목</S.TitleMid>
            <S.ButtonWrap>
              <ButtonModule
                newBtn={true}
                deleteBtn={true}
                onClickNew={onClickNewDetail}
                onClickDelete={onClickDeleteDetail}
              />
            </S.ButtonWrap>
          </S.ContentsHeader>
          <S.GridDetailWrap>{GridDetail}</S.GridDetailWrap>
        </S.BottomWrap>
      </S.ContentsArea>
      {/*🔸🔸🔸Header New*/}
      {isModalOpen ? GridHeaderNew : null}
      {/*🔸🔸🔸Detail New*/}
      {isModalDetailOpen ? GridDetailNew : null}
      {isModalSelectOpen ? GridModalSelect : null}
      {isModalSelectDateOpen ? GridModalSelectDate : null}
      {isModalSelectMultiOpen ? GridModalSelectMulti : null}
      {isDeleteAlertOpen ? (
        <AlertDelete
          handleDelete={handleDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </>
  );
}

export default Packing;
