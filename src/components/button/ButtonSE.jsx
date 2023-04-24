import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import * as S from "./Button.styled";

function ButtonSE(props) {
  const { onClickEditSaveDetail, onClickEditExitDetail } = props;
  return (
    <>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<SaveIcon />}
        color="secondary"
        onClick={onClickEditSaveDetail}
      >
        SAVE
      </S.ButtonSet>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<LogoutIcon />}
        color="error"
        onClick={onClickEditExitDetail}
      >
        EXIT
      </S.ButtonSet>
    </>
  );
}

export default ButtonSE;
