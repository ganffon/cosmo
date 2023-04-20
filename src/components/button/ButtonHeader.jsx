import React, { useContext } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

import * as S from "./Button.styled";

function ButtonHeader(props) {
  const { onClickNew, onClickEdit, onClickSearch } = props;
  const { authMenuCode } = useContext(LayoutContext);
  return (
    <>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<AddIcon />}
        color="success"
        disabled={authMenuCode.readOnly ? true : !authMenuCode.create}
        onClick={onClickNew}
      >
        NEW
      </S.ButtonSet>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<EditIcon />}
        color="secondary"
        disabled={authMenuCode.readOnly ? true : !authMenuCode.update}
        onClick={onClickEdit}
      >
        EDIT
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

export default ButtonHeader;
