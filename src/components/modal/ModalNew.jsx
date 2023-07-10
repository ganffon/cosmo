import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNew.styled";
import BtnComponent from "components/button/BtnComponent";
import NoticeSnack from "components/alert/NoticeSnack";

function ModalNew(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickModalGrid = () => {},
    onDblClickModalGrid = () => {},
    onEditingFinishModal = () => {},
    refModalGrid = null,
    columns = [],
    requirecolumns = [],
    columnOptions = [],
    header = [],
    rowHeaders = [],
    width = "95%",
    height = "95%",
    buttonType = "ACS",
    title = null,
    isAddOneRow = false,
    data = [],
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    isAddOneRow && refModalGrid?.current?.gridInst?.appendRow();
  }, []);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const validationDuplicated = () => {
    try {
      refModalGrid?.current?.gridInst?.finishEditing();
      const gridInstance = refModalGrid?.current?.getInstance();
      const colunmLength = requirecolumns.length;
      const tmpCoulnmList = requirecolumns;

      const rawDataLength = gridInstance?.store?.data?.rawData.length;

      const rawDatas = gridInstance?.store?.data?.rawData;
      let arr = [];
      for (let i = 0; i < rawDataLength; i++) {
        let tempdataString;

        for (let x = 0; x < colunmLength; x++) {
          let data = rawDatas[i];
          let tmpData = data[tmpCoulnmList[x]];

          if (x === 0) {
            tempdataString = tmpData;
          } else {
            tempdataString = tempdataString + "/" + tmpData;
          }
        }
        arr[i] = tempdataString;
      }

      const setArrayLength = new Set(arr).size;
      if (setArrayLength !== rawDataLength) {
        throw new Error();
      }
    } catch {
      return "error";
    }
  };

  const requireColumnsValidation = () => {
    try {
      refModalGrid?.current?.gridInst?.finishEditing();
      const gridInstance = refModalGrid?.current?.getInstance();
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
    } catch {
      return "nullValidationError";
    }
  };

  const removeNullRow = () => {
    refModalGrid?.current?.gridInst?.finishEditing();
    const gridInstance = refModalGrid?.current?.getInstance();
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

  /*
  const Grid = useMemo(() => {
    return (
      <GridModal
        columns={columns}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeaders}
        refGrid={refModalGrid}
        draggable={false}
        onClick={onClickModalGrid}
        onDblClick={onDblClickModalGrid}
        onEditingFinish={onEditingFinishModal}
        data={data}
      />
    );
  }, [data]);

  */
  const Grid = useMemo(() => {
    return (
      <GridModal
        columns={columns}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeaders}
        refGrid={refModalGrid}
        draggable={false}
        onClick={onClickModalGrid}
        onDblClick={onDblClickModalGrid}
        onEditingFinish={onEditingFinishModal}
        data={data}
      />
    );
  }, []);

  return (
    <ModalWrap width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ButtonBox>
        <S.TitleWrap>{title}</S.TitleWrap>
        <S.ButtonWrap>
          {buttonType === "ACS" && (
            <>
              <BtnComponent btnName="AddRow" onClick={onClickModalAddRow} />
              <BtnComponent
                btnName="CancelRow"
                onClick={onClickModalCancelRow}
              />
              <BtnComponent
                btnName="Save"
                onClick={() => {
                  removeNullRow();
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
                  /*
                  removeNullRow();
                  validationDuplicated(requirecolumns);
                  if (validationDuplicated(requirecolumns) !== "error") {
                    onClickModalSave();
                  } else {
                    setIsSnackOpen({
                      ...isSnackOpen,
                      open: true,
                      message: "중복값이 존재합니다.",
                      severity: "error",
                    });
                  }
                   */
                }}
              />
            </>
          )}
          {buttonType === "Save" && (
            <BtnComponent btnName="Save" onClick={onClickModalSave} />
          )}
        </S.ButtonWrap>
      </S.ButtonBox>
      <S.GridBox>{Grid}</S.GridBox>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ModalWrap>
  );
}

export default ModalNew;
