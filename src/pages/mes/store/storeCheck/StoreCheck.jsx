import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ModalDate from "components/modal/ModalDate";
import ModalSelect from "components/modal/ModalSelect";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import StoreCheckSet from "./StoreCheckSet";
import TextField from "@mui/material/TextField";
import useInputSet from "custom/useInputSet";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";
import restURI from "json/restURI.json";
import * as disRow from "custom/useDisableRowCheck";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import * as uSearch from "custom/useSearch";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import Condition from "custom/Condition";
//import * as S from "./StoreCheck.styled";
import * as S from "pages/mes/style/oneGrid.styled";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";

export function StoreCheck() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);

  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refGridSelect = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [gridModalData, setGridModalData] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [dateNew, setDateNew] = useState({
    startDate: DateTime().dateFull,
  });
  const [dateModal, setDateModal] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchModalToggle, setSearchModalToggle] = useState(false);
  const [comboValue, setComboValue] = useState({
    prod_gbn_id: null,
    model_id: null,
    prod_type_id: null,
    prod_type_small_id: null,
  });
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [columnsSelect, setColumnsSelect] = useState([]);

  const [productGbnOpt, productGbnList] = Cbo.useProductGbn();
  const [productModelOpt, productModelList] = Cbo.useProductModel();
  const [productTypeOpt, productTypeList] = Cbo.useProductType();
  const [productTypeSmallOpt, productTypeSmallList] = Cbo.useProductTypeSmall();
  const {
    rowHeadersNum,
    rowHeadersNumCheck,
    header,
    columns,
    columnsModal,
    columnsModalStockInspection,
    columnsSelectProd,
    columnsSelectStore,
    columnOptions,
    inputSet,
    datePickerSet,
  } = StoreCheckSet(isEditMode, productGbnList, productModelList, productTypeList, productTypeSmallList);
  const SWITCH_NAME_01 = "storeCheck";
  const SWITCH_NAME_02 = "storeCheckNewLOT";

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

  useEffect(() => {
    onClickStockSearch();
  }, [searchModalToggle]);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);
  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product + `?use_fg=true`
  ); //➡️ Modal Select Search Prod
  const [actSelectStore] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.storeIncludeLocation
  );

  const [actSearchCboDate] = uSearch.useSearchCboDate(
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
    dateText,
    restURI.invStock
  );
  const [actSaveStoreCheck] = uSave.useSaveStoreCheck(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.invStoreCheck,
    searchToggle,
    setSearchToggle
  );
  const [actSaveStoreCheckNewLOT] = uSave.useSaveStoreCheckNewLOT(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.invStoreCheck,
    onClickSearch
  );

  const [actSearchOnlyDate] = uSearch.useSearchOnlyDate(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalData,
    dateModal,
    restURI.storeCheckHistory
  );

  const [actDelete] = uDelete.useDelete(
    refModalGrid,
    isBackDrop,
    isEditMode,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    searchModalToggle,
    setSearchModalToggle,
    restURI.invStore,
    SWITCH_NAME_01
  );

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    setDisableRowToggle(!disableRowToggle);
    disRow.handleCheckReset(true, refSingleGrid);
  };
  const onClickDelete = () => {
    setIsModalDeleteOpen(true);
    actSearchOnlyDate("start_date", "end_date");
  };
  function onClickSearch() {
    actSearchCboDate("tran_reg_date", "");
    setIsModalOpen(false);
  }

  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onClickEditModeSave = () => {
    actSaveStoreCheck(dateText.startDate);
  };
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    actSearchCboDate("tran_reg_date", "");
    setDisableRowToggle(!disableRowToggle);
  };

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    if (rowKey) {
      // 선택한 Row가 있는 경우, 해당 Row의 키를 기반으로 데이터에서 찾아 제거
      const gridInstance = refModalGrid.current?.getInstance();
      // 선택한 Row가 있는 경우, 해당 Row 삭제
      gridInstance?.removeRow(rowKey);
    } else {
      // 선택한 Row가 없는 경우, 마지막 Row 제거
      const gridInstance = refModalGrid.current?.getInstance();
      const rowCount = refModalGrid.current?.getInstance()?.getData()?.length;
      if (rowCount > 0) {
        const lastRowKey = gridInstance.getRowAt(rowCount - 1).rowKey;
        gridInstance?.removeRow(lastRowKey);
      }
    }
    rowKey = undefined;
  };
  const onClickModalSave = () => {
    actSaveStoreCheckNewLOT(dateNew.startDate);
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setDateNew({ ...dateNew, startDate: DateTime.dateFull });
    setSearchToggle(!searchToggle);
  }
  const onClickStockSearch = () => {
    actSearchOnlyDate("start_date", "end_date");
  };
  const onClickStockDelete = () => {
    const data = refModalGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const handleDelete = () => {
    actDelete();
  };
  const onClickStockClose = () => {
    setIsModalDeleteOpen(false);
    setDateModal({
      ...dateModal,
      startDate: DateTime(-7).dateFull,
      endDate: DateTime().dateFull,
    });
    setSearchToggle(!searchToggle);
  };
  const onDblClickModalGrid = (e) => {
    if (Condition(e, ["prod_gbn_nm", "model_nm", "prod_type_nm", "prod_type_small_nm", "prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalProd");
      setColumnsSelect(columnsSelectProd);
      setModalSelectSize({ ...modalSelectSize, width: "45%", height: "90%" });
      setIsModalSelectOpen(true);
      actSelectProd();
    }
    if (Condition(e, ["store_nm", "location_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalStore");
      setColumnsSelect(columnsSelectStore);
      setModalSelectSize({ ...modalSelectSize, width: "20%", height: "80%" });
      setIsModalSelectOpen(true);
      actSelectStore();
    }
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameProd = [
      "prod_gbn_id",
      "prod_gbn_nm",
      "model_id",
      "model_nm",
      "prod_type_id",
      "prod_type_nm",
      "prod_type_small_id",
      "prod_type_small_nm",
      "prod_id",
      "prod_cd",
      "prod_nm",
    ];
    const columnNameStore = ["store_id", "store_nm", "location_id", "location_nm"];
    if (dblClickGrid === "ModalProd") {
      refGrid = refModalGrid;
      columnName = columnNameProd;
    } else if (dblClickGrid === "ModalStore") {
      refGrid = refModalGrid;
      columnName = columnNameStore;
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
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  useEffect(() => {
    const Grid = refSingleGrid?.current?.gridInst;
    for (let i = 0; Grid.getRowCount() > i; i++) {
      if (Grid.getValue(i, "stock") < 0) {
        Grid.addCellClassName(i, "stock", "redText");
      }
    }
  }, [gridData]);

  const GridMain = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columns}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridData}
        draggable={false}
        refGrid={refSingleGrid}
        isEditMode={isEditMode}
        onEditingFinish={onEditingFinishGrid}
      />
    );
  }, [gridData, isEditMode]);

  const ModalNew = useMemo(() => {
    return (
      <ModalDate
        onClickModalAddRow={onClickModalAddRow}
        onClickModalGrid={onClickModalGrid}
        onClickModalCancelRow={onClickModalCancelRow}
        onClickModalSave={onClickModalSave}
        onClickModalClose={onClickModalClose}
        onDblClickModalGrid={onDblClickModalGrid}
        columns={columnsModal}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersNum}
        refModalGrid={refModalGrid}
        dateText={dateNew}
        setDateText={setDateNew}
        datePickerSet={"single"}
        buttonType={"ACS"}
      />
    );
  }, []);
  const ModalDelete = useMemo(() => {
    return (
      <ModalDate
        onClickModalSearch={onClickStockSearch}
        onClickModalDelete={onClickStockDelete}
        onClickModalClose={onClickStockClose}
        columns={columnsModalStockInspection}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersNumCheck}
        data={gridModalData}
        refModalGrid={refModalGrid}
        dateText={dateModal}
        setDateText={setDateModal}
        datePickerSet={"range"}
        buttonType={"DS"}
      />
    );
  }, [gridModalData]);

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <DatePicker datePickerSet={datePickerSet} dateText={dateText} setDateText={setDateText} />
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
                size="small"
                key={(option) => option?.prod_gbn_id}
                options={productGbnOpt || null}
                getOptionLabel={(option) => option?.prod_gbn_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    prod_gbn_id: newValue?.prod_gbn_id === undefined ? null : newValue?.prod_gbn_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.prod_gbn_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <S.ComboBox
                disablePortal
                size="small"
                key={(option) => option?.model_id}
                options={productModelOpt || null}
                getOptionLabel={(option) => option?.model_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    model_id: newValue?.model_id === undefined ? null : newValue?.model_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.model_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <S.ComboBox
                disablePortal
                size="small"
                key={(option) => option?.prod_type_id}
                options={productTypeOpt || null}
                getOptionLabel={(option) => option?.prod_type_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    prod_type_id: newValue?.prod_type_id === undefined ? null : newValue?.prod_type_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.prod_type_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <S.ComboBox
                disablePortal
                id="factoryCombo"
                size="small"
                key={(option) => option?.prod_type_small_id}
                options={productTypeSmallOpt || null}
                getOptionLabel={(option) => option?.prod_type_small_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    prod_type_small_id:
                      newValue?.prod_type_small_id === undefined ? null : newValue?.prod_type_small_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.prod_type_small_nm} size="small" />}
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
        <S.GridWrap>{GridMain}</S.GridWrap>
      </S.ShadowBoxGrid>
      {isModalOpen ? ModalNew : null}
      {isModalSelectOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelect}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      {isModalDeleteOpen ? ModalDelete : null}
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
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
