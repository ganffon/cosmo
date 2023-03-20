import React from "react";
import * as S from "./InputBox.styled";

function InputSearch(props) {
  const { id, name, inputTextChange, onClickSearch } = props;
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  return (
    <S.InputBox>
      <S.InputSet
        key={id}
        id={id}
        variant="outlined"
        autoComplete="off"
        size="small"
        label={name}
        onChange={inputTextChange}
        onKeyPress={onKeyPress}
      />
    </S.InputBox>
  );
}

export default InputSearch;
