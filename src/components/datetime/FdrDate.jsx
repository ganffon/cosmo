import { useEffect, useRef, useState } from "react";
import * as S from "./fdrDate.styled";

export const FdrDate = (props) => {
  const {
    id,
    height = "40px",
    width = "160px",
    fontSize = "16px",
    labelFontSize,
    disabled,
    onSearch,
    className,
    limit,
    label,
    value,
    dispatch,
    dispatchType,
    type = "date",
  } = props;

  const refDate = useRef("");
  const [types, setTypes] = useState(type);

  useEffect(() => {
    refDate.current = value;
    // 처음 셋팅 된 날짜 저장
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(true);
    }
  };

  const onChange = (e) => {
    let selectedDate = e.target.value;
    switch (limit) {
      case "after":
        if (refDate.current < selectedDate) {
          selectedDate = refDate.current;
        }
        break;
      case "before":
        if (refDate.current > selectedDate) {
          selectedDate = refDate.current;
        }
        break;
      default:
        break;
    }
    dispatch({
      type: dispatchType ?? "update",
      id: e.target.id,
      value: selectedDate === "" ? refDate.current : selectedDate,
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
    <S.FdrDate
      id={id}
      type={types}
      value={types === "text" ? `${value}년` : value || ""}
      disabled={disabled ?? false}
      className={className ?? ""}
      InputProps={{
        sx: { height: height, fontSize: fontSize },
      }}
      // InputLabelProps={{
      //   style: {
      //     fontSize: labelFontSize ? labelFontSize : fontSize,
      //   },
      // }}
      autoComplete={"off"}
      $width={width}
      $fontSize={labelFontSize ? labelFontSize : fontSize}
      label={label ?? ""}
      onChange={onChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={onKeyDown}
    />
  );
};
