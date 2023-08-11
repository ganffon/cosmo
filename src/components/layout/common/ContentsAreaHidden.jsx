import React from "react";
import * as S from "./ContentsAreaHidden.styled";

function ContentsArea(props) {
  const { children } = props;
  return <S.ContentsArea>{children}</S.ContentsArea>;
}

export default ContentsArea;
