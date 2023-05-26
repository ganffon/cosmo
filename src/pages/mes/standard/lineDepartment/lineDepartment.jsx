import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useEffect, useRef, useState } from "react";
import * as S from "pages/mes/style/oneGrid.styled";
import * as disRow from "custom/useDisableRowCheck";
import GridSingle from "components/grid/GridSingle";
import lineDepartmentSet from "./lineDepartmentSet";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as uSearch from "custom/useSearch";
import BackDrop from "components/backdrop/BackDrop";
import useInputSet from "custom/useInputSet";
import restURI from "json/restURI.json";
import InputSearch from "components/input/InputSearch";
import ButtonSES from "components/button/ButtonSES";
import ButtonNEDS from "components/button/ButtonNEDS";
import * as LS from "./lineDepartment.styled";
import * as Cbo from "custom/useCboSet";
import TextField from "@mui/material/TextField";
import CN from "json/ColumnName.json";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import ModalNew from "components/modal/ModalNew";
import ModalSelect from "components/modal/ModalSelect";
import Condition from "custom/Condition";

function LineDepartment(props) {
  LoginStateChk();
  const [lineOpt, lineList] = Cbo.useLine();
  const [departmentOpt, departmentList] = Cbo.useDept();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const SWITCH_NAME_01 = "lineDepartment";
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [gridData, setGridData] = useState(null);
  const refModalGrid = useRef(null);
  const refModalSelectGrid = useRef(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnsSelect, setColumnsSelect] = useState(false);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Grid" or "Modal"
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });

  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  const onClickSearch = () => {
    actSearch();
  };
  const handleDelete = () => {
    actDelete();
  };

  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  useEffect(() => {
    onClickSearch();
  }, [searchToggle]);
  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnsModalSelectLine,
    columnsModalSelectDept,
    columnOptions,
    inputSet,
  } = lineDepartmentSet(isEditMode, lineList, departmentList);
  const refSingleGrid = useRef(null);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
  );
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const onClickEditModeSave = () => {
    actEdit();
  };
  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setSearchToggle(!searchToggle);
  };
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
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
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }
  const onClickModalSave = () => {
    actSave();
  };

  const onDblClickModalSelectGrid = (e) => {
    let refGrid;
    let columnName = [];
    let columnNameLine = ["line_id", "line_cd", "line_nm"];
    let columnNameDepartment = ["dept_id", "dept_cd", "dept_nm"];
    if (dblClickGrid === "Grid") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    } else if (dblClickGrid === "ModalLine") {
      refGrid = refModalGrid;
      columnName = columnNameLine;
    } else if (dblClickGrid === "ModalDept") {
      refGrid = refModalGrid;
      columnName = columnNameDepartment;
    } else if (dblClickGrid === "GridLine") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameLine;
    } else if (dblClickGrid === "GridDept") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameDepartment;
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
    if (Condition(e, ["line_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalLine");
      setColumnsSelect(columnsModalSelectLine);
      setIsModalSelectOpen(true);
      actSearchSelect();
    }
    if (Condition(e, ["dept_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalDept");
      setColumnsSelect(columnsModalSelectDept);
      setIsModalSelectOpen(true);
      actSearchSelectDepartment();
    }
  };

  const onDblClickGrid = (e) => {
    if (isEditMode) {
      if (Condition(e, ["line_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("GridLine");
        setColumnsSelect(columnsModalSelectLine);
        setIsModalSelectOpen(true);
        actSearchGridUpdate();
      }

      if (Condition(e, ["dept_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("GridDept");
        setColumnsSelect(columnsModalSelectDept);
        setIsModalSelectOpen(true);
        actSearchGridUpdateDept();
      }
    }
  };
  const [actSearchGridUpdate] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.line
  );

  const [actSearchGridUpdateDept] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.department
  );

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.lineDepartment,
    onClickModalClose
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
    restURI.lineDepartment
  );
  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.lineDepartment
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
    restURI.lineDepartment,
    SWITCH_NAME_01
  );

  const [actSearchSelect] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.line
  );

  const [actSearchSelectDepartment] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.department
  );

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <LS.ComboWrap>
              <LS.ComboBox
                disablePortal
                id="lineCombo"
                size="small"
                key={(option) => option?.line_id}
                options={lineOpt || null}
                getOptionLabel={(option) => option?.line_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    line_id:
                      newValue?.line_id === undefined
                        ? null
                        : newValue?.line_id,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.line_nm} size="small" />
                )}
                onKeyDown={onKeyDown}
              />
              <LS.ComboBox
                disablePortal
                id="departmentCombo"
                size="small"
                key={(option) => option?.dept_id}
                options={departmentOpt || null}
                getOptionLabel={(option) => option?.dept_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    dept_id:
                      newValue?.dept_id === undefined
                        ? null
                        : newValue?.dept_id,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={CN.dept_nm} size="small" />
                )}
                onKeyDown={onKeyDown}
              />
            </LS.ComboWrap>
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
export default LineDepartment;
