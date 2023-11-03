import * as S from "./BtnPacking.styled";
import BtnPanel from "components/button/BtnPanel";

function BtnPacking(props) {
  const { onClickNew = () => {}, onClickDelete = () => {} } = props;
  return (
    <S.ButtonSetWrap>
      <BtnPanel
        title={"등록"}
        height={"120px"}
        width={"200px"}
        color={"#1491CE"}
        fontSize={"26px"}
        fontColor={"#ffffff"}
        onClick={onClickNew}
      />
      {/* <BtnPanel
        title={"삭제"}
        height={"45%"}
        width={"80%"}
        color={"#ffffff"}
        fontSize={"26px"}
        fontColor={"#1491CE"}
        borderColor={"#1491CE"}
        onClick={onClickDelete}
      /> */}
    </S.ButtonSetWrap>
  );
}

export default BtnPacking;
