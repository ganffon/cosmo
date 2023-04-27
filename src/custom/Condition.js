function Condition(e, columnName) {
  let condition;
  for (let i = 0; i < columnName.length; i++) {
    if (i === 0) {
      condition = e?.columnName === columnName[i];
    } else {
      condition = condition || e?.columnName === columnName[i];
    }
  }
  return condition;
}

export default Condition;
