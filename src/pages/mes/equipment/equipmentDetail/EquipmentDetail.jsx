import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonSES from "components/button/ButtonSES";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import { LoginStateChk } from "custom/LoginStateChk";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import EquipmentDetailSet from "pages/mes/equipment/equipmentDetail/EquipmentDetailSet";
import TextField from "@mui/material/TextField";
import useInputSet from "custom/useInputSet";
import CN from "json/ColumnName.json";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as S from "./EquipmentDetail.styled";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as col from "custom/GridColumnSet";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";

function EquipmentDetail() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
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
  const { rowHeaders, rowHeadersModal, header, columns, columnsModal, columnOptions, inputSet } = EquipmentDetailSet(
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

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  useEffect(() => {
    onClickSearch();
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
    restURI.equipmentDetail,
    SWITCH_NAME_01
  );

  const [actSearchCbo] = uSearch.useSearchCbo(
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
    restURI.equipmentDetail
  );

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.equipmentDetail
  );
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.equipmentDetail,
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
    actSearchCbo();
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
    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, ["use_fg"]);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
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
    );
  }, [employeeList, equipmentList, equipmentLargeList, equipmentMediumList, equipmentSmallList]);

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
                id="equipmentLargeCbo"
                size="small"
                key={(option) => option?.equip_classification_id}
                options={equipmentLargeOpt || null}
                getOptionLabel={(option) => option?.equip_classification_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    equip_classification_id:
                      newValue?.equip_classification_id === undefined ? null : newValue?.equip_classification_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.classification_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <S.ComboBox
                disablePortal
                id="equipmentMediumCbo"
                size="small"
                key={(option) => option?.equip_group_id}
                options={equipmentMediumOpt || null}
                getOptionLabel={(option) => option?.equip_group_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    equip_group_id: newValue?.equip_group_id === undefined ? null : newValue?.equip_group_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.group_nm} size="small" />}
                onKeyDown={onKeyDown}
              />
              <S.ComboBox
                disablePortal
                id="equipmentSmallCbo"
                size="small"
                key={(option) => option?.equip_class_id}
                options={equipmentSmallOpt || null}
                getOptionLabel={(option) => option?.equip_class_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    equip_class_id: newValue?.equip_class_id === undefined ? null : newValue?.equip_class_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.class_nm} size="small" />}
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
            isEditMode={isEditMode}
            onClickGrid={onClickGrid}
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen ? (
        <AlertDelete handleDelete={handleDelete} setIsDeleteAlertOpen={setIsDeleteAlertOpen} />
      ) : null}
      {isModalOpen ? GridModal : null}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
export default EquipmentDetail;
