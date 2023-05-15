import * as S from "./BtnSubdivisionSL.styled";

function BtnSubdivisionSL(props) {
  const { onClickStart = () => {}, onClickLoad = () => {} } = props;
  return (
    <>
      <S.ButtonSet
        color={"#28a745"}
        hoverColor={"#218838"}
        onClick={onClickStart}
      >
        Start
      </S.ButtonSet>
      <S.ButtonSet
        color={"#e5a711"}
        hoverColor={"#b2820d"}
        onClick={onClickLoad}
      >
        Load
      </S.ButtonSet>
    </>
  );
}

export default BtnSubdivisionSL;
