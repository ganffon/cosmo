import { useState, useEffect } from "react";

const useDisableRowCheck = (isEditMode, refGrid) => {
  const [disableRowToggle, setDisableRowToggle] = useState(false);
  useEffect(() => {
    if (isEditMode === true) {
      for (let i = 0; i < refGrid?.current?.gridInst?.getRowCount(); i++) {
        refGrid?.current?.gridInst?.disableRowCheck(i);
      }
    } else {
      for (let i = 0; i < refGrid?.current?.gridInst?.getRowCount(); i++) {
        refGrid?.current?.gridInst?.enableRowCheck(i);
      }
    }
  }, [disableRowToggle]);

  return [disableRowToggle, setDisableRowToggle];
};

const handleClickGridCheck = (e, isEditMode, columnName) => {
  if (isEditMode === true) {
    let condition;
    for (let i = 0; i < columnName.length; i++) {
      if (i === 0) {
        condition = e?.columnName === columnName[i];
      } else {
        condition = condition || e?.columnName === columnName[i];
      }
    }
    if (condition) {
      e?.instance?.enableRowCheck(e?.rowKey);
      e?.instance?.check(e?.rowKey);
      e?.instance?.disableRowCheck(e?.rowKey);
    }
  }
};

const handleEditingFinishGridCheck = (e) => {
  e?.instance?.enableRowCheck(e?.rowKey);
  e?.instance?.check(e?.rowKey);
  e?.instance?.disableRowCheck(e?.rowKey);
};

/**
 * 기본 그리드에서 Data Select Modal을 띄운 후
 * 데이터를 입력할 때 Edit Mode의 RowCheck를 하기 위해 만들었음
 * @param {*} refGrid Check가 동작 할 ref 전달
 * @param {*} rowKey Check가 동작 할 rowKey 전달
 */
const handleGridSelectCheck = (refGrid, rowKey) => {
  refGrid?.current?.gridInst?.enableRowCheck(rowKey);
  refGrid?.current?.gridInst?.check(rowKey);
  refGrid?.current?.gridInst?.disableRowCheck(rowKey);
};

export {
  useDisableRowCheck,
  handleClickGridCheck,
  handleEditingFinishGridCheck,
  handleGridSelectCheck,
};
