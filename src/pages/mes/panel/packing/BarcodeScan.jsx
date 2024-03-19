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
    onEmpConfirm = () => {},
    setBarcodeScan = () => {},
    barcodeScan = {},
    onClickSelect = () => {},
    setPerformanceReworkFlag = () => {},
    performanceReworkFlag = false,
  } = props;

  const refBarcode = useRef(null);

  const onReworkChk = (e) => {
    if (e.target.checked) {
      setPerformanceReworkFlag(true);
    } else {
      setPerformanceReworkFlag(false);
    }
  };

  useEffect(() => {
    setPerformanceReworkFlag(false);
  }, []);

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
            <S.Title>{"작업자"}</S.Title>
            <InputPaper
              width={"485px"}
              height={"60px"}
              size={"30px"}
              placeHolder={"작업자를 등록하세요"}
              readOnly={true}
              btn={true}
              btnSingle={true}
              onClickSelect={onClickSelect}
              value={barcodeScan.empNM || ""}
            />
            <BtnComponent btnName={"Ok"} height={"60px"} onClick={onEmpConfirm} />
          </S.InputWrap>
          <S.InputWrap>
            <S.ReworkChkWrap>
              <S.CheckboxContainer>
                <S.ReworkChk
                  id={"reworkFlag"}
                  type={"checkbox"}
                  onChange={onReworkChk}
                  checked={performanceReworkFlag}
                />
              </S.CheckboxContainer>
              <S.ReworkChkTitle htmlFor={"reworkFlag"}>{"재처리 여부"}</S.ReworkChkTitle>
            </S.ReworkChkWrap>
          </S.InputWrap>
        </S.Content>
      </S.ModalWrap>
    </ModalWrapMulti>
  );
}

export default BarcodeScan;
