import CircularProgress from "@mui/material/CircularProgress";
import * as S from "./BackDrop.styled";

function BackDrop(props) {
  const { isBackDrop } = props;
  return (
    <S.BackDrop open={isBackDrop}>
      <CircularProgress color="inherit" />
    </S.BackDrop>
  );
}

export default BackDrop;
