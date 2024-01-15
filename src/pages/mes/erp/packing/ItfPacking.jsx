import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import * as S from "./ItfPacking.styled";
import restURI from "json/restURI.json";
import ContentsAreaHidden from "components/layout/common/ContentsAreaHidden";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import restAPI from "api/restAPI";
import ItfPackingSet from "./ItfPackingSet";
import DateTime from "components/datetime/DateTime";
import DateRange from "components/datetime/DateRange";
import { ItfPackingCreate } from "./create/ItfPackingCreate";
import { ItfPackingUpdate } from "./update/ItfPackingUpdate";

export function ItfPacking(props) {
  const { isMenuSlide } = useContext(LayoutContext);

  const refPackingGrid = useRef(null); // 포장실적
  const refPackingCurrentRowKey = useRef(null); // 포장실적 선택 rowKey
  const [updateData, setUpdateData] = useState({});
  const [packingData, setPackingData] = useState([]);

  const refMixedGrid = useRef(null); // 혼합실적
  const [mixedData, setMixedData] = useState([]);

  const refEmployeeGrid = useRef(null); // 포장자
  const [employeeData, setEmployeeData] = useState([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false); // 포장실적 등록
  const [isUpdateOpen, setIsUpdateOpen] = useState(false); // 포장실적 수정
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState({ open: false, type: "" });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const { header, colPacking, colMixed, colEmployee, columnOptions } = ItfPackingSet();

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refPackingGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refPackingGrid.current]);

  useEffect(() => {
    setTimeout(() => {
      onSearch();
    }, 100);
  }, []);

  const onSearch = async (editMode = false) => {
    const params = {
      start_date: dateText.startDate,
      end_date: dateText.endDate,
      work_type: "PACKING",
    };
    if (editMode) {
      params.erp_yn = "N";
    }
    try {
      setIsBackDrop(true);
      const res = await restAPI.get(restURI.erpItfWork, { params });
      const data = res?.data?.data?.rows;
      setPackingData(data);
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
    const Grid = refPackingGrid.current.getInstance();
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
  }, [packingData]);

  const onEdit = () => {
    if (refPackingCurrentRowKey.current !== null) {
      if (refPackingCurrentRowKey.current !== "") {
        const rowKey = refPackingCurrentRowKey.current;
        const packingGrid = refPackingGrid.current.getInstance();
        const mixedGrid = refMixedGrid.current.getInstance();
        const employeeGrid = refEmployeeGrid.current.getInstance();

        const work = packingGrid.getRow(rowKey);
        const input = mixedGrid.getData();

        const emp = employeeGrid.getData();
        const update = {
          work: [work],
          input,
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
    }
  };

  const onNew = () => {
    setIsCreateOpen(true);
  };

  const onClickPacking = async (e) => {
    const { rowKey, targetType } = e;
    if (targetType === "cell") {
      const packingGrid = refPackingGrid.current.getInstance();
      const erpYN = packingGrid.getValue(rowKey, "erp_yn");
      if (erpYN === "Y") {
        refPackingCurrentRowKey.current = "";
      } else {
        refPackingCurrentRowKey.current = rowKey;
      }
      const lotNo = packingGrid.getValue(rowKey, "lot_no");
      if (lotNo) {
        try {
          setIsBackDrop(true);
          const mixedResult = await restAPI.get(restURI.erpItfWorkInput + `?lot_no=${lotNo}`);
          const empResult = await restAPI.get(restURI.erpItfWorkEmp + `?lot_no=${lotNo}`);

          setMixedData(mixedResult?.data?.data?.rows);
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
          message: "포장 실적의 Lot 정보를 찾을 수 없습니다.",
          severity: "error",
          location: "bottomRight",
        });
      }
    }
  };

  const onDeletePacking = () => {
    setIsDeleteAlert({ open: true, type: "packing" });
  };
  const onDeleteMixed = () => {
    setIsDeleteAlert({ open: true, type: "mixed" });
  };
  const onDeleteEmployee = () => {
    setIsDeleteAlert({ open: true, type: "employee" });
  };
  const handleDeletePacking = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refPackingGrid?.current?.gridInst;
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
        setMixedData([]);
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
  const handleDeleteMixed = async () => {
    try {
      setIsBackDrop(true);
      const packingGrid = refPackingGrid?.current?.gridInst;
      const performanceRowKey = refPackingCurrentRowKey.current;
      const mixedGrid = refMixedGrid?.current?.gridInst;
      mixedGrid?.finishEditing();
      const lotNo = packingGrid.getValue(performanceRowKey, "lot_no");
      const checkedRows = mixedGrid?.getCheckedRows();

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

        onSearchAfterDelete(lotNo, "mixed");
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
      const packingGrid = refPackingGrid?.current?.gridInst;
      const performanceRowKey = refPackingCurrentRowKey.current;
      const employeeGrid = refEmployeeGrid?.current?.gridInst;
      employeeGrid?.finishEditing();
      const lotNo = packingGrid.getValue(performanceRowKey, "lot_no");
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
      case "packing":
        await handleDeletePacking();
        break;
      case "mixed":
        await handleDeleteMixed();
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

      if (type === "mixed") {
        const mixedResult = await restAPI.get(restURI.erpItfWorkInput + `?lot_no=${lotNo}`);
        setMixedData(mixedResult?.data?.data?.rows);
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

  const gridPacking = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colPacking}
        rowHeaders={["checkbox", "rowNum"]}
        header={header}
        data={packingData}
        draggable={false}
        refGrid={refPackingGrid}
        onClickGrid={onClickPacking}
      />
    );
  }, [packingData]);

  const gridMixed = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={colMixed}
        rowHeaders={["checkbox", "rowNum"]}
        header={header}
        data={mixedData}
        draggable={false}
        refGrid={refMixedGrid}
      />
    );
  }, [mixedData]);

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
          <S.GridTitle>{"포장 실적 목록"}</S.GridTitle>
          <S.GridButtonWrap>
            <BtnComponent btnName={"New"} onClick={onNew} />
            <BtnComponent btnName={"Edit"} onClick={onEdit} />
            <BtnComponent btnName={"Delete"} onClick={onDeletePacking} />
          </S.GridButtonWrap>
        </S.GridTitleWrap>
        <S.GridWrap>{gridPacking}</S.GridWrap>
      </S.ShadowBoxGrid>
      <S.ShadowBoxGrid>
        <S.GridTitleWrap>
          <S.GridTitle>{"혼합 실적 목록"}</S.GridTitle>
          <S.GridButtonWrap>
            <BtnComponent btnName={"Delete"} onClick={onDeleteMixed} />
          </S.GridButtonWrap>
        </S.GridTitleWrap>
        <S.GridWrap>{gridMixed}</S.GridWrap>
      </S.ShadowBoxGrid>
      <S.ShadowBoxGrid>
        <S.GridTitleWrap>
          <S.GridTitle>{"포장자 목록"}</S.GridTitle>
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
      {isCreateOpen && <ItfPackingCreate setIsCreateOpen={setIsCreateOpen} onSearch={onSearch} />}
      {isUpdateOpen && <ItfPackingUpdate setIsUpdateOpen={setIsUpdateOpen} onSearch={onSearch} data={updateData} />}

      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsAreaHidden>
  );
}
