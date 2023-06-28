import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import { LoginStateChk } from "custom/LoginStateChk";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import EquipmentResultSet from "pages/mes/standard/equipmentResult/EquipmentResultSet";
import * as uSearch from "custom/useSearch";
import * as S from "./EquipmentResult.styled";
import * as col from "custom/GridColumnSet";
import restURI from "json/restURI.json";
import DateRange from "components/datetime/DateRange";
import DateTime from "components/datetime/DateTime";
import InputPaper from "components/input/InputPaper";
import ModalResultNew from "./ModalResultNew";
import ModalSelectDate from "components/modal/ModalSelectDate";
import restAPI from "api/restAPI";
import GetDeleteParams from "api/GetDeleteParams";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnPanel from "components/button/BtnPanel";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import ModalWrap from "components/modal/ModalWrap";

function EquipmentResult() {
  LoginStateChk();
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const selectEmpState = useRef("");

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridNew = useRef(null);
  const refGridSelectOrder = useRef(null);
  const refGridSelectEmp = useRef(null);
  const clickedWorkOrderId = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isResultNewOpen, setIsResultNewOpen] = useState(false);
  const [isSelectOrderOpen, setIsSelectOrderOpen] = useState(false);
  const [isSelectEmpOpen, setIsSelectEmpOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [dateSelectOrder, setDateSelectOrder] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [dateCheck, setDateCheck] = useState({
    checkDate: DateTime().dateFull,
  });
  const [inputTextChange, setInputTextChange] = useState({});
  const [remarkChange, setRemarkChange] = useState({});

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataNew, setGridDataNew] = useState(null);
  const [gridDataSelectOrder, setGridDataSelectOrder] = useState(null);
  const [gridDataSelectEmp, setGridDataSelectEmp] = useState(null);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [searchToggle, setSearchToggle] = useState(false);

  const {
    rowHeadersCheck,
    rowHeadersNum,
    header,
    columns,
    columnsDetail,
    columnsNew,
    columnsSelectOrder,
    columnsSelectEmp,
    columnOptions,
    inputSet,
    inputInfo,
  } = EquipmentResultSet();
  const SWITCH_NAME_01 = "equipmentResult";

  const [mainInfo, setMainInfo] = useState({
    inspResultId: "",
    inspResultDate: "",
    lineDeptId: "",
    lineDeptNm: "",
    lineId: "",
    lineNm: "",
    prodId: "",
    prodCd: "",
    prodNm: "",
    orderId: "",
    orderNo: "",
    mngEmpId: "",
    mngEmpNm: "",
    aftEmpId: "",
    aftEmpNm: "",
    nigEmpId: "",
    nigEmpNm: "",
    tagId: "",
    remark: "",
  });
  const [info, setInfo] = useState({
    lineDeptId: "",
    lineDeptNm: "",
    lineId: "",
    lineNm: "",
    prodId: "",
    prodCd: "",
    prodNm: "",
    orderId: "",
    orderNo: "",
  });
  const [emp, setEmp] = useState({
    mngEmpId: "",
    mngEmpNm: "",
    aftEmpId: "",
    aftEmpNm: "",
    nigEmpId: "",
    nigEmpNm: "",
  });
  const resetInfo = () => {
    setInfo({
      ...info,
      lineDeptId: "",
      lineDeptNm: "",
      lineId: "",
      lineNm: "",
      prodId: "",
      prodCd: "",
      prodNm: "",
      orderId: "",
      orderNo: "",
    });
  };
  const resetMngEmp = () => {
    setEmp({
      ...emp,
      mngEmpId: "",
      mngEmpNm: "",
    });
    selectEmpState.current = "";
  };
  const resetAftEmp = () => {
    setEmp({
      ...emp,
      aftEmpId: "",
      aftEmpNm: "",
    });
    selectEmpState.current = "";
  };
  const resetNigEmp = () => {
    setEmp({
      ...emp,
      nigEmpId: "",
      nigEmpNm: "",
    });
    selectEmpState.current = "";
  };
  const resetEditMngEmp = () => {
    setMainInfo({
      ...mainInfo,
      mngEmpId: "",
      mngEmpNm: "",
    });
    selectEmpState.current = "";
  };
  const resetEditAftEmp = () => {
    setMainInfo({
      ...mainInfo,
      aftEmpId: "",
      aftEmpNm: "",
    });
    selectEmpState.current = "";
  };
  const resetEditNigEmp = () => {
    setMainInfo({
      ...mainInfo,
      nigEmpId: "",
      nigEmpNm: "",
    });
    selectEmpState.current = "";
  };
  const resetEmp = () => {
    setEmp({
      ...emp,
      mngEmpId: "",
      mngEmpNm: "",
      aftEmpId: "",
      aftEmpNm: "",
      nigEmpId: "",
      nigEmpNm: "",
    });
  };
  const resetMainInfo = () => {
    setMainInfo({
      ...mainInfo,
      inspResultId: "",
      inspResultDate: "",
      lineDeptId: "",
      lineDeptNm: "",
      lineId: "",
      lineNm: "",
      prodId: "",
      prodCd: "",
      prodNm: "",
      orderId: "",
      orderNo: "",
      mngEmpId: "",
      mngEmpNm: "",
      aftEmpId: "",
      aftEmpNm: "",
      nigEmpId: "",
      nigEmpNm: "",
      remark: "",
    });
  };

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();

    refGridDetail?.current?.gridInst.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

  const [actSelectEmp] = uSearch.useSearchSelect(
    refGridSelectEmp,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectEmp,
    restURI.employee + `?use_fg=true`
  );
  const [actSelectOrder] = uSearch.useSearchSelect(
    refGridSelectOrder,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectOrder,
    restURI.prdOrder
  );
  const onClickNew = () => {
    setIsResultNewOpen(true);
  };
  const onResultNewClose = () => {
    setDateCheck({ ...dateCheck, checkDate: DateTime().dateFull });
    resetInfo();
    resetEmp();
    setGridDataNew([]);
    setIsResultNewOpen(false);
    setIsEditMode(false);
  };

  const onClickEdit = async (e) => {
    console.log(e);
    if (mainInfo.inspResultId !== "") {
      setIsEditMode(true);
      setIsResultNewOpen(true);
      try {
        setIsBackDrop(true);
        const result = await restAPI.get(restURI.qmsInspResultDetail + `?insp_result_id=${mainInfo.inspResultId}`);
        setGridDataNew(result?.data?.data?.rows);
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
        setIsSelectOrderOpen(false);
      }
    }
  };
  const onClickDelete = () => {
    const data = refGridHeader?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!isBackDrop) {
      try {
        setIsBackDrop(true);
        const data = refGridHeader?.current?.gridInst
          ?.getCheckedRows()
          ?.map((raw) => GetDeleteParams("equipmentResult", raw));
        const result = await restAPI.delete(restURI.qmsInspResult, { data });
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        resetMainInfo();
        onClickSearch();
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
        setIsDeleteAlertOpen(false);
      }
    }
  };
  const onClickSearch = async () => {
    if (!isBackDrop) {
      try {
        setIsBackDrop(true);
        let conditionLine, conditionProdCd, conditionProdNm;
        inputTextChange.line_nm ? (conditionLine = `&line_nm=${inputTextChange.line_nm}`) : (conditionLine = "");
        inputTextChange.prod_cd ? (conditionProdCd = `&prod_cd=${inputTextChange.prod_cd}`) : (conditionProdCd = "");
        inputTextChange.prod_nm ? (conditionProdNm = `&prod_nm=${inputTextChange.prod_nm}`) : (conditionProdNm = "");
        const result = await restAPI.get(
          restURI.qmsInspResult +
            `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
            conditionLine +
            conditionProdCd +
            conditionProdNm
        );
        setGridDataHeader(result?.data?.data?.rows);
        setGridDataDetail([]);
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
        });
      } finally {
        setIsBackDrop(false);
      }
    }
  };
  const onClickGrid = async (e) => {
    if (e?.targetType !== "rowHeader" && e?.targetType === "cell") {
      if (!isBackDrop) {
        const Grid = refGridHeader?.current?.gridInst;
        clickedWorkOrderId.current = Grid.getValue(e?.rowKey, "work_order_id");
        setMainInfo({
          ...mainInfo,
          inspResultId: Grid.getValue(e?.rowKey, "insp_result_id"),
          inspResultDate: Grid.getValue(e?.rowKey, "insp_result_date"),
          lineDeptId: Grid.getValue(e?.rowKey, "line_dept_id"),
          lineDeptNm: Grid.getValue(e?.rowKey, "line_dept_nm"),
          lineId: Grid.getValue(e?.rowKey, "line_id"),
          lineNm: Grid.getValue(e?.rowKey, "line_nm"),
          prodId: Grid.getValue(e?.rowKey, "prod_id"),
          prodCd: Grid.getValue(e?.rowKey, "prod_cd"),
          prodNm: Grid.getValue(e?.rowKey, "prod_nm"),
          orderId: Grid.getValue(e?.rowKey, "work_order_id"),
          orderNo: Grid.getValue(e?.rowKey, "work_order_no"),
          mngEmpId: Grid.getValue(e?.rowKey, "mng_emp_id"),
          mngEmpNm: Grid.getValue(e?.rowKey, "mng_emp_nm"),
          aftEmpId: Grid.getValue(e?.rowKey, "aft_emp_id"),
          aftEmpNm: Grid.getValue(e?.rowKey, "aft_emp_nm"),
          nigEmpId: Grid.getValue(e?.rowKey, "nig_emp_id"),
          nigEmpNm: Grid.getValue(e?.rowKey, "nig_emp_nm"),
          tagId: Grid.getValue(e?.rowKey, "tag_id"),
          remark: Grid.getValue(e?.rowKey, "remark"),
        });
        const inspResultId = Grid.getValue(e?.rowKey, "insp_result_id");
        try {
          setIsBackDrop(true);
          const result = await restAPI.get(restURI.qmsInspResultDetail + `?insp_result_id=${inspResultId}`);
          setGridDataDetail(result?.data?.data?.rows);
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
      }
    }
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const handleRemarkChange = (e) => {
    setRemarkChange({ ...remarkChange, [e.target.id]: e.target.value });
  };
  const handleRemarkEditChange = (e) => {
    setMainInfo({ ...mainInfo, [e.target.id]: e.target.value });
  };

  const onSelectOrder = () => {
    setIsSelectOrderOpen(true);
    actSelectOrder(
      `?complete_fg=INCOMPLETE&start_date=${dateSelectOrder.startDate}&end_date=${dateSelectOrder.endDate}`
    );
  };
  const onRemoveOrder = () => {
    resetInfo();
    resetEmp();
    setGridDataNew([]);
  };
  const onSelectMorning = () => {
    selectEmpState.current = "mng";
    setIsSelectEmpOpen(true);
    actSelectEmp();
  };
  const onRemoveMorning = () => {
    isEditMode ? resetEditMngEmp() : resetMngEmp();
  };
  const onSelectAfternoon = () => {
    selectEmpState.current = "aft";
    setIsSelectEmpOpen(true);
    actSelectEmp();
  };
  const onRemoveAfternoon = () => {
    isEditMode ? resetEditAftEmp() : resetAftEmp();
  };
  const onSelectNight = () => {
    selectEmpState.current = "nig";
    setIsSelectEmpOpen(true);
    actSelectEmp();
  };
  const onRemoveNight = () => {
    isEditMode ? resetEditNigEmp() : resetNigEmp();
  };
  const onSelectOrderClose = () => {
    setDateSelectOrder({
      ...dateSelectOrder,
      startDate: DateTime(-7).dateFull,
      endDate: DateTime().dateFull,
    });
    setGridDataSelectOrder([]);
    setIsSelectOrderOpen(false);
  };
  const onSelectEmpClose = () => {
    setIsSelectEmpOpen(false);
  };
  const onDblClickSelectEmp = (e) => {
    const selectGrid = refGridSelectEmp?.current?.gridInst;
    if (selectEmpState.current) {
      if (selectEmpState.current === "mng") {
        isEditMode
          ? setMainInfo({
              ...mainInfo,
              mngEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
              mngEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
            })
          : setEmp({
              ...emp,
              mngEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
              mngEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
            });
      } else if (selectEmpState.current === "aft") {
        isEditMode
          ? setMainInfo({
              ...mainInfo,
              aftEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
              aftEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
            })
          : setEmp({
              ...emp,
              aftEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
              aftEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
            });
      } else if (selectEmpState.current === "nig") {
        isEditMode
          ? setMainInfo({
              ...mainInfo,
              nigEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
              nigEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
            })
          : setEmp({
              ...emp,
              nigEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
              nigEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
            });
      }
      setIsSelectEmpOpen(false);
    }
  };

  const onSearchSelectOrder = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(
        restURI.prdOrder +
          `?complete_fg=INCOMPLETE&start_date=${dateSelectOrder.startDate}&end_date=${dateSelectOrder.endDate}`
      );
      setGridDataSelectOrder(result?.data?.data?.rows);
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
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const onDblClickSelectOrder = async (e) => {
    const Grid = refGridSelectOrder?.current?.gridInst;
    setInfo({
      ...info,
      lineDeptId: Grid.getValue(e?.rowKey, "line_dept_id"),
      lineDeptNm: Grid.getValue(e?.rowKey, "line_dept_nm"),
      lineId: Grid.getValue(e?.rowKey, "line_id"),
      lineNm: Grid.getValue(e?.rowKey, "line_nm"),
      prodId: Grid.getValue(e?.rowKey, "prod_id"),
      prodCd: Grid.getValue(e?.rowKey, "prod_cd"),
      prodNm: Grid.getValue(e?.rowKey, "prod_nm"),
      orderId: Grid.getValue(e?.rowKey, "work_order_id"),
      orderNo: Grid.getValue(e?.rowKey, "work_order_no"),
    });

    try {
      setIsBackDrop(true);
      const result = await restAPI.get(
        restURI.prdOrderDetail + `?work_order_id=${Grid.getValue(e?.rowKey, "work_order_id")}`
      );
      setGridDataNew(result?.data?.data?.rows);
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
      setIsSelectOrderOpen(false);
    }
  };
  const onMapping = async () => {
    let timeString = DateTime().hour + ":" + DateTime().minute + ":" + DateTime().seconds;
    //timeString = "06:20:20";
    const morningStart = "06:00:00";
    const morningEnd = "13:59:59";

    const afternoonStart = "14:00:00";
    const afternoonEnd = "21:59:59";

    if (morningStart <= timeString && timeString <= morningEnd) {
      if (refGridNew?.current?.gridInst?.store?.data?.rawData?.length > 0) {
        const workOrderIdForNew = refGridNew?.current?.gridInst.store.data.rawData[0].work_order_id;
        if (workOrderIdForNew === null || workOrderIdForNew === "" || workOrderIdForNew === undefined) {
          await getRawData(clickedWorkOrderId.current, "mng_insp_value");
        } else {
          await getRawData(workOrderIdForNew, "mng_insp_value");
        }
      }
    } else if (afternoonStart <= timeString && timeString <= afternoonEnd) {
      if (refGridNew?.current?.gridInst?.store?.data?.rawData?.length > 0) {
        const workOrderIdForNew = refGridNew?.current?.gridInst.store.data.rawData[0].work_order_id;

        if (workOrderIdForNew === null || workOrderIdForNew === "" || workOrderIdForNew === undefined) {
          await getRawData(clickedWorkOrderId.current, "aft_insp_value");
        } else {
          await getRawData(workOrderIdForNew, "aft_insp_value");
        }
      }
    } else {
      if (refGridNew?.current?.gridInst?.store?.data?.rawData?.length > 0) {
        const workOrderIdForNew = refGridNew?.current?.gridInst.store.data.rawData[0].work_order_id;

        if (workOrderIdForNew === null || workOrderIdForNew === "" || workOrderIdForNew === undefined) {
          await getRawData(clickedWorkOrderId.current, "nig_insp_value");
        } else {
          await getRawData(workOrderIdForNew, "nig_insp_value");
        }
      }
    }
  };

  const getRawData = async (workOrderId, Term) => {
    const result = await restAPI.get(restURI.getOrderDetailsRawData + "?work_order_id=" + workOrderId);
    const rowLength = result?.data?.data?.count;
    const rowData = result?.data?.data?.rows;
    const GridRowDataLength = refGridNew?.current?.gridInst?.store?.data?.rawData?.length;
    const GridRowData = refGridNew?.current?.gridInst;
    for (let i = 0; i < GridRowDataLength; i++) {
      for (let j = 0; j < rowLength; j++) {
        if (GridRowData?.store?.data?.rawData[i].tag_id === rowData[j].node_id) {
          GridRowData?.setValue(GridRowData.store.data.rawData[i].rowKey, Term, String(rowData[j].value));
        }
      }
    }
  };

  useEffect(() => {
    const Grid = refGridDetail?.current?.gridInst;
    for (let i = 0; Grid.getRowCount() > i; i++) {
      if (
        Grid.getValue(i, "mng_insp_value") < Grid.getValue(i, "spec_lcl") ||
        Grid.getValue(i, "mng_insp_value") > Grid.getValue(i, "spec_ucl")
      ) {
        Grid.addCellClassName(i, "mng_insp_value", "redText");
      }
      if (
        Grid.getValue(i, "aft_insp_value") < Grid.getValue(i, "spec_lcl") ||
        Grid.getValue(i, "aft_insp_value") > Grid.getValue(i, "spec_ucl")
      ) {
        Grid.addCellClassName(i, "aft_insp_value", "redText");
      }
      if (
        Grid.getValue(i, "nig_insp_value") < Grid.getValue(i, "spec_lcl") ||
        Grid.getValue(i, "nig_insp_value") > Grid.getValue(i, "spec_ucl")
      ) {
        Grid.addCellClassName(i, "nig_insp_value", "redText");
      }
    }
  }, [gridDataDetail]);

  const onSaveNew = async () => {
    if (!isBackDrop) {
      if (!isEditMode) {
        if (info.orderId) {
          setIsBackDrop(true);
          const dataHeader = {
            work_order_id: info.orderId,
            line_dept_id: info.lineDeptId,
            line_id: info.lineId,
            prod_id: info.prodId,
            insp_result_date: dateCheck.checkDate,
            mng_emp_id: emp.mngEmpId === "" ? null : emp.mngEmpId,
            aft_emp_id: emp.aftEmpId === "" ? null : emp.aftEmpId,
            nig_emp_id: emp.nigEmpId === "" ? null : emp.nigEmpId,
            remark: remarkChange.remark ? remarkChange.remark : null,
          };

          const Grid = refGridNew?.current?.gridInst;
          Grid?.finishEditing();
          let result = [];
          for (let i = 0; i < Grid?.getRowCount(); i++) {
            result.push(Grid?.getRowAt(i));
          }
          const dataDetail = result.map((raw) => {
            return {
              work_order_detail_id: raw.work_order_detail_id,
              mng_insp_value: raw.mng_insp_value,
              aft_insp_value: raw.aft_insp_value,
              nig_insp_value: raw.nig_insp_value,
              insp_result_fg: null,
              remark: raw.remark,
            };
          });
          const query = {
            header: dataHeader,
            details: dataDetail,
          };

          try {
            const result = await restAPI.post(restURI.qmsInspResult, query);
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: result?.data?.message,
              severity: "success",
              location: "bottomRight",
            });
            resetInfo();
            resetEmp();
            setGridDataNew([]);

            setIsResultNewOpen(false);
            onClickSearch();
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
        setIsBackDrop(true);
        const dataHeader = {
          insp_result_id: mainInfo.inspResultId,
          insp_result_date: dateCheck.checkDate,
          mng_emp_id: mainInfo.mngEmpId === "" ? null : mainInfo.mngEmpId,
          aft_emp_id: mainInfo.aftEmpId === "" ? null : mainInfo.aftEmpId,
          nig_emp_id: mainInfo.nigEmpId === "" ? null : mainInfo.nigEmpId,
          remark: mainInfo.remark ? mainInfo.remark : null,
        };

        const Grid = refGridNew?.current?.gridInst;
        Grid?.finishEditing();
        let result = [];
        for (let i = 0; i < Grid?.getRowCount(); i++) {
          result.push(Grid?.getRowAt(i));
        }
        const dataDetail = result.map((raw) => {
          return {
            insp_result_detail_id: raw.insp_result_detail_id,
            mng_insp_value: raw.mng_insp_value,
            aft_insp_value: raw.aft_insp_value,
            nig_insp_value: raw.nig_insp_value,
            insp_result_fg: null,
            remark: raw.remark,
          };
        });
        const query = {
          header: dataHeader,
          details: dataDetail,
        };
        try {
          const result = await restAPI.put(restURI.qmsInspResultInclude.replace("{id}", mainInfo.inspResultId), query);
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
          resetInfo();
          resetEmp();
          setGridDataNew([]);

          setIsResultNewOpen(false);
          setIsEditMode(false);
          onClickSearch();
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
    }
  };

  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columns}
        rowHeaders={rowHeadersCheck}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        onClickGrid={onClickGrid}
      />
    );
  }, [gridDataHeader]);

  const GridDetail = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsDetail}
        rowHeaders={rowHeadersNum}
        header={header}
        data={gridDataDetail}
        draggable={false}
        refGrid={refGridDetail}
      />
    );
  }, [gridDataDetail]);

  return (
    <ContentsArea>
      <S.ContentTop>
        <S.SearchWrap>
          <DateRange dateText={dateText} setDateText={setDateText} onClickSearch={onClickSearch} />
          <InputSearch
            id={"line_nm"}
            name={"라인명"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
          <InputSearch
            id={"prod_cd"}
            name={"품목코드"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
          <InputSearch
            id={"prod_nm"}
            name={"품목명"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
        </S.SearchWrap>
        <S.ButtonWrap>
          <BtnPanel
            btnName={"Search"}
            title={"등록"}
            height={"40px"}
            width={"110px"}
            color={"#1491CE"}
            fontSize={"14px"}
            fontColor={"#ffffff"}
            onClick={onClickSearch}
          />
        </S.ButtonWrap>
      </S.ContentTop>
      <S.ContentBottom>
        <S.ContentLeft>
          <S.GridHeaderWrap>
            <S.TitleButtonWrap>
              <S.Title>운전점검일지</S.Title>
              <S.TitleButton>
                <BtnComponent btnName={"New"} onClick={onClickNew} />
                <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
              </S.TitleButton>
            </S.TitleButtonWrap>
            <S.TopGridWrap>{GridHeader}</S.TopGridWrap>
          </S.GridHeaderWrap>
        </S.ContentLeft>
        <S.ContentRight>
          <S.GridDetailWrap>
            <S.TitleButtonRight>
              <S.Title>세부운전점검일지</S.Title>
              <BtnComponent btnName={"Edit"} onClick={onClickEdit} />
            </S.TitleButtonRight>

            <S.InfoWrap>
              {inputInfo.map((v, idx) => {
                return <InputPaper key={v.id} id={v.id} name={v.name} width={"220px"} value={mainInfo[v.id] || ""} />;
              })}
            </S.InfoWrap>

            <S.BottomGridWrap>{GridDetail}</S.BottomGridWrap>
          </S.GridDetailWrap>
        </S.ContentRight>
      </S.ContentBottom>
      {isResultNewOpen ? (
        <ModalResultNew
          onClose={onResultNewClose}
          onSelectOrder={onSelectOrder}
          onRemoveOrder={onRemoveOrder}
          onSelectMorning={onSelectMorning}
          onRemoveMorning={onRemoveMorning}
          onSelectAfternoon={onSelectAfternoon}
          onRemoveAfternoon={onRemoveAfternoon}
          onSelectNight={onSelectNight}
          onRemoveNight={onRemoveNight}
          onTextChange={handleRemarkChange}
          onTextChangeEdit={handleRemarkEditChange}
          onMapping={onMapping}
          onSaveNew={onSaveNew}
          textChange={remarkChange}
          dateText={dateCheck}
          setDateText={setDateCheck}
          columns={columnsNew}
          columnOptions={columnOptions}
          rowHeaders={rowHeadersNum}
          gridDataSelect={gridDataNew}
          draggable={false}
          refSelectGrid={refGridNew}
          info={info}
          emp={emp}
          mainInfo={mainInfo}
          isEditMode={isEditMode}
        />
      ) : null}
      {isSelectOrderOpen ? (
        <ModalSelectDate
          width={"80%"}
          height={"80%"}
          onClickModalSelectDateClose={onSelectOrderClose}
          columns={columnsSelectOrder}
          columnOptions={columnOptions}
          rowHeaders={rowHeadersNum}
          gridDataSelect={gridDataSelectOrder}
          draggable={false}
          refGridSelect={refGridSelectOrder}
          dateText={dateSelectOrder}
          setDateText={setDateSelectOrder}
          onClickSearch={onSearchSelectOrder}
          onDblClickGridSelectDate={onDblClickSelectOrder}
        />
      ) : null}
      {isSelectEmpOpen ? (
        <ModalSelect
          width={"60%"}
          height={"70%"}
          onClickModalSelectClose={onSelectEmpClose}
          columns={columnsSelectEmp}
          columnOptions={columnOptions}
          rowHeaders={rowHeadersNum}
          gridDataSelect={gridDataSelectEmp}
          draggable={false}
          refSelectGrid={refGridSelectEmp}
          onDblClickGridSelect={onDblClickSelectEmp}
        />
      ) : null}
      {isDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      ) : null}

      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default EquipmentResult;
