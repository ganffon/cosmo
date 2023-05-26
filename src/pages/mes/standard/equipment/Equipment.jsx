import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonSES from "components/button/ButtonSES";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import { LoginStateChk } from "custom/LoginStateChk";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import EquipmentSet from "pages/mes/standard/equipment/EquipmentSet";
import useInputSet from "custom/useInputSet";
import Condition from "custom/Condition";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import restURI from "json/restURI.json";

function Equipment() {
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
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Grid" or "Modal"
  const [searchToggle, setSearchToggle] = useState(false);
  const [processOpt, processList] = Cbo.useProcess();

  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnsModalSelect,
    columnOptions,
    inputSet,
  } = EquipmentSet(isEditMode, processList);
  const SWITCH_NAME_01 = "equipment";

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
  }, [searchToggle]);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
  );
  const [actSearchSelect] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.employee + "?use_fg=true"
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
    restURI.equipment,
    SWITCH_NAME_01
  );

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
    restURI.equipment
  );

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.equipment
  );
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.equipment,
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
  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickModalSave = () => {
    // console.log(
    //   refModalGrid?.current?.gridInst?.getModifiedRows()?.createdRows
    // );
    // console.log(refModalGrid?.current?.gridInst.getRowCount());
    // console.log(refModalGrid?.current?.gridInst);

    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }
  const onDblClickModalGrid = (e) => {
    if (Condition(e, ["manager_emp_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalManager");
      setColumnsSelect(columnsModalSelect);
      setModalSelectSize({ ...modalSelectSize, width: "80%", height: "90%" });
      setIsModalSelectOpen(true);
      actSearchSelect();
    }
    if (Condition(e, ["sub_manager_emp_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalSubManager");
      setColumnsSelect(columnsModalSelect);
      setModalSelectSize({ ...modalSelectSize, width: "80%", height: "90%" });
      setIsModalSelectOpen(true);
      actSearchSelect();
    }
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickModalSelectGrid = (e) => {
    let refGrid;
    let columnName;
    let columnNameOri = null;
    if (dblClickGrid === "Manager") {
      refGrid = refSingleGrid;
      columnNameOri = ["emp_id", "emp_nm"];
      columnName = ["manager_emp_id", "manager_emp_nm"];
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    } else if (dblClickGrid === "SubManager") {
      refGrid = refSingleGrid;
      columnNameOri = ["emp_id", "emp_nm"];
      columnName = ["sub_manager_emp_id", "sub_manager_emp_nm"];
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    } else if (dblClickGrid === "ModalManager") {
      refGrid = refModalGrid;
      columnNameOri = ["emp_id", "emp_nm"];
      columnName = ["manager_emp_id", "manager_emp_nm"];
    } else if (dblClickGrid === "ModalSubManager") {
      refGrid = refModalGrid;
      columnNameOri = ["emp_id", "emp_nm"];
      columnName = ["sub_manager_emp_id", "sub_manager_emp_nm"];
    }
    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        columnNameOri === null
          ? e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
          : e?.instance?.store?.data?.rawData[e?.rowKey][columnNameOri[i]]
      );
    }
    setIsModalSelectOpen(false);
  };
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, ["use_fg", "prd_fg"]);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onDblClickGrid = (e) => {
    if (Condition(e, ["manager_emp_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("Manager");
      setColumnsSelect(columnsModalSelect);
      setModalSelectSize({ ...modalSelectSize, width: "80%", height: "90%" });
      setIsModalSelectOpen(true);
      actSearchSelect();
    }
    if (Condition(e, ["sub_manager_emp_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("SubManager");
      setColumnsSelect(columnsModalSelect);
      setModalSelectSize({ ...modalSelectSize, width: "80%", height: "90%" });
      setIsModalSelectOpen(true);
      actSearchSelect();
    }
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
            {isEditMode ? (
              <ButtonSES
                onClickEditModeSave={onClickEditModeSave}
                onClickEditModeExit={onClickEditModeExit}
                onClickSearch={onClickSearch}
              />
            ) : (
              <ButtonNEDS
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
            onDblClickGrid={onDblClickGrid}
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
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelect}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridModalSelectData}
          rowHeaders={rowHeadersModal}
          refSelectGrid={refModalSelectGrid}
          onDblClickGridSelect={onDblClickModalSelectGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default Equipment;
