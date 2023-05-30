const insertAt = (str, sub, pos) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

const Time = (e, refGrid, columnName) => {
  const Grid = refGrid?.current?.gridInst;
  let pattern01 = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
  let pattern02 = /^(20|21|22|23|[0-1]\d)[0-5]\d$/;

  // 12:34 형식이니?
  if (!pattern01.test(e?.value)) {
    //그럼 숫자 4자리니?
    if (!pattern02.test(e?.value)) {
      //둘다 아니라면 공백으로 바꿔주렴
      Grid?.setValue(e?.rowKey, columnName, "");
    } else {
      Grid?.setValue(e?.rowKey, columnName, insertAt(e?.value, ":", 2));
    }
  }
};
const NumComma = (e, refGrid, columnName) => {
  const Grid = refGrid?.current?.gridInst;
  const decimalLength = e?.value.toString().includes(".")
    ? e?.value.toString().split(".")[1].length
    : 0;
  const int = e?.value.toString().split(".")[0];
  const decimal = e?.value.toString().split(".")[1];
  const formattedValue =
    decimalLength > 0
      ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimal
      : e?.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // // 12:34 형식이니?
  // if (!pattern01.test(e?.value)) {
  //   //그럼 숫자 4자리니?
  //   if (!pattern02.test(e?.value)) {
  //둘다 아니라면 공백으로 바꿔주렴
  console.log(formattedValue);
  Grid?.setValue(e?.rowKey, columnName, formattedValue);
  // } else {
  //   Grid?.setValue(e?.rowKey, columnName, insertAt(e?.value, ":", 2));
  // }
};

export { Time, NumComma };
