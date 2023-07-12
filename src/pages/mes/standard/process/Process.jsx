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
import ProcessSet from "pages/mes/standard/process/ProcessSet";
import * as disRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";

function Process(props) {
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
  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
  } = ProcessSet(isEditMode);

  const SWITCH_NAME_01 = "process";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditMode,
    refSingleGrid
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
    restURI.process,
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
    restURI.process
  );

  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.process
  );
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.process,
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

  const validationDuplicated = (columnList) => {
    refModalGrid?.current?.gridInst?.finishEditing();
    const gridInstance = refModalGrid?.current?.getInstance();
    const columnLength = columnList.length;
    const tmpColumnList = columnList;

    const rawDataLength = gridInstance?.store?.data?.rawData.length;

    const rawDatas = gridInstance?.store?.data?.rawData;
    let arr = [];
    for (let i = 0; i < rawDataLength; i++) {
      let tempDataString;

      for (let x = 0; x < columnLength; x++) {
        let data = rawDatas[i];
        let tmpData = data[tmpColumnList[x]];

        if (x === 0) {
          tempDataString = tmpData;
        } else {
          tempDataString = tempDataString + "/" + tmpData;
        }
      }
      arr[i] = tempDataString;
    }

    const setArrayLength = new Set(arr).size;
    if (setArrayLength !== rawDataLength) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "중복된 값이 존재합니다.",
        severity: "error",
      });
    }
  };

  const removeNullRow = () => {
    refModalGrid?.current?.gridInst?.finishEditing();
    const gridInstance = refModalGrid?.current?.getInstance();
    const columnLength = gridInstance?.store?.viewport?.columns?.length;
    const columnList = [];
    for (let i = 0; i < columnLength; i++) {
      columnList[i] = gridInstance?.store?.viewport?.columns[i].name;
    }
    const rawDataLength = gridInstance?.store?.data?.rawData.length;
    let deleteRawList = [];
    const rawDatas = gridInstance?.store?.data?.rawData;

    for (let i = 0; i < rawDataLength; i++) {
      let counter = 0;
      let data = rawDatas[i];
      for (let x = 0; x < columnLength; x++) {
        let tmpData = data[columnList[x]];
        if (!tmpData) {
        } else {
          counter = counter + 1;
        }
      }
      if (counter === 0) {
        deleteRawList[i] = data.rowKey;
      }
    }

    for (let j = 0; j < deleteRawList.length; j++) {
      if (deleteRawList[j] !== undefined) {
        gridInstance?.removeRow(deleteRawList[j]);
      }
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
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  const modalGrid = useMemo(() => {
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
        requirecolumns={["proc_cd", "proc_nm"]}
      />
    );
  }, []);

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
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
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
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
      {isModalOpen ? modalGrid : null}
      <BackDrop isBackDrop={isBackDrop} />
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ContentsArea>
  );
}

export default Process;
