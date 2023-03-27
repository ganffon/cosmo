import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import * as S from "./Button.styled";

function ButtonEdit(props) {
  const { onClickSave, onClickExit, onClickSearch } = props;
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
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<LogoutIcon />}
        color="error"
        onClick={onClickExit}
      >
        EXIT
      </S.ButtonSet>
      <S.ButtonSet
        variant="contained"
        size="small"
        startIcon={<SearchIcon />}
        onClick={onClickSearch}
      >
        SEARCH
      </S.ButtonSet>
    </>
  );
}

export default ButtonEdit;