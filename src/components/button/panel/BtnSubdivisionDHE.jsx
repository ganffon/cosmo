import * as S from "./BtnSubdivisionDHE.styled";

function BtnSubdivisionDHE(props) {
  const {
    onClickDelete = () => {},
    onClickEnd = () => {},
    onClickHold = () => {},
  } = props;
  return (
    <>
      <S.ButtonSet
        color={"#e91717"}
        hoverColor={"#aa1111"}
        onClick={onClickDelete}
      >
        Delete
      </S.ButtonSet>
      <S.ButtonSet
        color={"#e5a711"}
        hoverColor={"#b2820d"}
        onClick={onClickHold}
      >
        Hold
      </S.ButtonSet>
      <S.ButtonSet
        color={"#2986cc"}
        hoverColor={"#1f5e8e"}
        onClick={onClickEnd}
      >
        End
      </S.ButtonSet>
    </>
  );
}

export default BtnSubdivisionDHE;
