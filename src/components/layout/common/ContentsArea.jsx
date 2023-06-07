import React, { useContext } from "react";
import * as S from "./ContentsArea.styled";
import { LayoutContext } from "components/layout/common/Layout";

function ContentsArea(props) {
  const { children, flex } = props;
  const { isAllScreen } = useContext(LayoutContext);
  return (
    <S.ContentsArea isAllScreen={isAllScreen} flex={flex}>
      {children}
    </S.ContentsArea>
  );
}

export default ContentsArea;
