import InputPaper from "components/input/InputPaper";
import * as S from "./BarcodeBox.styled";
import React from "react";

function BarcodeBox(props) {
  const { onClickSelect = () => {}, info = {} } = props;
  return (
    <S.Wrap>
      <S.InputWrapDivide>
        <S.InputWrap>
          <InputPaper
            name={"바코드 스캔"}
            namePositionTop={"-24px"}
            width={"95%"}
            height={"50px"}
            nameColor={"black"}
            nameSize={"16px"}
            value={""}
            size={"30px"}
            readOnly={false}
            btn={true}
            btnSingle={true}
            onClickSelect={onClickSelect}
          />
        </S.InputWrap>
        <S.InputWrap>
          <InputPaper
            name={"라인"}
            namePositionTop={"-24px"}
            width={"95%"}
            nameSize={"16px"}
            height={"50px"}
            nameColor={"black"}
            value={info.lineNM || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <InputPaper
            name={"포장일자"}
            namePositionTop={"-24px"}
            width={"95%"}
            height={"50px"}
            nameSize={"16px"}
            nameColor={"black"}
            value={info.packingDate || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <InputPaper
            name={"품목코드"}
            namePositionTop={"-24px"}
            width={"95%"}
            nameSize={"16px"}
            height={"50px"}
            nameColor={"black"}
            value={info.prodCD || ""}
            size={"25px"}
          />
        </S.InputWrap>
      </S.InputWrapDivide>
      <S.InputWrapDivideBottom>
        <S.InputWrap>
          <InputPaper
            name={"품목"}
            namePositionTop={"-24px"}
            width={"90%"}
            nameSize={"16px"}
            height={"50px"}
            nameColor={"black"}
            value={info.prodNM || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <InputPaper
            name={"Lot No"}
            namePositionTop={"-24px"}
            width={"90%"}
            nameSize={"16px"}
            height={"50px"}
            nameColor={"black"}
            value={info.lotNo || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <InputPaper
            name={"포장중량"}
            namePositionTop={"-24px"}
            width={"90%"}
            nameSize={"16px"}
            height={"50px"}
            nameColor={"black"}
            value={info.weight || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <InputPaper
            name={"작업자"}
            namePositionTop={"-24px"}
            width={"90%"}
            nameSize={"16px"}
            height={"50px"}
            nameColor={"black"}
            value={info.empNM || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <InputPaper
            name={"비고"}
            namePositionTop={"-24px"}
            width={"90%"}
            nameSize={"16px"}
            height={"50px"}
            nameColor={"black"}
            value={info.remark || ""}
            size={"25px"}
          />
        </S.InputWrap>
      </S.InputWrapDivideBottom>
    </S.Wrap>
  );
}

export default BarcodeBox;
