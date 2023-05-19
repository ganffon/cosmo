import React, { useContext } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import * as S from "./Button.styled";

function ButtonDS(props) {
  const { onClickDelete = () => {}, onClickSearch = () => {} } = props;
  const { authMenuCode } = useContext(LayoutContext);
  return (
    <>
      <S.ButtonSet
        variant="contained"
        size="small"
        startIcon={<DeleteIcon />}
        color="error"
        disabled={authMenuCode.readOnly ? true : !authMenuCode.delete}
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

export default ButtonDS;
