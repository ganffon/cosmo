import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import * as disRow from "custom/useDisableRowCheck";
import * as uSearch from "custom/useSearch";
import * as S from "pages/mes/style/oneGrid.styled";
import * as SS from "./ItfOrder.styled";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import restAPI from "api/restAPI";
import ItfOrderSet from "./ItfOrderSet";
import DateTime from "components/datetime/DateTime";
import Condition from "custom/Condition";
import { FdrModal } from "components/modal/fdrModal";
import DateRange from "components/datetime/DateRange";
import GetPostParams from "api/GetPostParams";
import GetPutParams from "api/GetPutParams";
import GetDeleteParams from "api/GetDeleteParams";

export function ItfOrder(props) {
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);

  const refMainGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refSelectGrid = useRef(null);
  const targetGrid = useRef("");
  const targetRowKey = useRef("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isSelectDateRange, setIsSelectDateRange] = useState({ open: false, columns: [] });
  const [isSelect, setIsSelect] = useState({ open: false, columns: [] });
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [gridData, setGridData] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const {
    header,
    headerNew,
    columns,
    columnsNew,
    columnsRequest,
    columnsOrder,
    columnsLineDept,
    columnsEmployee,
    columnOptions,
  } = ItfOrderSet(isEditMode);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [selectDate, setSelectDate] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refMainGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refMainGrid.current]);

  useEffect(() => {
    setTimeout(() => {
      onSearch();
    }, 100);
  }, []);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refMainGrid);

  const handleDelete = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refMainGrid?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid.getCheckedRows().map((raw) => GetDeleteParams("itfOrder", raw));
      const res = await restAPI.delete(restURI.erpItfOrder, { data });
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      onSearch();
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

  const onSearch = async (editMode = false) => {
    const params = {
      start_date: dateText.startDate,
      end_date: dateText.endDate,
    };
    if (editMode) {
      params.erp_yn = "N";
    }
    try {
      setIsBackDrop(true);
      const res = await restAPI.get(restURI.erpItfOrder, { params });
      const data = res?.data?.data?.rows;
      setGridData(data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
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
  useEffect(() => {
    const Grid = refMainGrid.current.getInstance();
    const totalRowCount = Grid.getRowCount();
    if (totalRowCount > 0) {
      for (let i = 0; i < totalRowCount; i++) {
        const flag = Grid.getValue(i, "erp_yn");
        // ERP 처리 플래그가 Y 라면 데이터 삭제 못하게 함
        if (flag === "Y") {
          Grid.disableRowCheck(i);
        }
      }
    }
  }, [gridData]);

  const onEditSave = async () => {
    // 수정모드에서의 저장
    try {
      setIsBackDrop(true);
      const Grid = refMainGrid?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid.getCheckedRows().map((raw) => GetPutParams("itfOrder", raw));
      const res = await restAPI.put(restURI.erpItfOrder, data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      disRow.handleCheckReset(isEditMode, refMainGrid);
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
  const onEditExit = () => {
    setIsEditMode(false);
    onSearch(false);
  };
  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickModalSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refModalGrid?.current?.gridInst;
      Grid?.finishEditing();
      let result = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        result.push(Grid?.getRowAt(i));
      }
      const data = result.map((raw) => GetPostParams("itfOrder", raw));
      const res = await restAPI.post(restURI.erpItfOrder, data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
      setIsNewOpen(false);
      onSearch();
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
  function onClickModalClose() {
    setIsNewOpen(false);
  }

  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };

  const onEdit = async () => {
    const params = {
      start_date: dateText.startDate,
      end_date: dateText.endDate,
      erp_yn: "N", // "Y" 는 이미 ERP에서 처리 된 데이터라 수정하면 안됨
    };
    try {
      setIsBackDrop(true);
      const res = await restAPI.get(restURI.erpItfOrder, { params });
      const data = res?.data?.data?.rows;
      setGridData(data);
      setDisableRowToggle(!disableRowToggle);
      setIsEditMode(true);
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

  const onNew = () => {
    setIsNewOpen(true);
  };

  const onDelete = () => {
    const Grid = refMainGrid?.current?.gridInst;
    if (Grid.getCheckedRows().length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const [actSelectRequest] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.erpItfOrderRequest + `?start_date=${selectDate.startDate}&end_date=${selectDate.endDate}`
  );

  const [actSelectOrder] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.erpItfOrderByMes + `?start_date=${selectDate.startDate}&end_date=${selectDate.endDate}`
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
  const [actSelectEmployee] = uSearch.useSearchSelect(
    refSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.employee + `?use_fg=true`
  );
  const onDblGrid = (e) => {
    // Main 창에서 더블클릭했을 때 Select 창 열기
    targetRowKey.current = e?.rowKey;
    if (Condition(e, ["line_dept_nm"])) {
      targetGrid.current = "LineDeptMain";
      setIsSelect({ open: true, columns: columnsLineDept, height: "700px", width: "600px" });
      actSelectLineDept();
    }
    if (Condition(e, ["order_emp_cd", "order_emp_nm"])) {
      targetGrid.current = "EmployeeOrderMain";
      setIsSelect({ open: true, columns: columnsEmployee, height: "700px", width: "400px" });
      actSelectEmployee();
    }
    // if (Condition(e, ["input_emp_cd", "input_emp_nm"])) {
    //   targetGrid.current = "EmployeeInterfaceMain";
    //   setIsSelect({ open: true, columns: columnsEmployee, height: "700px", width: "400px" });
    //   actSelectEmployee();
    // }
  };
  const onDblNew = (e) => {
    // New 창에서 더블클릭했을 때 Select 창 열기
    const Grid = refModalGrid.current.getInstance();
    targetRowKey.current = e?.rowKey;
    if (Condition(e, ["request_no", "corp_code", "plce_code", "prod_cd", "prod_nm", "prod_std"])) {
      targetGrid.current = "Request";
      setIsSelectDateRange({ open: true, columns: columnsRequest, height: "700px" });
      actSelectRequest();
    }
    if (Condition(e, ["work_order_no"])) {
      const itemCd = Grid.getValue(e?.rowKey, "prod_cd");
      if (itemCd) {
        targetGrid.current = "Order";
        setIsSelectDateRange({ open: true, columns: columnsOrder, height: "700px" });
        actSelectOrder(`&item_id=${itemCd}`);
      }
    }
    if (Condition(e, ["line_dept_cd", "line_dept_nm"])) {
      const workOrderNo = Grid.getValue(e?.rowKey, "work_order_no");
      if (workOrderNo) {
        targetGrid.current = "LineDept";
        setIsSelect({ open: true, columns: columnsLineDept, height: "700px", width: "600px" });
        actSelectLineDept();
      }
    }
    if (Condition(e, ["order_emp_cd", "order_emp_nm"])) {
      const workOrderNo = Grid.getValue(e?.rowKey, "work_order_no");
      if (workOrderNo) {
        targetGrid.current = "EmployeeOrder";
        setIsSelect({ open: true, columns: columnsEmployee, height: "700px", width: "400px" });
        actSelectEmployee();
      }
    }
    if (Condition(e, ["input_emp_cd", "input_emp_nm"])) {
      const workOrderNo = Grid.getValue(e?.rowKey, "work_order_no");
      if (workOrderNo) {
        targetGrid.current = "EmployeeInterface";
        setIsSelect({ open: true, columns: columnsEmployee, height: "700px", width: "400px" });
        actSelectEmployee();
      }
    }
  };

  const onSelectDateSearch = () => {
    // Select 창에서 조회 버튼
    if (targetGrid.current === "Request") {
      actSelectRequest();
    } else if (targetGrid.current === "Order") {
      const Grid = refModalGrid.current.getInstance();
      const itemId = Grid.getValue(targetRowKey.current, "prod_id");
      actSelectOrder(`&item_id=${itemId}`);
    }
  };

  const onDblSelect = (e) => {
    // Select 창에서 선택한 데이터 넣어주기
    if (e?.targetType === "cell") {
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      const rowKey = targetRowKey.current;
      const mainGrid = refMainGrid?.current?.gridInst;
      const newGrid = refModalGrid?.current?.gridInst;
      if (targetGrid.current === "Request") {
        newGrid?.setValue(rowKey, "request_no", data.request_no);
        newGrid?.setValue(rowKey, "corp_code", data.corp_code);
        newGrid?.setValue(rowKey, "plce_code", data.plce_code);
        newGrid?.setValue(rowKey, "prod_id", data.prod_id);
        newGrid?.setValue(rowKey, "prod_cd", data.prod_cd);
        newGrid?.setValue(rowKey, "prod_nm", data.prod_nm);
        newGrid?.setValue(rowKey, "prod_std", data.prod_std);
      } else if (targetGrid.current === "Order") {
        newGrid?.setValue(rowKey, "work_order_id", data.work_order_id);
        newGrid?.setValue(rowKey, "work_order_no", data.work_order_no);
        newGrid?.setValue(rowKey, "line_dept_cd", data.line_dept_cd);
        newGrid?.setValue(rowKey, "line_dept_nm", data.line_dept_nm);
        newGrid?.setValue(rowKey, "work_order_date", data.work_order_date);
        newGrid?.setValue(rowKey, "work_start_date", data.work_start_date);
        newGrid?.setValue(rowKey, "work_end_date", data.work_end_date);
        newGrid?.setValue(rowKey, "work_order_qty", data.work_order_qty);
      } else if (targetGrid.current === "LineDept") {
        newGrid?.setValue(rowKey, "line_dept_cd", data.line_dept_cd);
        newGrid?.setValue(rowKey, "line_dept_nm", data.line_dept_nm);
      } else if (targetGrid.current === "EmployeeOrder") {
        newGrid?.setValue(rowKey, "order_emp_cd", data.emp_cd);
        newGrid?.setValue(rowKey, "order_emp_nm", data.emp_nm);
      } else if (targetGrid.current === "EmployeeInterface") {
        newGrid?.setValue(rowKey, "input_emp_cd", data.emp_cd);
        newGrid?.setValue(rowKey, "input_emp_nm", data.emp_nm);
      } else if (targetGrid.current === "LineDeptMain") {
        mainGrid?.setValue(rowKey, "line_dept_cd", data.line_dept_cd);
        mainGrid?.setValue(rowKey, "line_dept_nm", data.line_dept_nm);
        disRow.handleGridSelectCheck(refMainGrid, rowKey);
      } else if (targetGrid.current === "EmployeeOrderMain") {
        mainGrid?.setValue(rowKey, "order_emp_cd", data.emp_cd);
        mainGrid?.setValue(rowKey, "order_emp_nm", data.emp_nm);
        disRow.handleGridSelectCheck(refMainGrid, rowKey);
      } else if (targetGrid.current === "EmployeeInterfaceMain") {
        mainGrid?.setValue(rowKey, "input_emp_cd", data.emp_cd);
        mainGrid?.setValue(rowKey, "input_emp_nm", data.emp_nm);
        disRow.handleGridSelectCheck(refMainGrid, rowKey);
      }
      setIsSelectDateRange({ open: false });
      setIsSelect({ open: false });
    }
  };

  const gridMain = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columns}
        rowHeaders={["checkbox", "rowNum"]}
        header={header}
        data={gridData}
        draggable={false}
        refGrid={refMainGrid}
        isEditMode={isEditMode}
        onClickGrid={onClickGrid}
        onEditingFinish={onEditingFinishGrid}
        onDblClickGrid={onDblGrid}
      />
    );
  }, [gridData]);

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <DateRange title={"지시일"} dateText={dateText} setDateText={setDateText} />
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={() => onSearch(isEditMode)} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          {isEditMode ? (
            <>
              <BtnComponent btnName={"Save"} onClick={onEditSave} />
              <BtnComponent btnName={"Cancel"} onClick={onEditExit} />
            </>
          ) : (
            <>
              <BtnComponent btnName={"New"} onClick={onNew} />
              <BtnComponent btnName={"Edit"} onClick={onEdit} />
              <BtnComponent btnName={"Delete"} onClick={onDelete} />
            </>
          )}
        </S.ButtonWrap>
        <S.GridWrap>{gridMain}</S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen && (
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
      )}
      {isNewOpen && (
        <ModalNew
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          columns={columnsNew}
          columnOptions={columnOptions}
          header={headerNew}
          rowHeaders={["rowNum"]}
          refModalGrid={refModalGrid}
          onClickModalGrid={onClickModalGrid}
          onDblClickModalGrid={onDblNew}
          isAddOneRow={true}
        />
      )}
      {isSelectDateRange.open && (
        <FdrModal modalState={isSelectDateRange} setModal={setIsSelectDateRange}>
          <SS.SelectDateErpFilter>
            <DateRange dateText={selectDate} setDateText={setSelectDate} />
            <BtnComponent btnName={"Search"} onClick={onSelectDateSearch} />
          </SS.SelectDateErpFilter>
          <SS.SelectDateErpGridWrap>
            <GridSingle
              columns={isSelectDateRange.columns}
              columnOptions={columnOptions}
              header={header}
              data={gridDataSelect}
              rowHeaders={["rowNum"]}
              refGrid={refSelectGrid}
              onDblClickGrid={onDblSelect}
            />
          </SS.SelectDateErpGridWrap>
        </FdrModal>
      )}
      {isSelect.open && (
        <FdrModal modalState={isSelect} setModal={setIsSelect}>
          <SS.SelectErpGridWrap>
            <GridSingle
              columns={isSelect.columns}
              columnOptions={columnOptions}
              header={header}
              data={gridDataSelect}
              rowHeaders={["rowNum"]}
              refGrid={refSelectGrid}
              onDblClickGrid={onDblSelect}
            />
          </SS.SelectErpGridWrap>
        </FdrModal>
      )}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
