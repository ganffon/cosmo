import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import DateTime from "components/datetime/DateTime";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalDataLoad.styled";
import BtnComponent from "components/button/BtnComponent";
import NoticeSnack from "components/alert/NoticeSnack";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import GridSingle from "components/grid/GridSingle";
import * as Cbo from "custom/useCboSet";
import { TextField } from "@mui/material";
import CN from "json/ColumnName.json";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

function ModalDataLoad(props) {
  const {
    onModalDataLoadClose = () => {},
    onDblModalDataLoad = () => {},
    onDblModalDataLoadInput = () => {},
    onDblModalDataLoadDetail = () => {},
    onNewSave = () => {},
    refGridHeader = null,
    refGridInput = null,
    refGridDetail = null,
    requireColumns = [],
    columns = [],
    columnsInput = [],
    columnsDetail = [],
    columnOptions,
    header,
    rowHeaders,
    data = [],
    setIsDataLoadMode,
    isDataLoadMode,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isDataLoadLineSelectOpen, setIsDataLoadLineSelectOpen] = useState(false);
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [lineOpt, lineList] = Cbo.useLine();

  useEffect(() => {
    refGridHeader?.current?.gridInst?.appendRow();
  }, []);

  let rowKey;
  const handleClickedRowKey = (e) => {
    rowKey = e.rowKey;
  };

  const handleCancelRow = (refGrid) => {
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

  const requireColumnsValidation = (refGrid) => {
    try {
      refGrid?.current?.gridInst?.finishEditing();
      const gridInstance = refGrid?.current?.getInstance();
      const rawDatas = gridInstance?.store?.data?.rawData;
      for (let i = 0; i < rawDatas.length; i++) {
        if (rawDatas[i] !== undefined) {
          for (let j = 0; j < requireColumns.length; j++) {
            const validationData = rawDatas[i][requireColumns[j]];
            if (validationData === null || validationData === "") {
              throw new Error();
            }
          }
        }
      }

      refGrid?.current?.gridInst?.finishEditing();
      const gridInstanceForHeader = refGrid?.current?.getInstance();
      const rawDatasForHeader = gridInstanceForHeader?.store?.data?.rawData;
      for (let i = 0; i < rawDatasForHeader.length; i++) {
        if (rawDatasForHeader[i] !== undefined) {
          for (let j = 0; j < requireColumns.length; j++) {
            const validationData = rawDatasForHeader[i][requireColumns[j]];
            if (validationData === null || validationData === "") {
              throw new Error();
            }
          }
        }
      }
    } catch {
      return "nullValidationError";
    }
  };

  const removeNullRow = (refGrid) => {
    refGrid?.current?.gridInst?.finishEditing();
    const gridInstance = refGrid?.current?.getInstance();
    const columnLength = gridInstance?.store?.viewport?.columns?.length;
    const columnList = [];
    for (let i = 0; i < columnLength; i++) {
      columnList[i] = gridInstance?.store?.viewport?.columns[i].name;
    }
    const rawDataLength = gridInstance?.store?.data?.rawData.length;
    let deleteRawList = [];
    const rawDatas = gridInstance?.store?.data?.rawData;

    for (let i = 0; i < rawDataLength; i++) {
      let counter = 0;
      let data = rawDatas[i];
      for (let x = 0; x < columnLength; x++) {
        let tmpData = data[columnList[x]];
        if (!tmpData) {
        } else {
          counter = counter + 1;
        }
      }
      if (counter === 0) {
        deleteRawList[i] = data.rowKey;
      }
    }

    for (let j = 0; j < deleteRawList.length; j++) {
      if (deleteRawList[j] !== undefined) {
        gridInstance?.removeRow(deleteRawList[j]);
      }
    }
  };

  const [gridData, setGridData] = useState([]);

  const handleSearch = async (lineID = null) => {
    try {
      let lineId, param;

      lineId = lineID ? lineID : null;

      param = lineId ? `?line_id=${lineId}` : "";

      const result = await restAPI.get(restURI.inspDocument + param);

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
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <ModalWrapMulti width={"80%"} height={"80%"}>
      <S.HeaderBox>
        <S.TitleBox>{currentMenuName}</S.TitleBox>
        <S.ButtonClose color="primary" onClick={onModalDataLoadClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ShadowBox>
        <S.ShadowBoxButtonHeader>
          <S.ComboBox
            disablePortal
            id="lineCbo"
            size="small"
            key={(option) => option?.line_id}
            options={lineOpt || null}
            getOptionLabel={(option) => option?.line_nm || ""}
            onChange={(e, newValue) => {
              console.dir(e.target.tagName);
              setComboValue({
                ...comboValue,
                line_id: newValue?.line_id === undefined ? null : newValue?.line_id,
              });
              if (e.target.tagName === "svg") {
                console.log("?!");
                handleSearch();
              } else {
                handleSearch(!newValue?.line_id ? null : newValue?.line_id);
              }
            }}
            renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
          />
        </S.ShadowBoxButtonHeader>
        <S.GridHeaderWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            refGrid={refGridHeader}
            data={gridData}
            isEditMode={true}
            onDblClickGrid={onDblModalDataLoad}
          />
        </S.GridHeaderWrap>
      </S.ShadowBox>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ModalWrapMulti>
  );
}

export default ModalDataLoad;
