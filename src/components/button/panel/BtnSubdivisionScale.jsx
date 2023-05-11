import * as S from "./BtnSubdivisionScale.styled";

function BtnSubdivisionScale(props) {
  const {
    onClickBefore = () => {},
    onClickAfter = () => {},
    onClickNext = () => {},
  } = props;
  return (
    <>
      <S.ButtonSet
        color={"#212529"}
        hoverColor={"#28a745"}
        onClick={onClickBefore}
      >
        Before
      </S.ButtonSet>
      <S.ButtonSet
        color={"#212529"}
        hoverColor={"#0d6efd"}
        onClick={onClickAfter}
      >
        After
      </S.ButtonSet>
      <S.ButtonSet
        color={"#212529"}
        hoverColor={"#ffc107"}
        onClick={onClickNext}
      >
        Next
      </S.ButtonSet>
    </>
  );
}

export default BtnSubdivisionScale;
