import React, { useContext } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import * as S from "./Button.styled";

function ButtonNED(props) {
  const { onClickNew, onClickEdit, onClickDelete } = props;
  const { authMenuCode } = useContext(LayoutContext);
  return (
    <>
      <S.ButtonSet
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        color="success"
        disabled={authMenuCode.readOnly ? true : !authMenuCode.create}
        onClick={onClickNew}
      >
        NEW
      </S.ButtonSet>
      <S.ButtonSet
        variant="contained"
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
        startIcon={<DeleteIcon />}
        color="error"
        disabled={authMenuCode.readOnly ? true : !authMenuCode.delete}
        onClick={onClickDelete}
      >
        DELETE
      </S.ButtonSet>
    </>
  );
}

export default ButtonNED;
