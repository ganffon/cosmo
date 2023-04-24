import { useState, useEffect } from "react";

//Edit 모드 들어가고 나올때 disableRowToggle의 state를 이용하여
//rowHeader의 disable 을 컨트롤함
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

//Grid Cell 안에 구현된 Check 상호작용 시 해당 RowHeader 에 체크함
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

//rowHeader disable 인 상태에서 체크값을 모두 해제함
const handleCheckReset = (isEditMode, refGrid) => {
  if (isEditMode === true) {
    for (let i = 0; i < refGrid?.current?.gridInst?.getRowCount(); i++) {
      refGrid?.current?.gridInst?.enableRowCheck(i);
      refGrid?.current?.gridInst?.uncheck(i);
      refGrid?.current?.gridInst?.disableRowCheck(i);
    }
  }
};
//rowHeader disable 인 상태에서 편집이 끝난 Row 를 체크함
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
  handleCheckReset,
  handleEditingFinishGridCheck,
  handleGridSelectCheck,
};
