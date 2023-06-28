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
    mainContents = {},
    setIsBackDrop = {},
    setIsSnackOpen = {},
    isSnackOpen = false,
    workGroupId = "",
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
  }, [mainContents]);
  const rowKey = useRef("");
  const onClickGrid = useCallback((e) => {
    rowKey.current = e.rowKey;
  }, []);
  const onCancelRow = () => {
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
      const resultData = data.map((raw) => GetPostParams("workerGroupStatusAddEmp", raw));
      if (resultData) {
        const result = await restAPI.post(restURI.workerGroupStatusDetail, resultData);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });

        const reSearch = await restAPI.get(
          restURI.workerGroupStatusDetailChip + `?worker_group_status_id=${workGroupId}`
        );
        const data = reSearch?.data?.data?.rows;
        setChipData(data);

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
        <S.ButtonWrap>
          <BtnComponent btnName={"AddRow"} onClick={onAddRow} />
          <BtnComponent btnName={"CancelRow"} onClick={onCancelRow} />
          <BtnComponent btnName={"Save"} onClick={onSave} />
        </S.ButtonWrap>
        <S.GridWrap>{Grid}</S.GridWrap>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalAddEmp;
