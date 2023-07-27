import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalAddEmp.styled";
import InputPaper from "components/input/InputPaper";
import DateTime from "components/datetime/DateTime";
import * as RE from "custom/RegularExpression";
import BtnComponent from "components/button/BtnComponent";
import GridSingle from "components/grid/GridSingle";
import Condition from "custom/Condition";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

function ModalAddEmp(props) {
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
    setChipData = () => {},
    setSupportChipData = () => {},
    mainContents = {},
    setIsBackDrop = {},
    setIsSnackOpen = {},
    isSnackOpen = false,
    workGroupId = "",
    isSupport = "",
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const onAddRow = () => {
    const Grid = refGrid?.current?.gridInst;
    const rowKey = Grid.getRowCount();
    Grid.appendRow();

    Grid.setValue(rowKey, "worker_group_status_id", workGroupId);
    Grid.setValue(rowKey, "work_start_date", mainContents.startDate);
    Grid.setValue(rowKey, "work_start_time", mainContents.startTime);
    Grid.setValue(rowKey, "work_end_date", mainContents.endDate);
    Grid.setValue(rowKey, "work_end_time", mainContents.endTime);
  };
  useEffect(() => {
    const Grid = refGrid?.current?.gridInst;
    const maxRow = Grid.getRowCount();
    for (let i = 0; maxRow >= i; i++) {
      Grid.setValue(i, "work_start_date", mainContents.startDate);
      Grid.setValue(i, "work_start_time", mainContents.startTime);
      Grid.setValue(i, "work_end_date", mainContents.endDate);
      Grid.setValue(i, "work_end_time", mainContents.endTime);
    }
  }, [mainContents, isSupport]);
  let rowKey;
  const onClickGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onCancelRow = () => {
    if (rowKey !== undefined) {
      // 선택한 Row가 있는 경우, 해당 Row의 키를 기반으로 데이터에서 찾아 제거
      const gridInstance = refGrid.current?.getInstance();
      // 선택한 Row가 있는 경우, 해당 Row 삭제
      gridInstance?.removeRow(rowKey);
    } else {
      // 선택한 Row가 없는 경우, 마지막 Row 제거
      const gridInstance = refGrid.current?.getInstance();
      const rowCount = refGrid.current?.getInstance()?.getData()?.length;
      if (rowCount > 0) {
        const lastRowKey = gridInstance.getRowAt(rowCount - 1).rowKey;
        gridInstance?.removeRow(lastRowKey);
      }
    }
    rowKey = undefined;
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
  const onSave = async () => {
    refGrid?.current?.gridInst?.finishEditing();

    try {
      setIsBackDrop(true);
      const Grid = refGrid?.current?.gridInst;
      Grid?.finishEditing();

      let data = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        data.push(Grid?.getRowAt(i));
      }
      let resultData = "";
      if (isSupport === true) {
        // Support일때
        resultData = data.map((raw) => GetPostParams("workerGroupStatusAddSupportEmp", raw));
      } else {
        resultData = data.map((raw) => GetPostParams("workerGroupStatusAddEmp", raw));
      }
      //
      if (resultData) {
        const result = await restAPI.post(restURI.workerGroupStatusDetail, resultData);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });

        const reSearch = await restAPI.get(restURI.workerGroupStatusDetailChip + `?worker_group_status_id=${workGroupId}`);
        const data = reSearch?.data?.data?.rows[0];
        setChipData(data.worker);
        setSupportChipData(data.support);
        onClickModalClose();
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
  const Grid = useMemo(() => {
    return (
      <GridSingle
        rowHeaders={rowHeaders}
        columns={columns}
        columnOptions={columnOptions}
        onClickGrid={onClickGrid}
        onDblClickGrid={onDblClickGrid}
        onEditingFinish={onEditingFinish}
        data={data}
        refGrid={refGrid}
        isEditMode={true}
      />
    );
  }, [refGrid.current, onClickGrid]);
  return (
    <S.ModalWrapBox width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{currentMenuName}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Content>
        <div style={{ display: "flex", width: "100%" }}>
          {isSupport === true && <S.TitleBox>근무 지원 추가</S.TitleBox>}
          {isSupport !== true && <S.TitleBox>작업자 추가</S.TitleBox>}
          <S.ButtonWrap>
            <BtnComponent btnName={"AddRow"} onClick={onAddRow} />
            <BtnComponent btnName={"CancelRow"} onClick={onCancelRow} />
            <BtnComponent btnName={"Save"} onClick={onSave} />
          </S.ButtonWrap>
        </div>
        <S.GridWrap>{Grid}</S.GridWrap>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalAddEmp;
