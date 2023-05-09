import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonSES from "components/button/ButtonSES";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import LoginStateChk from "custom/LoginStateChk";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import FactorySet from "pages/mes/standard/factory/FactorySet";
import * as disRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import * as L from "./sparepartsRelease.styled";
import restURI from "json/restURI.json";
import SparePartReleaseSet from "./sparepartsReleaseSet";
import DateTime from "components/datetime/DateTime";
import ModalSelect from "components/modal/ModalSelect";
import Condition from "custom/Condition";
function SparepartsRelease() {
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refModalSelectGrid = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [columnsSelect, setColumnsSelect] = useState(false);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Grid" or "Modal"

  const SWITCH_NAME_01 = "sparepartsoutgo";

  LoginStateChk();
  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
    columnsModalHeader,
    columnsModalSelectProduct,
    columnsModalSelectEquipDetail,
    columnsModalSelectStore,
    columnsModalSelectReleaseUser,
  } = SparePartReleaseSet(isEditMode);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );

  //===============================================
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
  );
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };

  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickModalSave = () => {
    actSave();
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  };

  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });

  //==== 수정
  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.sparepartsoutgo
  );

  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.sparepartsoutgo
  );

  const [actSearchSelect] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.product
  );

  const [actSearchSelectEquipDetail] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.equipmentDetail
  );

  const [actSearchSelectStore] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.storeIncludeLocation,
    "storeFrom"
  );

  const [actSearchSelectReleaseUser] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.employee,
    "releaseUser"
  );

  const [actSearchGridUpdate] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.product
  );

  const [actSearchGridUpdateEquipDetail] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.equipmentDetail
  );

  const [actSearchGridUpdateStore] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.storeIncludeLocation,
    "storeFrom"
  );

  const [actSearchGridUpdateReleaseUser] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.employee,
    "releaseUser"
  );

  // 검색 시작
  const [actSearch] = uSearch.useSearchDI(
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    dateText,
    setGridData,
    disableRowToggle,
    setDisableRowToggle,
    restURI.sparepartsoutgo
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
    restURI.sparepartsoutgo,
    SWITCH_NAME_01
  );
  const onClickEditModeSave = () => {
    actEdit();
  };

  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setSearchToggle(!searchToggle);
  };
  //==== 수정 끝

  const handleDelete = () => {
    actDelete();
  };
  const onClickSearch = () => {
    actSearch("start_date", "end_date");
  };
  useEffect(() => {
    onClickSearch();
  }, [searchToggle]);

  // 검색 끝

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
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const onDblClickModalSelectGrid = (e) => {
    let refGrid;
    let columnName = [];
    let columnNameProd = ["prod_id", "prod_no", "prod_nm"];
    let columnNameEquip = ["eqm_detail_id", "eqm_detail_nm"];
    let columnNameStore = [
      "from_store_id",
      "from_store_nm",
      "from_location_id",
      "from_location_nm",
    ];
    let columnNameEmployee = ["release_uid", "release_nm"];
    if (dblClickGrid === "Grid") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    } else if (dblClickGrid === "ModalProd") {
      refGrid = refModalGrid;
      columnName = columnNameProd;
    } else if (dblClickGrid === "ModalEquip") {
      refGrid = refModalGrid;
      columnName = columnNameEquip;
    } else if (dblClickGrid === "ModalStore") {
      refGrid = refModalGrid;
      columnName = columnNameStore;
    } else if (dblClickGrid === "ModalEmployee") {
      refGrid = refModalGrid;
      columnName = columnNameEmployee;
    } else if (dblClickGrid === "GridProd") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameProd;
    } else if (dblClickGrid === "GridEquip") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameEquip;
    } else if (dblClickGrid === "GridStore") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameStore;
    } else if (dblClickGrid === "GridEmployee") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameEmployee;
    }

    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
      );
    }

    setIsModalSelectOpen(false);
  };

  const onDblClickModalGrid = (e) => {
    if (Condition(e, ["prod_id", "prod_no", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalProd");
      setColumnsSelect(columnsModalSelectProduct);
      setIsModalSelectOpen(true);
      actSearchSelect();
    }

    if (Condition(e, ["eqm_detail_id", "eqm_detail_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalEquip");
      setColumnsSelect(columnsModalSelectEquipDetail);
      setIsModalSelectOpen(true);
      actSearchSelectEquipDetail();
    }
    if (
      Condition(e, [
        "from_store_id",
        "from_store_nm",
        "from_location_id",
        "from_location_nm",
      ])
    ) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalStore");
      setColumnsSelect(columnsModalSelectStore);
      setIsModalSelectOpen(true);
      actSearchSelectStore();
    }
    if (Condition(e, ["release_uid", "release_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalEmployee");
      setColumnsSelect(columnsModalSelectReleaseUser);
      setIsModalSelectOpen(true);
      actSearchSelectReleaseUser();
    }
  };

  const onDblClickGrid = (e) => {
    if (Condition(e, ["prod_id", "prod_no", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("GridProd");
      setColumnsSelect(columnsModalSelectProduct);
      setIsModalSelectOpen(true);
      actSearchGridUpdate();
    }

    if (Condition(e, ["eqm_detail_id", "eqm_detail_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("GridEquip");
      setColumnsSelect(columnsModalSelectEquipDetail);
      setIsModalSelectOpen(true);
      actSearchGridUpdateEquipDetail();
    }
    if (
      Condition(e, [
        "from_store_id",
        "from_store_nm",
        "from_location_id",
        "from_location_nm",
      ])
    ) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("GridStore");
      setColumnsSelect(columnsModalSelectStore);
      setIsModalSelectOpen(true);
      actSearchGridUpdateStore();
    }
    if (Condition(e, ["release_uid", "release_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("GridEmployee");
      setColumnsSelect(columnsModalSelectReleaseUser);
      setIsModalSelectOpen(true);
      actSearchGridUpdateReleaseUser();
    }
  };

  //===============================================

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <L.Date
              datePickerSet={"range"}
              dateText={dateText}
              setDateText={setDateText}
            />
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
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
          {isDeleteAlertOpen ? (
            <AlertDelete
              handleDelete={handleDelete}
              setIsDeleteAlertOpen={setIsDeleteAlertOpen}
            />
          ) : null}
          {isEditMode ? (
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
          ) : (
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
          )}
        </S.GridWrap>
      </S.ShadowBoxGrid>
      {isModalOpen ? (
        <ModalNew
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          columns={columnsModalHeader}
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
          columns={columnsSelect}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridModalSelectData}
          rowHeaders={rowHeadersModal}
          refModalSelectGrid={refModalSelectGrid}
          onDblClickGridSelect={onDblClickModalSelectGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}
export default SparepartsRelease;
