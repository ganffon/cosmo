const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

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

//숫자만 입력받는 정규표현식
const removeNonNumeric = (inputString) => {
  const regex = /[^0-9]/g;
  return inputString.replace(regex, "");
};
const validateTimeFormat = (inputString) => {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(inputString);
};
const TimeInput = (e) => {
  let pattern01 = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
  let pattern02 = /^(20|21|22|23|[0-1]\d)[0-5]\d$/;
  if (e === "2400") {
    //e가 "2400"인 경우, "0000"으로 변경합니다.
    e = "0000";
  } else if (Number(e) > 2400) {
    //e가 2400보다 큰 숫자인 경우, e를 빈 문자열("")로 변경합니다.
    e = "";
  } else if (e.length === 2 && Number(e) > 24) {
    //e의 길이가 2이고, e가 24보다 큰 숫자인 경우, e를 빈 문자열("")로 변경합니다.
    e = "";
  } else if (e.length === 4 && Number(e.slice(-2)) > 59) {
    //e의 길이가 4이고, e의 끝에서 2자리가 59보다 큰 숫자인 경우, e를 빈 문자열("")로 변경합니다.
    e = "";
  } else if (e.length === 6) {
    e = "";
  } else {
    //위의 조건에 해당하지 않는 경우, removeNonNumeric 함수를 사용하여 e에서 숫자 이외의 문자를 제거합니다.
    e = removeNonNumeric(e);
  }
  // 12:34 형식이니?
  if (!pattern01.test(e)) {
    //그럼 숫자 4자리니?
    if (!pattern02.test(e)) {
      return e;
    } else {
      return insertAt(e, ":", 2);
    }
  } else {
    return insertAt(e.replace(":", ""), ":", 2);
  }
};

const NumComma = (e, refGrid, columnName) => {
  const Grid = refGrid?.current?.gridInst;
  const decimalLength = e?.value.toString().includes(".") ? e?.value.toString().split(".")[1].length : 0;
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
  Grid?.setValue(e?.rowKey, columnName, formattedValue);
  // } else {
  //   Grid?.setValue(e?.rowKey, columnName, insertAt(e?.value, ":", 2));
  // }
};

export { Time, TimeInput, NumComma, removeNonNumeric, validateTimeFormat };
