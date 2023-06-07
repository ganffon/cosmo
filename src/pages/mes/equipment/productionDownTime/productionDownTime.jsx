import GridSingle from "components/grid/GridSingle";
import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import * as S from "pages/mes/style/oneGrid.styled";
import { useContext, useState, useEffect, useRef } from "react";
import ProductionDownTimeSet from "./productionDownTimeSet";
import * as disRow from "custom/useDisableRowCheck";
import InputSearch from "components/input/InputSearch";
import DateTime from "components/datetime/DateTime";
import * as LS from "./productionDownTime.styled";
import ButtonSES from "components/button/ButtonSES";
import ButtonNEDS from "components/button/ButtonNEDS";
import * as uSearch from "custom/useSearch";
import * as RE from "custom/RegularExpression";
import useInputSet from "custom/useInputSet";
import restURI from "json/restURI.json";
import NoticeSnack from "components/alert/NoticeSnack";
import ModalNew from "components/modal/ModalNew";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import BackDrop from "components/backdrop/BackDrop";
import Condition from "custom/Condition";
import * as uEdit from "custom/useEdit";
import * as uSave from "custom/useSave";
import ModalSelect from "components/modal/ModalSelect";
import * as uDelete from "custom/useDelete";
import ContentsArea from "components/layout/common/ContentsArea";

function ProductionDownTime() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);

  const SWITCH_NAME_01 = "productionDownTime";

  const rowKey = useRef("");

  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refGridSelect = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [gridData, setGridData] = useState(null);
  const [gridDataModalNew, setGridDataModalNew] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);

  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    columnLineSelect,
    columnProcEquipSelect,
    columnDownTimeSelect,
    inputSet,
    rowHeadersNum,
  } = ProductionDownTimeSet(isEditMode);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  const onClickSearch = () => {
    actSearchHeaderDI("start_date", "end_date");
  };

  const onClickGrid = (e) => {};

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const onClickNew = () => {
    setIsModalOpen(true);
  };

  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
    if (Condition(e, ["start_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refSingleGrid, "start_time");
    }
    if (Condition(e, ["end_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refSingleGrid, "end_time");
    }
  };
  useEffect(() => {
    onClickSearch();
  }, []);
  const [actSearchHeaderDI] = uSearch.useSearchDI(
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
    restURI.productionDownTime
  );

  const handleDelete = () => {
    actDelete();
    onClickSearch();
  };

  const onClickModalGrid = (e) => {
    rowKey.current = e.rowKey;
  };
  const onClickModalAddRow = () => {
    const mainGrid = refModalGrid?.current?.gridInst;
    mainGrid.appendRow();

    mainGrid?.setValue(mainGrid.store.data.rawData.length - 1, "start_date", DateTime().dateFull);
    mainGrid?.setValue(mainGrid.store.data.rawData.length - 1, "downtime_date", DateTime().dateFull);
  };

  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey.current);
  };
  const onClickModalSave = () => {
    actSave();
  };

  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.productionDownTime,
    onClickModalClose
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
    restURI.productionDownTime,
    SWITCH_NAME_01
  );

  const onEditingFinishModal = (e) => {
    if (Condition(e, ["start_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refModalGrid, "start_time");
    }
    if (Condition(e, ["end_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refModalGrid, "end_time");
    }
    disRow.handleEditingFinishGridCheck(e);
  };

  function onClickModalClose() {
    setIsModalOpen(false);
    onClickSearch();
  }

  const onClickEdit = () => {
    setIsEditMode(true);
    setDisRowHeader(!disRowHeader);
  };

  const onClickEditModeSave = () => {
    actEdit();
  };

  const onClickEditModeExit = () => {
    setIsEditMode(false);
    onClickSearch();
    setDisRowHeader(!disRowHeader);
  };

  const onDblClickGridModal = (e) => {
    if (Condition(e, ["line_id", "line_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalSelectLine");
      setColumnsSelect(columnLineSelect);
      setIsModalSelectOpen(true);
      actSelectLine();
    } else if (Condition(e, ["proc_id", "proc_nm", "equip_id", "equip_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalSelectProcEquip");
      setColumnsSelect(columnProcEquipSelect);
      setIsModalSelectOpen(true);
      actSelectEquipProc();
    } else if (Condition(e, ["downtime_id", "downtime_type_nm", "downtime_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalSelectDownTime");
      setColumnsSelect(columnDownTimeSelect);
      setIsModalSelectOpen(true);
      actSelectDownTime();
    }
  };

  const onDblClickGrid = (e) => {
    if (isEditMode) {
      if (Condition(e, ["line_id", "line_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("GridSelectLine");
        setColumnsSelect(columnLineSelect);
        setIsModalSelectOpen(true);
        actSelectLine();
      } else if (Condition(e, ["proc_id", "proc_nm", "equip_id", "equip_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("GridSelectProcEquip");
        setColumnsSelect(columnProcEquipSelect);
        setIsModalSelectOpen(true);
        actSelectEquipProc();
      } else if (Condition(e, ["downtime_id", "downtime_type_nm", "downtime_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("GridSelectDownTime");
        setColumnsSelect(columnDownTimeSelect);
        setIsModalSelectOpen(true);
        actSelectDownTime();
      }
    }
  };

  const [actSelectLine] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.line
  );

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.productionDownTime
  );

  const [actSelectEquipProc] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.equipment
  );
  const [actSelectDownTime] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.downtime
  );

  const onDblClickGridSelect = (e) => {
    let refGrid;
    let columnName;
    const columnNameLine = ["line_id", "line_nm"];
    const columnNameProcEquip = ["proc_id", "proc_nm", "equip_id", "equip_nm"];
    const columnNameDownTime = ["downtime_id", "downtime_type_nm", "downtime_nm"];

    if (dblClickGrid === "ModalSelectLine") {
      refGrid = refModalGrid;
      columnName = columnNameLine;
    } else if (dblClickGrid === "ModalSelectProcEquip") {
      refGrid = refModalGrid;
      columnName = columnNameProcEquip;
    } else if (dblClickGrid === "ModalSelectDownTime") {
      refGrid = refModalGrid;
      columnName = columnNameDownTime;
    }

    if (dblClickGrid === "GridSelectLine") {
      refGrid = refSingleGrid;
      columnName = columnNameLine;
    } else if (dblClickGrid === "GridSelectProcEquip") {
      refGrid = refSingleGrid;
      columnName = columnNameProcEquip;
    } else if (dblClickGrid === "GridSelectDownTime") {
      refGrid = refSingleGrid;
      columnName = columnNameDownTime;
    }

    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
      );
    }
    disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
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

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <LS.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
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
            isEditMode={isEditMode}
            onClickGrid={onClickGrid}
            onDblClickGrid={onDblClickGrid}
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen ? (
        <AlertDelete handleDelete={handleDelete} setIsDeleteAlertOpen={setIsDeleteAlertOpen} />
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
          onDblClickModalGrid={onDblClickGridModal}
          onEditingFinishModal={onEditingFinishModal}
          data={gridDataModalNew}
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
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default ProductionDownTime;
