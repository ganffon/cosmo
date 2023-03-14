import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import { OnlySearchSingleGridEvent } from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import { SearchBarBoxEvent } from "./SearchBarBox";
import GetPutParams from "api/putParams";
import restAPI from "api/restAPI";
import * as S from "./ButtonGroupEdit.styled";

function ButtonGroupEdit(props) {
  const { componentName, uri } = props;
  const { onClickSearch, alertOpen, setAlertOpen } =
    useContext(SearchBarBoxEvent);
  const { refSingleGrid, setIsEditMode, isBackDrop, setIsBackDrop } =
    useContext(OnlySearchSingleGridEvent);

  const clickExit = () => {
    setIsEditMode(false);
    onClickSearch();
  };

  const onClickEdit = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    console.log(
      refSingleGrid?.current?.gridInst?.getModifiedRows().updatedRows
    );
    console.log(`componentName: ${componentName}`);
    const data = refSingleGrid?.current?.gridInst
      ?.getModifiedRows()
      .updatedRows?.map((raw) => GetPutParams(componentName, raw));
    console.log(data);
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
