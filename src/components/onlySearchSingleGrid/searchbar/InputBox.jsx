import React, { useContext } from "react";
// ⬇️ import MUI
// ⬇️ reference of page
import DatePicker from "./DatePicker";
import { SearchBarBoxContext } from "./SearchBarBox";
import * as S from "./InputBox.styled";

function InputBox(props) {
  const { datePickerSet, inputSet } = props;
  const { inputTextChange, onClickSearch } = useContext(SearchBarBoxContext);
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
              variant="outlined"
              autoComplete="off"
              size="small"
              label={value.name}
              nameLength={value.name.length}
              onChange={inputTextChange}
              onKeyPress={onKeyPress}
            />
          ))}
    </S.InputBox>
  );
}

export default InputBox;
