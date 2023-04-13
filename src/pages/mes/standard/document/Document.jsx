import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import InputInfo from "components/input/InputInfo";
import ButtonSearch from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import BackDrop from "components/backdrop/BackDrop";
import DocumentSet from "pages/mes/standard/document/DocumentSet";
import * as S from "./Document.styled";
import CN from "json/ColumnName.json";
import { LayoutContext } from "components/layout/common/Layout";

function Document() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refModalGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);

  const {
    data,
    columnsTop,
    columnsBottom,
    columnsModal,
    columnOptions,
    rowHeadersTop,
    rowHeadersModal,
    header,
    datePickerSet,
    inputSet,
    uri,
  } = DocumentSet(isEditMode);

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    // setDisableRowToggle(!disableRowToggle);
  };
  const onClickDelete = () => {
    // const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      // setIsDeleteAlertOpen(true);
    }
  };
  const onClickSearch = () => {
    // setActSearch(!actSearch);
  };
  const handleDelete = () => {
    // setActDelete(!actDelete);
  };
  const handleInputTextChange = (e) => {
    // setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickEditModeSave = () => {
    // setActEditModeSave(!actEditModeSave);
  };
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setSearchToggle(!searchToggle);
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
  const onClickModalSave = () => {
    // setActModalSave(!actModalSave);
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  };
  const onClickGrid = (e) => {
    // DisableRow.handleClickGridCheck(e, isEditMode, ["eqm_failure_fg"]);
  };
  const onEditingFinishGrid = (e) => {
    // DisableRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          <ButtonSearch
            onClickNew={onClickNew}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            onClickSearch={onClickSearch}
          />
        </S.ButtonWrap>
      </S.ShadowBoxButton>
      <S.GridTopWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsTop}
          rowHeaders={rowHeadersTop}
          header={header}
          draggable={false}
        />
      </S.GridTopWrap>
      <S.ShadowBoxInputInfo isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.SearchWrap>
          <InputInfo
            id="insp_document_no"
            name={CN.insp_document_no}
            value="test test"
          />
          <InputInfo id="line_nm" name={CN.line_nm} value="test test" />
          <InputInfo id="prod_no" name={CN.prod_no} value="test test" />
          <InputInfo id="prod_nm" name={CN.prod_nm} value="test test" />
          <InputInfo id="reg_date" name={CN.reg_date} value="test test" />
          <InputInfo id="apply_date" name={CN.apply_date} value="test test" />
          <InputInfo id="apply_fg" name={CN.apply_fg} value="test test" />
          <InputInfo id="contents" name={CN.contents} value="test test" />
          <InputInfo id="remark" name={CN.remark} value="test test" />
        </S.SearchWrap>
      </S.ShadowBoxInputInfo>
      <S.GridBottomWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsBottom}
          rowHeaders={rowHeadersTop}
          header={header}
          draggable={false}
        />
      </S.GridBottomWrap>
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

export default Document;
