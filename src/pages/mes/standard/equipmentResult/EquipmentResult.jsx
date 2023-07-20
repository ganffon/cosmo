import {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  createRef,
} from "react";
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
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import BasicTabs from "components/gridtab/gridTab";

function EquipmentResult() {
  LoginStateChk();
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const selectEmpState = useRef("");

  let detailDataList = [];
  const refGridHeader = useRef(null);
  //const refGridDetail = useRef(null);
  const refGridDetail = useRef(null);
  const refGridNew = useRef(null);
  const refGridSelectOrder = useRef(null);
  const refGridSelectEmp = useRef(null);
  const clickedWorkOrderId = useRef(null);
  const empListTemp = useRef([]);
  const tabListTmp = useRef([]);
  const tabListId = useRef([]);

  const editOrNewFlag = useRef(null);

  const tabDataList = useRef([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isResultNewOpen, setIsResultNewOpen] = useState(false);
  const [isSelectOrderOpen, setIsSelectOrderOpen] = useState(false);
  const [isSelectEmpOpen, setIsSelectEmpOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);

  const refCurrentGrid = useRef(null);

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

  const [onclickEmp, setOnclickEmp] = useState([
    {
      gridTabId: "",
      mngEmpId: "",
      mngEmpNm: "",
      aftEmpId: "",
      aftEmpNm: "",
      nigEmpId: "",
      nigEmpNm: "",
    },
  ]);

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

    //refGridDetail?.current?.gridInst.refreshLayout();
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
    restURI.employee + `?use_fg=true&worker_fg=true`
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
    editOrNewFlag.current = "New";
    setGridDataNew([]);
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
    editOrNewFlag.current = "Edit";
    if (mainInfo.inspResultId !== "") {
      setIsEditMode(true);
      setIsResultNewOpen(true);
      try {
        setIsBackDrop(true);
        const result = await restAPI.get(
          restURI.qmsInspResultDetail +
            `?insp_result_id=${mainInfo.inspResultId}`
        );
        const employeeResult = await restAPI.get(
          restURI.inspResultEmp + `?insp_result_id=${mainInfo.inspResultId}`
        );

        empListTemp.current = employeeResult?.data?.data?.rows;

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
        inputTextChange.line_nm
          ? (conditionLine = `&line_nm=${inputTextChange.line_nm}`)
          : (conditionLine = "");
        inputTextChange.prod_cd
          ? (conditionProdCd = `&prod_cd=${inputTextChange.prod_cd}`)
          : (conditionProdCd = "");
        inputTextChange.prod_nm
          ? (conditionProdNm = `&prod_nm=${inputTextChange.prod_nm}`)
          : (conditionProdNm = "");
        const result = await restAPI.get(
          restURI.qmsInspResult +
            `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
            conditionLine +
            conditionProdCd +
            conditionProdNm
        );
        setGridDataHeader(result?.data?.data?.rows);
        setGridDataDetail([]);

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
          tagId: "",
          remark: "",
        });
        empListTemp.current = [];
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
  let tabListArr = [];
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
          tagId: Grid.getValue(e?.rowKey, "tag_id"),
          remark: Grid.getValue(e?.rowKey, "remark"),
        });
        const inspResultId = Grid.getValue(e?.rowKey, "insp_result_id");

        const employeeResult = await restAPI.get(
          restURI.inspResultEmp + `?insp_result_id=${inspResultId}`
        );

        empListTemp.current = employeeResult?.data?.data?.rows;

        //   tagId:employeeResult.,
        //   mngEmpId: "",
        //   mngEmpNm: "",
        //   aftEmpId: "",
        //   aftEmpNm: "",
        //   nigEmpId: "",
        //   nigEmpNm: "",
        // });

        try {
          setIsBackDrop(true);
          const result = await restAPI.get(
            restURI.qmsInspResultDetail + `?insp_result_id=${inspResultId}`
          );

          setGridDataDetail(result?.data?.data?.rows);

          for (let i = 0; i < tabListTmp.current.length; i++) {
            for (let j = 0; j < result?.data?.data?.rows.length; j++) {
              if (
                tabListTmp.current[i] ===
                result?.data?.data?.rows[j].insp_filing_id
              ) {
                //detailDataList[i].push(result?.data?.data?.rows[j]);
              }
            }
          }
          //console.log(detailDataList);
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

    for (let i = 0; i < tabListTmp?.current?.data?.data?.rows.length; i++) {
      refs[i].push = createRef();
    }
  };

  const getTabList = async () => {
    tabListTmp.current = [];
    tabListId.current = [];
    tabListTmp.current = await restAPI.get(restURI.inspFiling);
    tabListArr = [];
    let bacListIdArr = [];
    for (let i = 0; i < tabListTmp?.current?.data?.data?.rows.length; i++) {
      if (
        tabListArr.indexOf(
          tabListTmp?.current?.data?.data?.rows[i].insp_filing_nm === -1
        )
      ) {
        tabListArr.push(
          tabListTmp?.current?.data?.data?.rows[i].insp_filing_nm
        );
      }

      if (
        bacListIdArr.indexOf(
          tabListTmp?.current?.data?.data?.rows[i].insp_filing_id === -1
        )
      ) {
        bacListIdArr.push(
          tabListTmp?.current?.data?.data?.rows[i].insp_filing_id
        );
      }
    }

    tabListTmp.current = tabListArr;
    tabListId.current = bacListIdArr;
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
        setEmp({
          ...emp,
          mngEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
          mngEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
        });
      } else if (selectEmpState.current === "aft") {
        setEmp({
          ...emp,
          aftEmpId: selectGrid.getValue(e?.rowKey, "emp_id"),
          aftEmpNm: selectGrid.getValue(e?.rowKey, "emp_nm"),
        });
      } else if (selectEmpState.current === "nig") {
        setEmp({
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
        restURI.prdOrderDetail +
          `?work_order_id=${Grid.getValue(e?.rowKey, "work_order_id")}`
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

          // const Grid = refGridNew?.current?.gridInst;
          // Grid?.finishEditing();
          // let result = [];
          // for (let i = 0; i < Grid?.getRowCount(); i++) {
          //   result.push(Grid?.getRowAt(i));
          // }

          // const dataDetail = result.map((raw) => {
          //   return {
          //     work_order_detail_id: raw.work_order_detail_id,
          //     mng_insp_value: raw.mng_insp_value,
          //     aft_insp_value: raw.aft_insp_value,
          //     nig_insp_value: raw.nig_insp_value,
          //     insp_result_fg: null,
          //     remark: raw.remark,
          //   };
          // });
          let result = [];
          for (let i = 0; i < refGridArray.length; i++) {
            const Grid = refGridArray[i]?.current?.gridInst;
            Grid?.finishEditing();
            for (let i = 0; i < Grid?.getRowCount(); i++) {
              result.push(Grid?.getRowAt(i));
            }
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
        let result = [];
        for (let i = 0; i < refGridArray.length; i++) {
          const Grid = refGridArray[i]?.current?.gridInst;
          Grid?.finishEditing();
          for (let i = 0; i < Grid?.getRowCount(); i++) {
            result.push(Grid?.getRowAt(i));
          }
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
          const result = await restAPI.put(
            restURI.qmsInspResultInclude.replace("{id}", mainInfo.inspResultId),
            query
          );
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
        rowHeaders={rowHeadersCheck}
        header={header}
        data={gridDataDetail}
        draggable={false}
        refGrid={refGridDetail}
      />
    );
  }, [gridDataDetail]);

  const refs = useRef([]);
  const refModals = useRef([]);
  // ref 배열 초기화
  useEffect(() => {
    refs.current = [];
    refModals.current = [];
    for (let i = 0; i < tabListTmp.current.length; i++) {
      refs.current.push(createRef());
      refModals.current.push(createRef());
    }
    //onMapping();
  }, [tabListTmp]);

  useEffect(() => {
    getTabList();
  }, []);

  const refGridArray = tabListTmp.current.map((title, index) => ({
    current: refs.current[index],
  }));
  const refGridArrayModal = tabListTmp.current.map((title, index) => ({
    current: refModals.current[index],
  }));

  const onMapping = () => {
    let result = [];

    for (let i = 0; i < refGridArray.length; i++) {
      const Grid = refGridArray[i]?.current?.gridInst;
      Grid?.finishEditing();
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        result.push(Grid?.getRowAt(i));
      }
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
  };

  const GridTab = useMemo(() => {
    return (
      <BasicTabs
        tabLength={tabListTmp.current.length}
        gridTabTitle={tabListTmp.current}
        gridTabId={tabListId.current}
        rowHeaders={rowHeadersCheck}
        columnOptions={columnOptions}
        columns={columnsDetail}
        refGrid={refGridArray}
        refCurrentGrid={refCurrentGrid}
        header={header}
        data={gridDataDetail}
        height={"480px"}
        InfoButton={false}
        emp={emp}
        empListTemp={empListTemp}
      />
    );
  }, [refs, tabListArr, gridDataDetail, emp, empListTemp, tabListTmp.current]);

  return (
    <ContentsArea>
      <S.ContentTop>
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
                return (
                  <InputPaper
                    key={v.id}
                    id={v.id}
                    name={v.name}
                    width={"220px"}
                    value={mainInfo[v.id] || ""}
                  />
                );
              })}
            </S.InfoWrap>
            {GridTab}
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
          textChange={remarkChange}
          dateText={dateCheck}
          clickedWorkOrderId={clickedWorkOrderId}
          setDateText={setDateCheck}
          columns={columnsNew}
          columnOptions={columnOptions}
          rowHeaders={rowHeadersCheck}
          gridDataSelect={gridDataNew}
          draggable={false}
          refSelectGrid={refGridNew}
          refCurrentGrid={refCurrentGrid}
          info={info}
          emp={emp}
          refGridArrayModal={refGridArrayModal}
          mainInfo={mainInfo}
          isEditMode={isEditMode}
          tabTitleList={tabListTmp.current}
          tabTitleLength={tabListTmp.current.length}
          resetInfo={resetInfo}
          resetEmp={resetEmp}
          onClickSearch={onClickSearch}
          onResultNewClose={onResultNewClose}
          selectEmpState={selectEmpState.current}
          gridTabId={tabListId.current}
          employeeList={empListTemp}
          flag={editOrNewFlag.current}
          onClickGrid={onClickGrid}
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
