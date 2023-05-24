import InputPaper from "components/input/InputPaper";
import * as S from "./BarcodeBox.styled";
import React from "react";

function BarcodeBox(props) {
  const { onClickSelect = () => {}, info = {} } = props;
  return (
    <S.Wrap>
      <S.InputWrap>
        <S.InfoTitleBarcode>🔸바코드 스캔</S.InfoTitleBarcode>
        <InputPaper
          width={"1080px"}
          height={"60px"}
          nameColor={"black"}
          value={""}
          size={"30px"}
          readOnly={false}
          btn={true}
          btnSingle={true}
          onClickSelect={onClickSelect}
        />
      </S.InputWrap>
      <S.InputWrapDivide>
        <S.InputWrap>
          <S.InfoTitle width={"200px"}>🔸라인</S.InfoTitle>
          <InputPaper
            width={"200px"}
            height={"50px"}
            nameColor={"black"}
            value={info.lineNM || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"200px"}>🔸포장일자</S.InfoTitle>
          <InputPaper
            width={"200px"}
            height={"50px"}
            nameColor={"black"}
            value={info.packingDate || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"120px"}>🔸품목코드</S.InfoTitle>
          <InputPaper
            width={"280px"}
            height={"50px"}
            nameColor={"black"}
            value={info.prodCD || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"120px"}>🔸품목</S.InfoTitle>
          <InputPaper
            width={"280px"}
            height={"50px"}
            nameColor={"black"}
            value={info.prodNM || ""}
            size={"30px"}
          />
        </S.InputWrap>
      </S.InputWrapDivide>
      <S.InputWrapDivide>
        <S.InputWrap>
          <S.InfoTitle width={"140px"}>🔸Lot No</S.InfoTitle>
          <InputPaper
            width={"260px"}
            height={"50px"}
            nameColor={"black"}
            value={info.lotNo || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"200px"}>🔸포장중량</S.InfoTitle>
          <InputPaper
            width={"200px"}
            height={"50px"}
            nameColor={"black"}
            value={info.weight || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"200px"}>🔸작업자</S.InfoTitle>
          <InputPaper
            width={"200px"}
            height={"50px"}
            nameColor={"black"}
            value={info.empNM || ""}
            size={"30px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"120px"}>🔸비고</S.InfoTitle>
          <InputPaper
            width={"280px"}
            height={"50px"}
            nameColor={"black"}
            value={info.remark || ""}
            size={"30px"}
          />
        </S.InputWrap>
      </S.InputWrapDivide>
    </S.Wrap>
  );
}

export default BarcodeBox;
