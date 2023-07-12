import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
import DateTime from "components/datetime/DateTime";
import GetAppIcon from "@mui/icons-material/GetApp";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalControlPlan.styled";
import BtnComponent from "components/button/BtnComponent";

function ModalControlPlan(props) {
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
    requireColumns = [],
    isNewDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnOptions,
    header,
    rowHeadersHeader,
    rowHeadersDetail,
    gridDataHeaderRowID,
    gridDataDetail,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    if (!isNewDetail) {
      refGridModalHeader?.current?.gridInst?.appendRow();
      refGridModalHeader?.current?.gridInst.setValue(0, "subdivision_date", DateTime().dateFull);
    }
  }, []);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const requireColumnsValidation = () => {
    try {
      refGridModalDetail?.current?.gridInst?.finishEditing();
      const gridInstance = refGridModalDetail?.current?.getInstance();
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

      refGridModalHeader?.current?.gridInst?.finishEditing();
      const gridInstanceForHeader = refGridModalHeader?.current?.getInstance();
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

  const removeNullRow = () => {
    refGridModalDetail?.current?.gridInst?.finishEditing();
    const gridInstance = refGridModalDetail?.current?.getInstance();
    const columnLength = gridInstance?.store?.viewport?.columns?.length;
    const columnList = [];
    for (let i = 0; i < columnLength; i++) {
      columnList[i] = gridInstance?.store?.viewport?.columns[i].name;
      console.log(columnList[i]);
    }
    const rawDataLength = gridInstance?.store?.data?.rawData.length;
    let deleteRawList = [];
    const rawDatas = gridInstance?.store?.data?.rawData;

    for (let i = 0; i < rawDataLength; i++) {
      let counter = 0;
      let data = rawDatas[i];
      for (let x = 0; x < columnLength; x++) {
        let tmpData = data[columnList[x]];
        if (tmpData !== null) {
          counter = counter + 1;
        } else {
        }
      }
      console.log(counter);
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
      //onClickModalSave();
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
      // onClickEditModalSave();
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
      <S.GridTopTitleBox>✳️ 검사기준서</S.GridTopTitleBox>
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
    </ModalWrap>
  );
}

export default ModalControlPlan;
