import GridSingle from "components/grid/GridSingle";
import { LayoutContext } from "components/layout/common/Layout";

import * as S from "pages/mes/style/oneGrid.styled";
import * as US from "./userHistory.styled";
import { useContext, useEffect, useRef, useState } from "react";
import UserHistorySet from "./userHistorySet";
import DateTime from "components/datetime/DateTime";
import * as Cbo from "custom/useCboSet";
import useInputSet from "custom/useInputSet";
import restAPI from "api/restAPI";
import * as disRow from "custom/useDisableRowCheck";
import InputSearch from "components/input/InputSearch";
import TextField from "@mui/material/TextField";
import CN from "json/ColumnName.json";
import BackDrop from "components/backdrop/BackDrop";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
function UserHistory() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [userActionOpt, userActionList] = Cbo.useUserActionList();
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const { rowHeadersNum, header, columns, columnOptions, inputSet } = UserHistorySet(userActionList);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);
  const loginID = useRef("");
  const userName = useRef("");

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(false, gridData);

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
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
                id="actionCombo"
                size="small"
                key={(option) => option?.user_action}
                options={userActionOpt || null}
                getOptionLabel={(option) => option?.action_Name || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    user_action: newValue?.user_action === undefined ? null : newValue?.user_action,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.user_action} size="small" />}
              />
            </S.ComboWrap>
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
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <US.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeadersNum}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
          />
        </US.GridWrap>
      </S.ShadowBoxGrid>
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default UserHistory;
