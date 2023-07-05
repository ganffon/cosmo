import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import PackingPanelSet from "./PackingPanelSet";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./PackingPanel.styled";
import restAPI from "api/restAPI";
import Condition from "custom/Condition";
import ModalSelectDate from "components/modal/ModalSelectDate";
import BarcodeBox from "./BarcodeBox";
import BtnPacking from "components/button/panel/BtnPacking";
import ModalNew from "./ModalNew";
import ModalSelectMulti from "./ModalSelectMulti";
import GetPostParams from "api/GetPostParams";
import GetDeleteParams from "api/GetDeleteParams";
import ContentsArea from "components/layout/common/ContentsArea";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import BarcodeScan from "./BarcodeScan";
import ModalSelect from "components/modal/ModalSelect";
import PackingModal from "pages/mes/production/packing/PackingModal";

function PackingPanel() {
  const workPackingID = useRef("");
  const workOrderID = useRef("");
  const workWeightID = useRef("");
  const targetRowKey = useRef("");
  const targetID = useRef("");
  const targetWeight = useRef("");
  const currentRowKey = useRef("");
  LoginStateChk();
  const { isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isPackingHeaderOpen, setIsPackingHeaderOpen] = useState(false);
  const [isModalNewOpen, setIsModalNewOpen] = useState(false);
  const [isModalSelectEmp, setIsModalSelectEmp] = useState(false);
  const [isModalSelectMulti, setIsModalSelectMulti] = useState(false);
  const [isBarcodeScanOpen, setIsBarcodeScanOpen] = useState(false);
  const [barcodeScan, setBarcodeScan] = useState({});
  const [isModalPrintOpen, setIsModalPrintOpen] = useState(false);
  const [barcodePrintInfo, setBarcodePrintInfo] = useState({});

  const {
    columnOptions,
    rowHeadersNum,
    rowHeadersNumCheck,
    header,
    columnsHeader,
    columnsDetail,
    columnsSelectPackingHeader,
    columnsNewHeader,
    columnsNewDetail,
    columnsSelectHeader,
    columnsSelectDetail,
    columnsSelectEmp,
  } = PackingPanelSet(onPerformance);

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridPackingHeader = useRef(null);
  const refGridNewHeader = useRef(null);
  const refGridSelectHeader = useRef(null);
  const refGridSelectEmp = useRef(null);
  const refBarcodeTimeStamp = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataPackingHeader, setGridDataPackingHeader] = useState(null);
  const [gridDataNewHeader, setGridDataNewHeader] = useState(null);
  const [gridDataNewDetail, setGridDataNewDetail] = useState(null);
  const [gridDataSelectHeader, setGridDataSelectHeader] = useState(null);
  const [gridDataSelectDetail, setGridDataSelectDetail] = useState(null);
  const [gridDataSelectEmp, setGridDataSelectEmp] = useState(null);

  const [info, setInfo] = useState({});
  const [isWarning, setIsWarning] = useState({
    open: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current]);

  useEffect(() => {
    handleGridHeaderSearch();
  }, []);

  const [actSelectPackingHeader] = uSearch.useSearchSelect(
    refGridPackingHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataPackingHeader,
    restURI.prdOrder
  );
  const [actSelectWeightHeader] = uSearch.useSearchSelect(
    refGridSelectHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectHeader,
    restURI.prdWeight
  );
  const [actSelectEmp] = uSearch.useSearchSelect(
    refGridSelectEmp,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectEmp,
    restURI.employee + `?use_fg=true&worker_fg=true`
  );

  const onClickGridHeader = async (e) => {
    if (currentRowKey.current !== e?.rowKey) {
      if (e?.rowKey !== undefined) {
        currentRowKey.current = e?.rowKey;
        const Header = refGridHeader?.current?.gridInst;
        workWeightID.current = Header.getValue(e?.rowKey, "work_weigh_id");
        if (workWeightID.current) {
          try {
            setIsBackDrop(true);
            const result = await restAPI.get(restURI.prdWeightDetail + `?work_weigh_id=${workWeightID.current}`);
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
            workWeightID.current = "";
            setIsBackDrop(false);
          }
        }
      }
    }
  };
  const closeModalPrintOpen = () => {
    setIsModalPrintOpen(false);
  };
  const onClickSelect = () => {
    setIsPackingHeaderOpen(true);
    actSelectPackingHeader(`?start_date=${dateText.startDate}&end_date=${dateText.endDate}`);
  };
  const onClickSelectDateClose = () => {
    setIsPackingHeaderOpen(false);
  };
  const onClickSearchSelectDate = () => {
    actSelectPackingHeader(`?start_date=${dateText.startDate}&end_date=${dateText.endDate}`);
  };
  const handleGridHeaderSearch = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(
        restURI.prdPacking + `?start_date=${DateTime().dateFull}&end_date=${DateTime().dateFull}`
      );
      setGridDataHeader(result?.data?.data?.rows);
      setGridDataDetail([]);
      currentRowKey.current = "";
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
  const onDblClickPackingHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      const Grid = refGridPackingHeader?.current?.gridInst;
      setInfo({
        ...info,
        workOrderID: Grid.getValue(e?.rowKey, "work_order_id"),
        lineID: Grid.getValue(e?.rowKey, "line_id"),
        lineNM: Grid.getValue(e?.rowKey, "line_nm"),
        lineDeptID: Grid.getValue(e?.rowKey, "line_dept_id"),
        packingDate: DateTime().dateFull,
        prodID: Grid.getValue(e?.rowKey, "prod_id"),
        prodCD: Grid.getValue(e?.rowKey, "prod_cd"),
        prodNM: Grid.getValue(e?.rowKey, "prod_nm"),
        storeID: Grid.getValue(e?.rowKey, "inv_to_store_id"),
        locationID: Grid.getValue(e?.rowKey, "inv_to_location_id"),
      });
      workPackingID.current = Grid.getValue(e?.rowKey, "work_packing_id");
      workOrderID.current = Grid.getValue(e?.rowKey, "work_order_id");
      setIsPackingHeaderOpen(false);
    }
  };
  const onBarcodePrint = async (workPackingID) => {
    try {
      const result = await restAPI.post(restURI.createBarcode, {
        barcode_type: "PACKING",
        reference_id: workPackingID,
      });
      setBarcodePrintInfo({
        ...barcodePrintInfo,
        prodCD: result?.data?.data?.rows[0].prod_cd,
        prodNM: result?.data?.data?.rows[0].prod_type_small_nm,
        lot: result?.data?.data?.rows[0].lot_no,
        cnt: result?.data?.data?.rows[0].packing_cnt,
        qty: result?.data?.data?.rows[0].packing_qty,
        date: result?.data?.data?.rows[0].work_packing_date,
        barcodeNo: result?.data?.data?.rows[0].barcode_no,
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
  };
  const onClickNew = async () => {
    if (!info.lineNM) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작업지시를 먼저 선택하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!info.lotNo) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "Lot No를 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!info.packingWeight) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "포장 중량을 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!info.packingQty) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "포장 수량을 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    try {
      setIsBackDrop(true);

      const saveData = [
        {
          work_order_id: info.workOrderID,
          line_id: info.lineID,
          line_dept_id: info.lineDeptID,
          prod_id: info.prodID,
          lot_no: info.lotNo,
          packing_qty: info.packingWeight,
          packing_cnt: info.packingQty,
          work_packing_date: info.packingDate,
          inv_to_store_id: info.storeID,
          inv_to_location_id: info.locationID,
          remark: info.remark,
        },
      ];
      const result = await restAPI.post(restURI.prdPacking, saveData);
      const workPackingID = result?.data?.data?.rows[0].work_packing_id;
      handleGridHeaderSearch();
      setInfo({});
      onBarcodePrint(workPackingID);

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
  const onClickModalNewClose = () => {
    setIsModalNewOpen(false);
    setGridDataNewDetail([]);
  };
  const onClickDelete = async () => {
    if (refGridHeader?.current?.gridInst?.getCheckedRows().length > 0) {
      try {
        setIsBackDrop(true);
        const data = refGridHeader?.current?.gridInst?.getCheckedRows()?.map((raw) => GetDeleteParams("packing", raw));

        const result = await restAPI.delete(restURI.prdPacking, { data });

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        handleGridHeaderSearch();
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
  const onClickAddRow = () => {
    const Grid = refGridNewHeader?.current?.gridInst;
    Grid?.appendRow();

    Grid?.setValue(Grid.getRowCount() - 1, "work_packing_id", workPackingID.current);
  };
  const onClickCancelRow = () => {
    refGridNewHeader?.current?.gridInst?.removeRow(currentRowKey.current);
    currentRowKey.current = "";
    setGridDataNewDetail([]);
  };
  const onClickSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridNewHeader?.current?.gridInst;
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
        location: "bottomRight",
      });
      setIsModalNewOpen(false);
      setGridDataNewDetail([]);
      handleGridHeaderSearch();
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
  const onClickNewHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      if (currentRowKey.current !== e?.rowKey) {
        currentRowKey.current = e?.rowKey;
        const Header = refGridNewHeader?.current?.gridInst;
        workWeightID.current = Header?.getValue(e?.rowKey, "work_weigh_id");
        if (workWeightID.current) {
          try {
            setIsBackDrop(true);
            const result = await restAPI.get(restURI.prdWeightDetail + `?work_weigh_id=${workWeightID.current}`);
            setGridDataNewDetail(result?.data?.data?.rows);
          } catch (err) {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: err?.response?.data?.message,
              severity: "error",
              location: "bottomRight",
            });
          } finally {
            workWeightID.current = "";
            setIsBackDrop(false);
          }
        }
      }
    }
  };
  const onDblClickNewHeader = (e) => {
    if (
      Condition(e, [
        "prod_cd",
        "prod_nm",
        "lot_no",
        "work_weigh_time",
        "weigh_emp_nm",
        "work_input_time",
        "input_emp_nm",
      ])
    ) {
      targetRowKey.current = e?.rowKey;
      setIsModalSelectMulti(true);
      actSelectWeightHeader(`?complete_fg=COMPLETE&work_order_id=${workOrderID.current}`);
    }
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectMulti(false);
  };
  const onClickModalSelectGrid = async (e) => {
    if (e?.targetType !== "etc") {
      if (currentRowKey.current !== e?.rowKey) {
        try {
          setIsBackDrop(true);
          const Grid = refGridSelectHeader?.current?.gridInst;
          const workWeighID = Grid.getValue(e?.rowKey, "work_weigh_id");
          const result = await restAPI.get(restURI.prdWeightDetail + `?work_weigh_id=${workWeighID}`);
          setGridDataSelectDetail(result?.data?.data?.rows);
          currentRowKey.current = e?.rowKey;
        } catch (err) {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
            location: "bottomRight",
          });
          currentRowKey.current = "";
        } finally {
          setIsBackDrop(false);
        }
      }
    }
  };
  const handleDataSelect = (rowKey) => {
    const Header = refGridNewHeader?.current?.gridInst;
    const Select = refGridSelectHeader?.current?.gridInst;
    workWeightID.current = Select?.getValue(rowKey, "work_weigh_id");
    Header?.setValue(targetRowKey.current, "work_weigh_id", Select?.getValue(rowKey, "work_weigh_id"));
    Header?.setValue(targetRowKey.current, "prod_id", Select?.getValue(rowKey, "prod_id"));
    Header?.setValue(targetRowKey.current, "prod_cd", Select?.getValue(rowKey, "prod_cd"));
    Header?.setValue(targetRowKey.current, "prod_nm", Select?.getValue(rowKey, "prod_nm"));
    Header?.setValue(targetRowKey.current, "lot_no", Select?.getValue(rowKey, "lot_no"));
    Header?.setValue(targetRowKey.current, "work_weigh_time", Select?.getValue(rowKey, "work_weigh_time"));
    Header?.setValue(targetRowKey.current, "weigh_emp_id", Select?.getValue(rowKey, "weigh_emp_id"));
    Header?.setValue(targetRowKey.current, "weigh_emp_nm", Select?.getValue(rowKey, "weigh_emp_nm"));
    Header?.setValue(targetRowKey.current, "work_input_time", Select?.getValue(rowKey, "work_input_time"));
    Header?.setValue(targetRowKey.current, "input_emp_id", Select?.getValue(rowKey, "input_emp_id"));
    Header?.setValue(targetRowKey.current, "input_emp_nm", Select?.getValue(rowKey, "input_emp_nm"));
    Header?.setValue(targetRowKey.current, "inv_to_store_id", Select?.getValue(rowKey, "inv_to_store_id"));
    Header?.setValue(targetRowKey.current, "store_nm", Select?.getValue(rowKey, "store_nm"));
    Header?.setValue(targetRowKey.current, "inv_to_location_id", Select?.getValue(rowKey, "inv_to_location_id"));
    Header?.setValue(targetRowKey.current, "location_nm", Select?.getValue(rowKey, "location_nm"));
  };

  async function onPerformance(rowKey) {
    const Grid = refGridHeader?.current?.gridInst;
    targetRowKey.current = rowKey;
    targetID.current = Grid?.getValue(rowKey, "work_packing_id");
    targetWeight.current = Grid?.getValue(rowKey, "packing_qty");
    setIsBarcodeScanOpen(true);
  }
  const onCloseBarcodeScan = () => {
    setBarcodeScan({});
    setIsBarcodeScanOpen(false);
  };
  const onEmpConfirm = async () => {
    if (!barcodeScan.value || barcodeScan.value.slice(0, 3) !== "FDR") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "바코드를 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!barcodeScan.empID) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작업자를 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    try {
      setIsBackDrop(true);

      const raw = [
        {
          work_packing_id: targetID.current,
          packing_qty: targetWeight.current,
          packing_emp_id: barcodeScan.empID,
          work_packing_date: DateTime().dateFull,
          work_packing_time: DateTime().hour + ":" + DateTime().minute,
          barcode_no: barcodeScan.value,
        },
      ];

      const result = await restAPI.post(restURI.prdPackingDetail, raw);

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
  const onClickSelectEmp = () => {
    setIsModalSelectEmp(true);
    actSelectEmp();
  };
  const onClickModalSelectEmpClose = () => {
    setIsModalSelectEmp(false);
  };
  const onDblClickGridSelectEmp = (e) => {
    const data = e?.instance?.store?.data?.rawData[e?.rowKey];
    setBarcodeScan({ ...barcodeScan, empID: data.emp_id, empNM: data.emp_nm });
    setIsModalSelectEmp(false);
  };
  //🔸timeStamp 2개를 받아서 서로 몇 초 차이 나는지 구하는 함수
  function getTimeDifferenceInSeconds(timeStamp1, timeStamp2) {
    if (timeStamp1 === null) return 0;
    const difference = Math.abs(timeStamp1 - timeStamp2);
    const seconds = difference / 1000;
    return seconds;
  }

  const transferBarcode = async (barcodeNo) => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.createBarcode + `?barcode_no=${barcodeNo}`);
      const scanPackingID = result?.data?.data?.rows[0].work_packing_id;
      if (scanPackingID === targetID.current) {
        return true;
      } else {
        return false;
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
  const barcodeNo = useRef("");
  useEffect(() => {
    const onBarcodeScan = async (e) => {
      //timeStamp 가 서로 몇초 차이인지 구함
      const differenceTime = getTimeDifferenceInSeconds(refBarcodeTimeStamp.current, e?.timeStamp);
      //차이 시간이 0.01초 이상이라면 저장되어 있던 값을 초기화
      //바코드 스캐너로 입력되는 문자들은 입력 사이가 0.005초 전후 이기 때문
      if (differenceTime > 0.01) {
        barcodeNo.current = "";
      }

      // e?.key 가 "Process"는 한글인 경우
      if (e?.key === "Process") {
        // e?.key 가 "Process" 이면서 e?.code 가 "Digit" 숫자로 들어오는 경우가 있는데 무시해야 함
        if (e?.code.includes("Key")) {
          barcodeNo.current = barcodeNo.current + e?.code.replace("Key", "");
        }
        // e?.key 가 "Shift" 인 경우 1차적으로 모두 무시
      } else if (e?.key !== "Shift") {
        // Digit, Key, Minus 외의 값들은 전부 무시
        if (e?.code.includes("Digit")) {
          barcodeNo.current = barcodeNo.current + e?.code.replace("Digit", "");
        }
        if (e?.code.includes("Key")) {
          barcodeNo.current = barcodeNo.current + e?.code.replace("Key", "");
        }
        if (e?.code.includes("Minus")) {
          barcodeNo.current = barcodeNo.current + e?.key;
        }
      }

      refBarcodeTimeStamp.current = e?.timeStamp;
      if (e?.key === "Enter") {
        /**
         * ✅ 포장실적 바코드 이즈파크에서 발행한 앞 3자리가 "FDR" 인 것만 허용
         */
        if (barcodeNo.current.slice(0, 3) === "FDR") {
          setBarcodeScan({ ...barcodeScan, value: barcodeNo.current, className: "" });
          const scanChk = await transferBarcode(barcodeNo.current);
          if (!scanChk) {
            setBarcodeScan({
              ...barcodeScan,
              value: "포장지시와 일치하지 않는 바코드입니다.",
              lot: "",
              className: "red",
            });
          }
        } else {
          setBarcodeScan({ ...barcodeScan, value: "정의되지 않은 바코드입니다.", lot: "", className: "red" });
        }
        barcodeNo.current = "";
      }
    };
    window.addEventListener("keydown", onBarcodeScan);
    return () => {
      window.removeEventListener("keydown", onBarcodeScan);
    };
  }, [barcodeScan.lot]);

  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columns={columnsHeader}
        columnOptions={columnOptions}
        rowHeaders={rowHeadersNumCheck}
        data={gridDataHeader}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataHeader]);

  const GridDetail = useMemo(() => {
    return (
      <GridSingle
        columns={columnsDetail}
        columnOptions={columnOptions}
        rowHeaders={rowHeadersNum}
        refGrid={refGridDetail}
        data={gridDataDetail}
      />
    );
  }, [gridDataDetail]);
  const GridModalNew = useMemo(() => {
    return (
      <ModalNew
        height={"90%"}
        width={"90%"}
        onClickModalSelectClose={onClickModalNewClose}
        columns={columnsNewHeader}
        columnsDetail={columnsNewDetail}
        columnOptions={columnOptions}
        gridDataSelect={gridDataNewHeader}
        gridDataDetail={gridDataNewDetail}
        rowHeaders={rowHeadersNum}
        refGridSelect={refGridNewHeader}
        info={info}
        onClickAddRow={onClickAddRow}
        onClickCancelRow={onClickCancelRow}
        onClickSave={onClickSave}
        onClickSelectGrid={onClickNewHeader}
        onDblClickGridSelect={onDblClickNewHeader}
        // onClickSearch={onClickSearchSelectDate}
      />
    );
  }, [gridDataNewDetail, info.lineNM]);

  return (
    <ContentsArea>
      <S.TopWrap>
        <S.SearchBox>
          <S.LeftWrap>
            <S.ScreenTitleBox>일일포장일지</S.ScreenTitleBox>
            <S.BarcodeBoxWrap>
              <BarcodeBox onClickSelect={onClickSelect} setInfo={setInfo} info={info} />
            </S.BarcodeBoxWrap>
          </S.LeftWrap>
          <S.RightWrap>
            <BtnPacking onClickNew={onClickNew} onClickDelete={onClickDelete} />
          </S.RightWrap>
        </S.SearchBox>
      </S.TopWrap>
      <S.MidWrap>
        <S.GridHeader>{GridHeader}</S.GridHeader>
      </S.MidWrap>
      {/* <S.BottomWrap>
        <S.GridDetail>{GridDetail}</S.GridDetail>
      </S.BottomWrap> */}
      {isPackingHeaderOpen ? (
        <ModalSelectDate
          height={"60%"}
          onClickModalSelectDateClose={onClickSelectDateClose}
          columns={columnsSelectPackingHeader}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataPackingHeader}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridPackingHeader}
          dateText={dateText}
          setDateText={setDateText}
          onClickSearch={onClickSearchSelectDate}
          onDblClickGridSelectDate={onDblClickPackingHeader}
          // onClickSearch={onClickSearchSelectDate}
        />
      ) : null}
      {isModalNewOpen ? GridModalNew : null}
      {isModalSelectMulti ? (
        <ModalSelectMulti
          height={"80%"}
          width={"80%"}
          onClickModalSelectClose={onClickModalSelectClose}
          onClickSelectGrid={onClickModalSelectGrid}
          columns={columnsSelectHeader}
          columnsDetail={columnsSelectDetail}
          rowHeaders={rowHeadersNum}
          columnOptions={columnOptions}
          gridDataSelect={gridDataSelectHeader}
          gridDataDetail={gridDataSelectDetail}
          refGridSelect={refGridSelectHeader}
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
      {isBarcodeScanOpen && (
        <BarcodeScan
          width={"900px"}
          height={"300px"}
          onClose={onCloseBarcodeScan}
          setBarcodeScan={setBarcodeScan}
          barcodeScan={barcodeScan}
          onEmpConfirm={onEmpConfirm}
          onClickSelect={onClickSelectEmp}
        />
      )}
      {isModalSelectEmp ? (
        <ModalSelect
          width={"80%"}
          height={"80%"}
          onClickModalSelectClose={onClickModalSelectEmpClose}
          columns={columnsSelectEmp}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelectEmp}
          rowHeaders={rowHeadersNum}
          refSelectGrid={refGridSelectEmp}
          onDblClickGridSelect={onDblClickGridSelectEmp}
        />
      ) : null}
      {isModalPrintOpen && <PackingModal onClose={closeModalPrintOpen} data={barcodePrintInfo} />}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default PackingPanel;
