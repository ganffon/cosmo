import React from "react";
import * as S from "./ModalWrapMulti.styled";

function ModalWrapMulti({ children, width, height }) {
  return (
    <S.Overlay>
      <S.Inner width={width} height={height}>
        {children}
      </S.Inner>
    </S.Overlay>
  );
}

export default ModalWrapMulti;
