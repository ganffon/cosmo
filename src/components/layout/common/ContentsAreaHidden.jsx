import React, { useContext } from "react";
import * as S from "./ContentsAreaHidden.styled";
import { LayoutContext } from "components/layout/common/Layout";

function ContentsArea(props) {
  const { children } = props;
  const { isAllScreen } = useContext(LayoutContext);
  return <S.ContentsArea isAllScreen={isAllScreen}>{children}</S.ContentsArea>;
}

export default ContentsArea;
