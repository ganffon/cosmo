import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./BarcodeScan.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import InputPaper from "components/input/InputPaper";
import BtnComponent from "components/button/BtnComponent";
import SungEel from "img/Subdivision/sungeel.jpg";
import SQM from "img/Subdivision/sqm.jpg";
import Albemarle from "img/Subdivision/albemarle.jpg";

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
          <S.BarcodeWrap>
            <S.InputWrap>
              <S.Title>{"바코드 스캔"}</S.Title>
              <InputPaper
                width={"900px"}
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
                width={"785px"}
                height={"60px"}
                size={"30px"}
                placeHolder={isLotReadOnly ? "투입 LOT 수기 입력은 클릭하세요 (대소문자 구분 필수)" : ""}
                readOnly={isLotReadOnly}
                onClickReadOnly={() => {
                  setIsLotReadOnly(false);
                }}
                value={barcodeScan.lot || ""}
                onTextChange={lotHandWritten}
              />
              <BtnComponent btnName={"Ok"} height={"60px"} onClick={onLotConfirm} />
            </S.InputWrap>
          </S.BarcodeWrap>
          <S.ImgWrap>
            <S.Img src={SQM} />
            <S.Img src={Albemarle} />
            <S.Img src={SungEel} />
          </S.ImgWrap>
        </S.Content>
      </S.ModalWrap>
    </ModalWrapMulti>
  );
}

export default BarcodeScan;
