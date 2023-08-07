import * as S from "pages/mes/style/oneGrid.styled";
import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import productClassSet from "./productClassSet";
import * as disRow from "custom/useDisableRowCheck";
import InputSearch from "components/input/InputSearch";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as uDelete from "custom/useDelete";
import restURI from "json/restURI.json";
import ButtonSES from "components/button/ButtonSES";
import ButtonNEDS from "components/button/ButtonNEDS";
import * as uEdit from "custom/useEdit";
import BackDrop from "components/backdrop/BackDrop";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import ModalNew from "components/modal/ModalNew";
import * as uSave from "custom/useSave";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import restAPI from "api/restAPI";

function ProductClass() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const refModalGrid = useRef(null);
  const [searchToggle, setSearchToggle] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const SWITCH_NAME_01 = "productClass";
  const { rowHeaders, rowHeadersModal, header, columns, columnsModal, columnOptions, inputSet } =
    productClassSet(isEditMode);
  const refSingleGrid = useRef(null);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    actSearch();
  };
  const onClickModalSave = () => {
    actSave();
  };
  const onClickEditModeSave = () => {
    actEdit();
  };
  const handleDelete = () => {
    actDelete();
  };
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setSearchToggle(!searchToggle);
  };

  const onClickNew = () => {
    setIsModalOpen(true);
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
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }
  const onClickEdit = () => {
    setIsEditMode(true);
    setDisableRowToggle(!disableRowToggle);
  };

  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.productClass
  );

  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.productClass,
    onClickModalClose
  );

  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

  const [actSearch] = uSearch.useSearch(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    setGridData,
    disableRowToggle,
    setDisableRowToggle,
    restURI.productClass
  );

  const [actDelete] = uDelete.useDelete(
    refSingleGrid,
    isBackDrop,
    isEditMode,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    searchToggle,
    setSearchToggle,
    restURI.productClass,
    SWITCH_NAME_01
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const loadData = async () => {
    let result;
    try {
      let readURI = restURI.syncProduct;

      setIsBackDrop(true);

      result = await restAPI.post(readURI);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "동기화에 실패하였습니다.",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);

      setIsBackDrop(false);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result.data.message,
        severity: "success",
      });
      onClickSearch();
    }
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
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
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          {/* <BtnComponent btnName={"DataLoad"} toolTipTitle={"productButton"} onClick={loadData} /> */}
          {isEditMode ? (
            <>
              <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
              <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
            </>
          ) : (
            <>
              <BtnComponent btnName={"New"} onClick={onClickNew} />
              <BtnComponent btnName={"Edit"} onClick={onClickEdit} />
              <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
            </>
          )}
        </S.ButtonWrap>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
            isEditMode={isEditMode}
            onClickGrid={onClickGrid}
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
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
          refModalGrid={refModalGrid}
          onClickModalGrid={onClickModalGrid}
        />
      ) : null}

      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default ProductClass;
