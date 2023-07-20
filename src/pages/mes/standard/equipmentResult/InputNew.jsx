import InputPaper from "components/input/InputPaper";
import * as S from "./InputNew.styled";
import React from "react";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";

function InputNew(props) {
  const {
    onSelectOrder = () => {},
    onRemoveOrder = () => {},
    onSelectMorning = () => {},
    onRemoveMorning = () => {},
    onSelectAfternoon = () => {},
    onRemoveAfternoon = () => {},
    onSelectNight = () => {},
    onRemoveNight = () => {},
    onTextChange = () => {},
    onTextChangeEdit = () => {},
    dateText = {},
    setDateText = {},
    info = {},
    emp = {},
    mainInfo = {},
    textChange = {},
    isEditMode = false,
  } = props;

  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  return (
    <S.Wrap>
      <S.InputWrapDivide>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>점검일자</S.InfoTitle>
          <S.DatePicker
            id="checkDate"
            className="date"
            type="date"
            format="yyyy-MM-dd"
            defaultValue={
              isEditMode
                ? mainInfo.inspResultDate || DateTime().dateFull
                : DateTime().dateFull
            }
            InputProps={{ sx: { height: 40 } }}
            onChange={datePickerChange}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>라인</S.InfoTitle>
          <InputPaper
            width={"220px"}
            height={"40px"}
            value={isEditMode ? mainInfo.lineNm || "" : info.lineNm || ""}
            size={"20px"}
            btn={isEditMode ? false : true}
            onClickSelect={onSelectOrder}
            onClickRemove={onRemoveOrder}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>품목코드</S.InfoTitle>
          <InputPaper
            width={"220px"}
            height={"40px"}
            value={isEditMode ? mainInfo.prodCd || "" : info.prodCd || ""}
            size={"20px"}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>품목</S.InfoTitle>
          <InputPaper
            width={"220px"}
            height={"40px"}
            value={isEditMode ? mainInfo.prodNm || "" : info.prodNm || ""}
            size={"20px"}
          />
        </S.InputWrap>
      </S.InputWrapDivide>
      {/* <S.InputWrapDivide>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>비고</S.InfoTitle>
          <InputPaper
            id={"remark"}
            width={"1485px"}
            height={"40px"}
            value={isEditMode ? mainInfo.remark || "" : textChange.remark || ""}
            size={"20px"}
            readOnly={false}
            onTextChange={isEditMode ? onTextChangeEdit : onTextChange}
          />
        </S.InputWrap>
      </S.InputWrapDivide> */}
      <S.InputWrapDivide2>
        <S.InputWrap2>
          <S.InfoTitle width={"110px"}>지시번호</S.InfoTitle>
          <InputPaper
            width={"220px"}
            height={"40px"}
            value={isEditMode ? mainInfo.orderNo || "" : info.orderNo || ""}
            size={"20px"}
          />
        </S.InputWrap2>
      </S.InputWrapDivide2>
    </S.Wrap>
  );
}

export default InputNew;
