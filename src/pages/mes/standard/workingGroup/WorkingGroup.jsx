import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import { useCookies } from "react-cookie";
import ButtonSearch from "components/button/ButtonSearch";
import ButtonEdit from "components/button/ButtonEdit";
import GridModule from "components/grid/GridModule";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import LoginStateChk from "custom/LoginStateChk";
import restAPI from "api/restAPI";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import GetPostParams from "api/GetPostParams";
import GetPutParams from "api/GetPutParams";
import GetInputSearchParams from "api/GetInputSearchParams";
import GetDeleteParams from "api/GetDeleteParams";
import WorkingGroupSet from "pages/mes/standard/workingGroup/WorkingGroupSet";
import useInputSet from "custom/useInputSet";
import * as DisableRow from "custom/useDisableRowCheck";
import * as S from "../oneGrid.styled";

function WorkingGroup(props) {
  LoginStateChk();

  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [cookie, setCookie, removeCookie] = useCookies();

  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const {
    uri,
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
  } = WorkingGroupSet(isEditMode);
  const SETTING_FILE = "WorkingGroup";
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
  const [disableRowCheck, setDisableRowCheck] = DisableRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
  );
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    setDisableRowCheck(!disableRowCheck);
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const handleDelete = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    const data = refSingleGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((raw) => GetDeleteParams(SETTING_FILE, raw));
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
        setDisableRowCheck(!disableRowCheck);
        setIsBackDrop(false);
      }
    }
  };
  const onClickEditModeSave = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    const data = refSingleGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((raw) => GetPutParams(SETTING_FILE, raw));
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
  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickModalSave = async () => {
    refModalGrid?.current?.gridInst?.finishEditing();
    const data = refModalGrid?.current?.gridInst
      ?.getModifiedRows()
      ?.createdRows.map((raw) =>
        GetPostParams(SETTING_FILE, raw, cookie.factoryID)
      );

    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .post(uri, data)
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
          refModalGrid?.current?.gridInst?.clear();
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
  const onClickModalClose = () => {
    setIsModalOpen(false);
    onClickSearch();
  };
  const onClickGrid = (e) => {
    DisableRow.handleClickGridCheck(e, isEditMode, []);
  };
  const onEditingFinishGrid = (e) => {
    DisableRow.handleEditingFinishGridCheck(e);
  };

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
          <GridModule
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
      {isModalOpen ? (
        <ModalNew
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          columns={columnsModal}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersModal}
          uri={uri}
          refModalGrid={refModalGrid}
          setIsModalOpen={setIsModalOpen}
          onClickModalGrid={onClickModalGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default WorkingGroup;
