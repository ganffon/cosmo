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
        Before Weight
      </S.ButtonSet>
      <S.ButtonSet
        color={"#212529"}
        hoverColor={"#0d6efd"}
        onClick={onClickAfter}
      >
        After Weight
      </S.ButtonSet>
      <S.ButtonSet
        color={"#212529"}
        hoverColor={"#ffc107"}
        onClick={onClickNext}
      >
        Next Bag
      </S.ButtonSet>
    </>
  );
}

export default BtnSubdivisionScale;
