import * as S from "./ButtonSCLHE.styled";

function ButtonSCLHE(props) {
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
        color={"#28a745"}
        hoverColor={"#218838"}
        onClick={onClickDelete}
        disabled={deleteDisable}
      >
        Delete
      </S.ButtonSet>
      <S.ButtonSet
        color={"#0d6efd"}
        hoverColor={"#025ce2"}
        onClick={onClickLoad}
        disabled={loadDisable}
      >
        Load
      </S.ButtonSet>
      <S.ButtonSet
        color={"#212529"}
        hoverColor={"#ffc107"}
        onClick={onClickHold}
        disabled={holdDisable}
      >
        Hold
      </S.ButtonSet>
      <S.ButtonSet
        color={"#212529"}
        hoverColor={"#ffc107"}
        onClick={onClickEnd}
        disabled={endDisable}
      >
        End
      </S.ButtonSet>
    </>
  );
}

export default ButtonSCLHE;
