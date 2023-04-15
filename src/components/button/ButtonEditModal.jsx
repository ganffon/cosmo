import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import * as S from "./Button.styled";

function ButtonEditModal(props) {
  const { onClickEditModalSave } = props;
  return (
    <>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<SaveIcon />}
        color="secondary"
        onClick={onClickEditModalSave}
      >
        SAVE
      </S.ButtonSet>
    </>
  );
}

export default ButtonEditModal;
