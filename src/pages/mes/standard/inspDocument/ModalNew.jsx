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

function ModalNew(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onModalNewClose = () => {},
    onClickModalDetailClose = () => {},
    onClickEditModalSave = () => {},
    onClickGridModalDetail = () => {},
    onDblModalNewHeader = () => {},
    onDblModalNewInput = () => {},
    onDblModalNewDetail = () => {},
    onEditingFinishGridModalHeader = () => {},
    onEditingFinishGridModalDetail = () => {},
    onClickGridModalHeader = () => {},
    onNewSave = () => {},
    refGridHeader = null,
    refGridInput = null,
    refGridDetail = null,
    requireColumns = [],
    columnsHeader = [],
    columnsInput = [],
    columnsDetail = [],
    columnOptions,
    header,
    rowHeaders,
    data = [],
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

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

  const modalSaveNew = () => {
    removeNullRow();
    requireColumnsValidation();
    if (requireColumnsValidation() === "nullValidationError") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: `필수값을 입력해주세요.`,
        severity: "error",
      });
    } else {
      onClickModalSave();
    }
    //onClickModalSave();
  };

  const modalSaveEdit = () => {
    removeNullRow();
    requireColumnsValidation();
    if (requireColumnsValidation() === "nullValidationError") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: `필수값을 입력해주세요.`,
        severity: "error",
      });
    } else {
      onClickEditModalSave();
    }
    //onClickModalSave();
  };

  // const GridDetail = useMemo(() => {
  //   return (
  //     <GridModal
  //       data={gridDataDetail}
  //       columns={columnsModalDetail}
  //       columnOptions={columnOptions}
  //       header={header}
  //       rowHeaders={rowHeaders}
  //       refGrid={refGridModalDetail}
  //       draggable={false}
  //       onClick={(e) => {
  //         handleClickedRowKey(e);
  //         onClickGridModalDetail(e);
  //       }}
  //       onDblClick={onDblClickGridModalDetail}
  //       onEditingFinish={onEditingFinishGridModalDetail}
  //     />
  //   );
  // }, [gridDataDetail]);

  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeaders}
        header={header}
        refGrid={refGridHeader}
        data={data}
        isEditMode={true}
        onDblClickGrid={onDblModalNewHeader}
      />
    );
  }, []);
  const GridInput = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsInput}
        rowHeaders={rowHeaders}
        header={header}
        refGrid={refGridInput}
        data={data}
        isEditMode={true}
        onClickGrid={(e) => handleClickedRowKey(e)}
        onDblClickGrid={onDblModalNewInput}
      />
    );
  }, []);
  const GridDetail = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsDetail}
        rowHeaders={rowHeaders}
        header={header}
        refGrid={refGridDetail}
        data={data}
        isEditMode={true}
        onClickGrid={(e) => handleClickedRowKey(e)}
        onDblClickGrid={onDblModalNewDetail}
      />
    );
  }, []);

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
      {/* <S.GridTopTitleBox>{modalTitle}</S.GridTopTitleBox>
      <S.GridBoxTop>
        <GridModal
          data={isNewDetail ? gridDataHeaderRowID : null}
          columns={columnsModalHeader}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersHeader}
          refGrid={refGridModalHeader}
          draggable={false}
          onClick={onClickGridModalHeader}
          onDblClick={onDblClickGridModalHeader}
          onEditingFinish={onEditingFinishGridModalHeader}
        />
      </S.GridBoxTop>
      <S.ButtonBox>
        {!isNewDetail && <BtnComponent btnName="DataLoad" onClick={onDataLoad} />}
        <BtnComponent btnName="AddRow" onClick={onClickModalAddRow} />
        <BtnComponent
          btnName="CancelRow"
          onClick={() => {
            onClickModalCancelRow();
            handleCancelRow();
          }}
        />
        <BtnComponent btnName="Save" onClick={isNewDetail ? modalSaveEdit : modalSaveNew} />
      </S.ButtonBox>
      <S.GridBoxBottom>{GridDetail}</S.GridBoxBottom> */}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ModalWrapMulti>
  );
}

export default ModalNew;
