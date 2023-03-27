import React from "react";
import * as S from "./InputInfo.styled";

function InputInfo(props) {
  const { id, name, value } = props;
  return (
    <S.InputBox>
      <S.Title variant="overline">{name}</S.Title>
      <S.Input
        key={id}
        id={id}
        value={value}
        contentEditable={false}
        variant="outlined"
        autoComplete="off"
        size="small"
      />
    </S.InputBox>
  );
}

export default InputInfo;