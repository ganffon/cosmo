import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import * as S from "./Button.styled";

function ButtonSave(props) {
  const { onClickSave } = props;
  return (
    <>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<SaveIcon />}
        color="secondary"
        onClick={onClickSave}
      >
        SAVE
      </S.ButtonSet>
    </>
  );
}

export default ButtonSave;
