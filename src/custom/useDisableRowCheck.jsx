import { useState, useEffect } from "react";

const useDisableRowCheck = (isEditMode, refGrid) => {
  const [disableRowCheck, setDisableRowCheck] = useState(false);
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
  }, [disableRowCheck]);

  return [disableRowCheck, setDisableRowCheck];
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

export {
  useDisableRowCheck,
  handleClickGridCheck,
  handleEditingFinishGridCheck,
};
