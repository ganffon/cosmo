import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./SysOptionManage.styled";
import SysOptionManageSet from "./SysOptionManageSet";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import * as disRow from "custom/useDisableRowCheck";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import BackDrop from "components/backdrop/BackDrop";
import useInputSet from "custom/useInputSet";
import * as uEdit from "custom/useEdit";
import InputSearch from "components/input/InputSearch";

export function SysOptionManage() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [searchToggle, setSearchToggle] = useState(false);
  const refGridHeader = useRef(null);
  const refSingleGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const SWITCH_NAME_01 = "option";
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refGridHeader?.current !== null) {
      refGridHeader?.current?.gridInst?.refreshLayout();
    }
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const { rowHeaders, header, columns, inputSet } = SysOptionManageSet(isEditMode);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  const onClickSearch = () => {
    actSearch();
  };
  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const onClickGrid = (e) => {
    // disRow.handleClickGridCheck(e, isEditMode, ["admin_fg"]);
    disRow.handleClickGridCheck(e, isEditMode, ["pwd_fg"]);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onClickEditModeSave = () => {
    actEdit();
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    setDisableRowToggle(!disableRowToggle);
  };
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setSearchToggle(!searchToggle);
  };
  const actSearch = async () => {
    try {
      setIsBackDrop(true);
      let option_cd, option_nm;
      inputTextChange?.option_cd ? (option_cd = `&option_cd=${inputTextChange.option_cd}`) : (option_cd = "");
      inputTextChange?.option_nm ? (option_nm = `&option_nm=${inputTextChange.option_nm}`) : (option_nm = "");
      let readURI = restURI.sysOptionManage + "?" + option_cd + option_nm;
      let gridData = await restAPI.get(readURI);
      setGridDataDetail(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.sysOptionManage
  );
  return (
    <ContentsArea isAllScreen={isAllScreen}>
      <S.SearchCondition>
        {inputSet.map((v) => (
          <InputSearch
            key={v.id}
            id={v.id}
            name={v.name}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
            onKeyDown={onKeyDown}
          />
        ))}
        <S.ButtonTop>
          <BtnComponent btnName={"Search"} onClick={onClickSearch} />
        </S.ButtonTop>
      </S.SearchCondition>
      <S.ContentWrap>
        <S.ButtonWrap>
          {isEditMode ? (
            <>
              <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
              <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
            </>
          ) : (
            <>
              <BtnComponent btnName={"Edit"} onClick={onClickEdit} />
            </>
          )}
        </S.ButtonWrap>
        <S.GridWrap>
          <GridSingle
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridDataDetail}
            draggable={false}
            refGrid={refSingleGrid}
            onClickGrid={onClickGrid}
            onEditingFinish={onEditingFinishGrid}
            isEditMode={isEditMode}
          />
        </S.GridWrap>
      </S.ContentWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
