import React, { useMemo, useRef, useState } from "react";
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
import { BackDrop } from "components/backdrop/BackDrop.styled";
import NoticeSnack from "components/alert/NoticeSnack";

function WorkerGroupStatus() {
  const { columns, columnsSelectEmp, columnsNewEmp, columnOptions, header, rowHeadersNumCheck, rowHeadersNum } =
    WorkerGroupStatusSet();
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
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [chipData, setChipData] = useState();
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
  const refGridEmp = useRef(null);
  const targetRowKey = useRef("");

  const [mainContents, setMainContents] = useState({});
  const [newContents, setNewContents] = useState({});
  const [isAddSelectOpen, setIsAddSelectOpen] = useState(false);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
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
    restURI.employee
  );

  const onClickSearch = () => {};
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  const onClickWorkTypeMng = (e) => {
    const aftElement = document.getElementById("Aft");
    const nigElement = document.getElementById("Nig");
    e.target.classList.add("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.remove("selected");
  };
  const onClickWorkTypeAft = (e) => {
    const mngElement = document.getElementById("Mng");
    const nigElement = document.getElementById("Nig");
    e.target.classList.add("selected");
    mngElement.classList.remove("selected");
    nigElement.classList.remove("selected");
  };
  const onClickWorkTypeNig = (e) => {
    const mngElement = document.getElementById("Mng");
    const aftElement = document.getElementById("Aft");
    e.target.classList.add("selected");
    mngElement.classList.remove("selected");
    aftElement.classList.remove("selected");
  };
  const onClickGroupA = (e) => {
    const groupB = document.getElementById("GroupB");
    const groupC = document.getElementById("GroupC");
    const groupD = document.getElementById("GroupD");
    e.target.classList.add("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  };
  const onClickGroupB = (e) => {
    const groupA = document.getElementById("GroupA");
    const groupC = document.getElementById("GroupC");
    const groupD = document.getElementById("GroupD");
    e.target.classList.add("selected");
    groupA.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  };
  const onClickGroupC = (e) => {
    const groupA = document.getElementById("GroupA");
    const groupB = document.getElementById("GroupB");
    const groupD = document.getElementById("GroupD");
    e.target.classList.add("selected");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupD.classList.remove("selected");
  };
  const onClickGroupD = (e) => {
    const groupA = document.getElementById("GroupA");
    const groupB = document.getElementById("GroupB");
    const groupC = document.getElementById("GroupC");
    e.target.classList.add("selected");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
  };
  const onAdd = () => {
    actSelectEmp();
    setIsAddSelectOpen(true);
  };
  const onDetail = () => {};

  const onDblClickAddEmp = () => {};
  const onAddNew = () => {
    setIsAddNewOpen(true);
  };
  const onAddNewClose = () => {
    setNewContents({});
    setIsAddNewOpen(false);
  };
  const onClickSelect = () => {
    actSelectEmp();
    setIsEmpOpen(true);
  };
  const onClickRemove = () => {
    setNewContents({ ...newContents, empNM: "", empID: "" });
  };
  const onDblClickNewWriter = (e) => {
    if (e.targetType === "cell") {
      const Grid = refGridEmp?.current?.gridInst;
      setNewContents({
        ...newContents,
        empNM: Grid.getValue(e?.rowKey, "emp_nm"),
        empID: Grid.getValue(e?.rowKey, "emp_id"),
      });
      setIsEmpOpen(false);
    }
  };
  const onDblClickNewEmp = (e) => {
    if (e.targetType === "cell") {
      const gridSelect = refGridEmp?.current?.gridInst;
      const targetGrid = refGridNewEmp?.current?.gridInst;
      targetGrid.setValue(targetRowKey.current, "emp_id", gridSelect.getValue(e?.rowKey, "emp_id"));
      targetGrid.setValue(targetRowKey.current, "emp_cd", gridSelect.getValue(e?.rowKey, "emp_cd"));
      targetGrid.setValue(targetRowKey.current, "emp_nm", gridSelect.getValue(e?.rowKey, "emp_nm"));
      setIsEmpNewOpen(false);
    }
  };
  const onDblClickNewGrid = (e) => {
    targetRowKey.current = e?.rowKey;
    actSelectEmp();
    setIsEmpNewOpen(true);
  };

  const GridAddEmp = useMemo(() => {
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
        onDblClickGridSelect={onDblClickNewWriter}
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
        onDblClickGridSelect={onDblClickNewEmp}
      />
    );
  }, [dataGridSelect]);
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
      <S.BottomWrap>
        <S.BottomLeftWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"New"} onClick={onAddNew} />
            <BtnComponent btnName={"Delete"} />
          </S.ButtonWrap>
          <S.GridWrap>
            <GridSingle rowHeaders={rowHeadersNumCheck} columns={columns} />
          </S.GridWrap>
        </S.BottomLeftWrap>
        <S.BottomRightWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Edit"} />
          </S.ButtonWrap>
          <S.MainWrap>
            <S.TopWrap>
              <S.GroupWrap>
                <S.Title>작업시간</S.Title>
                <S.workButton id={"Mng"} onClick={onClickWorkTypeMng}>
                  {"오전"}
                </S.workButton>
                <S.workButton id={"Aft"} onClick={onClickWorkTypeAft}>
                  {"오후"}
                </S.workButton>
                <S.workButton id={"Nig"} onClick={onClickWorkTypeNig}>
                  {"야간"}
                </S.workButton>
              </S.GroupWrap>
              <S.GroupWrap>
                <S.Title>작업조</S.Title>
                <S.workButton id={"GroupA"} onClick={onClickGroupA}>
                  {"A조"}
                </S.workButton>
                <S.workButton id={"GroupB"} onClick={onClickGroupB}>
                  {"B조"}
                </S.workButton>
                <S.workButton id={"GroupC"} onClick={onClickGroupC}>
                  {"C조"}
                </S.workButton>
                <S.workButton id={"GroupD"} onClick={onClickGroupD}>
                  {"D조"}
                </S.workButton>
              </S.GroupWrap>
              <S.GroupWrap>
                <S.Title>작성자</S.Title>
                <InputPaper width={"180px"} height={"60px"} value={mainContents.writer} />
              </S.GroupWrap>
            </S.TopWrap>
            <S.MidWrap>
              <S.ChipWrap>
                <S.Title className={"alignTop"}>작업자</S.Title>
                <Chips height={"130px"} width={"1010px"} />
                <S.ChipButtonWrap>
                  <BtnComponent btnName={"Add"} onClick={onAdd} />
                  <BtnComponent btnName={"Detail"} onClick={onDetail} />
                </S.ChipButtonWrap>
              </S.ChipWrap>
            </S.MidWrap>
          </S.MainWrap>
        </S.BottomRightWrap>
      </S.BottomWrap>
      {isAddSelectOpen && GridAddEmp}
      {isEmpOpen && GridNewWriter}
      {isEmpNewOpen && GridNewEmp}
      {isAddNewOpen && (
        <ModalAddNew
          width={"80%"}
          rowHeaders={rowHeadersNum}
          columns={columnsNewEmp}
          columnOptions={columnOptions}
          refGrid={refGridNewEmp}
          setNewContents={setNewContents}
          newContents={newContents}
          onClickSelect={onClickSelect}
          onClickRemove={onClickRemove}
          onDblClickGrid={onDblClickNewGrid}
          onClickModalClose={onAddNewClose}
          setIsBackDrop={setIsBackDrop}
          setIsSnackOpen={setIsSnackOpen}
          isSnackOpen={isSnackOpen}
        />
      )}
      <BackDrop isBackDrop={isBackDrop} />
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ContentsArea>
  );
}

export default WorkerGroupStatus;
