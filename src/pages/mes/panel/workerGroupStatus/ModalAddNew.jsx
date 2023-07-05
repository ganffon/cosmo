import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalAddNew.styled";
import InputPaper from "components/input/InputPaper";
import DateTime from "components/datetime/DateTime";
import * as RE from "custom/RegularExpression";
import BtnComponent from "components/button/BtnComponent";
import GridSingle from "components/grid/GridSingle";
import Condition from "custom/Condition";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

function ModalAddNew(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onClickSearch = () => {},
    onEditingFinishInput = () => {},
    onClickGridInput = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
    onDblClickGrid = () => {},
    refGrid = null,
    columns = [],
    columnOptions = [],
    data = [],
    header = [],
    rowHeaders = [],
    gridDataInput = [],
    setNewContents = () => {},
    newContents = {},
    setIsBackDrop = {},
    setIsSnackOpen = {},
    isSnackOpen = false,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    setNewContents({
      ...newContents,
      startDate: DateTime().dateFull,
      endDate: DateTime().dateFull,
      startTime: DateTime().hour + ":" + DateTime().minute,
    });
  }, []);

  const datePickerChange = (e) => {
    setNewContents({ ...newContents, [e.target.id]: e.target.value });
  };
  const handleIssue = (e) => {
    setNewContents({ ...newContents, issue: e.target.value });
  };
  function onMng() {
    const mngElement = document.getElementById("NewMng");
    const aftElement = document.getElementById("NewAft");
    const nigElement = document.getElementById("NewNig");
    mngElement.classList.add("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.remove("selected");
  }
  function onAft() {
    const mngElement = document.getElementById("NewMng");
    const aftElement = document.getElementById("NewAft");
    const nigElement = document.getElementById("NewNig");
    mngElement.classList.remove("selected");
    aftElement.classList.add("selected");
    nigElement.classList.remove("selected");
  }
  function onNig() {
    const mngElement = document.getElementById("NewMng");
    const aftElement = document.getElementById("NewAft");
    const nigElement = document.getElementById("NewNig");
    mngElement.classList.remove("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.add("selected");
  }
  const onClickWorkTypeMng = (e) => {
    onMng();
    setNewContents({
      ...newContents,
      workType: "오전",
      startDate: DateTime().dateFull,
      startTime: "06:00",
      endDate: DateTime().dateFull,
      endTime: "14:00",
    });
  };
  const onClickWorkTypeAft = (e) => {
    onAft();
    setNewContents({
      ...newContents,
      workType: "오후",
      startDate: DateTime().dateFull,
      startTime: "14:00",
      endDate: DateTime().dateFull,
      endTime: "22:00",
    });
  };
  const onClickWorkTypeNig = (e) => {
    onNig();
    setNewContents({
      ...newContents,
      workType: "야간",
      startDate: DateTime().dateFull,
      startTime: "22:00",
      endDate: DateTime(1).dateFull,
      endTime: "06:00",
    });
  };
  function onGroupA() {
    const groupA = document.getElementById("NewGroupA");
    const groupB = document.getElementById("NewGroupB");
    const groupC = document.getElementById("NewGroupC");
    const groupD = document.getElementById("NewGroupD");
    groupA.classList.add("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  }
  function onGroupB() {
    const groupA = document.getElementById("NewGroupA");
    const groupB = document.getElementById("NewGroupB");
    const groupC = document.getElementById("NewGroupC");
    const groupD = document.getElementById("NewGroupD");
    groupA.classList.remove("selected");
    groupB.classList.add("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  }
  function onGroupC() {
    const groupA = document.getElementById("NewGroupA");
    const groupB = document.getElementById("NewGroupB");
    const groupC = document.getElementById("NewGroupC");
    const groupD = document.getElementById("NewGroupD");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.add("selected");
    groupD.classList.remove("selected");
  }
  function onGroupD() {
    const groupA = document.getElementById("NewGroupA");
    const groupB = document.getElementById("NewGroupB");
    const groupC = document.getElementById("NewGroupC");
    const groupD = document.getElementById("NewGroupD");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.add("selected");
  }
  const getEmpList = async (group) => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.workerGroupStatusEmpList + `?worker_group_nm=${group}`);

      setGridData(result?.data?.data?.rows);
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
  const onClickGroupA = (e) => {
    onGroupA();
    setNewContents({ ...newContents, workGroup: "A조" });
    getEmpList("A조");
  };
  const onClickGroupB = (e) => {
    onGroupB();
    setNewContents({ ...newContents, workGroup: "B조" });
    getEmpList("B조");
  };
  const onClickGroupC = (e) => {
    onGroupC();
    setNewContents({ ...newContents, workGroup: "C조" });
    getEmpList("C조");
  };
  const onClickGroupD = (e) => {
    onGroupD();
    setNewContents({ ...newContents, workGroup: "D조" });
    getEmpList("D조");
  };
  const handleTime = (e) => {
    const timeValue = RE.TimeInput(e?.target?.value);
    if (timeValue.length < 6) {
      setNewContents({ ...newContents, [e.target.id]: timeValue });
    }
  };
  const onNewAddRow = () => {
    const Grid = refGrid?.current?.gridInst;
    const rowKey = Grid.getRowCount();
    Grid.appendRow();

    Grid.setValue(rowKey, "work_start_date", newContents.startDate);
    Grid.setValue(rowKey, "work_start_time", newContents.startTime);
    Grid.setValue(rowKey, "work_end_date", newContents.endDate);
    Grid.setValue(rowKey, "work_end_time", newContents.endTime);
  };
  useEffect(() => {
    const Grid = refGrid?.current?.gridInst;
    const maxRow = Grid.getRowCount();
    for (let i = 0; maxRow >= i; i++) {
      Grid.setValue(i, "work_start_date", newContents.startDate);
      Grid.setValue(i, "work_start_time", newContents.startTime);
      Grid.setValue(i, "work_end_date", newContents.endDate);
      Grid.setValue(i, "work_end_time", newContents.endTime);
    }
  }, [newContents]);
  const rowKey = useRef("");
  const onClickGrid = useCallback((e) => {
    rowKey.current = e.rowKey;
  }, []);
  const onNewCancelRow = () => {
    refGrid?.current?.gridInst?.removeRow(rowKey.current);
  };
  const onEditingFinish = (e) => {
    if (Condition(e, ["work_start_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGrid, "work_start_time");
    }
    if (Condition(e, ["work_end_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGrid, "work_end_time");
    }
  };
  const onNewSave = async () => {
    if (!newContents.workType) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작업시간을 선택하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!newContents.workGroup) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작업조를 선택하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!newContents.writer) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작성자를 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!newContents.startTime) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "시작시간을 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!newContents.endTime) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "종료시간을 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }

    refGrid?.current?.gridInst?.finishEditing();
    const header = {
      master_emp_id: newContents.writerId,
      shift_type: newContents.workType,
      worker_group_nm: newContents.workGroup,
      work_start_date: newContents.startDate,
      work_start_time: newContents.startTime,
      work_end_date: newContents.endDate,
      work_end_time: newContents.endTime,
      remark: newContents.issue,
    };
    let result = [];
    for (let i = 0; i < refGrid?.current?.gridInst?.getRowCount(); i++) {
      result.push(refGrid?.current?.gridInst?.getRowAt(i));
    }
    const detail = result.map((raw) => GetPostParams("workGroupStatusDetail", raw));

    const query = {
      header: header,
      details: detail,
    };

    if (query.details !== undefined) {
      setIsBackDrop(true);
      await restAPI
        .post(restURI.workerGroupStatus, query)
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
          setTimeout(() => {
            onClickModalClose();
            onClickSearch();
          }, 300);
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.message ? res?.message : res?.response?.data?.message,
            severity: "error",
            location: "bottomRight",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
        });
    }
  };
  const Grid = useMemo(() => {
    return (
      <GridSingle
        rowHeaders={rowHeaders}
        columns={columns}
        columnOptions={columnOptions}
        onClickGrid={onClickGrid}
        onDblClickGrid={onDblClickGrid}
        onEditingFinish={onEditingFinish}
        data={gridData}
        refGrid={refGrid}
        isEditMode={true}
      />
    );
  }, [refGrid.current, onClickGrid, gridData]);
  return (
    <S.ModalWrapBox width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{currentMenuName}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Content>
        <S.ContentLeft>
          <S.GroupWrap>
            <S.Title>작업시간</S.Title>
            <S.workButton id={"NewMng"} onClick={onClickWorkTypeMng}>
              {"오전"}
            </S.workButton>
            <S.workButton id={"NewAft"} onClick={onClickWorkTypeAft}>
              {"오후"}
            </S.workButton>
            <S.workButton id={"NewNig"} onClick={onClickWorkTypeNig}>
              {"야간"}
            </S.workButton>
          </S.GroupWrap>
          <S.GroupWrap>
            <S.Title>작업조</S.Title>
            <S.workButton id={"NewGroupA"} onClick={onClickGroupA}>
              {"A조"}
            </S.workButton>
            <S.workButton id={"NewGroupB"} onClick={onClickGroupB}>
              {"B조"}
            </S.workButton>
            <S.workButton id={"NewGroupC"} onClick={onClickGroupC}>
              {"C조"}
            </S.workButton>
            <S.workButton id={"NewGroupD"} onClick={onClickGroupD}>
              {"D조"}
            </S.workButton>
          </S.GroupWrap>
          <S.GroupWrap>
            <S.Title>작성자</S.Title>
            <InputPaper
              width={"300px"}
              height={"60px"}
              value={newContents.writer}
              size={"30px"}
              btn={true}
              onClickSelect={onClickSelect}
              onClickRemove={onClickRemove}
            />
          </S.GroupWrap>
          <S.GroupWrap>
            <S.Title>시작일자</S.Title>
            <S.DatePicker
              id="startDate"
              className="date"
              type="date"
              format="yyyy-MM-dd"
              value={newContents.startDate}
              InputProps={{ sx: { height: 60 } }}
              onChange={datePickerChange}
            />
            <S.Title>시작시간</S.Title>
            <InputPaper
              id={"startTime"}
              width={"120px"}
              height={"60px"}
              value={newContents.startTime}
              size={"30px"}
              onTextChange={handleTime}
              readOnly={false}
            />
          </S.GroupWrap>
          <S.GroupWrap>
            <S.Title>종료일자</S.Title>
            <S.DatePicker
              id="endDate"
              className="date"
              type="date"
              format="yyyy-MM-dd"
              value={newContents.endDate}
              InputProps={{ sx: { height: 60 } }}
              onChange={datePickerChange}
            />
            <S.Title>종료시간</S.Title>
            <InputPaper
              id={"endTime"}
              width={"120px"}
              height={"60px"}
              value={newContents.endTime}
              size={"30px"}
              onTextChange={handleTime}
              readOnly={false}
            />
          </S.GroupWrap>
          <S.GroupWrap className={"columnDirection"}>
            <S.Title>작업이슈</S.Title>
            <S.Issue
              rows={4}
              value={newContents.issue}
              onChange={handleIssue}
              placeholder="작업이슈에 대해 작성해주세요."
            />
          </S.GroupWrap>
        </S.ContentLeft>
        <S.ContentRight>
          <S.ButtonWrap>
            <BtnComponent btnName={"AddRow"} onClick={onNewAddRow} />
            <BtnComponent btnName={"CancelRow"} onClick={onNewCancelRow} />
            <BtnComponent btnName={"Save"} onClick={onNewSave} />
          </S.ButtonWrap>
          <S.GridWrap>{Grid}</S.GridWrap>
        </S.ContentRight>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalAddNew;
