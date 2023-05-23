import * as S from "./BtnPacking.styled";

function BtnPacking(props) {
  const { onClickNew = () => {}, onClickDelete = () => {} } = props;
  return (
    <>
      <S.ButtonSet
        color={"#218838"}
        hoverColor={"#415c76"}
        onClick={onClickNew}
      >
        New
      </S.ButtonSet>
      <S.ButtonSet
        color={"#990b11"}
        hoverColor={"#415c76"}
        onClick={onClickDelete}
      >
        Delete
      </S.ButtonSet>
    </>
  );
}

export default BtnPacking;
