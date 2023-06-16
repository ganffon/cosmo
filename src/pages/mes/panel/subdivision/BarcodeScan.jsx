import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./BarcodeScan.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import InputPaper from "components/input/InputPaper";
import BtnComponent from "components/button/BtnComponent";

function BarcodeScan(props) {
  const {
    width = "95%",
    height = "95%",
    onClose = () => {},
    onLotConfirm = () => {},
    setBarcodeScan = () => {},
    barcodeScan = {},
  } = props;

  const refBarcode = useRef(null);

  const [isLotReadOnly, setIsLotReadOnly] = useState(true);

  const lotHandWritten = (e) => {
    setBarcodeScan({ ...barcodeScan, lot: e?.target?.value });
  };

  return (
    <ModalWrapMulti width={width} height={height}>
      <S.ModalWrap>
        <S.HeaderBox>
          <S.TitleBox>{"바코드 스캔"}</S.TitleBox>
          <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>

        <S.Content>
          <S.InputWrap>
            <S.Title>{"바코드 스캔"}</S.Title>
            <InputPaper
              width={"600px"}
              height={"60px"}
              size={"30px"}
              refInput={refBarcode}
              value={barcodeScan.value || ""}
              className={barcodeScan.className || ""}
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.Title>{"투입 LOT"}</S.Title>
            <InputPaper
              width={"485px"}
              height={"60px"}
              size={"30px"}
              placeHolder={isLotReadOnly ? "투입 LOT 수기 입력은 클릭하세요" : ""}
              readOnly={isLotReadOnly}
              onClickReadOnly={() => {
                setIsLotReadOnly(false);
              }}
              value={barcodeScan.lot || ""}
              onTextChange={lotHandWritten}
            />
            <BtnComponent btnName={"Ok"} height={"60px"} onClick={onLotConfirm} />
          </S.InputWrap>
        </S.Content>
      </S.ModalWrap>
    </ModalWrapMulti>
  );
}

export default BarcodeScan;
