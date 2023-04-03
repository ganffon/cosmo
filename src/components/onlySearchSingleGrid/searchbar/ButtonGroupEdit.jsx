import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import { OnlySearchSingleGridContext } from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import { SearchBarBoxContext } from "./SearchBarBox";
import GetPutParams from "api/getPutParams";
import restAPI from "api/restAPI";
import * as S from "./ButtonGroupEdit.styled";

function ButtonGroupEdit(props) {
  const { componentName, uri } = props;
  const { onClickSearch, alertOpen, setAlertOpen } =
    useContext(SearchBarBoxContext);
  const { refSingleGrid, setIsEditMode, isBackDrop, setIsBackDrop } =
    useContext(OnlySearchSingleGridContext);

  const clickExit = () => {
    setIsEditMode(false);
    onClickSearch();
  };

  const onClickEdit = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    const data = refSingleGrid?.current?.gridInst
      ?.getModifiedRows()
      .updatedRows?.map((raw) => GetPutParams(componentName, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .put(uri, data)
        .then((res) => {
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: res.data.message,
            severity: "success",
          });
        })
        .catch((res) => {
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: res.message ? res.message : res.response.data.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
        });
    }
  };
  return (
    <>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<SaveIcon />}
        color="secondary"
        onClick={onClickEdit}
      >
        SAVE
      </S.ButtonSet>
      <S.ButtonSet
        variant="text"
        size="small"
        startIcon={<LogoutIcon />}
        color="error"
        onClick={clickExit}
      >
        EXIT
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

export default ButtonGroupEdit;
