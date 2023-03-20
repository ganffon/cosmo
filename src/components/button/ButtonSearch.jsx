import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import * as S from "./Button.styled";

function ButtonSearch(props) {
  const {
    onClickNew,
    onClickEdit,
    onClickDelete,
    onClickSearch,
    buttonDisabled,
  } = props;
  return (
    <>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<AddIcon />}
        color="success"
        disabled={buttonDisabled}
        onClick={onClickNew}
      >
        NEW
      </S.ButtonSet>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<EditIcon />}
        color="secondary"
        disabled={buttonDisabled}
        onClick={onClickEdit}
      >
        EDIT
      </S.ButtonSet>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<DeleteIcon />}
        color="error"
        disabled={buttonDisabled}
        onClick={onClickDelete}
      >
        DELETE
      </S.ButtonSet>
      <S.ButtonSet
        variant="contained"
        size="small"
        startIcon={<SearchIcon />}
        disabled={false}
        onClick={onClickSearch}
      >
        SEARCH
      </S.ButtonSet>
    </>
  );
}

export default ButtonSearch;
