import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonSearch from "components/button/ButtonSearch";
import ButtonEdit from "components/button/ButtonEdit";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import LoginStateChk from "custom/LoginStateChk";
import restAPI from "api/restAPI";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import getPutParams from "api/GetPutParams";
import GetInputSearchParams from "api/GetInputSearchParams";
import getDeleteParams from "api/GetDeleteParams";
import PartnerTypeSet from "pages/mes/standard/partnerType/PartnerTypeSet";
import useInputSet from "custom/useInputSet";
import * as S from "../oneGrid.styled";

function PartnerType() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const { uri, rowHeaders, header, columns, columnOptions, inputSet } =
    PartnerTypeSet(isEditMode);

  const SETTING_FILE = "partnerType";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  useEffect(() => {
    onClickSearch(true);
  }, []);

  const onClickNew = () => {};
  const onClickEdit = () => {};
  const onClickDelete = () => {};
  const handleDelete = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    const data = refSingleGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((raw) => getDeleteParams(SETTING_FILE, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .delete(uri, { data })
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.response?.data?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
          setIsDeleteAlertOpen(false);
          onClickSearch(false);
        });
    }
  };
  const handleInputTextChange = async (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = async (props) => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    //🔸검색버튼을 이미 눌러서 Loading ProgressBar가 돌고있다면 API 호출 못함
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const params = GetInputSearchParams(inputBoxID, inputTextChange);
        const readURI = uri + params;
        const gridData = await restAPI.get(readURI);
        setGridData(gridData?.data?.data?.rows);
        props &&
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: gridData?.data?.message,
            severity: "success",
          });
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
    }
  };
  const onClickEditModeSave = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    const data = refSingleGrid?.current?.gridInst
      ?.getModifiedRows()
      ?.updatedRows?.map((raw) => getPutParams(SETTING_FILE, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .put(uri, data)
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.message ? res?.message : res?.response?.data?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
        });
    }
  };
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    onClickSearch(true);
  };

  const onClickGrid = () => {};
  const onEditingFinishGrid = () => {};

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            {inputSet.map((v) => (
              <InputSearch
                key={v.id}
                id={v.id}
                name={v.name}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
              />
            ))}
          </S.SearchWrap>
          <S.ButtonWrap>
            {isEditMode ? (
              <ButtonEdit
                onClickEditModeSave={onClickEditModeSave}
                onClickEditModeExit={onClickEditModeExit}
                onClickSearch={onClickSearch}
              />
            ) : (
              <ButtonSearch
                onClickNew={onClickNew}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
                onClickSearch={onClickSearch}
              />
            )}
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
            onClickGrid={onClickGrid}
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen ? (
        <AlertDelete
          handleDelete={handleDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default PartnerType;
