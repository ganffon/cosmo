import { useState, useEffect, useRef, useMemo } from "react";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import * as uSearch from "custom/useSearch";
import * as S from "./ItfPackingUpdate.styled";
import restURI from "json/restURI.json";
import BtnComponent from "components/button/BtnComponent";
import restAPI from "api/restAPI";
import ItfPackingUpdateSet from "./ItfPackingUpdateSet";
import DateTime from "components/datetime/DateTime";
import Condition from "custom/Condition";
import { FdrModal } from "components/modal/fdrModal";
import DateRange from "components/datetime/DateRange";
import CloseIcon from "@mui/icons-material/Close";
import ModalWrapMulti from "components/modal/ModalWrapMulti";

export function ItfPackingUpdate(props) {
  const { setIsUpdateOpen, data, onSearch } = props;

  const refPackingGrid = useRef(null); // 포장실적
  const [packingData, setPackingData] = useState([]);

  const refDetailGrid = useRef(null); // 포장실적상세
  const [detailData, setDetailData] = useState([]);

  const refMixedGrid = useRef(null); // 혼합실적(ERP)
  const refMixedCancelRowKey = useRef("");
  const [mixedData, setMixedData] = useState([]);

  const refEmployeeGrid = useRef(null); // 포장자
  const [employeeData, setEmployeeData] = useState([]);

  const refSelectGrid = useRef(null);
  const targetGrid = useRef("");
  const targetRowKey = useRef("");

  const [isSelectDateRange, setIsSelectDateRange] = useState({ open: false, columns: [], title: "" });
  const [isSelect, setIsSelect] = useState({ open: false, columns: [], title: "" });
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [gridDataSelect, setGridDataSelect] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  const {
    colPacking,
    colDetail,
    colMixed,
    colEmployee,
    colErpWorkerGroup,
    colErpUnit,
    colErpEmployee,
    colErpMixed,
    columnOptions,
  } = ItfPackingUpdateSet();

  useEffect(() => {
    setPackingData(data?.work);
    setMixedData(data?.input);
    setEmployeeData(data?.emp);

    getDetailData(data?.work[0]?.work_order_id);

    setTimeout(() => {
      const gridPacking = refPackingGrid.current.getInstance();
      const gridMixed = refMixedGrid.current.getInstance();

      for (let i = 0; i < gridPacking.getRowCount(); i++) {
        gridPacking.removeRowClassName(i, "selectedBack");
      }
      for (let i = 0; i < gridMixed.getRowCount(); i++) {
        gridMixed.removeRowClassName(i, "selectedBack");
      }
    }, 100);
  }, [data]);

  const [selectDate, setSelectDate] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  useEffect(() => {
    const grid = refPackingGrid.current.getInstance();
    grid.appendRow();
  }, []);

  const [actSelectOrder] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.erpItfOrder + `?start_date=${selectDate.startDate}&end_date=${selectDate.endDate}`
  );

  const [actSelectErpMixed] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.erpItfWork + `?start_date=${selectDate.startDate}&end_date=${selectDate.endDate}&work_type=MIX`
  );

  const [actSelectWorkerGroup] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.erpItfWorkerGroup
  );
  const [actSelectUnit] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.erpItfUnit
  );
  const [actSelectEmployee] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.employee
  );

  const onDblPacking = (e) => {
    targetRowKey.current = e?.rowKey;

    if (Condition(e, ["worker_group_cd", "worker_group_nm"])) {
      targetGrid.current = "erpWorkerGroup";
      setIsSelect({ open: true, columns: colErpWorkerGroup, height: "500px", width: "30%", title: "작업조" });
      actSelectWorkerGroup();
    }
    if (Condition(e, ["unit_cd", "unit_nm"])) {
      targetGrid.current = "erpUnit";
      setIsSelect({ open: true, columns: colErpUnit, height: "500px", width: "30%", title: "단위" });
      actSelectUnit();
    }
    if (Condition(e, ["input_emp_cd", "input_emp_nm"])) {
      targetGrid.current = "erpEmployee";
      setIsSelect({ open: true, columns: colErpEmployee, height: "500px", width: "30%", title: "작업자" });
      actSelectEmployee();
    }
  };

  const onSelectDateSearch = () => {
    // Select 창에서 조회 버튼
    if (targetGrid.current === "erpOrder") {
      actSelectOrder();
    }
    if (targetGrid.current === "erpMixed") {
      actSelectErpMixed();
    }
  };

  const onDblSelect = async (e) => {
    // Select 창에서 선택한 데이터 넣어주기
    if (e?.targetType === "cell") {
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      const rowKey = targetRowKey.current;
      const packingGrid = refPackingGrid?.current?.gridInst;
      const mixedGrid = refMixedGrid?.current?.gridInst;
      if (targetGrid.current === "erpWorkerGroup") {
        packingGrid?.setValue(rowKey, "worker_group_cd", data.worker_group_cd);
        packingGrid?.setValue(rowKey, "worker_group_nm", data.worker_group_nm);
      } else if (targetGrid.current === "erpUnit") {
        packingGrid?.setValue(rowKey, "unit_cd", data.unit_cd);
        packingGrid?.setValue(rowKey, "unit_nm", data.unit_nm);
      } else if (targetGrid.current === "erpEmployee") {
        packingGrid?.setValue(rowKey, "input_emp_cd", data.emp_cd);
        packingGrid?.setValue(rowKey, "input_emp_nm", data.emp_nm);
      } else if (targetGrid.current === "erpMixedEmployee") {
        mixedGrid?.setValue(rowKey, "in_emp_cd", data.emp_cd);
        mixedGrid?.setValue(rowKey, "in_emp_nm", data.emp_nm);
      } else if (targetGrid.current === "erpMixed") {
        mixedGrid?.setValue(rowKey, "item_id", data.item_id);
        mixedGrid?.setValue(rowKey, "item_cd", data.item_cd);
        mixedGrid?.setValue(rowKey, "item_nm", data.item_nm);
        mixedGrid?.setValue(rowKey, "input_lot_no", data.lot_no);
        mixedGrid?.setValue(rowKey, "stock_dept_cd", data.dept_cd);
        mixedGrid?.setValue(rowKey, "stock_dept_nm", data.dept_nm);
        mixedGrid?.setValue(rowKey, "stock_in_date", data.work_end_date);

        mixedGrid?.setValue(rowKey, "input_dept_cd", packingGrid.getValue(0, "order_line_dept_cd"));
        mixedGrid?.setValue(rowKey, "input_dept_nm", packingGrid.getValue(0, "order_line_dept_nm"));

        mixedGrid?.setValue(rowKey, "in_date", data.work_end_date);
        mixedGrid?.setValue(rowKey, "input_unit_cd", data.unit_cd);
        mixedGrid?.setValue(rowKey, "input_unit_nm", data.unit_nm);
        mixedGrid?.setValue(rowKey, "input_qty", parseFloat(data.work_qty.toFixed(2)));
      }
      setIsSelectDateRange({ open: false });
      setIsSelect({ open: false });
    }
  };

  const getDetailData = async (workOrderID) => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.prdPackingDetail + `?work_order_id=${workOrderID}&complete_fg=${true}`);

      setDetailData(result?.data?.data?.rows);
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

  const onCalculate = () => {
    // 포장 실적 상세(MES)가 확장되었을 때만 동작
    if (!isBottomExtend) {
      /**
       * 01. 대표 LOT (첫번째) 포장 실적의 LOT에 입력
       * 02. 포장중량을 모두 합산하여 포장 실적 생산중량에 입력
       * 03. 선택된 데이터 중 가장 빠른 포장일자는 포장 실적 시작일자
       *     가장 느린 포장일자는 포장 실적의 종료일자 입력
       * 04. 모든 포장자를 중복 제거하여 포장자 목록에 입력
       */
      const packingGrid = refPackingGrid.current.getInstance();
      const requestNo = packingGrid.getValue(0, "request_no");
      if (requestNo) {
        const detailGrid = refDetailGrid.current.getInstance();
        const checkData = detailGrid.getCheckedRows();

        if (checkData.length > 0) {
          // 포장 실적 상세(MES)에서 포장 실적으로 넘겨줄 데이터 계산
          const calculatedData = checkData
            .filter((item) => item.work_packing_date !== null)
            .reduce(
              (acc, item) => {
                acc.work_start_date =
                  acc.work_start_date < item.work_packing_date ? acc.work_start_date : item.work_packing_date;
                acc.work_end_date =
                  acc.work_end_date > item.work_packing_date ? acc.work_end_date : item.work_packing_date;
                acc.work_qty += item.packing_qty;

                return acc;
              },
              { work_qty: 0 }
            );

          packingGrid.setValue(0, "work_start_date", calculatedData.work_start_date);
          packingGrid.setValue(0, "work_end_date", calculatedData.work_end_date);
          packingGrid.setValue(0, "work_qty", parseFloat(calculatedData.work_qty.toFixed(2)));
          packingGrid.setValue(0, "lot_no", checkData[0].lot_no);

          // 전체 데이터셋에서 고유한 packing_emp_nm 추출
          const uniqueEmployees = Array.from(
            new Set(checkData.filter((item) => item.packing_emp_cd !== null).map((item) => item.packing_emp_cd))
          ).map((emp_cd) => {
            const item = checkData.find((item) => item.packing_emp_cd === emp_cd);
            return {
              work_emp_cd: item.packing_emp_cd,
              work_emp_nm: item.packing_emp_nm,
            };
          });

          setEmployeeData(uniqueEmployees);
        }
      } else {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "포장 실적의 ERP지시 먼저 입력바랍니다.",
          severity: "warning",
          location: "topCenter",
        });
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "혼합 실적(ERP) [접기] 상태에서 동작합니다.",
        severity: "warning",
        location: "topCenter",
      });
    }
  };

  const onDblMixed = (e) => {
    targetRowKey.current = e?.rowKey;
    if (Condition(e, ["in_emp_nm"])) {
      targetGrid.current = "erpMixedEmployee";
      setIsSelect({ open: true, columns: colErpEmployee, height: "500px", width: "30%", title: "작업자" });
      actSelectEmployee();
    }
    if (Condition(e, ["item_cd", "item_nm", "input_lot_no"])) {
      targetGrid.current = "erpMixed";
      setIsSelectDateRange({
        open: true,
        columns: colErpMixed,
        height: "800px",
        width: "90%",
        title: "혼합 실적(ERP)",
      });
      actSelectErpMixed();
    }
  };

  const onSave = async () => {
    try {
      setIsBackDrop(true);
      const packingGrid = refPackingGrid.current.getInstance();
      const mixedGrid = refMixedGrid.current.getInstance();
      const employeeGrid = refEmployeeGrid.current.getInstance();
      packingGrid?.finishEditing();
      mixedGrid?.finishEditing();
      const packingData = packingGrid.getData();
      const mixedData = mixedGrid.getData();
      const employeeData = employeeGrid.getData();

      const work = {
        corp_code: packingData[0].corp_code, // 회사코드
        plce_code: packingData[0].plce_code, // 사업장코드
        erp_work_order_no: packingData[0].erp_work_order_no, // ERP 작업지시번호
        lot_no: packingData[0].lot_no, // Lot
        dept_cd: packingData[0].dept_cd, // 부서코드
        line_dept_cd: packingData[0].line_dept_cd, // 라인부서코드
        worker_group_cd: packingData[0].worker_group_cd, // 작업조코드
        item_id: packingData[0].item_id, // ERP 아이템
        work_start_date: packingData[0].work_start_date, // 작업시작일자
        work_end_date: packingData[0].work_end_date, // 작업종료일자
        unit_cd: packingData[0].unit_cd, // 단위코드
        work_qty: packingData[0].work_qty, // 생산중량
        input_emp_cd: packingData[0].input_emp_cd, // I/F등록자코드
      };

      const input = mixedData.map((item) => {
        return {
          corp_code: packingData[0].corp_code, // 회사코드
          plce_code: packingData[0].plce_code, // 사업장코드
          lot_no: packingData[0].lot_no, // Lot
          input_lot_no: item.input_lot_no, // 투입 Lot
          item_id: item.item_id, // 투입 ERP 아이템
          stock_dept_cd: item.stock_dept_cd, // 재고부서
          stock_in_date: item.stock_in_date, // 재공일자
          in_date: item.in_date, // 투입일자
          in_emp_cd: item.in_emp_cd, // 투입자
          input_dept_cd: packingData[0].dept_cd, // 투입부서
          input_unit_cd: item.input_unit_cd, // 단위코드
          input_qty: item.input_qty, // 투입중량
          input_emp_cd: packingData[0].input_emp_cd, // I/F등록자코드
        };
      });

      const emp = employeeData.map((item) => {
        return {
          corp_code: packingData[0].corp_code, // 회사코드
          plce_code: packingData[0].plce_code, // 사업장코드
          lot_no: packingData[0].lot_no, // Lot
          work_emp_cd: item.work_emp_cd, // 포장자
          input_emp_cd: packingData[0].input_emp_cd, // I/F등록자코드
        };
      });

      const data = {
        work,
        input,
        emp,
        updateFg: true, // 신규 등록 시 : false || 수정 시 : true
      };

      if (data) {
        const result = await restAPI.post(restURI.erpItfWork, data);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });

        setIsUpdateOpen(false);

        onSearch();
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

  const onAddRow = () => {
    const packingGrid = refPackingGrid.current.getInstance();
    const mixedGrid = refMixedGrid.current.getInstance();
    const requestNo = packingGrid.getValue(0, "request_no");
    if (requestNo) {
      mixedGrid.appendRow();
      setIsBottomExtend(true);
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "포장실적의 ERP지시 먼저 입력바랍니다.",
        severity: "warning",
        location: "topCenter",
      });
    }
  };

  const handleClickedRowKey = (e) => {
    refMixedCancelRowKey.current = e.rowKey;
  };

  const onCancelRow = () => {
    const grid = refMixedGrid.current?.getInstance();
    const rowKey = refMixedCancelRowKey.current;
    if (rowKey !== "") {
      // 선택한 Row가 있는 경우, 해당 Row의 키를 기반으로 데이터에서 찾아 제거
      // 선택한 Row가 있는 경우, 해당 Row 삭제
      grid?.removeRow(rowKey);
    } else {
      // 선택한 Row가 없는 경우, 마지막 Row 제거
      const rowCount = refMixedGrid.current?.getInstance()?.getData()?.length;
      if (rowCount > 0) {
        const lastRowKey = grid.getRowAt(rowCount - 1).rowKey;
        grid?.removeRow(lastRowKey);
      }
    }
    refMixedCancelRowKey.current = "";
  };

  const [isBottomExtend, setIsBottomExtend] = useState(true);

  const onExtend = () => {
    setIsBottomExtend(!isBottomExtend);
  };

  useEffect(() => {
    const detailGrid = refDetailGrid.current.getInstance();
    const mixedGrid = refMixedGrid.current.getInstance();
    const employeeGrid = refEmployeeGrid.current.getInstance();

    detailGrid.refreshLayout();
    mixedGrid.refreshLayout();
    employeeGrid.refreshLayout();
  }, [isBottomExtend]);

  const gridPacking = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colPacking}
        rowHeaders={["rowNum"]}
        data={packingData}
        draggable={false}
        refGrid={refPackingGrid}
        isEditMode={true}
        onClickGrid={() => {}}
        onEditingFinish={() => {}}
        onDblClickGrid={onDblPacking}
      />
    );
  }, [packingData]);

  const gridDetail = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colDetail}
        rowHeaders={["checkbox", "rowNum"]}
        data={detailData}
        draggable={false}
        refGrid={refDetailGrid}
        isEditMode={false}
        onClickGrid={() => {}}
        onEditingFinish={() => {}}
        onDblClickGrid={() => {}}
      />
    );
  }, [detailData]);

  const gridMixed = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colMixed}
        rowHeaders={["rowNum"]}
        data={mixedData}
        draggable={false}
        refGrid={refMixedGrid}
        isEditMode={true}
        onClickGrid={handleClickedRowKey}
        onDblClickGrid={onDblMixed}
      />
    );
  }, [mixedData]);

  const gridEmployee = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colEmployee}
        rowHeaders={["rowNum"]}
        data={employeeData}
        draggable={false}
        refGrid={refEmployeeGrid}
        isEditMode={false}
        onClickGrid={() => {}}
        onEditingFinish={() => {}}
        onDblClickGrid={() => {}}
      />
    );
  }, [employeeData]);

  return (
    <ModalWrapMulti width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>{`포장 실적 I/F 등록`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={() => {
            setIsUpdateOpen(false);
          }}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ShadowBoxGrid height={"190px"} width={"100%"}>
        <S.GridTitleWrap>
          <S.GridTitle>{"포장 실적"}</S.GridTitle>
          <S.GridButtonWrap>
            <BtnComponent btnName={"Save"} onClick={onSave} />
          </S.GridButtonWrap>
        </S.GridTitleWrap>
        <S.GridWrap>{gridPacking}</S.GridWrap>
      </S.ShadowBoxGrid>
      <S.MidWrap isBottomExtend={isBottomExtend}>
        <S.ShadowBoxGrid height={"100%"} width={"1200px"}>
          <S.GridTitleWrap>
            <S.GridTitle>{"포장 실적 상세(MES)"}</S.GridTitle>
            <S.GridButtonWrap>
              <S.CalculateButton
                className={isClicked ? "clicked" : ""}
                onClick={() => {
                  handleClick();
                  onCalculate();
                }}
              >
                {"포장실적계산"}
              </S.CalculateButton>
            </S.GridButtonWrap>
          </S.GridTitleWrap>
          <S.GridWrap>{gridDetail}</S.GridWrap>
        </S.ShadowBoxGrid>
        <S.ShadowBoxGrid height={"100%"} width={"calc(100% - 1200px)"}>
          <S.GridTitleWrap>
            <S.GridTitle>{"포장자 목록"}</S.GridTitle>
          </S.GridTitleWrap>
          <S.GridWrap>{gridEmployee}</S.GridWrap>
        </S.ShadowBoxGrid>
      </S.MidWrap>
      <S.BottomWrap isBottomExtend={isBottomExtend}>
        <S.ShadowBoxGrid height={"100%"} width={"100%"}>
          <S.GridTitleWrap>
            <S.GridTitle>
              {"혼합 실적(ERP)"}
              <S.ExtendButton onClick={onExtend}>{isBottomExtend ? "↓ 접기" : "↑ 펼치기"}</S.ExtendButton>
            </S.GridTitle>
            <S.GridButtonWrap>
              <BtnComponent btnName={"AddRow"} onClick={onAddRow} />
              <BtnComponent btnName={"CancelRow"} onClick={onCancelRow} />
            </S.GridButtonWrap>
          </S.GridTitleWrap>
          <S.GridWrap>{gridMixed}</S.GridWrap>
        </S.ShadowBoxGrid>
      </S.BottomWrap>

      {isSelectDateRange.open && (
        <FdrModal modalState={isSelectDateRange} setModal={setIsSelectDateRange}>
          <S.SelectDateErpFilter>
            <DateRange dateText={selectDate} setDateText={setSelectDate} />
            <BtnComponent btnName={"Search"} onClick={onSelectDateSearch} />
          </S.SelectDateErpFilter>
          <S.SelectDateErpGridWrap>
            <GridSingle
              columns={isSelectDateRange.columns}
              columnOptions={columnOptions}
              data={gridDataSelect}
              rowHeaders={["rowNum"]}
              refGrid={refSelectGrid}
              onDblClickGrid={onDblSelect}
            />
          </S.SelectDateErpGridWrap>
        </FdrModal>
      )}

      {isSelect.open && (
        <FdrModal modalState={isSelect} setModal={setIsSelect}>
          <S.SelectErpGridWrap>
            <GridSingle
              columns={isSelect.columns}
              columnOptions={columnOptions}
              data={gridDataSelect}
              rowHeaders={["rowNum"]}
              refGrid={refSelectGrid}
              onDblClickGrid={onDblSelect}
            />
          </S.SelectErpGridWrap>
        </FdrModal>
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ModalWrapMulti>
  );
}
