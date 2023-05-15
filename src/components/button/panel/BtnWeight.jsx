import * as S from "./BtnWeight.styled";

function BtnWeight(props) {
  const { onClickNext = () => {}, onClickSearch = () => {} } = props;
  return (
    <>
      <S.ButtonSet
        color={"#28a745"}
        hoverColor={"#218838"}
        onClick={onClickNext}
      >
        Next
      </S.ButtonSet>
      <S.ButtonSet
        color={"#28a745"}
        hoverColor={"#218838"}
        onClick={onClickSearch}
      >
        Search
      </S.ButtonSet>
    </>
  );
}

export default BtnWeight;
