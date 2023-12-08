/**
 * yyyy, MM, dd, days, yyyy-MM-dd, hh, mm, ss 형식 출력 함수
 * @param {number} custom 입력안하면 기본 값 0, 정수 입력
 * @returns 0 인 경우 현재 날짜 반환 | 정수 입력한 경우 날짜에 플러스해서 출력
 */
function DateTime(custom = 0) {
  const today = new Date();
  today.setDate(today.getDate() + custom);
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  const day = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
  const days = day[today.getDay()];
  const dateFull = `${year}-${month}-${date}`;
  const dateMonth = `${year}-${month}`;

  const hour = String(today.getHours()).padStart(2, "0");
  const minute = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  const version = year.slice(2, 4) + month + date + hour + minute;

  return {
    today,
    year,
    month,
    date,
    days,
    dateFull,
    dateMonth,
    hour,
    minute,
    seconds,
    version,
  };
}

export default DateTime;
