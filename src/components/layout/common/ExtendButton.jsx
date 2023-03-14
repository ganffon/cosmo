import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import * as S from "./ExtendButton.styled";

function ExtendButton(props) {
  const { isAllScreen, setIsAllScreen } = props;
  const onClick = () => {
    setIsAllScreen(!isAllScreen);
  };
  return (
    <S.ExtendButton
      color="inherit"
      aria-label="add"
      size="small"
      onClick={onClick}
    >
      {isAllScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </S.ExtendButton>
  );
}

export default ExtendButton;
