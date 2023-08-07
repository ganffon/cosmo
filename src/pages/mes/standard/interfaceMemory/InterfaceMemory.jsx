import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import TextField from "@mui/material/TextField";
import InputSearch from "components/input/InputSearch";
import InterfaceMemorySet from "pages/mes/standard/interfaceMemory/InterfaceMemorySet";
import * as disRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";

function InterfaceMemory(props) {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refModalSelectGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [gridModalData, setGridModalData] = useState(null);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const targetRowKey = useRef("");
  const targetGrid = useRef("");

  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [equipmentOpt, equipmentList] = Cbo.useEquipment();
  const [processOpt, processList] = Cbo.useProcess();

  const { rowHeaders, rowHeadersModal, header, columns, columnsModal, columnsModalSelect, columnOptions, inputSet } =
    InterfaceMemorySet(isEditMode, lineList, processList, equipmentList);

  const SWITCH_NAME_01 = "infcMemory";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);

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
    restURI.infcMemory,
    SWITCH_NAME_01
  );

  const [actSearch] = uSearch.useSearchCbo(
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
    restURI.infcMemory
  );

  const [actSearchSelect] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.infcItem
  );

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.infcMemory
  );
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.infcMemory,
    onClickModalClose
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
    actDelete();
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    actSearch();
  };
  const onClickEditModeSave = () => {
    actEdit();
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

  const onDblClickModalGrid = (e) => {
    if (Condition(e, ["infc_item_nm", "infc_item_type_nm"])) {
      targetRowKey.current = e?.rowKey;
      targetGrid.current = "Modal";
      setIsModalSelectOpen(true);
      actSearchSelect();
    }
  };

  const onClickModalSave = () => {
    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };

  const onDblClickGrid = (e) => {
    if (isEditMode) {
      if (Condition(e, ["infc_item_nm", "infc_item_type_nm"])) {
        targetRowKey.current = e?.rowKey;
        targetGrid.current = "Grid";
        setIsModalSelectOpen(true);
        actSearchSelect();
      }
    }
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickModalSelectGrid = (e) => {
    let refGrid;
    if (targetGrid.current === "Grid") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, targetRowKey.current);
    } else if (targetGrid.current === "Modal") {
      refGrid = refModalGrid;
    }
    const columnName = ["infc_item_type_nm", "infc_item_id", "infc_item_nm"];
    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        targetRowKey.current,
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

  const GridModal = useMemo(() => {
    return (
      <ModalNew
        onClickModalAddRow={onClickModalAddRow}
        onClickModalCancelRow={null}
        onClickModalSave={onClickModalSave}
        onClickModalClose={onClickModalClose}
        columns={columnsModal}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersModal}
        refModalGrid={refModalGrid}
        onClickModalGrid={onClickModalGrid}
        onDblClickModalGrid={onDblClickModalGrid}
        data={gridModalData}
        requirecolumns={["infc_item_id", "line_id", "proc_id", "equip_id"]}
      />
    );
  }, [gridModalData, lineList]);

  return (
    <ContentsArea>
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
                    line_id: newValue?.line_id === undefined ? null : newValue?.line_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
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
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.ButtonWrap>
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
            onDblClickGrid={onDblClickGrid}
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      {isModalOpen ? GridModal : null}
      {isModalSelectOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsModalSelect}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridModalSelectData}
          rowHeaders={rowHeadersModal}
          refSelectGrid={refModalSelectGrid}
          onDblClickGridSelect={onDblClickModalSelectGrid}
        />
      ) : null}
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
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default InterfaceMemory;
