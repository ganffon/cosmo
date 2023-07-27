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
    onDblClickNewSupportGrid = () => {},
    refGrid = null,
    refSupportGrid = null,
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
    target = null,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const [gridData, setGridData] = useState([]);
  const [gridSupportData, setGridSupportData] = useState([]);

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
  const handleRemark = (e) => {
    setNewContents({ ...newContents, remark: e.target.value });
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

  const getEmpList = (group) => {
    setIsBackDrop(true);

    restAPI
      .get(restURI.workerGroupStatusEmpList + `?worker_group_nm=${group}`)
      .then((result) => {
        const workers = result?.data?.data?.rows[0]?.worker;

        // workers 배열을 map 함수를 사용하여 반복하면서 work_start_time과 work_end_time 값을 수정
        const modifiedWorkers = workers.map((worker) => {
          let startDateToUse = newContents.startDate;
          let startTimeToUse = newContents.startTime;
          let endDateToUse = newContents.endDate;
          let endTimeToUse = newContents.endTime;
          // 조건은 일부러 endTime으로 잡음(초기에 endTime은 설정 안되니까)
          if (!newContents.endTime) {
            startDateToUse = worker.work_start_date;
            startTimeToUse = worker.work_start_time;
            endDateToUse = worker.work_end_date;
            endTimeToUse = worker.work_end_time;
          }
          // 각 worker 객체의 work_start_time과 work_end_time 값을 변경하고자 하는 값으로 수정
          return {
            ...worker,
            work_start_date: startDateToUse,
            work_start_time: startTimeToUse,
            work_end_date: endDateToUse,
            work_end_time: endTimeToUse,
          };
        });
        setGridData(modifiedWorkers);
        // setGridSupportData(result?.data?.data?.rows[0]?.support);

        setIsBackDrop(false);
      })
      .catch((err) => {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: err?.response?.data?.message,
          severity: "error",
          location: "bottomRight",
        });

        setIsBackDrop(false);
      });
  };
  const onClickGroupA = async (e) => {
    onGroupA();
    setNewContents({ ...newContents, workGroup: "A조" });
    getEmpList("A조");
  };
  const onClickGroupB = async (e) => {
    onGroupB();
    setNewContents({ ...newContents, workGroup: "B조" });
    getEmpList("B조");
  };
  const onClickGroupC = async (e) => {
    onGroupC();
    setNewContents({ ...newContents, workGroup: "C조" });
    getEmpList("C조");
  };
  const onClickGroupD = async (e) => {
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
  const onSupportAddRow = () => {
    const Grid = refSupportGrid?.current?.gridInst;
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
  const onSupportCancelRow = () => {
    refSupportGrid?.current?.gridInst?.removeRow(rowKey.current);
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
    refSupportGrid?.current?.gridInst?.finishEditing();
    const header = {
      shift_type: newContents.workType,
      worker_group_nm: newContents.workGroup,
      work_start_date: newContents.startDate,
      work_start_time: newContents.startTime,
      work_end_date: newContents.endDate,
      work_end_time: newContents.endTime,
      remark: newContents.remark,
      issue: newContents.issue,
    };
    let result = [];
    let supportResult = [];
    for (let i = 0; i < refGrid?.current?.gridInst?.getRowCount(); i++) {
      result.push(refGrid?.current?.gridInst?.getRowAt(i));
    }
    for (let i = 0; i < refSupportGrid?.current?.gridInst?.getRowCount(); i++) {
      supportResult.push(refSupportGrid?.current?.gridInst?.getRowAt(i));
    }

    const detail = result.map((raw) => GetPostParams("workGroupStatusDetail", raw));
    const supportDetail = supportResult.map((raw) => detail.push(GetPostParams("supportWorkGroupStatusDetail", raw)));

    const query = {
      header: header,
      details: detail,
    };

    // return;
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
  const GridSupport = useMemo(() => {
    return (
      <GridSingle
        rowHeaders={rowHeaders}
        columns={columns}
        columnOptions={columnOptions}
        onClickGrid={onClickGrid}
        onDblClickGrid={onDblClickNewSupportGrid}
        onEditingFinish={onEditingFinish}
        data={gridSupportData}
        refGrid={refSupportGrid}
        isEditMode={true}
      />
    );
  }, [refSupportGrid.current, onClickGrid, gridSupportData]);
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
          {/* <S.GroupWrap>
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
          </S.GroupWrap> */}
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
              value={newContents.remark}
              onChange={handleRemark}
              placeholder="작업이슈에 대해 작성해주세요."
            />
            <S.Title>파견현황</S.Title>
            <S.Issue
              rows={4}
              value={newContents.issue}
              onChange={handleIssue}
              placeholder="파견직의 이름, 작업시간, 작업내용을 작성 바랍니다."
            />
          </S.GroupWrap>
          {/* <S.GroupWrap className={"columnDirection"}>
            
          </S.GroupWrap> */}
        </S.ContentLeft>
        <S.ContentRight>
          <S.RowsGridContainer Template={"5% 60% 35%"}>
            <S.ButtonWrap>
              <BtnComponent btnName={"Save"} onClick={onNewSave} />
            </S.ButtonWrap>
            <div style={{ width: "100%", height: "100%" }}>
              <div style={{ display: "flex" }}>
                <S.GridTitle>작업자</S.GridTitle>
                <S.ButtonWrap>
                  <BtnComponent btnName={"AddRow"} onClick={onNewAddRow} />
                  <BtnComponent btnName={"CancelRow"} onClick={onNewCancelRow} />
                </S.ButtonWrap>
              </div>
              <S.GridWrap>{Grid}</S.GridWrap>
            </div>

            <div style={{ width: "100%", height: "100%" }}>
              <div style={{ display: "flex" }}>
                <S.GridTitle>근무지원 (다른 조원을 작성)</S.GridTitle>
                <S.ButtonWrap>
                  <BtnComponent btnName={"AddRow"} onClick={onSupportAddRow} />
                  <BtnComponent btnName={"CancelRow"} onClick={onSupportCancelRow} />
                </S.ButtonWrap>
              </div>
              <S.GridWrap>{GridSupport}</S.GridWrap>
            </div>
          </S.RowsGridContainer>
        </S.ContentRight>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalAddNew;
