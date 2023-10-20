import InputPaper from "components/input/InputPaper";
import * as S from "./InputNew.styled";
import { useMemo } from "react";

function InputNewTab(props) {
  const {
    onSelectMorning = () => {},
    onRemoveMorning = () => {},
    onSelectAfternoon = () => {},
    onRemoveAfternoon = () => {},
    onSelectNight = () => {},
    onRemoveNight = () => {},
    emp = {},
    mainInfo = {},
    isEditMode = false,
    button = false,
    counterArr = [],
    morCounter = 0,
    aftCounter = 0,
    nigCounter = 0,
    isEditOrNewFlag = false,
  } = props;

  const InputWrap = useMemo(() => {
    return (
      <>
        <S.InputWrap>
          <S.InfoTitle width={"110px"}>오전 조</S.InfoTitle>
          <InputPaper
            width={isEditOrNewFlag ? "220px" : "150px"}
            height={"40px"}
            value={isEditMode ? mainInfo.mngEmpNm || "" : emp.mngEmpNm || ""}
            size={"20px"}
            btn={button}
            onClickSelect={onSelectMorning}
            onClickRemove={onRemoveMorning}
          />
          {isEditOrNewFlag ? null : (
            <S.InfoCounter width={"50px"} readOnly={true} count={counterArr[0]}>
              {counterArr[0]}
            </S.InfoCounter>
          )}
        </S.InputWrap>

        <S.InputWrap>
          <S.InfoTitle width={"110px"}>오후 조</S.InfoTitle>

          <InputPaper
            width={isEditOrNewFlag ? "220px" : "150px"}
            height={"40px"}
            value={isEditMode ? mainInfo.aftEmpNm || "" : emp.aftEmpNm || ""}
            size={"20px"}
            btn={button}
            onClickSelect={onSelectAfternoon}
            onClickRemove={onRemoveAfternoon}
          />
          {isEditOrNewFlag ? null : (
            <S.InfoCounter width={"50px"} readOnly={true} count={counterArr[1]}>
              {counterArr[1]}
            </S.InfoCounter>
          )}
        </S.InputWrap>

        <S.InputWrap>
          <S.InfoTitle width={"110px"}>야간 조</S.InfoTitle>
          <InputPaper
            width={isEditOrNewFlag ? "220px" : "150px"}
            height={"40px"}
            value={isEditMode ? mainInfo.nigEmpNm || "" : emp.nigEmpNm || ""}
            size={"20px"}
            btn={button}
            onClickSelect={onSelectNight}
            onClickRemove={onRemoveNight}
          />
          {isEditOrNewFlag ? null : (
            <S.InfoCounter width={"50px"} readOnly={true} count={counterArr[2]}>
              {counterArr[2]}
            </S.InfoCounter>
          )}
        </S.InputWrap>
      </>
    );
  }, [emp, nigCounter, aftCounter, morCounter]);

  return (
    <S.Wrap>
      <S.InputWrapDivide>{InputWrap}</S.InputWrapDivide>
    </S.Wrap>
  );
}

export default InputNewTab;
