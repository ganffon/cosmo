import React from "react";
import * as S from "./ModalWrap.styled";

function ModalWrap({ children, width, height }) {
  return (
    <S.Overlay>
      <S.Inner width={width} height={height}>
        {children}
      </S.Inner>
    </S.Overlay>
  );
}

export default ModalWrap;
