import React, { useState, useEffect, useRef } from "react";
// ⬇️ reference of page
import DateTime from "components/datetime/DateTime";
import * as S from "./Clock.styled";

function Clock() {
  const interval = useRef(null);
  const [year, setYear] = useState(DateTime().year);
  const [month, setMonth] = useState(DateTime().month);
  const [date, setDate] = useState(DateTime().date);
  const [days, setDays] = useState(DateTime().days);
  const [hour, setHour] = useState(DateTime().hour);
  const [min, setMin] = useState(DateTime().minute);
  const [sec, setSec] = useState(DateTime().seconds);

  useEffect(() => {
    interval.current = setInterval(() => {
      setYear(DateTime().year);
      setMonth(DateTime().month);
      setDate(DateTime().date);
      setDays(DateTime().days);
      setHour(DateTime().hour);
      setMin(DateTime().minute);
      setSec(DateTime().seconds);
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  return (
    <>
      <S.Clock>
        {hour}:{min}:{sec}
      </S.Clock>
      <S.PrintDate>
        {year}년 {month}월 {date}일 {days}
      </S.PrintDate>
    </>
  );
}

export default Clock;
