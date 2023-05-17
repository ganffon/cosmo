import * as S from "./BtnWeight.styled";

function BtnWeight(props) {
  const { onClickSearch = () => {} } = props;
  return (
    <>
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
