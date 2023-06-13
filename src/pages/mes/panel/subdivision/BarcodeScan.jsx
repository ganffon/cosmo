import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./BarcodeScan.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";

function BarcodeScan(props) {
  const { width = "95%", height = "95%", onClose = () => {} } = props;

  return (
    <ModalWrapMulti width={width} height={height}>
      <S.ModalWrap>
        <S.HeaderBox>
          <S.TitleBox>{"바코드 스캔"}</S.TitleBox>
          <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>

        <S.Content></S.Content>
      </S.ModalWrap>
    </ModalWrapMulti>
  );
}

export default BarcodeScan;
