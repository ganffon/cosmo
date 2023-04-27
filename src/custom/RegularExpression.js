const insertAt = (str, sub, pos) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

const Time = (e, refGrid, columnName) => {
  const Grid = refGrid?.current?.gridInst;
  let pattern02 = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
  let pattern01 = /^(20|21|22|23|[0-1]\d)[0-5]\d$/;

  if (!pattern02.test(e?.value)) {
    // 12:34 형식이니?
    if (!pattern01.test(e?.value)) {
      Grid?.setValue(e?.rowKey, columnName, "");
    } else {
      Grid?.setValue(e?.rowKey, columnName, insertAt(e?.value, ":", 2));
    }
  }
};

export { Time };
