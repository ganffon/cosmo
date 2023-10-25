import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import ProductSet from "pages/mes/standard/product/ProductSet";
import TextField from "@mui/material/TextField";
import useInputSet from "custom/useInputSet";
import CN from "json/ColumnName.json";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import restAPI from "api/restAPI";
import Condition from "custom/Condition";
import ModalSelect from "components/modal/ModalSelect";

export function Product() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refGridSelect = useRef(null);
  const targetGrid = useRef("");
  const targetRowKey = useRef("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [searchToggle, setSearchToggle] = useState(false);
  const [comboValue, setComboValue] = useState({
    prod_gbn_id: null,
    model_id: null,
    prod_type_id: null,
    prod_type_small_id: null,
  });

  const [productGbnOpt, productGbnList] = Cbo.useProductGbn();
  const [productModelOpt, productModelList] = Cbo.useProductModel();
  const [productTypeOpt, productTypeList] = Cbo.useProductType();
  const [productTypeSmallOpt, productTypeSmallList] = Cbo.useProductTypeSmall();
  const [prodClassOpt, prodClassList] = Cbo.useProdClass();
  const [unitOpt, unitList] = Cbo.useUnit();
  const { rowHeaders, rowHeadersModal, header, columns, columnsModal, columnSelect, columnOptions, inputSet } =
    ProductSet(
      isEditMode,
      productGbnList,
      productModelList,
      productTypeList,
      productTypeSmallList,
      unitList,
      prodClassList
    );
  const SWITCH_NAME_01 = "product";

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
    restURI.product,
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
    restURI.product
  );

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.product
  );
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.product,
    onClickModalClose
  );
  const [actSelectStore] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.storeIncludeLocation
  ); //➡️ Modal Select Search EquipProc
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
    setIsEditMode(false);
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
    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, [
      "lot_fg",
      "use_fg",
      "active_fg",
      "is_spareparts",
      "mat_order_fg",
      "sal_order_fg",
      "inv_use_fg",
      "qms_receive_insp_fg",
      "qms_proc_insp_fg",
      "qms_final_insp_fg",
      "prd_active_fg",
    ]);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
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
  const onDblClickGrid = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["store_nm", "location_nm"])) {
        targetGrid.current = "main";
        targetRowKey.current = e?.rowKey;
        actSelectStore();
        setIsSelectOpen(true);
      }
    }
  };
  const onDblClickModalGrid = (e) => {
    if (e?.targetType === "cell") {
      if (Condition(e, ["store_nm", "location_nm"])) {
        targetGrid.current = "modal";
        targetRowKey.current = e?.rowKey;
        actSelectStore();
        setIsSelectOpen(true);
      }
    }
  };
  const onDblSelect = (e) => {
    if (e?.targetType === "cell") {
      let Grid;
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      switch (targetGrid?.current) {
        case "main":
          Grid = refSingleGrid?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "inv_to_store_id", data?.store_id);
          Grid.setValue(targetRowKey?.current, "store_nm", data?.store_nm);
          Grid.setValue(targetRowKey?.current, "inv_to_location_id", data?.location_id);
          Grid.setValue(targetRowKey?.current, "location_nm", data?.location_nm);
          disRow.handleGridSelectCheck(refSingleGrid, targetRowKey?.current);
          setIsSelectOpen(false);
          break;
        case "modal":
          Grid = refModalGrid?.current?.gridInst;
          Grid.setValue(targetRowKey?.current, "inv_to_store_id", data?.store_id);
          Grid.setValue(targetRowKey?.current, "store_nm", data?.store_nm);
          Grid.setValue(targetRowKey?.current, "inv_to_location_id", data?.location_id);
          Grid.setValue(targetRowKey?.current, "location_nm", data?.location_nm);
          setIsSelectOpen(false);
          break;
        default:
      }
    }
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
                id="factoryCombo"
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
                id="factoryCombo"
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
                id="factoryCombo"
                size="small"
                key={(option) => option?.prod_class_id}
                options={prodClassOpt || null}
                getOptionLabel={(option) => option?.prod_class_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    prod_class_id: newValue?.prod_class_id === undefined ? null : newValue?.prod_class_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.prod_class_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              {/* <S.ComboBox
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
              /> */}
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
        {isEditMode ? (
          <S.ButtonWrap>
            <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
            <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
          </S.ButtonWrap>
        ) : (
          <S.ButtonWrap>
            <BtnComponent btnName={"New"} onClick={onClickNew} />
            <BtnComponent btnName={"Edit"} onClick={onClickEdit} />
            <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
            {/* <BtnComponent btnName={"DataLoad"} toolTipTitle={"productButton"} onClick={loadData} /> */}
          </S.ButtonWrap>
        )}

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
          onDblClickModalGrid={onDblClickModalGrid}
        />
      ) : null}
      {isSelectOpen && (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={() => {
            setIsSelectOpen(false);
          }}
          columns={columnSelect}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersModal}
          refSelectGrid={refGridSelect}
          onDblClickGridSelect={onDblSelect}
        />
      )}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
