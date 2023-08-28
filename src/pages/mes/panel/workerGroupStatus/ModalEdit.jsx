import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalEdit.styled";
import InputPaper from "components/input/InputPaper";
import DateTime from "components/datetime/DateTime";
import * as RE from "custom/RegularExpression";
import BtnComponent from "components/button/BtnComponent";
import GridSingle from "components/grid/GridSingle";
import Condition from "custom/Condition";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import GetPutParams from "api/GetPutParams";

function ModalEdit(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onClickSearch = () => {},
    onSearchAfterEdit = () => {},
    onEditingFinishInput = () => {},
    onClickGridInput = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
    onDblClickGrid = () => {},
    onDblClickEditSupportGrid = () => {},
    refGrid = [],
    refSupportGrid = [],
    columns = [],
    columnOptions = [],
    data = [],
    header = [],
    rowHeaders = [],
    setEditContents = () => {},
    editContents = {},
    setIsBackDrop = {},
    setIsSnackOpen = {},
    isSnackOpen = false,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);
  const [gridOriginalData, setGridOriginalData] = useState();
  const [originalGroup, setOriginalGroup] = useState();
  const [GridOriginalSupportData, setGridOriginalSupportData] = useState();
  const [gridData, setGridData] = useState();
  const [gridSupportData, setGridSupportData] = useState([]);
  useEffect(() => {
    setOriginalGroup(editContents.workGroup); // 수정하는 상황에서 기존에 등록하였던 조를 기억하기 위함
    switch (editContents.workTime) {
      case "오전":
        onMng();
        break;
      case "오후":
        onAft();
        break;
      case "야간":
        onNig();
        break;
      default:
    }
    switch (editContents.workGroup) {
      case "A조":
        onGroupA();
        break;
      case "B조":
        onGroupB();
        break;
      case "C조":
        onGroupC();
        break;
      case "D조":
        onGroupD();
        break;
      default:
    }
    onLoadEditData();
  }, []);

  function onMng() {
    const mngElement = document.getElementById("EditMng");
    const aftElement = document.getElementById("EditAft");
    const nigElement = document.getElementById("EditNig");
    mngElement.classList.add("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.remove("selected");
  }
  function onAft() {
    const mngElement = document.getElementById("EditMng");
    const aftElement = document.getElementById("EditAft");
    const nigElement = document.getElementById("EditNig");
    mngElement.classList.remove("selected");
    aftElement.classList.add("selected");
    nigElement.classList.remove("selected");
  }
  function onNig() {
    const mngElement = document.getElementById("EditMng");
    const aftElement = document.getElementById("EditAft");
    const nigElement = document.getElementById("EditNig");
    mngElement.classList.remove("selected");
    aftElement.classList.remove("selected");
    nigElement.classList.add("selected");
  }
  const datePickerChange = (e) => {
    setEditContents({ ...editContents, [e.target.id]: e.target.value });
  };
  const handleRemark = (e) => {
    setEditContents({ ...editContents, remark: e.target.value });
  };
  const handleIssue = (e) => {
    setEditContents({ ...editContents, issue: e.target.value });
  };
  const onClickWorkTypeMng = (e) => {
    onMng();
    setEditContents({
      ...editContents,
      workType: "오전",
      startDate: DateTime().dateFull,
      startTime: "06:00",
      endDate: DateTime().dateFull,
      endTime: "14:00",
    });
  };
  const onClickWorkTypeAft = (e) => {
    onAft();
    setEditContents({
      ...editContents,
      workType: "오후",
      startDate: DateTime().dateFull,
      startTime: "14:00",
      endDate: DateTime().dateFull,
      endTime: "22:00",
    });
  };
  const onClickWorkTypeNig = (e) => {
    onNig();
    setEditContents({
      ...editContents,
      workType: "야간",
      startDate: DateTime().dateFull,
      startTime: "22:00",
      endDate: DateTime(1).dateFull,
      endTime: "06:00",
    });
  };
  function onGroupA() {
    const groupA = document.getElementById("EditGroupA");
    const groupB = document.getElementById("EditGroupB");
    const groupC = document.getElementById("EditGroupC");
    const groupD = document.getElementById("EditGroupD");
    groupA.classList.add("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  }
  function onGroupB() {
    const groupA = document.getElementById("EditGroupA");
    const groupB = document.getElementById("EditGroupB");
    const groupC = document.getElementById("EditGroupC");
    const groupD = document.getElementById("EditGroupD");
    groupA.classList.remove("selected");
    groupB.classList.add("selected");
    groupC.classList.remove("selected");
    groupD.classList.remove("selected");
  }
  function onGroupC() {
    const groupA = document.getElementById("EditGroupA");
    const groupB = document.getElementById("EditGroupB");
    const groupC = document.getElementById("EditGroupC");
    const groupD = document.getElementById("EditGroupD");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.add("selected");
    groupD.classList.remove("selected");
  }
  function onGroupD() {
    const groupA = document.getElementById("EditGroupA");
    const groupB = document.getElementById("EditGroupB");
    const groupC = document.getElementById("EditGroupC");
    const groupD = document.getElementById("EditGroupD");
    groupA.classList.remove("selected");
    groupB.classList.remove("selected");
    groupC.classList.remove("selected");
    groupD.classList.add("selected");
  }
  const getEmpList = async (group) => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.workerGroupStatusEmpList + `?worker_group_nm=${group}`);

      setGridData(result?.data?.data?.rows[0]?.worker);
      setGridSupportData(result?.data?.data?.rows[0]?.support);
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
  const handleTime = (e) => {
    const timeValue = RE.TimeInput(e?.target?.value);
    if (timeValue.length < 6) {
      setEditContents({ ...editContents, [e.target.id]: timeValue });
    }
  };
  const refPrevEditContents = useRef(editContents);
  useEffect(() => {
    // editContents 안에서 remark, issue 2개가 수정되는 경우는 useEffect 동작 안하도록 수정함.
    const isOtherFieldsChanged = Object.keys(editContents).some((key) => {
      if (key === "remark" || key === "issue") {
        return false;
      }
      return editContents[key] !== refPrevEditContents.current[key];
    });
    if (isOtherFieldsChanged) {
      const Grid = refGrid?.current?.gridInst;
      const maxRow = Grid.getRowCount();
      for (let i = 0; maxRow >= i; i++) {
        Grid.setValue(i, "work_start_date", editContents.startDate);
        Grid.setValue(i, "work_start_time", editContents.startTime);
        Grid.setValue(i, "work_end_date", editContents.endDate);
        Grid.setValue(i, "work_end_time", editContents.endTime);
      }
      refPrevEditContents.current = editContents;
    }
  }, [editContents]);

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
  const onSupportEditingFinish = (e) => {
    if (Condition(e, ["work_start_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refSupportGrid, "work_start_time");
    }
    if (Condition(e, ["work_end_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refSupportGrid, "work_end_time");
    }
  };
  const onLoadEditData = async () => {
    try {
      setIsBackDrop(true);
      // const result = await restAPI.get(restURI.workerGroupStatusDetail + `?worker_group_status_id=${editContents.workId}`);
      const result = await restAPI.get(
        restURI.workerGroupStatusDetailByUpdate + `?worker_group_status_id=${editContents.workId}`
      );

      setGridOriginalData(result?.data?.data?.rows[0]?.worker); // 수정하는 상황에서 기존에 등록되어있던 gridData 기억용
      setGridData(result?.data?.data?.rows[0]?.worker); // 실제로 뿌려주는 용도
      setGridOriginalSupportData(result?.data?.data?.rows[0]?.support); // 수정하는 상황에서 기존에 등록되어있던 gridData 기억용
      setGridSupportData(result?.data?.data?.rows[0]?.support); // 실제로 뿌려주는 용도
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
  const onEditSave = async () => {
    if (!editContents.workTime) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작업시간을 선택하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!editContents.workGroup) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작업조를 선택하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!editContents.startTime) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "시작시간을 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    if (!editContents.endTime) {
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
      shift_type: editContents.workType,
      worker_group_nm: editContents.workGroup,
      work_start_date: editContents.startDate,
      work_start_time: editContents.startTime,
      work_end_date: editContents.endDate,
      work_end_time: editContents.endTime,
      remark: editContents.remark,
      issue: editContents.issue,
    };
    let result = [];
    let supportResult = [];

    for (let i = 0; i < refGrid?.current?.gridInst?.getRowCount(); i++) {
      result.push(refGrid?.current?.gridInst?.getRowAt(i));
    }
    for (let i = 0; i < refSupportGrid?.current?.gridInst?.getRowCount(); i++) {
      supportResult.push(refSupportGrid?.current?.gridInst?.getRowAt(i));
    }

    const detail = result.map((raw) => GetPutParams("workGroupStatus", raw));
    const supportDetail = supportResult.map((raw) => detail.push(GetPutParams("supportWorkGroupStatusDetail", raw)));

    const query = {
      header: header,
      details: detail,
    };

    const URI = restURI.workerGroupStatusEdit.replace("{id}", editContents.workId);

    if (query.details !== undefined) {
      setIsBackDrop(true);
      await restAPI
        .put(URI, query)
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
          setTimeout(() => {
            onClickModalClose();
            onClickSearch();
            onSearchAfterEdit();
          }, 300);
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.message ? res?.message : res?.response?.data?.message,
            severity: "error",
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
        header={header}
        rowHeaders={rowHeaders}
        columns={columns}
        columnOptions={columnOptions}
        onDblClickGrid={onDblClickGrid}
        onEditingFinish={onEditingFinish}
        data={gridData}
        refGrid={refGrid}
        isEditMode={true}
      />
    );
  }, [refGrid.current, gridData]);
  const GridSupport = useMemo(() => {
    return (
      <GridSingle
        header={header}
        rowHeaders={rowHeaders}
        columns={columns}
        columnOptions={columnOptions}
        // onClickGrid={onClickGrid}
        onDblClickGrid={onDblClickEditSupportGrid}
        onEditingFinish={onSupportEditingFinish}
        data={gridSupportData}
        refGrid={refSupportGrid}
        isEditMode={true}
      />
    );
  }, [refSupportGrid.current, gridSupportData]);

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
            <S.workButton id={"EditMng"} onClick={onClickWorkTypeMng}>
              {"오전"}
            </S.workButton>
            <S.workButton id={"EditAft"} onClick={onClickWorkTypeAft}>
              {"오후"}
            </S.workButton>
            <S.workButton id={"EditNig"} onClick={onClickWorkTypeNig}>
              {"야간"}
            </S.workButton>
          </S.GroupWrap>
          <S.GroupWrap>
            <S.Title>작업조</S.Title>
            <S.GroupButton id={"EditGroupA"}>{"A조"}</S.GroupButton>
            <S.GroupButton id={"EditGroupB"}>{"B조"}</S.GroupButton>
            <S.GroupButton id={"EditGroupC"}>{"C조"}</S.GroupButton>
            <S.GroupButton id={"EditGroupD"}>{"D조"}</S.GroupButton>
          </S.GroupWrap>
          <S.GroupWrap>
            <S.Title>작성자</S.Title>
            <InputPaper
              width={"300px"}
              height={"60px"}
              value={editContents.writer || ""}
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
              // defaultValue={DateTime().dateFull}
              value={editContents.startDate || ""}
              InputProps={{ sx: { height: 60 } }}
              onChange={datePickerChange}
            />
            <S.Title>시작시간</S.Title>
            <InputPaper
              id={"startTime"}
              width={"120px"}
              height={"60px"}
              value={editContents.startTime || ""}
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
              // defaultValue={DateTime().dateFull}
              value={editContents.endDate || ""}
              InputProps={{ sx: { height: 60 } }}
              onChange={datePickerChange}
            />
            <S.Title>종료시간</S.Title>
            <InputPaper
              id={"endTime"}
              width={"120px"}
              height={"60px"}
              value={editContents.endTime || ""}
              size={"30px"}
              onTextChange={handleTime}
              readOnly={false}
            />
          </S.GroupWrap>
          {/* <S.GroupWrap className={"columnDirection"}>
            <S.Title>작업이슈</S.Title>
            <S.Issue rows={4} value={editContents.issue || ""} onChange={handleIssue} placeholder="작업이슈에 대해 작성해주세요." />
          </S.GroupWrap> */}
          <S.GroupWrap className={"columnDirection"}>
            <S.Title>작업이슈</S.Title>
            <S.Issue
              rows={4}
              value={editContents.remark}
              onChange={handleRemark}
              placeholder="작업이슈에 대해 작성해주세요."
            />
            <S.Title>파견현황</S.Title>
            <S.Issue
              rows={4}
              value={editContents.issue}
              onChange={handleIssue}
              placeholder="파견직의 이름, 작업시간, 작업내용을 작성 바랍니다."
            />
          </S.GroupWrap>
        </S.ContentLeft>
        <S.ContentRight>
          <S.ButtonWrap>
            <BtnComponent btnName={"Save"} onClick={onEditSave} />
          </S.ButtonWrap>
          <div style={{ width: "100%", height: "calc(100% - 50px)" }}>
            <div style={{ display: "flex", height: "50px" }}>
              <S.GridTitle>작업자</S.GridTitle>
            </div>
            <S.GridWrap>{Grid}</S.GridWrap>
          </div>
          {/* <div style={{ width: "100%", height: "100%" }}>
            <div style={{ display: "flex" }}>
              <S.GridTitle>근무지원 (다른 조원을 작성)</S.GridTitle>
            </div>
            <S.GridWrap>{GridSupport}</S.GridWrap>
          </div> */}
        </S.ContentRight>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalEdit;
