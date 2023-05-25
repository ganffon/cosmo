/**
 *
 * @param {*} beforeParams 이전 input 이나 cbo의 검색조건이 담겨옴
 * @param {*} dateText startDate, endDate가 담겨옴
 * @param {*} date01 startDate의 DB 컬럼명
 * @param {*} date02 endDate의 DB 컬럼명
 * @returns
 */
function GetDateParams(
  beforeParams = "",
  dateText,
  startDateNm = null,
  endDateNm = null
) {
  let params = "";
  const startDate = dateText.startDate;
  const endDate = dateText.endDate;
  if (beforeParams.length !== 0) {
    params = beforeParams + `&${startDateNm}=${startDate}&`;
  } else {
    params = "?";
    params = params + `${startDateNm}=${startDate}&`;
  }
  if (endDateNm !== "" && endDateNm !== null) {
    params = params + `${endDateNm}=${endDate}&`;
  }
  params = params.slice(0, params.length - 1);

  return params;
}

export default GetDateParams;
