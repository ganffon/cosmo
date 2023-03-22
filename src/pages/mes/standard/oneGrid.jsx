import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { LayoutEvent } from "components/layout/common/Layout";
import ButtonSearch from "components/button/ButtonSearch";
import ButtonEdit from "components/button/ButtonEdit";
import GridModule from "components/grid/GridModule";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import restAPI from "api/restAPI";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import getPostParams from "api/getPostParams";
import getPutParams from "api/getPutParams";
import getSearchParams from "api/getSearchParams";
import getDeleteParams from "api/getDeleteParams";
import * as S from "./oneGrid.styled";
import FactorySet from "pages/gridSetting/FactorySet";
import EquipmentSet from "pages/gridSetting/EquipmentSet";
import LineSet from "pages/gridSetting/LineSet";
import ProcessSet from "pages/gridSetting/ProcessSet";
import ProductGbnSet from "pages/gridSetting/ProductGbnSet";
import ProductSet from "pages/gridSetting/ProductSet";
import ProductTypeSet from "pages/gridSetting/ProductTypeSet";
import RoutingSet from "pages/gridSetting/RoutingSet";

const getComponent = (componentName) => {
  let component = "";
  switch (componentName) {
    case "FactorySet":
      component = FactorySet;
      break;
    case "EquipmentSet":
      component = EquipmentSet;
      break;
    case "LineSet":
      component = LineSet;
      break;
    case "ProcessSet":
      component = ProcessSet;
      break;
    case "ProductGbnSet":
      component = ProductGbnSet;
      break;
    case "ProductSet":
      component = ProductSet;
      break;
    case "ProductTypeSet":
      component = ProductTypeSet;
      break;
    case "RoutingSet":
      component = RoutingSet;
      break;
    default:
  }
  return component;
};

function OneGrid(props) {
  const { componentName } = props;
  const COMPONENT = getComponent(componentName);
  const COMPONENT_NAME = componentName;
  // const COMPONENT = LineSet(isEditMode);
  // const COMPONENT_NAME = "LineSet";

  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutEvent);
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
  const [inputTextChange, setInputTextChange] = useState();
  const [inputBoxID, setInputBoxID] = useState([]);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const handleInputSetInit = useCallback(
    (data) => {
      const inputBoxID = new Array();
      const jsonObj = new Object();
      for (let i = 0; i < data.length; i++) {
        inputBoxID.push(data[i].id);
        jsonObj[data[i].id] = "";
      }
      return [inputBoxID, jsonObj];
    },
    [currentMenuName]
  );
  useEffect(() => {
    const data = handleInputSetInit(COMPONENT().inputSet);
    setInputBoxID(data[0]);
    setInputTextChange(data[1]);
    onClickSearch(true);
  }, [currentMenuName]);

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
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
      ?.map((raw) => getDeleteParams(COMPONENT_NAME, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .delete(COMPONENT().uri, { data })
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
        const params = getSearchParams(inputBoxID, inputTextChange);
        const readURI = COMPONENT().uri + params;
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
      .updatedRows?.map((raw) => getPutParams(COMPONENT_NAME, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .put(COMPONENT().uri, data)
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
      ?.createdRows.map((raw) => getPostParams(COMPONENT_NAME, raw));
    console.log(data);
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .post(COMPONENT().uri, data)
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

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.InputWrap>
            {COMPONENT().inputSet.map((v) => (
              <InputSearch
                id={v.id}
                name={v.name}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
              />
            ))}
          </S.InputWrap>
          <S.ButtonWrap>
            {isEditMode ? (
              <ButtonEdit
                onClickSave={onClickEditModeSave}
                onClickExit={onClickEditModeExit}
                onClickSearch={onClickSearch}
              />
            ) : (
              <ButtonSearch
                onClickNew={onClickNew}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
                onClickSearch={onClickSearch}
                buttonDisabled={COMPONENT().buttonDisabled}
              />
            )}
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <GridModule
            columnOptions={COMPONENT().columnOptions}
            columns={COMPONENT(isEditMode).columns}
            rowHeaders={COMPONENT().rowHeaders}
            header={COMPONENT().header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
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
          columns={COMPONENT().columnsModal}
          columnOptions={COMPONENT().columnOptions}
          header={COMPONENT().header}
          rowHeaders={COMPONENT().rowHeadersModal}
          uri={COMPONENT().uri}
          refModalGrid={refModalGrid}
          setIsModalOpen={setIsModalOpen}
          onClickModalGrid={onClickModalGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default OneGrid;
