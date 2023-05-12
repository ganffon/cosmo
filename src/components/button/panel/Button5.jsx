import * as S from "./Button5.styled";

function Button5(props) {
  const {
    onClickStart = () => {},
    onClickDelete = () => {},
    onClickLoad = () => {},
    onClickEnd = () => {},
    onClickHold = () => {},
    startDisable = false,
    deleteDisable = false,
    loadDisable = false,
    endDisable = false,
    holdDisable = false,
  } = props;
  return (
    <>
      <S.ButtonSet
        color={"#28a745"}
        hoverColor={"#218838"}
        onClick={onClickStart}
        disabled={startDisable}
      >
        Start
      </S.ButtonSet>
      <S.ButtonSet
        color={"#e91717"}
        hoverColor={"#aa1111"}
        onClick={onClickDelete}
        disabled={deleteDisable}
      >
        Delete
      </S.ButtonSet>
      <S.ButtonSet
        color={"#e5a711"}
        hoverColor={"#b2820d"}
        onClick={onClickLoad}
        disabled={loadDisable}
      >
        Load
      </S.ButtonSet>
      <S.ButtonSet
        color={"#e5a711"}
        hoverColor={"#b2820d"}
        onClick={onClickHold}
        disabled={holdDisable}
      >
        Hold
      </S.ButtonSet>
      <S.ButtonSet
        color={"#2986cc"}
        hoverColor={"#1f5e8e"}
        onClick={onClickEnd}
        disabled={endDisable}
      >
        End
      </S.ButtonSet>
    </>
  );
}

export default Button5;
