import React, { useContext } from "react";
// ⬇️ import MUI
import InputAdornment from "@mui/material/InputAdornment";
// ⬇️ reference of page
import DatePicker from "./DatePicker";
import { SearchBarBoxEvent } from "./SearchBarBox";
import * as S from "./InputBox.styled";

function InputBox(props) {
  const { datePickerSet, inputSet } = props;
  const { inputTextChange, onClickSearch } = useContext(SearchBarBoxEvent);
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  return (
    <S.InputBox>
      <DatePicker datePickerSet={datePickerSet} />
      {inputSet.length === 0
        ? null
        : inputSet.map((value) => (
            <S.InputSet
              key={value.id}
              id={value.id}
              InputProps={{
                sx: { height: 30 },
                startAdornment: (
                  <InputAdornment position="start">{value.name}</InputAdornment>
                ),
              }}
              variant="outlined"
              autoComplete="off"
              size="small"
              nameLength={value.name.length}
              onChange={inputTextChange}
              onKeyPress={onKeyPress}
            />
          ))}
    </S.InputBox>
  );
}

export default InputBox;
