function FinishEditing(refGrid) {
  const { rowKey, columnName } = refGrid?.current?.gridInst?.getFocusedCell();
  if (rowKey && columnName) {
    refGrid?.current?.gridInst?.finishEditing(rowKey, columnName);
  }
}

export default FinishEditing;
