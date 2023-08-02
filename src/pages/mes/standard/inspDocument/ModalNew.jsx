import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import DateTime from "components/datetime/DateTime";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNew.styled";
import BtnComponent from "components/button/BtnComponent";
import NoticeSnack from "components/alert/NoticeSnack";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import GridSingle from "components/grid/GridSingle";
import ModalDataLoad from "./ModalDataLoad";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

function ModalNew(props) {
  const {
    onModalNewClose = () => {},
    onDblModalNewHeader = () => {},
    onDblModalNewInput = () => {},
    onDblModalNewDetail = () => {},
    onNewSave = () => {},
    refGridHeader = null,
    refGridInput = null,
    refGridDetail = null,
    requireColumns = [],
    columnsHeader = [],
    columnsInput = [],
    columnsDetail = [],
    columnsAddHeader = [],
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
  const [gridHeaderData, setGridHeaderData] = useState([]);
  const [gridDataInput, setGridDataInput] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);

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

  const onEditingFinishHeader = () => {
    const Grid = refGridHeader?.current?.gridInst;
    const gridData = Grid?.getData();
    const resultData = gridData?.map((item, index) => {
      //최종적으로 만들어진 데이터에 uniqueKey와 rowKey를 재선언함
      return { ...item, uniqueKey: `@dataKey${Date.now()}-${index}`, rowKey: index };
    });
    setGridHeaderData(resultData);
  };

  const onDblModalDataLoad = async (e) => {
    if (e?.targetType === "cell") {
      const lineID = e?.instance?.store?.data?.rawData[e?.rowKey].line_id;
      const lineNM = e?.instance?.store?.data?.rawData[e?.rowKey].line_nm;
      const inspDocumentID = e?.instance?.store?.data?.rawData[e?.rowKey].insp_document_id;

      const result = await restAPI.get(restURI.inspDocumentInput + `?insp_document_id=${inspDocumentID}`);
      setGridDataInput(result?.data?.data?.rows);
      const result2 = await restAPI.get(restURI.inspDocumentDetail + `?insp_document_id=${inspDocumentID}`);
      setGridDataDetail(result2?.data?.data?.rows);

      const Grid = refGridHeader?.current?.gridInst;

      Grid.setValue(0, "line_id", lineID);
      Grid.setValue(0, "line_nm", lineNM);

      setIsDataLoadLineSelectOpen(false);
    }
  };

  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeaders}
        header={header}
        refGrid={refGridHeader}
        data={gridHeaderData}
        isEditMode={true}
        onDblClickGrid={onDblModalNewHeader}
        onEditingFinish={onEditingFinishHeader}
      />
    );
  }, [isDataLoadMode]);
  const GridInput = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsInput}
        rowHeaders={rowHeaders}
        header={header}
        refGrid={refGridInput}
        data={gridDataInput}
        isEditMode={true}
        onClickGrid={(e) => handleClickedRowKey(e)}
        onDblClickGrid={onDblModalNewInput}
      />
    );
  }, [gridDataInput]);
  const GridDetail = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsDetail}
        rowHeaders={rowHeaders}
        header={header}
        refGrid={refGridDetail}
        data={gridDataDetail}
        isEditMode={true}
        onClickGrid={(e) => handleClickedRowKey(e)}
        onDblClickGrid={onDblModalNewDetail}
      />
    );
  }, [gridDataDetail]);

  return (
    <ModalWrapMulti width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>{currentMenuName}</S.TitleBox>
        <S.ButtonClose color="primary" onClick={onModalNewClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ScrollBox>
        <S.ShadowBoxHeader>
          <S.ShadowBoxButtonHeader>
            <S.Title>제품</S.Title>
            <S.ButtonWrap>
              <BtnComponent
                btnName={"DataLoad"}
                onClick={() => {
                  setIsDataLoadMode(true);
                  setIsDataLoadLineSelectOpen(true);
                }}
              />
              <BtnComponent btnName={"Save"} onClick={onNewSave} />
            </S.ButtonWrap>
          </S.ShadowBoxButtonHeader>
          <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
        </S.ShadowBoxHeader>
        <S.ShadowBoxInput>
          <S.ShadowBoxButtonHeader>
            <S.Title>투입품</S.Title>
            <S.ButtonWrap>
              <BtnComponent
                btnName={"AddRow"}
                onClick={() => {
                  refGridInput?.current?.gridInst?.appendRow();
                }}
              />
              <BtnComponent
                btnName={"CancelRow"}
                onClick={() => {
                  handleCancelRow(refGridInput);
                }}
              />
            </S.ButtonWrap>
          </S.ShadowBoxButtonHeader>
          <S.GridHeaderWrap>{GridInput}</S.GridHeaderWrap>
        </S.ShadowBoxInput>
        <S.ShadowBoxDetail>
          <S.ShadowBoxButtonHeader>
            <S.Title>검사기준서</S.Title>
            <S.ButtonWrap>
              <BtnComponent
                btnName={"AddRow"}
                onClick={() => {
                  refGridDetail?.current?.gridInst?.appendRow();
                }}
              />
              <BtnComponent
                btnName={"CancelRow"}
                onClick={() => {
                  handleCancelRow(refGridDetail);
                }}
              />
            </S.ButtonWrap>
          </S.ShadowBoxButtonHeader>
          <S.GridHeaderWrap>{GridDetail}</S.GridHeaderWrap>
        </S.ShadowBoxDetail>
      </S.ScrollBox>
      {isDataLoadLineSelectOpen && (
        <ModalDataLoad
          columnOptions={columnOptions}
          columns={columnsAddHeader}
          rowHeaders={rowHeaders}
          header={header}
          refGrid={refGridDetail}
          data={data}
          isEditMode={true}
          onClickGrid={(e) => handleClickedRowKey(e)}
          onModalDataLoadClose={() => setIsDataLoadLineSelectOpen(false)}
          onDblModalDataLoad={onDblModalDataLoad}
        />
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ModalWrapMulti>
  );
}

export default ModalNew;
