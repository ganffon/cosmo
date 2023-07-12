import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import DateTime from "components/datetime/DateTime";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalDocument.styled";
import BtnComponent from "components/button/BtnComponent";
import NoticeSnack from "components/alert/NoticeSnack";

function Modaldocument(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickModalDetailClose = () => {},
    onClickEditModalSave = () => {},
    onClickGridModalDetail = () => {},
    onDblClickGridModalHeader = () => {},
    onDblClickGridModalDetail = () => {},
    onEditingFinishGridModalHeader = () => {},
    onEditingFinishGridModalDetail = () => {},
    onClickGridModalHeader = () => {},
    onDataLoad = () => {},
    refGridModalHeader,
    refGridModalDetail,
    requirecolumns = [],
    isNewDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnOptions,
    header,
    rowHeadersHeader,
    rowHeadersDetail,
    gridDataHeaderRowID,
    gridDataDetail,
    modalTitle,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  useEffect(() => {
    if (!isNewDetail) {
      refGridModalHeader?.current?.gridInst?.appendRow();
      refGridModalHeader?.current?.gridInst.setValue(0, "subdivision_date", DateTime().dateFull);
    }
  }, []);

  const requireColumnsValidation = () => {
    try {
      refGridModalDetail?.current?.gridInst?.finishEditing();
      const gridInstance = refGridModalDetail?.current?.getInstance();
      const rawDatas = gridInstance?.store?.data?.rawData;
      for (let i = 0; i < rawDatas.length; i++) {
        if (rawDatas[i] !== undefined) {
          for (let j = 0; j < requirecolumns.length; j++) {
            const validationData = rawDatas[i][requirecolumns[j]];
            if (validationData === null || validationData === "") {
              throw new Error();
            }
          }
        }
      }

      refGridModalHeader?.current?.gridInst?.finishEditing();
      const gridInstanceForHeader = refGridModalHeader?.current?.getInstance();
      const rawDatasForHeader = gridInstanceForHeader?.store?.data?.rawData;
      for (let i = 0; i < rawDatasForHeader.length; i++) {
        if (rawDatasForHeader[i] !== undefined) {
          for (let j = 0; j < requirecolumns.length; j++) {
            const validationData = rawDatasForHeader[i][requirecolumns[j]];
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

  const removeNullRow = () => {
    refGridModalDetail?.current?.gridInst?.finishEditing();
    const gridInstance = refGridModalDetail?.current?.getInstance();
    const colunmLength = gridInstance?.store?.viewport?.columns?.length;
    const colunmList = [];
    for (let i = 0; i < colunmLength; i++) {
      colunmList[i] = gridInstance?.store?.viewport?.columns[i].name;
    }
    const rawDataLength = gridInstance?.store?.data?.rawData.length;
    let deleteRawList = [];
    const rawDatas = gridInstance?.store?.data?.rawData;

    for (let i = 0; i < rawDataLength; i++) {
      let counter = 0;
      let data = rawDatas[i];
      for (let x = 0; x < colunmLength; x++) {
        let tmpData = data[colunmList[x]];
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

  const GridDetail = useMemo(() => {
    return (
      <GridModal
        data={gridDataDetail}
        columns={columnsModalDetail}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersDetail}
        refGrid={refGridModalDetail}
        draggable={false}
        onClick={onClickGridModalDetail}
        onDblClick={onDblClickGridModalDetail}
        onEditingFinish={onEditingFinishGridModalDetail}
      />
    );
  }, [gridDataDetail]);

  return (
    <ModalWrap width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>{isNewDetail ? `[수정] ${currentMenuName}` : `[신규] ${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={isNewDetail ? onClickModalDetailClose : onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.GridTopTitleBox>{modalTitle}</S.GridTopTitleBox>
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
        <BtnComponent btnName="CancelRow" onClick={onClickModalCancelRow} />
        <BtnComponent btnName="Save" onClick={isNewDetail ? modalSaveEdit : modalSaveNew} />
      </S.ButtonBox>
      <S.GridBoxBottom>{GridDetail}</S.GridBoxBottom>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ModalWrap>
  );
}

export default Modaldocument;
