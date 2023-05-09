import { LayoutContext } from "components/layout/common/Layout";
import LoginStateChk from "custom/LoginStateChk";
import { useContext, useEffect, useRef, useState } from "react";
import restURI from "json/restURI.json";
import * as S from "./SparepartsIncome.styled";
import DateTime from "components/datetime/DateTime";
import { InputSet } from "components/input/InputSearch.styled";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as disRow from "custom/useDisableRowCheck";
import SparepartsIncomeSet from "./SparepartsIncomeSet";
import GridSingle from "components/grid/GridSingle";
import * as uEdit from "custom/useEdit";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonNED from "components/button/ButtonNED";
import ButtonSES from "components/button/ButtonSES";
import ModalNew from "components/modal/ModalNew";
import { BackDrop } from "components/backdrop/BackDrop.styled";
import * as uSave from "custom/useSave";
import * as uDelete from "custom/useDelete";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";

function SparepartIncome() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  /* 변수 선언 영역 시작 */
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeDetail, setIsEditModeDetail] = useState(false);
  const [isNewDetail, setIsNewDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [inputInfoValue, setInputInfoValue] = useState([]);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);
  const [headerClickRowKey, setHeaderClickRowKey] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);
  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const SWITCH_NAME_01 = "sparepartsIncome";
  const SWITCH_NAME_02 = "sparepartsIncomeDetail";
  /* 변수 선언 영역 종료 */

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersModal,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnsSelectProd,
    inputInfo,
    onClickGridHeader,
    inputSet,
  } = SparepartsIncomeSet();
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  console.log(inputBoxID);

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(
    isEditModeHeader,
    refGridHeader
  );
  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(
    isEditModeDetail,
    refGridDetail
  );

  const onClickEditModeHeaderSave = () => {
    actEdit();
  };

  const onClickEditModeHeaderExit = () => {
    setIsEditModeHeader(false);
    setSearchToggle(!searchToggle);
  };
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditModeHeader,
    refSingleGrid
  );

  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.employee
  );

  const [actSearchHeaderDI] = uSearch.useSearchHeaderDI(
    refGridHeader,
    refGridDetail,
    setInputInfoValue,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    dateText,
    setGridDataHeader,
    disRowHeader,
    setDisRowHeader,
    restURI.sparepartsIncome
  );

  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.sparepartsIncome
  );

  const [actDelete] = uDelete.useDelete(
    refGridHeader,
    isBackDrop,
    isEditModeHeader,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    searchToggle,
    setSearchToggle,
    restURI.sparepartsIncome,
    SWITCH_NAME_01
  );

  const handleDelete = () => {
    actDelete();
  };

  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };

  useEffect(() => {
    onClickSearch();
  }, []);

  const onClickSearch = () => {
    actSearchHeaderDI(true, "start_date", "end_date");
  };

  const onClickNew = () => {
    setIsModalOpen(true);
  };

  const onClickEdit = () => {
    setIsEditModeHeader(true);
    //setDisableRowToggle(!disableRowToggle);
  };

  const onClickDelete = () => {
    const data = refGridHeader?.current?.gridInst?.getCheckedRows();
    console.log(data);
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };

  const onClickModalSave = () => {
    actSave();
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  };

  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };
  //  onClickDelete={onClickDelete}
  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ContentsLeft>
        <S.SearchLeftWrap>
          <S.Date
            datePickerSet={"range"}
            dateText={dateText}
            setDateText={setDateText}
          />
          <S.SearchLeftTopWrap>
            {isEditModeHeader ? (
              <ButtonSES
                onClickEditModeSave={onClickEditModeHeaderSave}
                onClickEditModeExit={onClickEditModeHeaderExit}
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
          </S.SearchLeftTopWrap>
        </S.SearchLeftWrap>
        <S.GridHeaderWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsHeader}
            rowHeaders={rowHeadersNumCheck}
            header={header}
            data={gridDataHeader}
            draggable={false}
            refGrid={refGridHeader}
            onClickGrid={onClickGridHeader}
            // onDblClickGrid={onDblClickGrid}
            onEditingFinish={onEditingFinishGridHeader}
          />
        </S.GridHeaderWrap>
      </S.ContentsLeft>
      <S.ContentsRight>
        <S.SearchLeftWrap>
          <S.SearchRightTopWrap>
            <ButtonNED />
          </S.SearchRightTopWrap>
        </S.SearchLeftWrap>
        <S.GridDetailWrap isAllScreen={isAllScreen}>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsDetail}
            rowHeaders={rowHeadersNumCheck}
            header={header}
            data={gridDataDetail}
            draggable={false}
            refGrid={refGridDetail}
            // onClickGrid={onClickGrid}
            // onDblClickGrid={onDblClickGrid}
          />
        </S.GridDetailWrap>
      </S.ContentsRight>
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
          columns={columnsModalHeader}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersModal}
          refModalGrid={refModalGrid}
          onClickModalGrid={onClickModalGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}
export default SparepartIncome;
