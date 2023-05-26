import ButtonSearch from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import * as S from "pages/mes/style/oneGrid.styled";
import { useContext, useEffect, useRef, useState } from "react";
import UserHistorySet from "./userHistorySet";
import DateTime from "components/datetime/DateTime";
import * as LS from "./userHistory.styled";
import * as Cbo from "custom/useCboSet";
import useInputSet from "custom/useInputSet";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import * as disRow from "custom/useDisableRowCheck";
import InputSearch from "components/input/InputSearch";
import TextField from "@mui/material/TextField";
import CN from "json/ColumnName.json";
import BackDrop from "components/backdrop/BackDrop";
function UserHistory() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [userActionOpt, userActionList] = Cbo.useUserActionList();
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnsModalSelectLine,
    columnsModalSelectDept,
    columnOptions,
    inputSet,
  } = UserHistorySet(userActionList);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const loginID = useRef("");
  const userName = useRef("");

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    false,
    gridData
  );

  const onClickSearch = () => {
    actSearchGrid();
  };
  const [comboValue, setComboValue] = useState({
    user_action: null,
  });

  const actSearchGrid = async (e) => {
    try {
      let readURI = `/sys/user-log?start_date=${dateText.startDate}&end_date=${dateText.endDate}&`;
      setIsBackDrop(true);

      if (inputTextChange.user_nm !== "" && inputTextChange.user_nm !== null) {
        readURI = readURI + `user_nm=${inputTextChange.user_nm}&`;
      }

      if (inputTextChange.id !== "" && inputTextChange.id !== null) {
        readURI = readURI + `id=${inputTextChange.id}&`;
      }
      if (comboValue.user_action !== "" && comboValue.user_action !== null) {
        readURI = readURI + `user_action=${comboValue.user_action}&`;
      }

      readURI = readURI.slice(0, readURI.length - 1);

      console.log(readURI);
      let gridData = await restAPI.get(readURI);

      setGridData(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <LS.Date
              datePickerSet={"range"}
              dateText={dateText}
              setDateText={setDateText}
            />
            <LS.ComboWrap>
              <LS.ComboBox
                disablePortal
                id="actionCombo"
                size="small"
                key={(option) => option?.user_action}
                options={userActionOpt || null}
                getOptionLabel={(option) => option?.action_Name || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    user_action:
                      newValue?.user_action === undefined
                        ? null
                        : newValue?.user_action,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.user_action} size="small" />
                )}
                //onKeyDown={onKeyDown}
              />
            </LS.ComboWrap>
            <InputSearch
              id={"id"}
              name={"로그인 ID"}
              handleInputTextChange={handleInputTextChange}
              onClickSearch={onClickSearch}
            />
            <InputSearch
              id={"user_nm"}
              name={"사용자명"}
              handleInputTextChange={handleInputTextChange}
              onClickSearch={onClickSearch}
            />
          </S.SearchWrap>
          <S.ButtonWrap>
            <ButtonSearch onClickSearch={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default UserHistory;
