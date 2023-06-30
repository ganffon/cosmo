import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ContentsArea from "components/layout/common/ContentsArea";
import * as S from "./WorkerGroupStatus.styled";
import DateRange from "components/datetime/DateRange";
import BtnPanel from "components/button/BtnPanel";
import DateTime from "components/datetime/DateTime";
import { TextField } from "@mui/material";
import BtnComponent from "components/button/BtnComponent";
import GridSingle from "components/grid/GridSingle";
import InputPaper from "components/input/InputPaper";
import Chips from "components/chip/Chips";
import WorkerGroupStatusSet from "./WorkerGroupStatusSet";
import ModalSelect from "components/modal/ModalSelect";
import * as uSearch from "custom/useSearch";
import restURI from "json/restURI.json";
import ModalAddNew from "./ModalAddNew";
import NoticeSnack from "components/alert/NoticeSnack";
import restAPI from "api/restAPI";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import GetDeleteParams from "api/GetDeleteParams";
import BackDrop from "components/backdrop/BackDrop";
import ModalEdit from "./ModalEdit";
import ModalAddEmp from "./ModalAddEmp";
import Condition from "custom/Condition";

function WorkerGroupStatus() {
  const { isMenuSlide } = useContext(LayoutContext);
  const {
    columns,
    columnsSelectEmp,
    columnsNewEmp,
    columnsAddEmp,
    columnOptions,
    header,
    rowHeadersNumCheck,
    rowHeadersNum,
  } = WorkerGroupStatusSet();
  const workType = [
    {
      name: "오전",
    },
    {
      name: "오후",
    },
    {
      name: "야간",
    },
  ];
  const workGroup = [
    {
      name: "A조",
    },
    {
      name: "B조",
    },
    {
      name: "C조",
    },
    {
      name: "D조",
    },
  ];
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [gridData, setGridData] = useState();
  const [chipData, setChipData] = useState([]);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [inputTextChange, setInputTextChange] = useState({});
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const [comboValue, setComboValue] = useState({
    workTypeKey: null,
    workGroupKey: null,
  });
  const refGrid = useRef(null);
  const refGridNewEmp = useRef(null);
  const refGridEditEmp = useRef(null);
  const refGridAddEmp = useRef(null);
  const refGridEmp = useRef(null);
  const targetRowKey = useRef("");
  const workGroupId = useRef("");
  const target = useRef("");

  const [mainContents, setMainContents] = useState({});
  const [newContents, setNewContents] = useState({});
  const [editContents, setEditContents] = useState({});
  const [isAddSelectOpen, setIsAddSelectOpen] = useState(false);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEmpOpen, setIsEmpOpen] = useState(false);
  const [isEmpNewOpen, setIsEmpNewOpen] = useState(false);
  const [dataGridSelect, setDataGridSelect] = useState();

  const [actSelectEmp] = uSearch.useSearchSelect(
    refGridEmp,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setDataGridSelect,
    restURI.employee + `?use_fg=true&worker_fg=true`
  );

  useEffect(() => {
    onClickSearch();
  }, []);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refGrid?.current !== null) {
      refGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  async function onClickSearch() {
    try {
      setIsBackDrop(true);
      let conditionWorkTime;
      let conditionWorkGroup;
      comboValue.workTypeKey ? (conditionWorkTime = `&shift_type=${comboValue.workTypeKey}`) : (conditionWorkTime = "");
      comboValue.workGroupKey
        ? (conditionWorkGroup = `&worker_group_nm=${comboValue.workGroupKey}`)
        : (conditionWorkGroup = "");

      const URI = restURI.workerGroupStatus + `?start_date=${dateText.startDate}&end_date=${dateText.endDate}`;
      const result = await restAPI.get(URI + conditionWorkTime + conditionWorkGroup);

      setGridData(result?.data?.data?.rows);

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
  }
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  const onClickWorkTypeMng = (e) => {
    const mngElement = document.getElementById("Mng");
    const aftElement = document.getElementById("Aft");
    const nigElement = document.getElementById("Nig");
    mngElement.classList.add("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.remove("selected");
  };
  const onClickWorkTypeAft = (e) => {
    const mngElement = document.getElementById("Mng");
    const aftElement = document.getElementById("Aft");
    const nigElement = document.getElementById("Nig");
    mngElement.classList.remove("selected");
    aftElement.classList.add("selected");
    nigElement.classList.remove("selected");
  };
  const onClickWorkTypeNig = (e) => {
    const mngElement = document.getElementById("Mng");
    const aftElement = document.getElementById("Aft");
    const nigElement = document.getElementById("Nig");
    mngElement.classList.remove("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.add("selected");
  };
  const onClickGroupA = (e) => {
    const groupA = document.getElementById("GroupA");
    const groupB = document.getElementById("GroupB");
    const groupC = document.getElementById("GroupC");
    const groupD = document.getElementById("GroupD");
    groupA.classList.add("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  };
  const onClickGroupB = (e) => {
    const groupA = document.getElementById("GroupA");
    const groupB = document.getElementById("GroupB");
    const groupC = document.getElementById("GroupC");
    const groupD = document.getElementById("GroupD");
    groupA.classList.remove("selected");
    groupB.classList.add("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  };
  const onClickGroupC = (e) => {
    const groupA = document.getElementById("GroupA");
    const groupB = document.getElementById("GroupB");
    const groupC = document.getElementById("GroupC");
    const groupD = document.getElementById("GroupD");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.add("selected");
    groupD.classList.remove("selected");
  };
  const onClickGroupD = (e) => {
    const groupA = document.getElementById("GroupA");
    const groupB = document.getElementById("GroupB");
    const groupC = document.getElementById("GroupC");
    const groupD = document.getElementById("GroupD");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.add("selected");
  };
  const onAdd = () => {
    if (workGroupId.current !== "") {
      setIsAddEmpOpen(true);
    }
  };
  const onDblClickAddEmp = () => {};
  const onAddNew = () => {
    setIsAddNewOpen(true);
  };
  const onAddNewClose = () => {
    setNewContents({});
    setIsAddNewOpen(false);
  };
  const onEditClose = () => {
    setNewContents({});
    setIsEditOpen(false);
  };
  const onAddEmpClose = () => {
    setIsAddEmpOpen(false);
  };
  const onClickSelect = () => {
    target.current = "New";
    actSelectEmp();
    setIsEmpOpen(true);
  };
  const onClickEditSelect = () => {
    target.current = "Edit";
    actSelectEmp();
    setIsEmpOpen(true);
  };
  const onClickRemove = () => {
    if (target.current === "New") {
      setNewContents({ ...newContents, writer: "", writerId: "" });
    } else if (target.current === "Edit") {
      setEditContents({ ...editContents, writer: "", writerId: "" });
    }
  };
  const onDblClickWriter = (e) => {
    if (e.targetType === "cell") {
      const Grid = refGridEmp?.current?.gridInst;
      if (target.current === "New") {
        setNewContents({
          ...newContents,
          writer: Grid.getValue(e?.rowKey, "emp_nm"),
          writerId: Grid.getValue(e?.rowKey, "emp_id"),
        });
      } else if (target.current === "Edit") {
        setEditContents({
          ...editContents,
          writer: Grid.getValue(e?.rowKey, "emp_nm"),
          writerId: Grid.getValue(e?.rowKey, "emp_id"),
        });
      }

      setIsEmpOpen(false);
    }
  };
  const onDblClickEmp = (e) => {
    if (e.targetType === "cell") {
      let targetGrid;
      const gridSelect = refGridEmp?.current?.gridInst;
      if (target.current === "New") {
        targetGrid = refGridNewEmp?.current?.gridInst;
      } else if (target.current === "Edit") {
        targetGrid = refGridEditEmp?.current?.gridInst;
      } else if (target.current === "Add") {
        targetGrid = refGridAddEmp?.current?.gridInst;
      }

      targetGrid.setValue(targetRowKey.current, "emp_id", gridSelect.getValue(e?.rowKey, "emp_id"));
      targetGrid.setValue(targetRowKey.current, "emp_cd", gridSelect.getValue(e?.rowKey, "emp_cd"));
      targetGrid.setValue(targetRowKey.current, "emp_nm", gridSelect.getValue(e?.rowKey, "emp_nm"));
      setIsEmpNewOpen(false);
    }
  };
  const onDblClickNewGrid = (e) => {
    if (Condition(e, ["emp_cd", "emp_nm"])) {
      target.current = "New";
      targetRowKey.current = e?.rowKey;
      actSelectEmp();
      setIsEmpNewOpen(true);
    }
  };
  const onDblClickEditGrid = (e) => {
    if (Condition(e, ["emp_cd", "emp_nm"])) {
      target.current = "Edit";
      targetRowKey.current = e?.rowKey;
      actSelectEmp();
      setIsEmpNewOpen(true);
    }
  };
  const onDblClickAddEmpGrid = (e) => {
    if (Condition(e, ["emp_cd", "emp_nm"])) {
      target.current = "Add";
      targetRowKey.current = e?.rowKey;
      actSelectEmp();
      setIsEmpNewOpen(true);
    }
  };
  const onDelete = () => {
    setIsDeleteAlertOpen(true);
  };
  const onEdit = () => {
    if (workGroupId.current !== "") {
      target.current = "Edit";
      setIsEditOpen(true);
    }
  };
  const handleDelete = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGrid?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid?.getCheckedRows()?.map((raw) => GetDeleteParams("WorkerGroupStatus", raw));
      if (data) {
        const result = await restAPI.delete(restURI.workerGroupStatus, { data });
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        setIsDeleteAlertOpen(false);
        onResetDetail();
        onClickSearch();
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
  const onClickGrid = async (e) => {
    if (e?.targetType === "cell") {
      try {
        setIsBackDrop(true);
        const Grid = refGrid?.current?.gridInst;
        const id = Grid.getValue(e?.rowKey, "worker_group_status_id");
        workGroupId.current = id;
        const workTime = Grid.getValue(e?.rowKey, "shift_type");
        const workGroup = Grid.getValue(e?.rowKey, "worker_group_nm");
        const writerId = Grid.getValue(e?.rowKey, "master_emp_id");
        const writer = Grid.getValue(e?.rowKey, "master_emp_nm");
        const startDate = Grid.getValue(e?.rowKey, "work_start_date");
        const startTime = Grid.getValue(e?.rowKey, "work_start_time");
        const endDate = Grid.getValue(e?.rowKey, "work_end_date");
        const endTime = Grid.getValue(e?.rowKey, "work_end_time");
        const remark = Grid.getValue(e?.rowKey, "remark");

        setEditContents({
          ...editContents,
          workId: id,
          workTime: workTime,
          workGroup: workGroup,
          writerId: writerId,
          writer: writer,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          issue: remark,
        });

        switch (workTime) {
          case "오전":
            onClickWorkTypeMng();
            break;
          case "오후":
            onClickWorkTypeAft();
            break;
          case "야간":
            onClickWorkTypeNig();
            break;
          default:
        }

        switch (workGroup) {
          case "A조":
            onClickGroupA();
            break;
          case "B조":
            onClickGroupB();
            break;
          case "C조":
            onClickGroupC();
            break;
          case "D조":
            onClickGroupD();
            break;
          default:
        }

        const result = await restAPI.get(restURI.workerGroupStatusDetailChip + `?worker_group_status_id=${id}`);

        const data = result?.data?.data?.rows;

        setMainContents({
          ...mainContents,
          writer: writer,
          issue: remark,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
        });
        setChipData(data);
      } catch (err) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: err?.response?.data?.message,
          severity: "error",
          location: "bottomRight",
        });
        workGroupId.current = "";
      } finally {
        setIsBackDrop(false);
      }
    }
  };

  const onResetDetail = () => {
    const mngElement = document.getElementById("Mng");
    const aftElement = document.getElementById("Aft");
    const nigElement = document.getElementById("Nig");
    mngElement.classList.remove("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.remove("selected");
    const groupA = document.getElementById("GroupA");
    const groupB = document.getElementById("GroupB");
    const groupC = document.getElementById("GroupC");
    const groupD = document.getElementById("GroupD");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
    setMainContents({});
    setChipData([]);
  };

  const GridAddSelect = useMemo(() => {
    return (
      <ModalSelect
        width={"40%"}
        height={"80%"}
        title={"작업자 추가"}
        onClickModalSelectClose={() => setIsAddSelectOpen(false)}
        columns={columnsSelectEmp}
        columnOptions={columnOptions}
        header={header}
        gridDataSelect={dataGridSelect}
        rowHeaders={rowHeadersNum}
        refSelectGrid={refGridEmp}
        onDblClickGridSelect={onDblClickAddEmp}
      />
    );
  }, [dataGridSelect]);
  const GridNewWriter = useMemo(() => {
    return (
      <ModalSelect
        width={"40%"}
        height={"80%"}
        title={"작성자 선택"}
        onClickModalSelectClose={() => setIsEmpOpen(false)}
        columns={columnsSelectEmp}
        columnOptions={columnOptions}
        header={header}
        gridDataSelect={dataGridSelect}
        rowHeaders={rowHeadersNum}
        refSelectGrid={refGridEmp}
        onDblClickGridSelect={onDblClickWriter}
      />
    );
  }, [dataGridSelect]);
  const GridNewEmp = useMemo(() => {
    return (
      <ModalSelect
        width={"40%"}
        height={"80%"}
        title={"작업조원 선택"}
        onClickModalSelectClose={() => setIsEmpNewOpen(false)}
        columns={columnsSelectEmp}
        columnOptions={columnOptions}
        header={header}
        gridDataSelect={dataGridSelect}
        rowHeaders={rowHeadersNum}
        refSelectGrid={refGridEmp}
        onDblClickGridSelect={onDblClickEmp}
      />
    );
  }, [dataGridSelect]);
  const GridAddEmp = useMemo(() => {
    return (
      <ModalAddEmp
        width={"60%"}
        rowHeaders={rowHeadersNum}
        columns={columnsAddEmp}
        columnOptions={columnOptions}
        refGrid={refGridAddEmp}
        onClickSearch={onClickSearch}
        onDblClickGrid={onDblClickAddEmpGrid}
        onClickModalClose={onAddEmpClose}
        setIsBackDrop={setIsBackDrop}
        setIsSnackOpen={setIsSnackOpen}
        isSnackOpen={isSnackOpen}
        workGroupId={workGroupId.current}
        setChipData={setChipData}
        mainContents={mainContents}
      />
    );
  }, [refGridAddEmp, workGroupId.current, mainContents]);
  return (
    <ContentsArea>
      <S.SearchWrap>
        <S.SearchCondition>
          <DateRange dateText={dateText} setDateText={setDateText} onClickSearch={onClickSearch} />
          <S.ComboBox
            disablePortal
            id="workTypeCombo"
            size="small"
            options={workType || null}
            getOptionLabel={(option) => option?.name || ""}
            onChange={(_, newValue) => {
              setComboValue({
                ...comboValue,
                workTypeKey: newValue?.name === undefined ? null : newValue?.name,
              });
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => <TextField {...params} label={"작업시간"} size="small" />}
            onKeyDown={onKeyDown}
          />
          <S.ComboBox
            disablePortal
            id="workGroupCombo"
            size="small"
            options={workGroup || null}
            getOptionLabel={(option) => option?.name || ""}
            onChange={(_, newValue) => {
              setComboValue({
                ...comboValue,
                workGroupKey: newValue?.name === undefined ? null : newValue?.name,
              });
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => <TextField {...params} label={"작업조"} size="small" />}
            onKeyDown={onKeyDown}
          />
        </S.SearchCondition>
        <S.SearchButton>
          <BtnPanel
            btnName={"Search"}
            height={"50px"}
            width={"150px"}
            color={"#1491CE"}
            fontSize={"26px"}
            fontColor={"#ffffff"}
            onClick={onClickSearch}
          />
        </S.SearchButton>
      </S.SearchWrap>
      <S.BottomBox>
        <S.BottomLeftWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"New"} onClick={onAddNew} />
            <BtnComponent btnName={"Delete"} onClick={onDelete} />
          </S.ButtonWrap>
          <S.GridWrap>
            <GridSingle
              refGrid={refGrid}
              data={gridData}
              rowHeaders={rowHeadersNumCheck}
              columns={columns}
              onClickGrid={onClickGrid}
            />
          </S.GridWrap>
        </S.BottomLeftWrap>
        <S.BottomRightWrap>
          <S.MainWrap>
            <S.TopWrap>
              <S.GroupWrap>
                <S.Title>작업시간</S.Title>
                <S.workButton id={"Mng"}>{"오전"}</S.workButton>
                <S.workButton id={"Aft"}>{"오후"}</S.workButton>
                <S.workButton id={"Nig"}>{"야간"}</S.workButton>
              </S.GroupWrap>
              <S.GroupWrap>
                <S.Title>작업조</S.Title>
                <S.workButton id={"GroupA"}>{"A조"}</S.workButton>
                <S.workButton id={"GroupB"}>{"B조"}</S.workButton>
                <S.workButton id={"GroupC"}>{"C조"}</S.workButton>
                <S.workButton id={"GroupD"}>{"D조"}</S.workButton>
              </S.GroupWrap>
              <S.GroupWrap>
                <S.Title>작성자</S.Title>
                <InputPaper width={"180px"} height={"60px"} size={"30px"} value={mainContents.writer} />
              </S.GroupWrap>
            </S.TopWrap>
            <S.MidWrap>
              <S.ChipWrap>
                <S.Title className={"alignTop"}>작업자</S.Title>
                <Chips
                  height={"130px"}
                  width={"995px"}
                  chipData={chipData}
                  setChipData={setChipData}
                  deleteURI={restURI.workerGroupStatusDetail}
                  deleteKey={"worker_group_status_detail_id"}
                  setIsBackDrop={setIsBackDrop}
                  isSnackOpen={isSnackOpen}
                  setIsSnackOpen={setIsSnackOpen}
                />
                <S.ChipButtonWrap>
                  <BtnComponent btnName={"Add"} height={"60px"} width={"84px"} onClick={onAdd} />
                  <BtnComponent btnName={"Edit"} height={"60px"} width={"84px"} onClick={onEdit} />
                </S.ChipButtonWrap>
              </S.ChipWrap>
            </S.MidWrap>
            <S.BottomWrap>
              <S.Title className={"alignTop"}>작업이슈</S.Title>
              <S.Issue disabled rows={4} value={mainContents.issue || ""} placeholder="작업이슈에 대해 작성해주세요." />
            </S.BottomWrap>
          </S.MainWrap>
        </S.BottomRightWrap>
      </S.BottomBox>
      {isAddNewOpen && (
        <ModalAddNew
          width={"80%"}
          rowHeaders={rowHeadersNum}
          columns={columnsNewEmp}
          columnOptions={columnOptions}
          refGrid={refGridNewEmp}
          setNewContents={setNewContents}
          newContents={newContents}
          onClickSearch={onClickSearch}
          onClickSelect={onClickSelect}
          onClickRemove={onClickRemove}
          onDblClickGrid={onDblClickNewGrid}
          onClickModalClose={onAddNewClose}
          setIsBackDrop={setIsBackDrop}
          setIsSnackOpen={setIsSnackOpen}
          isSnackOpen={isSnackOpen}
        />
      )}
      {isEditOpen && (
        <ModalEdit
          width={"80%"}
          rowHeaders={rowHeadersNum}
          columns={columnsNewEmp}
          columnOptions={columnOptions}
          refGrid={refGridEditEmp}
          setEditContents={setEditContents}
          editContents={editContents}
          onClickSearch={onClickSearch}
          onClickSelect={onClickEditSelect}
          onClickRemove={onClickRemove}
          onDblClickGrid={onDblClickEditGrid}
          onClickModalClose={onEditClose}
          setIsBackDrop={setIsBackDrop}
          setIsSnackOpen={setIsSnackOpen}
          isSnackOpen={isSnackOpen}
        />
      )}
      {isAddEmpOpen && GridAddEmp}
      {isAddSelectOpen && GridAddSelect}
      {isEmpOpen && GridNewWriter}
      {isEmpNewOpen && GridNewEmp}
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

      <BackDrop isBackDrop={isBackDrop} />
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ContentsArea>
  );
}

export default WorkerGroupStatus;
