/**
 *
 * @param {*} beforeParams 이전 input 이나 cbo의 검색조건이 담겨옴
 * @param {*} dateText startDate, endDate가 담겨옴
 * @param {*} date01 startDate의 DB 컬럼명
 * @param {*} date02 endDate의 DB 컬럼명
 * @returns
 */
function GetDateParams(
  beforeParams = null,
  dateText,
  date01 = null,
  date02 = null
) {
  let params = "";
  const startDate = dateText.startDate;
  const endDate = dateText.endDate;
  if (beforeParams) {
    params = params + `&${date01}=${startDate}&`;
  } else {
    params = "?";
    params = params + `${date01}=${startDate}&`;
  }
  if (date02 !== null) {
    params = params + `${date02}=${endDate}&`;
  }
  params = params.slice(0, params.length - 1);

  return params;
}

export default GetDateParams;
