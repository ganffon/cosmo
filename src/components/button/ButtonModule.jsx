import React, { useContext } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import BtnComponent from "components/button/BtnComponent";

import * as S from "./Button.styled";

function ButtonModule(props) {
  const {
    onClickNew = () => {},
    onClickEdit = () => {},
    onClickDelete = () => {},
    onClickSearch = () => {},
    onClickSave = () => {},
    onClickExit = () => {},
    onClickAddRow = () => {},
    onClickCancelRow = () => {},
    newBtn = false,
    editBtn = false,
    deleteBtn = false,
    searchBtn = false,
    addRowBtn = false,
    cancelRowBtn = false,
    saveBtn = false,
    exitBtn = false,
  } = props;
  const { authMenuCode } = useContext(LayoutContext);
  return (
    <S.ButtonWrap>
      {newBtn ? (
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
      ) : null}
      {editBtn ? (
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
      ) : null}
      {deleteBtn ? (
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
      ) : null}

      {addRowBtn ? (
        <BtnComponent
          btnName={"AddRow"}
          width={"100px"}
          onClick={onClickAddRow}
        >
          ADD ROW
        </BtnComponent>
      ) : null}
      {cancelRowBtn ? (
        <BtnComponent
          btnName={"CancelRow"}
          width={"100px"}
          onClick={onClickCancelRow}
        >
          CANCEL ROW
        </BtnComponent>
      ) : null}
      {saveBtn ? (
        <BtnComponent btnName={"Save"} width={"100px"} onClick={onClickSave}>
          SAVE
        </BtnComponent>
      ) : null}
      {exitBtn ? (
        <S.ButtonSet
          variant="contained"
          size="small"
          startIcon={<LogoutIcon />}
          color="error"
          onClick={onClickExit}
        >
          EXIT
        </S.ButtonSet>
      ) : null}
      {searchBtn ? (
        <S.ButtonSet
          variant="contained"
          size="small"
          startIcon={<SearchIcon />}
          disabled={false}
          onClick={onClickSearch}
        >
          SEARCH
        </S.ButtonSet>
      ) : null}
    </S.ButtonWrap>
  );
}

export default ButtonModule;
