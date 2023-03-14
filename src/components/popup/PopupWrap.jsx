import React from "react";
import * as S from "./PopupWrap.styled";

function PopupWrap({ children, width, height }) {
  return (
    <S.Overlay>
      <S.Inner width={width} height={height}>
        {children}
      </S.Inner>
    </S.Overlay>
  );
}

export default PopupWrap;
