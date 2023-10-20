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
    nullCountArr = [],

    isEditOrNewFlag = false,
  } = props;

  const InputWrap = useMemo(() => {
    return (
      <>
        <S.InputWrap>
          <S.InfoTitle width={"70px"}>오전 조</S.InfoTitle>
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
            <>
              <S.InfoCounter
                width={"50px"}
                height={"40px"}
                value={counterArr[0]}
                count={counterArr[0]}
                namePositionLeft={"2px"}
                size={"20px"}
                name={"불합격"}
              />
              <S.InfoNullCounter
                width={"50px"}
                height={"40px"}
                name={"미작성"}
                namePositionLeft={"2px"}
                value={nullCountArr[0]}
                size={"20px"}
              />
            </>
          )}
        </S.InputWrap>

        <S.InputWrap>
          <S.InfoTitle width={"70px"}>오후 조</S.InfoTitle>
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
            <>
              <S.InfoCounter
                width={"50px"}
                height={"40px"}
                value={counterArr[1]}
                size={"20px"}
                name={"불합격"}
                count={counterArr[1]}
                namePositionLeft={"2px"}
              />
              <S.InfoNullCounter
                width={"50px"}
                height={"40px"}
                name={"미작성"}
                value={nullCountArr[1]}
                namePositionLeft={"2px"}
                size={"20px"}
              />
            </>
          )}
        </S.InputWrap>

        <S.InputWrap>
          <S.InfoTitle width={"70px"}>야간 조</S.InfoTitle>
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
            <>
              <S.InfoCounter
                width={"50px"}
                height={"40px"}
                value={counterArr[2]}
                count={counterArr[2]}
                namePositionLeft={"2px"}
                size={"20px"}
                name={"불합격"}
              />
              <S.InfoNullCounter
                width={"50px"}
                height={"40px"}
                namePositionLeft={"2px"}
                value={nullCountArr[2]}
                size={"20px"}
                name={"미작성"}
              />
            </>
          )}
        </S.InputWrap>
      </>
    );
  }, [emp]);

  return (
    <S.Wrap>
      <S.InputWrapDivide>{InputWrap}</S.InputWrapDivide>
    </S.Wrap>
  );
}

export default InputNewTab;
