import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import * as S from "./Button.styled";

function ButtonSE(props) {
  const { onClickSave, onClickExit } = props;
  return (
    <>
      <S.ButtonSet
        variant="contained"
        size="small"
        startIcon={<SaveIcon />}
        color="secondary"
        onClick={onClickSave}
      >
        SAVE
      </S.ButtonSet>
      <S.ButtonSet
        variant="contained"
        size="small"
        startIcon={<LogoutIcon />}
        color="error"
        onClick={onClickExit}
      >
        EXIT
      </S.ButtonSet>
    </>
  );
}

export default ButtonSE;
