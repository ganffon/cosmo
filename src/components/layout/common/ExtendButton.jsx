import * as S from "./ExtendButton.styled";
import extendBack from "img/Component/button/extend/extendBack.svg";
import extendOn from "img/Component/button/extend/extendOn.svg";
import extendOff from "img/Component/button/extend/extendOff.svg";

function ExtendButton(props) {
  const { isAllScreen, setIsAllScreen } = props;
  const onClick = () => {
    setIsAllScreen(!isAllScreen);
  };
  return (
    <S.ExtendWrap onClick={onClick}>
      <S.ExtendButton src={extendBack} />
      <S.ExtendIcon1 src={isAllScreen ? extendOff : extendOn} />
      <S.ExtendIcon2 src={isAllScreen ? extendOff : extendOn} />
      <S.ExtendIcon3 src={isAllScreen ? extendOff : extendOn} />
      <S.ExtendIcon4 src={isAllScreen ? extendOff : extendOn} />
    </S.ExtendWrap>
  );
}
export default ExtendButton;
