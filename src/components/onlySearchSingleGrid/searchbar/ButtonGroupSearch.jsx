import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { SearchBarBoxContext } from "./SearchBarBox";
import * as S from "./ButtonGroupSearch.styled";

function ButtonGroupSearch(props) {
  const { btnDisabled } = props;
  const { onClickSearch, onClickNew, onClickDelete, onClickEdit } =
    useContext(SearchBarBoxContext);
  return (
    <>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<AddIcon />}
        color="success"
        disabled={btnDisabled}
        onClick={onClickNew}
      >
        NEW
      </S.ButtonSet>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<EditIcon />}
        color="secondary"
        disabled={btnDisabled}
        onClick={onClickEdit}
      >
        EDIT
      </S.ButtonSet>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<DeleteIcon />}
        color="error"
        disabled={btnDisabled}
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

export default ButtonGroupSearch;
