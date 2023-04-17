import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import ButtonSearch from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
import BackDrop from "components/backdrop/BackDrop";
import DocumentSet from "pages/mes/standard/document/DocumentSet";
import useInputSet from "custom/useInputSet";
import * as S from "./Document.styled";
import CN from "json/ColumnName.json";
import * as DisableRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as HD from "custom/useHandleData";
import restURI from "json/restURI.json";
import { LayoutContext } from "components/layout/common/Layout";

function Document() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const refGridTop = useRef(null);
  const refGridBottom = useRef(null);
  const refModalGridTop = useRef(null);
  const refModalGridBottom = useRef(null);
  const refModalSelectGrid = useRef(null);
  const refInputInfo = useRef([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridMainData, setGridMainData] = useState(null);
  const [gridDetailData, setGridDetailData] = useState(null);
  const [gridMainEditData, setGridMainEditData] = useState(null);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [columnsModalSelect, setColumnsModalSelect] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [selectRowID, setSelectRowID] = useState(null);
  const [lineOpt, lineList] = Cbo.useLine();
  const [processOpt, processList] = Cbo.useProcess();
  const [equipmentOpt, equipmentList] = Cbo.useEquipment();
  const [inspectMethodOpt, inspectMethodList] = Cbo.useInspectMethod();
  const [inspectToolOpt, inspectToolList] = Cbo.useInspectTool();
  const [inspectFilingOpt, inspectFilingList] = Cbo.useInspectFiling();

  const {
    columnsTop,
    columnsBottom,
    columnsModalTop,
    columnsModalBottom,
    columnsModalSelectProd,
    columnsModalSelectInsp,
    columnOptions,
    rowHeadersBoth,
    rowHeadersNum,
    header,
    inputSet,
    inputInfo,
    uri,
    uriDetail,
  } = DocumentSet(
    isEditMode,
    lineList,
    processList,
    equipmentList,
    inspectMethodList,
    inspectToolList,
    inspectFilingList
  );
  const SWITCH_NAME_01 = "document";
  const SWITCH_NAME_02 = "documentDetail";

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridTop?.current?.gridInst?.refreshLayout();
    refGridBottom?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridTop.current, refGridBottom.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );

  const [actModalSelectProd, setActModalSelectProd] = HD.useSearchModalSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.product
  ); //➡️ Modal Select Search Prod
  const [actModalSelectInsp, setActModalSelectInsp] = HD.useSearchModalSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.inspectItem
  ); //➡️ Modal Select Search Insp
  const [actModalDetailSave, setActModalDetailSave] = HD.useModalDetailSave(
    refModalGridTop,
    refModalGridBottom,
    isEditMode,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    SWITCH_NAME_02,
    uri
  ); //➡️ Modal Save
  const [actModalDetailEditSave, setActModalDetailEditSave] =
    HD.useModalDetailEditSave(
      refModalGridTop,
      refModalGridBottom,
      isEditMode,
      isBackDrop,
      setIsBackDrop,
      isSnackOpen,
      setIsSnackOpen,
      SWITCH_NAME_01,
      SWITCH_NAME_02,
      uri,
      uriDetail
    ); //➡️ Modal Save
  const [actSearch, setActSearch] = HD.useSearchMain(
    refGridBottom,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    setGridMainData,
    uri
  );
  const [actSearchDetail, setActSearchDetail] = HD.useSearchDetail(
    isBackDrop,
    setIsBackDrop,
    setGridDetailData,
    uriDetail,
    selectRowID
  );
  const [actSearchDetailEdit, setActSearchDetailEdit, actDisableRow] =
    HD.useSearchDetailEdit(
      isBackDrop,
      setIsBackDrop,
      setGridMainEditData,
      setGridDetailData,
      uri,
      uriDetail,
      selectRowID
    );
  useEffect(() => {
    DisableRow.handleDisableRowCheck(refModalGridTop);
    DisableRow.handleDisableRowCheck(refModalGridBottom);
  }, [actDisableRow]); //🔆EditModal 처음 뜰 때 RowHeaderCheck Disable 시키기
  const [actDelete, setActDelete, setDeleteRow] = HD.useDeleteDetail(
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    actSearchDetail,
    setActSearchDetail,
    uriDetail,
    SWITCH_NAME_02
  );
  /**
   * 🔥Main Screen Button Event
   */
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    if (selectRowID !== null) {
      setIsEditMode(true);
      setActSearchDetailEdit(!actSearchDetailEdit);
    }
    // setDisableRowToggle(!disableRowToggle);
  };
  const onClickDelete = () => {
    const data = refGridBottom?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
      setDeleteRow(data);
      /**
       * 🔸삭제확인 창 뜨고나서 그리드 데이터가 사라져서 진행이 안됨, 버그인듯함
       * setDeleteRow(data)로 삭제를 위해 체크했던 row를 담아서 전달함
       */
    }
  };
  const onClickSearch = () => {
    setActSearch(!actSearch);
  };

  const [inputInfoValue, setInputInfoValue] = useState([]);
  const onClickGridTop = (e) => {
    const inputInfoValueList = [
      "insp_document_no",
      "line_nm",
      "prod_no",
      "prod_nm",
      "reg_date",
      "apply_date",
      "apply_fg",
      "contents",
      "remark",
    ];
    setInputInfoValue([]);
    const key = e?.instance.getValue(e?.rowKey, "insp_document_id");
    if (key !== null) {
      setSelectRowID(key);
      setActSearchDetail(!actSearchDetail);
      for (let i = 0; i < inputInfoValueList.length; i++) {
        let data = e?.instance.getValue(e?.rowKey, inputInfoValueList[i]);
        if (data === false) {
          //🔸false 인 경우 데이터 안찍혀서 강제로 찍음
          data = "false";
        }
        setInputInfoValue((prevList) => {
          return [...prevList, data];
        });
      }
    }
  };
  const onDblClickGridTop = () => {};
  const onEditingFinishGridTop = () => {};

  const onClickGridBottom = () => {};
  const onDblClickGridBottom = () => {};
  const onEditingFinishGridBottom = () => {};

  const onClickModalAddRow = () => {
    refModalGridBottom?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalGridTop = (e) => {
    rowKey = e.rowKey;
    DisableRow.handleClickGridCheck(e, isEditMode, ["apply_fg"]);
  };
  const onClickModalGridBottom = (e) => {};
  const onClickModalCancelRow = () => {
    refModalGridBottom?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickModalSave = () => {
    setActModalDetailSave(!actModalDetailSave);
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setActSearch(!actSearch);
    setActSearchDetail(!actSearchDetail);
  };
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "ModalTop" or "ModalBottom"
  const onDblClickModalGridTop = (e) => {
    const columnName = ["prod_no", "prod_nm"];
    let condition;
    for (let i = 0; i < columnName.length; i++) {
      if (i === 0) {
        condition = e?.columnName === columnName[i];
      } else {
        condition = condition || e?.columnName === columnName[i];
      }
    }
    if (condition) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalTop");
      setColumnsModalSelect(columnsModalSelectProd);
      setIsModalSelectOpen(true);
      setActModalSelectProd(!actModalSelectProd);
    }
  };
  const onDblClickModalGridBottom = (e) => {
    const columnName = ["insp_item_type_nm", "insp_item_nm"];
    let condition;
    for (let i = 0; i < columnName.length; i++) {
      if (i === 0) {
        condition = e?.columnName === columnName[i];
      } else {
        condition = condition || e?.columnName === columnName[i];
      }
    }
    if (condition) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalBottom");
      setColumnsModalSelect(columnsModalSelectInsp);
      setIsModalSelectOpen(true);
      setActModalSelectInsp(!actModalSelectInsp);
    }
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickModalSelectGrid = () => {};
  const onDblClickModalSelectGrid = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    if (dblClickGrid === "ModalTop") {
      refGrid = refModalGridTop;
      columnName = ["prod_id", "prod_no", "prod_nm"];
    } else if (dblClickGrid === "ModalBottom") {
      refGrid = refModalGridBottom;
      columnName = [
        "insp_item_type_id",
        "insp_item_type_nm",
        "insp_item_id",
        "insp_item_nm",
      ];
    }
    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
      );
    }
    DisableRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
  };
  const onClickEditModalSave = () => {
    setActModalDetailEditSave(!actModalDetailEditSave);
  };
  const onEditingFinishModalGridTop = (e) => {
    DisableRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishModalGridBottom = (e) => {
    DisableRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.paddingBox>
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ButtonWrap>
            <ButtonSearch
              onClickNew={onClickNew}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              onClickSearch={onClickSearch}
            />
          </S.ButtonWrap>
        </S.ShadowBoxButton>
        <S.GridTopWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsTop}
            rowHeaders={rowHeadersNum}
            header={header}
            data={gridMainData}
            draggable={false}
            refGrid={refGridTop}
            onClickGrid={onClickGridTop}
            onDblClickGrid={onDblClickGridTop}
            onEditingFinish={onEditingFinishGridTop}
          />
        </S.GridTopWrap>
        <S.ShadowBoxInputInfo
          isMenuSlide={isMenuSlide}
          isAllScreen={isAllScreen}
        >
          <S.SearchWrap>
            {inputInfo.map((v, idx) => {
              return (
                <S.InputBox key={v.id}>
                  <S.Title variant="overline">{v.name}</S.Title>
                  <S.Input
                    value={inputInfoValue[idx] || ""}
                    contentEditable={false}
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                  />
                </S.InputBox>
              );
            })}
          </S.SearchWrap>
        </S.ShadowBoxInputInfo>
        <S.GridBottomWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsBottom}
            rowHeaders={rowHeadersBoth}
            header={header}
            data={gridDetailData}
            draggable={false}
            refGrid={refGridBottom}
            onClickGrid={onClickGridBottom}
            onDblClickGrid={onDblClickGridBottom}
            onEditingFinish={onEditingFinishGridBottom}
          />
        </S.GridBottomWrap>
      </S.paddingBox>
      {isModalOpen || isEditMode ? (
        <ModalNewDetail
          gridMainEditData={gridMainEditData}
          gridDetailData={gridDetailData}
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          onClickEditModalSave={onClickEditModalSave}
          columnsModalTop={columnsModalTop}
          columnsModalBottom={columnsModalBottom}
          columnOptions={columnOptions}
          header={header}
          rowHeadersTop={isEditMode ? rowHeadersBoth : rowHeadersNum}
          rowHeadersBottom={isEditMode ? rowHeadersBoth : rowHeadersNum}
          refModalGridTop={refModalGridTop}
          refModalGridBottom={refModalGridBottom}
          isEditMode={isEditMode}
          onClickModalGridTop={onClickModalGridTop}
          onClickModalGridBottom={onClickModalGridBottom}
          onDblClickModalGridTop={onDblClickModalGridTop}
          onDblClickModalGridBottom={onDblClickModalGridBottom}
          onEditingFinishModalGridTop={onEditingFinishModalGridTop}
          onEditingFinishModalGridBottom={onEditingFinishModalGridBottom}
        />
      ) : null}
      {isModalSelectOpen ? (
        <ModalSelect
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsModalSelect}
          columnOptions={columnOptions}
          header={header}
          gridModalSelectData={gridModalSelectData}
          rowHeaders={rowHeadersNum}
          refModalSelectGrid={refModalSelectGrid}
          onClickModalSelectGrid={onClickModalSelectGrid}
          onDblClickModalSelectGrid={onDblClickModalSelectGrid}
        />
      ) : null}
      {isDeleteAlertOpen ? (
        <AlertDeleteDetail
          setActSearchDetail={setActSearchDetail}
          actSearchDetail={actSearchDetail}
          actDelete={actDelete}
          setActDelete={setActDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default Document;
