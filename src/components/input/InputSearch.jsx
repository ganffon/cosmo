import React from "react";
import * as S from "./InputSearch.styled";

function InputSearch(props) {
  const { id, name, handleInputTextChange, onClickSearch, className = "" } = props;
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
        onChange={handleInputTextChange}
        className={className}
        onKeyDown={onKeyPress}
      />
    </S.InputBox>
  );
}

export default InputSearch;
