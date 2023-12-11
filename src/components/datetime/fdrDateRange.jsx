import { useEffect, useRef, useState } from "react";
import * as S from "./fdrDate.styled";

export const FdrDateRange = (props) => {
  const {
    startID,
    endID,
    startValue,
    endValue,
    height = "40px",
    width = "160px",
    fontSize = "16px",
    labelFontSize,
    disabled,
    onSearch,
    className,
    label = "조회기간",
    dispatch,
    dispatchType = "update",
    type = "date",
  } = props;

  const refDate = useRef("");
  const cRefStandardDate = refDate.current;
  const [types, setTypes] = useState(type);

  useEffect(() => {
    refDate.current = endValue;
    // 처음 셋팅 된 날짜 저장
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(true);
    }
  };

  const onStartChange = (e) => {
    let startDate = e.target.value;
    if (cRefStandardDate < startDate) {
      startDate = cRefStandardDate;
    }

    if (startDate > endValue) {
      dispatch({
        type: dispatchType,
        id: endID,
        value: e.target.value,
      });
    }

    dispatch({
      type: dispatchType,
      id: startID,
      value: startDate === "" || startDate < 1 ? cRefStandardDate : startDate,
    });
  };

  const onEndChange = (e) => {
    let endDate = e.target.value;
    if (cRefStandardDate < endDate) {
      endDate = cRefStandardDate;
    }

    if (endDate < startValue) {
      dispatch({
        type: dispatchType,
        id: startID,
        value: endDate === "" || endDate < 1 ? cRefStandardDate : e.target.value,
      });
    }

    dispatch({
      type: dispatchType,
      id: endID,
      value: endDate === "" || endDate < 1 ? cRefStandardDate : endDate,
    });
  };

  const handleBlur = () => {
    if (type === "text") {
      setTypes("text");
    }
  };

  const handleFocus = () => {
    if (type === "text") {
      setTypes("number");
    }
  };

  return (
    <>
      <S.FdrDate
        id={startID}
        type={types}
        value={types === "text" ? `${startValue}년 부터` : startValue || ""}
        disabled={disabled ?? false}
        className={className ?? ""}
        InputProps={{
          sx: { height: height, fontSize: fontSize },
        }}
        autoComplete={"off"}
        $width={width}
        $fontSize={labelFontSize ? labelFontSize : fontSize}
        label={label ?? ""}
        onChange={onStartChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={onKeyDown}
      />
      <S.FdrDate
        id={endID}
        type={types}
        value={types === "text" ? `${endValue}년 까지` : endValue || ""}
        disabled={disabled ?? false}
        className={className ?? ""}
        InputProps={{
          sx: { height: height, fontSize: fontSize },
        }}
        autoComplete={"off"}
        $width={width}
        $fontSize={labelFontSize ? labelFontSize : fontSize}
        onChange={onEndChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={onKeyDown}
      />
    </>
  );
};
