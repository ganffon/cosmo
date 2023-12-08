import * as S from "./fdrInput.styled";
import { forwardRef } from "react";

export const FdrInput = forwardRef((props, ref) => {
  const {
    id,
    height = "40px",
    width = "160px",
    fontSize = "16px",
    labelFontSize,
    label,
    value,
    disabled = false,
    dispatch,
    dispatchType = "update",
    onSearch,
    className,
    type = null,
    placeholder = "",
  } = props;

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(true);
    }
  };

  return (
    <S.FdrInput
      key={id}
      id={id}
      variant="outlined"
      autoComplete="off"
      size="small"
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      inputRef={ref}
      InputProps={{
        sx: { height: height, fontSize: fontSize },
      }}
      $fontSize={labelFontSize ? labelFontSize : fontSize}
      $width={width}
      label={label}
      value={value || ""}
      onChange={(e) =>
        dispatch({
          type: dispatchType,
          id: e.target.id,
          value: e.target.value,
        })
      }
      className={className}
      onKeyDown={onKeyDown}
    />
  );
});
