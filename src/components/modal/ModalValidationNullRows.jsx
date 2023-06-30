function ModalValidationNullRows(refGrid) {
  function getJsonKeys(jsonObj) {
    return Object.keys(jsonObj);
  }

  //삭제 할 RowKey
  let deleteRowId = [];
  //전체 행 갯수
  const rowCount = refGrid?.current?.gridInst?.getModifiedRows().createdRows.length;

  let jsonCount;

  for (let i = 0; i < rowCount; i++) {
    let deleteCounter = 0;

    let rowList = refGrid?.current?.gridInst?.getModifiedRows().createdRows[i];
    jsonCount = getJsonKeys(rowList).length;

    for (let j = 0; j < jsonCount - 2; j++) {
      if (rowList[getJsonKeys(rowList)[j]]) {
        deleteCounter = 1;
      }
    }

    if (deleteCounter !== 1) {
      deleteRowId.push(rowList.rowKey);
    }
  }
  for (let x = 0; x < deleteRowId.length; x++) {
    refGrid?.current?.gridInst?.removeRow(deleteRowId[x]);
  }
}
export default ModalValidationNullRows;
