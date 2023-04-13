import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import InputInfo from "components/input/InputInfo";
import ButtonSearch from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import ModalSelect from "components/modal/ModalSelect";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import BackDrop from "components/backdrop/BackDrop";
import DocumentSet from "pages/mes/standard/document/DocumentSet";
import * as S from "./Document.styled";
import CN from "json/ColumnName.json";
import * as DisableRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as HD from "custom/useHandleData";
import { LayoutContext } from "components/layout/common/Layout";

function Document() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refGridTop = useRef(null);
  const refGridBottom = useRef(null);
  const refModalGrid = useRef(null);
  const refModalSelectGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridTopData, setGridTopData] = useState(null);
  const [gridBottomData, setGridBottomData] = useState(null);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [lineOpt, lineList] = Cbo.useLine();

  const {
    data,
    columnsTop,
    columnsBottom,
    columnsModal,
    columnsModalSelect,
    columnOptions,
    rowHeadersTop,
    rowHeadersModal,
    header,
    inputSet,
    uri,
    uriModalSelect,
  } = DocumentSet(isEditMode, lineList);
  const SWITCH_NAME_01 = "document";

  const [disableRowToggle, setDisableRowToggle] = DisableRow.useDisableRowCheck(
    isEditMode,
    refGridTop
  );

  const [actSearchModalSelect, setActSearchModalSelect] =
    HD.useSearchModalSelect(
      refModalSelectGrid,
      isBackDrop,
      setIsBackDrop,
      isSnackOpen,
      setIsSnackOpen,
      setGridModalSelectData,
      disableRowToggle,
      setDisableRowToggle,
      uriModalSelect
    );
  const [actModalSave, setActModalSave] = HD.useModalSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    uri
  );

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    // setDisableRowToggle(!disableRowToggle);
  };
  const onClickDelete = () => {
    // const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    // if (data.length !== 0) {
    // setIsDeleteAlertOpen(true);
    // }
  };
  const onClickSearch = () => {
    // setActSearch(!actSearch);
  };
  const handleDelete = () => {
    // setActDelete(!actDelete);
  };
  // const handleInputTextChange = (e) => {
  //   setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  // };
  // const onClickEditModeSave = () => {
  //   setActEditModeSave(!actEditModeSave);
  // };
  // const onClickEditModeExit = () => {
  //   setIsEditMode(false);
  //   setSearchToggle(!searchToggle);
  // };
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
    setActModalSave(!actModalSave);
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  };
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Grid" or "Modal"
  const onDblClickModalGrid = (e) => {
    const columnName = ["prod_no", "prod_nm"];
    let condition;
    for (let i = 0; i < columnName.length; i++) {
      if (i === 0) {
        condition = e?.columnName === columnName[i];
      } else {
        condition = condition || e?.columnName === columnName[i];
      }
    }
    if (condition) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("Modal");
      setIsModalSelectOpen(true);
      setActSearchModalSelect(!actSearchModalSelect);
    }
  };
  const onClickGrid = (e) => {
    // DisableRow.handleClickGridCheck(e, isEditMode, ["eqm_failure_fg"]);
  };
  const onDblClickGrid = () => {};
  const onEditingFinishGrid = (e) => {
    // DisableRow.handleEditingFinishGridCheck(e);
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickModalSelectGrid = (e) => {
    let refGrid;
    if (dblClickGrid === "Grid") {
      refGrid = refGridTop;
      DisableRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    } else if (dblClickGrid === "Modal") {
      refGrid = refModalGrid;
    }
    const columnName = ["prod_id", "prod_no", "prod_nm"];
    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
      );
    }
    setIsModalSelectOpen(false);
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
          data={gridTopData}
          draggable={false}
          refGrid={refGridTop}
          onClickGrid={onClickGrid}
          onDblClickGrid={onDblClickGrid}
          onEditingFinish={onEditingFinishGrid}
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
          data={gridBottomData}
          draggable={false}
          refGrid={refGridBottom}
          onClickGrid={onClickGrid}
          onDblClickGrid={onDblClickGrid}
          onEditingFinish={onEditingFinishGrid}
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
          refModalGrid={refModalGrid}
          onClickModalGrid={onClickModalGrid}
          onDblClickModalGrid={onDblClickModalGrid}
        />
      ) : null}
      {isModalSelectOpen ? (
        <ModalSelect
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsModalSelect}
          columnOptions={columnOptions}
          header={header}
          gridModalSelectData={gridModalSelectData}
          rowHeaders={rowHeadersModal}
          refModalSelectGrid={refModalSelectGrid}
          onDblClickModalSelectGrid={onDblClickModalSelectGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default Document;
