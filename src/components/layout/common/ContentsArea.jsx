import React from "react";
import * as S from "./ContentsArea.styled";

function ContentsArea(props) {
  const { children, flexColumn = true } = props;
  return <S.ContentsArea flexColumn={flexColumn}>{children}</S.ContentsArea>;
}

export default ContentsArea;
