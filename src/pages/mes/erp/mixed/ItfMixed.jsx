import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import * as S from "./ItfMixed.styled";
import restURI from "json/restURI.json";
import ContentsAreaHidden from "components/layout/common/ContentsAreaHidden";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import restAPI from "api/restAPI";
import ItfMixedSet from "./ItfMixedSet";
import DateTime from "components/datetime/DateTime";
import DateRange from "components/datetime/DateRange";
import { ItfMixedCreate } from "./create/ItfMixedCreate";
import { ItfMixedUpdate } from "./update/ItfMixedUpdate";

export function ItfMixed(props) {
  const { isMenuSlide } = useContext(LayoutContext);

  const refPerformanceGrid = useRef(null); // 혼합실적
  const refPerformanceCurrentRowKey = useRef(null); // 혼합실적 선택 rowKey
  const [updateData, setUpdateData] = useState({});
  const [performanceData, setPerformanceData] = useState([]);

  const refInputGrid = useRef(null); // 혼합투입
  const [inputData, setInputData] = useState([]);

  const refEmployeeGrid = useRef(null); // 작업자
  const [employeeData, setEmployeeData] = useState([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false); // 혼합실적 등록
  const [isUpdateOpen, setIsUpdateOpen] = useState(false); // 혼합실적 수정
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState({ open: false, type: "" });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const { header, colPerformance, colInput, colEmployee, columnOptions } = ItfMixedSet();

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refPerformanceGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refPerformanceGrid.current]);

  useEffect(() => {
    setTimeout(() => {
      onSearch();
    }, 100);
  }, []);

  const onSearch = async (editMode = false) => {
    const params = {
      start_date: dateText.startDate,
      end_date: dateText.endDate,
      work_type: "MIX",
    };
    if (editMode) {
      params.erp_yn = "N";
    }
    try {
      setIsBackDrop(true);
      const res = await restAPI.get(restURI.erpItfWork, { params });
      const data = res?.data?.data?.rows;
      setPerformanceData(data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
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

  useEffect(() => {
    const Grid = refPerformanceGrid.current.getInstance();
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
  }, [performanceData]);

  const onEdit = () => {
    if (refPerformanceCurrentRowKey.current !== "") {
      const rowKey = refPerformanceCurrentRowKey.current;
      const performanceGrid = refPerformanceGrid.current.getInstance();
      const inputGrid = refInputGrid.current.getInstance();
      const employeeGrid = refEmployeeGrid.current.getInstance();

      const work = performanceGrid.getRow(rowKey);
      const input = inputGrid.getData();
      const inputData = input.map((item) => {
        const {
          input_unit_cd,
          input_unit_nm,
          in_date,
          in_emp_cd,
          in_emp_nm,
          stock_in_date,
          input_lot_no,
          lot_no: _,
          ...rest
        } = item;

        return {
          unit_cd: input_unit_cd, // 단위코드
          unit_nm: input_unit_nm, // 단위
          work_input_date: in_date, // 투입일자
          weigh_emp_cd: in_emp_cd, // 계량자코드
          weigh_emp_nm: in_emp_nm, // 계량자
          work_weigh_date: stock_in_date, // 계량일자
          lot_no: input_lot_no, // 투입 Lot
          prod_class_nm: "수정 시 표기불가",
          prod_cd: "수정 시 표기불가",
          prod_nm: "수정 시 표기불가",
          prod_std: "수정 시 표기불가",
          ...rest,
        };
      });

      const emp = employeeGrid.getData();
      const update = {
        work: [work],
        input: inputData,
        emp,
      };
      setUpdateData(update);

      setIsUpdateOpen(true);
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: `ERP에서 처리 된 데이터는 수정 할 수 없습니다.`,
        severity: "warning",
        location: "topCenter",
      });
    }
  };

  const onNew = () => {
    setIsCreateOpen(true);
  };

  const onClickPerformance = async (e) => {
    const { rowKey, targetType } = e;
    if (targetType === "cell") {
      const performanceGrid = refPerformanceGrid.current.getInstance();
      const erpYN = performanceGrid.getValue(rowKey, "erp_yn");
      if (erpYN === "Y") {
        refPerformanceCurrentRowKey.current = "";
      } else {
        refPerformanceCurrentRowKey.current = rowKey;
      }
      const lotNo = performanceGrid.getValue(rowKey, "lot_no");
      if (lotNo) {
        try {
          setIsBackDrop(true);
          const inputResult = await restAPI.get(restURI.erpItfWorkInput + `?lot_no=${lotNo}`);
          const empResult = await restAPI.get(restURI.erpItfWorkEmp + `?lot_no=${lotNo}`);

          setInputData(inputResult?.data?.data?.rows);
          setEmployeeData(empResult?.data?.data?.rows);
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
      } else {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "혼합 실적의 Lot 정보를 찾을 수 없습니다.",
          severity: "error",
          location: "bottomRight",
        });
      }
    }
  };

  const onDeletePerformance = () => {
    setIsDeleteAlert({ open: true, type: "performance" });
  };
  const onDeleteInput = () => {
    setIsDeleteAlert({ open: true, type: "input" });
  };
  const onDeleteEmployee = () => {
    setIsDeleteAlert({ open: true, type: "employee" });
  };
  const handleDeletePerformance = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refPerformanceGrid?.current?.gridInst;
      Grid?.finishEditing();

      const checkedRows = Grid?.getCheckedRows();

      const resultData = checkedRows.map((item) => {
        return { erp_work_order_no: item.erp_work_order_no, lot_no: item.lot_no };
      });
      if (resultData) {
        const result = await restAPI.delete(restURI.erpItfWork, { data: resultData });

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });

        onSearch();
        setInputData([]);
        setEmployeeData([]);
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
      setIsDeleteAlert({ open: false, type: "" });
    }
  };
  const handleDeleteInput = async () => {
    try {
      setIsBackDrop(true);
      const performanceGrid = refPerformanceGrid?.current?.gridInst;
      const performanceRowKey = refPerformanceCurrentRowKey.current;
      const inputGrid = refInputGrid?.current?.gridInst;
      inputGrid?.finishEditing();
      const lotNo = performanceGrid.getValue(performanceRowKey, "lot_no");
      const checkedRows = inputGrid?.getCheckedRows();

      const resultData = checkedRows.map((item) => {
        return { lot_no: lotNo, input_lot_no: item.input_lot_no };
      });

      if (resultData) {
        const result = await restAPI.delete(restURI.erpItfWorkInput, { data: resultData });

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });

        onSearchAfterDelete(lotNo, "input");
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
      setIsDeleteAlert({ open: false, type: "" });
    }
  };
  const handleDeleteEmployee = async () => {
    try {
      setIsBackDrop(true);
      const performanceGrid = refPerformanceGrid?.current?.gridInst;
      const performanceRowKey = refPerformanceCurrentRowKey.current;
      const employeeGrid = refEmployeeGrid?.current?.gridInst;
      employeeGrid?.finishEditing();
      const lotNo = performanceGrid.getValue(performanceRowKey, "lot_no");
      const checkedRows = employeeGrid?.getCheckedRows();

      const resultData = checkedRows.map((item) => {
        return { lot_no: lotNo, work_emp_cd: item.work_emp_cd };
      });

      if (resultData) {
        const result = await restAPI.delete(restURI.erpItfWorkEmp, { data: resultData });

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });

        onSearchAfterDelete(lotNo, "employee");
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
      setIsDeleteAlert({ open: false, type: "" });
    }
  };

  const handleDelete = async (type) => {
    switch (type) {
      case "performance":
        await handleDeletePerformance();
        break;
      case "input":
        await handleDeleteInput();
        break;
      case "employee":
        await handleDeleteEmployee();
        break;
      default:
    }
  };

  const onSearchAfterDelete = async (lotNo, type) => {
    try {
      setIsBackDrop(true);

      if (type === "input") {
        const inputResult = await restAPI.get(restURI.erpItfWorkInput + `?lot_no=${lotNo}`);
        setInputData(inputResult?.data?.data?.rows);
      } else if (type === "employee") {
        const empResult = await restAPI.get(restURI.erpItfWorkEmp + `?lot_no=${lotNo}`);
        setEmployeeData(empResult?.data?.data?.rows);
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

  const gridPerformance = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colPerformance}
        rowHeaders={["checkbox", "rowNum"]}
        header={header}
        data={performanceData}
        draggable={false}
        refGrid={refPerformanceGrid}
        onClickGrid={onClickPerformance}
      />
    );
  }, [performanceData]);

  const gridInput = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colInput}
        rowHeaders={["checkbox", "rowNum"]}
        header={header}
        data={inputData}
        draggable={false}
        refGrid={refInputGrid}
      />
    );
  }, [inputData]);

  const gridEmployee = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colEmployee}
        rowHeaders={["checkbox", "rowNum"]}
        header={header}
        data={employeeData}
        draggable={false}
        refGrid={refEmployeeGrid}
      />
    );
  }, [employeeData]);

  return (
    <ContentsAreaHidden>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <DateRange title={"시작일"} dateText={dateText} setDateText={setDateText} />
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={() => onSearch()} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid>
        <S.GridTitleWrap>
          <S.GridTitle>{"혼합 실적"}</S.GridTitle>
          <S.GridButtonWrap>
            <BtnComponent btnName={"New"} onClick={onNew} />
            <BtnComponent btnName={"Edit"} onClick={onEdit} />
            <BtnComponent btnName={"Delete"} onClick={onDeletePerformance} />
          </S.GridButtonWrap>
        </S.GridTitleWrap>
        <S.GridWrap>{gridPerformance}</S.GridWrap>
      </S.ShadowBoxGrid>
      <S.ShadowBoxGrid>
        <S.GridTitleWrap>
          <S.GridTitle>{"혼합 생산 목록"}</S.GridTitle>
          <S.GridButtonWrap>
            <BtnComponent btnName={"Delete"} onClick={onDeleteInput} />
          </S.GridButtonWrap>
        </S.GridTitleWrap>
        <S.GridWrap>{gridInput}</S.GridWrap>
      </S.ShadowBoxGrid>
      <S.ShadowBoxGrid>
        <S.GridTitleWrap>
          <S.GridTitle>{"생산자 목록"}</S.GridTitle>
          <S.GridButtonWrap>
            <BtnComponent btnName={"Delete"} onClick={onDeleteEmployee} />
          </S.GridButtonWrap>
        </S.GridTitleWrap>
        <S.GridWrap>{gridEmployee}</S.GridWrap>
      </S.ShadowBoxGrid>

      {isDeleteAlert.open && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={() => {
            handleDelete(isDeleteAlert.type);
          }}
          onCancel={() => {
            setIsDeleteAlert({ open: false, type: "" });
          }}
        />
      )}
      {isCreateOpen && <ItfMixedCreate setIsCreateOpen={setIsCreateOpen} onSearch={onSearch} />}
      {isUpdateOpen && <ItfMixedUpdate setIsUpdateOpen={setIsUpdateOpen} onSearch={onSearch} data={updateData} />}

      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsAreaHidden>
  );
}
