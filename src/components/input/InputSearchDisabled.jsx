import React from "react";
import * as S from "./InputSearch.styled";

function InputSearchDisabled(props) {
  const { id, name, value, onKeyDown } = props;
  return (
    <S.InputBox>
      <S.InputSet
        key={id}
        id={id}
        value={value}
        variant="outlined"
        autoComplete="off"
        size="small"
        label={name}
        InputProps={{
          readOnly: true,
        }}
        color="success"
        focused
        onKeyDown={onKeyDown}
      />
    </S.InputBox>
  );
}

export default InputSearchDisabled;
