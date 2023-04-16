import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonSearch from "components/button/ButtonSearch";
import ButtonEdit from "components/button/ButtonEdit";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import LoginStateChk from "custom/LoginStateChk";
import BackDrop from "components/backdrop/BackDrop";
import TextField from "@mui/material/TextField";
import InputSearch from "components/input/InputSearch";
import InterfaceMemorySet from "pages/mes/standard/interfaceMemory/InterfaceMemorySet";
import * as DisableRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import * as HD from "custom/useHandleData";
import * as S from "./InterfaceMemory.styled";

function InterfaceMemory(props) {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refModalSelectGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });

  const [lineOpt, lineList] = Cbo.useLine();
  const [equipmentOpt, equipmentList] = Cbo.useEquipment();
  const [processOpt, processList] = Cbo.useProcess();

  const {
    uri,
    uriModalSelect,
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnsModalSelect,
    columnOptions,
    inputSet,
  } = InterfaceMemorySet(isEditMode, lineList, processList, equipmentList);

  const SWITCH_NAME_01 = "interfaceMemory";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  useEffect(() => {
    onClickSearch();
  }, []);

  useEffect(() => {
    onClickSearch();
  }, [searchToggle]);

  const [disableRowToggle, setDisableRowToggle] = DisableRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
  );

  const [actDelete, setActDelete] = HD.useDelete(
    refSingleGrid,
    isBackDrop,
    isEditMode,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    searchToggle,
    setSearchToggle,
    uri,
    SWITCH_NAME_01
  );

  const [actSearch, setActSearch] = HD.useSearchCbo(
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
    comboValue,
    uri
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

  const [actEditModeSave, setActEditModeSave] = HD.useEditModeSave(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    uri
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
    setDisableRowToggle(!disableRowToggle);
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const handleDelete = () => {
    setActDelete(!actDelete);
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    setActSearch(!actSearch);
  };
  const onClickEditModeSave = () => {
    setActEditModeSave(!actEditModeSave);
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
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Grid" or "Modal"
  const onDblClickModalGrid = (e) => {
    const columnName = ["infc_item_nm", "infc_item_type_nm"];
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

  const onClickModalSave = () => {
    setActModalSave(!actModalSave);
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  };
  const onClickGrid = (e) => {
    DisableRow.handleClickGridCheck(e, isEditMode, []);
  };

  const onDblClickGrid = (e) => {
    const columnName = ["infc_item_nm", "infc_item_type_nm"];
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
      setDblClickGrid("Grid");
      setIsModalSelectOpen(true);
      setActSearchModalSelect(!actSearchModalSelect);
    }
  };
  const onEditingFinishGrid = (e) => {
    DisableRow.handleEditingFinishGridCheck(e);
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickModalSelectGrid = () => {};
  const onDblClickModalSelectGrid = (e) => {
    let refGrid;
    if (dblClickGrid === "Grid") {
      refGrid = refSingleGrid;
      DisableRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    } else if (dblClickGrid === "Modal") {
      refGrid = refModalGrid;
    }
    const columnName = ["infc_item_type_nm", "infc_item_id", "infc_item_nm"];
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
        <S.ToolWrap>
          <S.SearchWrap>
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
                id="factoryCombo"
                size="small"
                key={(option) => option?.line_id}
                options={lineOpt || null}
                getOptionLabel={(option) => option?.line_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    line_nm:
                      newValue?.line_nm === undefined
                        ? null
                        : newValue?.line_nm,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.line_nm} size="small" />
                )}
                onKeyDown={onKeyDown}
              />
            </S.ComboWrap>
            <S.InputWrap>
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
            </S.InputWrap>
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
            onDblClickGrid={onDblClickGrid}
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
          onClickModalSelectGrid={onClickModalSelectGrid}
          onDblClickModalSelectGrid={onDblClickModalSelectGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default InterfaceMemory;
