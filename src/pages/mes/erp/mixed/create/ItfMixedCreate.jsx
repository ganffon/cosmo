import { useState, useEffect, useRef, useMemo } from "react";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import * as uSearch from "custom/useSearch";
import * as S from "./ItfMixedCreate.styled";
import restURI from "json/restURI.json";
import BtnComponent from "components/button/BtnComponent";
import restAPI from "api/restAPI";
import ItfMixedCreateSet from "./ItfMixedCreateSet";
import DateTime from "components/datetime/DateTime";
import Condition from "custom/Condition";
import { FdrModal } from "components/modal/fdrModal";
import DateRange from "components/datetime/DateRange";
import CloseIcon from "@mui/icons-material/Close";
import ModalWrapMulti from "components/modal/ModalWrapMulti";

export function ItfMixedCreate(props) {
  const { setIsCreateOpen, onSearch } = props;

  const refPerformanceGrid = useRef(null); // 혼합실적

  const refDetailGrid = useRef(null); // 혼합실적상세
  const [detailData, setDetailData] = useState([]);

  const refSummaryGrid = useRef(null); // 혼합실적Summary
  const [summaryData, setSummaryData] = useState([]);

  const refEmployeeGrid = useRef(null); // 투입자
  const [employeeData, setEmployeeData] = useState([]);

  const refSelectGrid = useRef(null); // 투입자
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
    colPerformance,
    colDetail,
    colSummary,
    colEmployee,
    colErpOrder,
    colErpDept,
    colErpLineDept,
    colErpWorkerGroup,
    colErpUnit,
    colErpEmployee,
    colErpItem,
    columnOptions,
  } = ItfMixedCreateSet();

  const [selectDate, setSelectDate] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  useEffect(() => {
    const grid = refPerformanceGrid.current.getInstance();
    grid.appendRow();
    grid.refreshLayout();
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

  const [actSelectDeptFrom] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.erpItfDeptFrom
  );
  const [actSelectLineDept] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.lineDepartmentIncludeRework
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
  const [actSelectErpItem] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.prodMapping
  );

  const onDblPerformance = (e) => {
    targetRowKey.current = e?.rowKey;
    if (
      Condition(e, [
        "request_no",
        "corp_code",
        "plce_code",
        "erp_work_order_no",
        "item_cd",
        "item_nm",
        "item_spec",
        "order_line_dept_cd",
        "order_line_dept_nm",
      ])
    ) {
      targetGrid.current = "erpOrder";
      setIsSelectDateRange({ open: true, columns: colErpOrder, height: "700px", width: "90%", title: "ERP 작업지시" });
      actSelectOrder();
    }

    if (Condition(e, ["dept_cd", "dept_nm"])) {
      targetGrid.current = "erpDept";
      setIsSelect({ open: true, columns: colErpDept, height: "500px", width: "30%", title: "ERP 부서" });
      const grid = refPerformanceGrid.current.getInstance();
      const orderLineDeptCd = grid.getValue(0, "order_line_dept_cd");
      actSelectDeptFrom(`?line_dept_cd=${orderLineDeptCd}`);
    }

    if (Condition(e, ["line_dept_cd", "line_dept_nm"])) {
      targetGrid.current = "erpLineDept";
      setIsSelect({ open: true, columns: colErpLineDept, height: "500px", width: "30%", title: "라인부서" });
      const grid = refPerformanceGrid.current.getInstance();
      const orderDeptCd = grid.getValue(0, "dept_cd");
      actSelectLineDept(`?line_dept_nm=${orderDeptCd}`);
    }

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
  };

  const onDblSelect = (e) => {
    // Select 창에서 선택한 데이터 넣어주기
    if (e?.targetType === "cell") {
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      const rowKey = targetRowKey.current;
      const performanceGrid = refPerformanceGrid?.current?.gridInst;
      const summaryGrid = refSummaryGrid?.current?.gridInst;
      if (targetGrid.current === "erpOrder") {
        performanceGrid?.setValue(rowKey, "request_no", data.request_no);
        performanceGrid?.setValue(rowKey, "corp_code", data.corp_code);
        performanceGrid?.setValue(rowKey, "plce_code", data.plce_code);
        performanceGrid?.setValue(rowKey, "erp_work_order_no", data.erp_work_order_no);
        performanceGrid?.setValue(rowKey, "item_id", data.item_id);
        performanceGrid?.setValue(rowKey, "item_cd", data.item_cd);
        performanceGrid?.setValue(rowKey, "item_nm", data.item_nm);
        performanceGrid?.setValue(rowKey, "item_spec", data.item_spec);
        performanceGrid?.setValue(rowKey, "order_line_dept_cd", data.line_dept_cd);
        performanceGrid?.setValue(rowKey, "order_line_dept_nm", data.line_dept_nm);
        performanceGrid?.setValue(rowKey, "work_order_date", data.work_order_date);
        performanceGrid?.setValue(rowKey, "work_order_qty", data.work_order_qty);
        performanceGrid?.setValue(rowKey, "order_emp_nm", data.order_emp_nm);
        performanceGrid?.setValue(rowKey, "work_start_date", data.work_start_date);
        performanceGrid?.setValue(rowKey, "work_end_date", data.work_end_date);
        performanceGrid?.setValue(rowKey, "work_order_id", data.work_order_id);

        getDetailData(data.work_order_id);
      } else if (targetGrid.current === "erpDept") {
        performanceGrid?.setValue(rowKey, "dept_cd", data.dept_cd);
        performanceGrid?.setValue(rowKey, "dept_nm", data.dept_nm);
      } else if (targetGrid.current === "erpLineDept") {
        performanceGrid?.setValue(rowKey, "line_dept_cd", data.line_dept_cd);
        performanceGrid?.setValue(rowKey, "line_dept_nm", data.line_dept_nm);
      } else if (targetGrid.current === "erpWorkerGroup") {
        performanceGrid?.setValue(rowKey, "worker_group_cd", data.worker_group_cd);
        performanceGrid?.setValue(rowKey, "worker_group_nm", data.worker_group_nm);
      } else if (targetGrid.current === "erpUnit") {
        performanceGrid?.setValue(rowKey, "unit_cd", data.unit_cd);
        performanceGrid?.setValue(rowKey, "unit_nm", data.unit_nm);
      } else if (targetGrid.current === "erpEmployee") {
        performanceGrid?.setValue(rowKey, "input_emp_cd", data.emp_cd);
        performanceGrid?.setValue(rowKey, "input_emp_nm", data.emp_nm);
      } else if (targetGrid.current === "erpSummaryUnit") {
        summaryGrid?.setValue(rowKey, "unit_cd", data.unit_cd);
        summaryGrid?.setValue(rowKey, "unit_nm", data.unit_nm);
      } else if (targetGrid.current === "erpSummaryEmployee") {
        summaryGrid?.setValue(rowKey, "weigh_emp_cd", data.emp_cd);
        summaryGrid?.setValue(rowKey, "weigh_emp_nm", data.emp_nm);
      } else if (targetGrid.current === "erpSummaryItem") {
        summaryGrid?.setValue(rowKey, "item_id", data.mapping_id);
        summaryGrid?.setValue(rowKey, "item_cd", data.mapping_cd);
        summaryGrid?.setValue(rowKey, "item_nm", data.mapping_nm);
      }
      setIsSelectDateRange({ open: false });
      setIsSelect({ open: false });
    }
  };

  const getDetailData = async (workOrderID) => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.prdWeightDetail + `?work_order_id=${workOrderID}`);

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

  const onMerge = () => {
    // 혼합실적 상세 (MES) 가 확장되었을 때만 동작
    if (isLeftExtend) {
      /**
       * 01. 품목코드와 투입LOT 기준으로 summary
       * 02. 투입일자, 재공일자는 선택한 데이터 중 가장 빠른 날짜로 입력
       * 03. 투입자는 가장 빠른 날짜 한명
       * 04. 생산자는 선택한 데이터 중 중복 제거하여 입력
       */
      const performanceGrid = refPerformanceGrid.current.getInstance();
      const requestNo = performanceGrid.getValue(0, "request_no");
      if (requestNo) {
        const detailGrid = refDetailGrid.current.getInstance();
        const checkData = detailGrid.getCheckedRows();
        if (checkData.length > 0) {
          // prod_cd와 lot_no 기준으로 데이터 그룹화
          const groupedData = checkData.reduce((acc, item) => {
            const { _attributes, ...itemWithoutAttributes } = item;
            const key = `${item.prod_cd}-${item.lot_no}`;
            if (!acc[key]) {
              acc[key] = { ...itemWithoutAttributes };
            } else {
              acc[key].work_weigh_date =
                acc[key].work_weigh_date < item.work_weigh_date ? acc[key].work_weigh_date : item.work_weigh_date;
              acc[key].work_input_date =
                acc[key].work_input_date < item.work_input_date ? acc[key].work_input_date : item.work_input_date;
              acc[key].input_qty += item.input_qty;
            }
            return acc;
          }, {});

          let mergedData = Object.values(groupedData).map((group) => ({
            ...group,
          }));

          /**
           * summary의 prod_cd, lot_no 기준으로 병합 된 데이터들의 input_qty를 모두 합쳐서
           * performance의 work_qty에 출력함
           */
          const totalInputQty = mergedData.reduce((acc, item) => acc + item.input_qty, 0);

          performanceGrid.setValue(0, "work_qty", parseFloat(totalInputQty.toFixed(2)));

          // 전체 데이터셋에서 고유한 input_emp 추출
          const uniqueEmps = Array.from(
            new Set(checkData.filter((item) => item.input_emp_cd !== null).map((item) => item.input_emp_cd))
          ).map((emp_cd) => {
            const item = checkData.find((item) => item.input_emp_cd === emp_cd);
            return {
              work_emp_cd: item.input_emp_cd,
              work_emp_nm: item.input_emp_nm,
            };
          });

          const sortByKey = (key) => (a, b) => a[key].localeCompare(b[key]);

          mergedData = mergedData.sort(sortByKey("prod_class_nm"));

          mergedData = mergedData.map((item, index) => {
            return {
              ...item,
              input_qty: parseFloat(item.input_qty.toFixed(2)),
              rowKey: index,
              sortKey: index,
            };
          });

          setSummaryData(mergedData);
          setEmployeeData(uniqueEmps);

          setIsLeftExtend(!isLeftExtend);
        }
      } else {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "혼합 실적의 ERP지시 먼저 입력바랍니다.",
          severity: "warning",
          location: "topCenter",
        });
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "혼합 실적 상세(MES) [펼치기] 상태에서 동작합니다.",
        severity: "warning",
        location: "topCenter",
      });
    }
  };

  const onDblSummary = (e) => {
    targetRowKey.current = e?.rowKey;
    if (Condition(e, ["unit_cd", "unit_nm"])) {
      targetGrid.current = "erpSummaryUnit";
      setIsSelect({ open: true, columns: colErpUnit, height: "500px", width: "30%", title: "단위" });
      actSelectUnit();
    }
    if (Condition(e, ["weigh_emp_cd", "weigh_emp_nm"])) {
      targetGrid.current = "erpSummaryEmployee";
      setIsSelect({ open: true, columns: colErpEmployee, height: "500px", width: "30%", title: "작업자" });
      actSelectEmployee();
    }
    if (Condition(e, ["item_id", "item_cd", "item_nm"])) {
      targetGrid.current = "erpSummaryItem";
      setIsSelect({ open: true, columns: colErpItem, height: "500px", width: "30%", title: "ERP 품목" });
      const grid = refSummaryGrid.current.getInstance();
      const prodCD = grid.getValue(e.rowKey, "prod_cd");
      actSelectErpItem(`?prod_cd=${prodCD}`);
    }
  };

  const onEditSummary = (e) => {
    const grid = refSummaryGrid.current.getInstance();
    const data = grid.getData();

    const totalInputQty = data.reduce((acc, item) => acc + Number(item.input_qty), 0);
    const performanceGrid = refPerformanceGrid.current.getInstance();
    performanceGrid.setValue(0, "work_qty", totalInputQty);
  };

  const onSave = async () => {
    try {
      setIsBackDrop(true);
      const performanceGrid = refPerformanceGrid.current.getInstance();
      const summaryGrid = refSummaryGrid.current.getInstance();
      const employeeGrid = refEmployeeGrid.current.getInstance();
      performanceGrid?.finishEditing();
      summaryGrid?.finishEditing();
      const performanceData = performanceGrid.getData();
      const summaryData = summaryGrid.getData();
      const employeeData = employeeGrid.getData();

      const work = {
        corp_code: performanceData[0].corp_code, // 회사코드
        plce_code: performanceData[0].plce_code, // 사업장코드
        erp_work_order_no: performanceData[0].erp_work_order_no, // ERP 작업지시번호
        lot_no: performanceData[0].lot_no, // Lot
        dept_cd: performanceData[0].dept_cd, // 부서코드
        line_dept_cd: performanceData[0].line_dept_cd, // 라인부서코드
        worker_group_cd: performanceData[0].worker_group_cd, // 작업조코드
        item_id: performanceData[0].item_id, // ERP 아이템
        work_start_date: performanceData[0].work_start_date, // 작업시작일자
        work_end_date: performanceData[0].work_end_date, // 작업종료일자
        unit_cd: performanceData[0].unit_cd, // 단위코드
        work_qty: performanceData[0].work_qty, // 생산중량
        input_emp_cd: performanceData[0].input_emp_cd, // I/F등록자코드
      };

      const input = summaryData.map((item) => {
        return {
          corp_code: performanceData[0].corp_code, // 회사코드
          plce_code: performanceData[0].plce_code, // 사업장코드
          lot_no: performanceData[0].lot_no, // Lot
          input_lot_no: item.lot_no, // 투입 Lot
          item_id: item.item_id, // 투입 ERP 아이템
          stock_dept_cd: performanceData[0].dept_cd, // 부서코드
          stock_in_date: item.work_weigh_date, // 계량일자
          in_date: item.work_input_date, // 투입일자
          in_emp_cd: item.weigh_emp_cd, // 계량자코드
          input_dept_cd: performanceData[0].dept_cd, // 부서코드
          input_unit_cd: item.unit_cd, // 단위코드
          input_qty: item.input_qty, // 투입중량
          input_emp_cd: performanceData[0].input_emp_cd, // I/F등록자코드
        };
      });

      const emp = employeeData.map((item) => {
        return {
          corp_code: performanceData[0].corp_code, // 회사코드
          plce_code: performanceData[0].plce_code, // 사업장코드
          lot_no: performanceData[0].lot_no, // Lot
          work_emp_cd: item.work_emp_cd, // 투입자코드
          input_emp_cd: performanceData[0].input_emp_cd, // I/F등록자코드
        };
      });

      const data = {
        work,
        input,
        emp,
        updateFg: false, // 신규 등록 시 : false || 수정 시 : true
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

        setIsCreateOpen(false);

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

  const [isLeftExtend, setIsLeftExtend] = useState(true);

  const onLeftExtend = () => {
    setIsLeftExtend(!isLeftExtend);
  };

  useEffect(() => {
    const detailGrid = refDetailGrid.current.getInstance();
    const summaryGrid = refSummaryGrid.current.getInstance();
    const employeeGrid = refEmployeeGrid.current.getInstance();

    detailGrid.refreshLayout();
    summaryGrid.refreshLayout();
    employeeGrid.refreshLayout();
  }, [isLeftExtend]);

  const gridPerformance = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colPerformance}
        rowHeaders={["rowNum"]}
        data={[]}
        draggable={false}
        refGrid={refPerformanceGrid}
        isEditMode={true}
        onClickGrid={() => {}}
        onEditingFinish={() => {}}
        onDblClickGrid={onDblPerformance}
      />
    );
  }, []);

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

  const gridSummary = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colSummary}
        rowHeaders={["rowNum"]}
        data={summaryData}
        draggable={false}
        refGrid={refSummaryGrid}
        isEditMode={true}
        onClickGrid={() => {}}
        onDblClickGrid={onDblSummary}
        onEditingFinish={onEditSummary}
      />
    );
  }, [summaryData]);

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
        <S.TitleBox>{`혼합 실적 I/F 등록`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={() => {
            setIsCreateOpen(false);
          }}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ShadowBoxGrid height={"190px"} width={"100%"}>
        <S.GridTitleWrap>
          <S.GridTitle>{"혼합 실적"}</S.GridTitle>
          <S.GridButtonWrap>
            <BtnComponent btnName={"Save"} onClick={onSave} />
          </S.GridButtonWrap>
        </S.GridTitleWrap>
        <S.GridWrap>{gridPerformance}</S.GridWrap>
      </S.ShadowBoxGrid>
      <S.BottomWrap>
        <S.ShadowBoxGrid height={"99%"} width={isLeftExtend ? "1500px" : "250px"}>
          <S.GridTitleWrap>
            <S.GridTitle>{"혼합 실적 상세(MES)"}</S.GridTitle>
            <S.GridButtonWrap>
              <S.ExtendButton onClick={onLeftExtend}>{isLeftExtend ? "< 접기" : "펼치기 >"}</S.ExtendButton>
            </S.GridButtonWrap>
          </S.GridTitleWrap>
          <S.GridWrap>{gridDetail}</S.GridWrap>
        </S.ShadowBoxGrid>
        <S.MidButtonWrap>
          <S.MergeButton
            className={isClicked ? "clicked" : ""}
            onClick={() => {
              handleClick();
              onMerge();
            }}
          >
            {"▶"}
          </S.MergeButton>
        </S.MidButtonWrap>
        <S.BottomRightWrap isLeftExtend={isLeftExtend}>
          <S.ShadowBoxGrid height={"59%"} width={"100%"}>
            <S.GridTitleWrap>
              <S.GridTitle>
                {"혼합 실적 병합 목록(ERP)"}
                {!isLeftExtend && (
                  <S.GridTitleSub>
                    {"생산중량 수정 시 자동 합산 된 값이 상단의 혼합 실적 생산량에 기입됩니다."}
                  </S.GridTitleSub>
                )}
              </S.GridTitle>
            </S.GridTitleWrap>
            <S.GridWrap>{gridSummary}</S.GridWrap>
          </S.ShadowBoxGrid>
          <S.ShadowBoxGrid height={"38%"} width={"100%"}>
            <S.GridTitleWrap>
              <S.GridTitle>{"생산자 목록"}</S.GridTitle>
            </S.GridTitleWrap>
            <S.GridWrap>{gridEmployee}</S.GridWrap>
          </S.ShadowBoxGrid>
        </S.BottomRightWrap>
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
