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
                  //  removeNullRow();
                  // validationDuplicated(["proc_cd", "proc_nm"]);
                  onClickModalSave();
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
    </ModalWrap>
  );
}

export default ModalNew;
