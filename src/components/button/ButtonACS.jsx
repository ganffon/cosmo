import React from "react";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import * as S from "./Button.styled";

function ButtonACS(props) {
  const { onClickAddRow, onClickCancelRow, onClickSave } = props;
  return (
    <>
      <S.ButtonSet
        startIcon={<AddIcon />}
        variant="contained"
        size="small"
        color="success"
        onClick={onClickAddRow}
        width={"130px"}
      >
        ADD ROW
      </S.ButtonSet>
      <S.ButtonSet
        startIcon={<UTurnLeftIcon />}
        variant="contained"
        size="small"
        color="error"
        onClick={onClickCancelRow}
        width={"130px"}
      >
        CANCEL ROW
      </S.ButtonSet>
      <S.ButtonSet
        startIcon={<SaveIcon />}
        variant="contained"
        size="small"
        color="secondary"
        onClick={onClickSave}
      >
        SAVE
      </S.ButtonSet>
    </>
  );
}

export default ButtonACS;
