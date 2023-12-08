import { TList } from "types/data.type";
import * as S from "./fdrCombo.styled";
import { TextField } from "@mui/material";

export const FdrCombo = (props) => {
  const {
    height = "40px",
    width = "160px",
    fontSize = "16px",
    labelFontSize = "",
    id,
    label = "",
    list,
    dispatch = () => {},
    dispatchType = "update",
    disableClearable = false,
    disabled = false,
    value = null,
    onSearch = () => {},
    className = "",
    placeholder = "",
  } = props;

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(true);
    }
  };

  const optionsList = Array.isArray(list) ? list : [];

  return (
    <S.FdrCombo
      disablePortal
      disableClearable={disableClearable}
      id={id}
      size="small"
      disabled={disabled}
      className={className}
      options={optionsList || null} // 사용자에게 표시되는 목록
      getOptionLabel={(list) => list?.text || ""} // 옵션 객체를 문자열 레이블로 변환하는 방법을 정의
      value={value || null} // 현재 선택된 옵션
      onChange={(e, selected) => {
        dispatch({
          type: dispatchType,
          id: id,
          value: selected ? { value: selected?.value, text: selected?.text } : null,
        });
      }}
      isOptionEqualToValue={(list, selected) => (selected ? list.value === selected.value : null)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            sx: {
              height: height,
              fontSize: fontSize,
              "& .MuiAutocomplete-endAdornment": {
                top: "50%",
                transform: "translateY(-60%)",
              },
            },
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            style: {
              height: height,
            },
          }}
        />
      )}
      onKeyDown={onKeyDown}
      $width={width}
      $fontSize={labelFontSize ? labelFontSize : fontSize}
    />
  );
};
