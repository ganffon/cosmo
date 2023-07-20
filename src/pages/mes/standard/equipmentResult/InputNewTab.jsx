import InputPaper from "components/input/InputPaper";
import * as S from "./InputNew.styled";
import React from "react";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";

function InputNewTab(props) {
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
    button = false,
  } = props;

  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };
  return (
    <S.Wrap>
      <S.InputWrapDivide>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>오전 조</S.InfoTitle>
          <InputPaper
            width={"220px"}
            height={"40px"}
            value={isEditMode ? mainInfo.mngEmpNm || "" : emp.mngEmpNm || ""}
            size={"20px"}
            btn={button}
            onClickSelect={onSelectMorning}
            onClickRemove={onRemoveMorning}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>오후 조</S.InfoTitle>
          <InputPaper
            width={"220px"}
            height={"40px"}
            value={isEditMode ? mainInfo.aftEmpNm || "" : emp.aftEmpNm || ""}
            size={"20px"}
            btn={button}
            onClickSelect={onSelectAfternoon}
            onClickRemove={onRemoveAfternoon}
          />
        </S.InputWrap>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>야간 조</S.InfoTitle>
          <InputPaper
            width={"220px"}
            height={"40px"}
            value={isEditMode ? mainInfo.nigEmpNm || "" : emp.nigEmpNm || ""}
            size={"20px"}
            btn={button}
            onClickSelect={onSelectNight}
            onClickRemove={onRemoveNight}
          />
        </S.InputWrap>
      </S.InputWrapDivide>
    </S.Wrap>
  );
}

export default InputNewTab;
