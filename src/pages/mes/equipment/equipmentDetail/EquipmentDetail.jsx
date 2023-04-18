import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonSearch from "components/button/ButtonSearch";
import ButtonEdit from "components/button/ButtonEdit";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import LoginStateChk from "custom/LoginStateChk";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import EquipmentDetailSet from "pages/mes/equipment/equipmentDetail/EquipmentDetailSet";
import TextField from "@mui/material/TextField";
import useInputSet from "custom/useInputSet";
import CN from "json/ColumnName.json";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as uDS from "custom/useDataSingle";
import * as S from "./EquipmentDetail.styled";

function EquipmentDetail() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
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
  const [searchToggle, setSearchToggle] = useState(false);
  const [comboValue, setComboValue] = useState({
    classification_id: null,
    group_id: null,
    class_id: null,
  });

  const [processOpt, processList] = Cbo.useProcess();
  const [employeeOpt, employeeList] = Cbo.useEmployee();
  const [equipmentOpt, equipmentList] = Cbo.useEquipment();
  const [equipmentLargeOpt, equipmentLargeList] = Cbo.useEquipmentLarge();
  const [equipmentMediumOpt, equipmentMediumList] = Cbo.useEquipmentMedium();
  const [equipmentSmallOpt, equipmentSmallList] = Cbo.useEquipmentSmall();
  const {
    uri,
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
  } = EquipmentDetailSet(
    isEditMode,
    processList,
    employeeList,
    equipmentList,
    equipmentLargeList,
    equipmentMediumList,
    equipmentSmallList
  );
  const SWITCH_NAME_01 = "equipmentDetail";

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

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
  );

  const [actDelete] = uDS.useDelete(
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

  const [actSearchCbo] = uDS.useSearchCbo(
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

  const [actSaveEdit] = uDS.useSaveEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    uri
  );
  const [actSaveNew] = uDS.useSaveNew(
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
    actDelete();
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    actSearchCbo();
  };
  const onClickEditModeSave = () => {
    actSaveEdit();
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
    actSaveNew();
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  };
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
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
                id="equipmentLargeCbo"
                size="small"
                key={(option) => option?.classification_id}
                options={equipmentLargeOpt || null}
                getOptionLabel={(option) => option?.classification_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    classification_nm:
                      newValue?.classification_nm === undefined
                        ? null
                        : newValue?.classification_nm,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={CN.classification_nm}
                    size="small"
                  />
                )}
                onKeyDown={onKeyDown}
              />
              <S.ComboBox
                disablePortal
                id="equipmentMediumCbo"
                size="small"
                key={(option) => option?.group_id}
                options={equipmentMediumOpt || null}
                getOptionLabel={(option) => option?.group_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    group_nm:
                      newValue?.group_nm === undefined
                        ? null
                        : newValue?.group_nm,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.group_nm} size="small" />
                )}
                onKeyDown={onKeyDown}
              />
              <S.ComboBox
                disablePortal
                id="equipmentSmallCbo"
                size="small"
                key={(option) => option?.class_id}
                options={equipmentSmallOpt || null}
                getOptionLabel={(option) => option?.class_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    class_nm:
                      newValue?.class_nm === undefined
                        ? null
                        : newValue?.class_nm,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.class_nm} size="small" />
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
          uri={uri}
          refModalGrid={refModalGrid}
          onClickModalGrid={onClickModalGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}
export default EquipmentDetail;
