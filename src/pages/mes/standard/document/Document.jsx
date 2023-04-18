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
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as uDM from "custom/useDataMulti";
import restURI from "json/restURI.json";
import { LayoutContext } from "components/layout/common/Layout";

function Document() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const refGridSelect = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridHeaderData, setGridHeaderData] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataHeaderEdit, setGridDataHeaderEdit] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [headerRowKey, setHeaderRowKey] = useState(null);
  const [lineOpt, lineList] = Cbo.useLine();
  const [processOpt, processList] = Cbo.useProcess();
  const [equipmentOpt, equipmentList] = Cbo.useEquipment();
  const [inspectMethodOpt, inspectMethodList] = Cbo.useInspectMethod();
  const [inspectToolOpt, inspectToolList] = Cbo.useInspectTool();
  const [inspectFilingOpt, inspectFilingList] = Cbo.useInspectFiling();

  const {
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnsSelectProd,
    columnsSelectInsp,
    columnOptions,
    rowHeadersNumCheck,
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
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );

  const [actSelectProd, setActSelectProd] = uDM.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  ); //➡️ Modal Select Search Prod
  const [actSelectInsp, setActSelectInsp] = uDM.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.inspectItem
  ); //➡️ Modal Select Search Insp
  const [actSaveDetail, setActSaveDetail] = uDM.useSaveDetail(
    refGridModalHeader,
    refGridModalDetail,
    isEditMode,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    SWITCH_NAME_02,
    uri
  ); //➡️ Modal Save
  const [actSaveDetailEdit, setActSaveDetailEdit] = uDM.useSaveDetailEdit(
    refGridModalHeader,
    refGridModalDetail,
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
  const [actSearchHeader, setActSearchHeader] = uDM.useSearchHeader(
    refGridDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    setGridHeaderData,
    uri
  );
  const [actSearchDetail, setActSearchDetail] = uDM.useSearchDetail(
    setGridDataDetail,
    uriDetail,
    headerRowKey
  );
  const [actSearchDetailEdit, setActSearchDetailEdit, actDisableRow] =
    uDM.useSearchDetailEdit(
      isBackDrop,
      setIsBackDrop,
      setGridDataHeaderEdit,
      setGridDataDetail,
      uri,
      uriDetail,
      headerRowKey
    );
  useEffect(() => {
    disRow.handleDisableRowCheck(refGridModalHeader);
    disRow.handleDisableRowCheck(refGridModalDetail);
  }, [actDisableRow]); //🔆EditModal 처음 뜰 때 RowHeaderCheck Disable 시키기
  const [actDelete, setActDelete, setDeleteRow] = uDM.useDeleteDetail(
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
   * 🔥Header Screen Button Event
   */
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    if (headerRowKey !== null) {
      setIsEditMode(true);
      setActSearchDetailEdit(!actSearchDetailEdit);
    }
    // setDisableRowToggle(!disableRowToggle);
  };
  const onClickDelete = () => {
    const data = refGridDetail?.current?.gridInst?.getCheckedRows();
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
    setActSearchHeader(!actSearchHeader);
  };

  const [inputInfoValue, setInputInfoValue] = useState([]);
  const onClickGridHeader = (e) => {
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
      setHeaderRowKey(key);
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
  const onDblClickGridHeader = () => {};
  const onEditingFinishGridHeader = () => {};

  const onClickGridDetail = () => {};
  const onDblClickGridDetail = () => {};
  const onEditingFinishGridDetail = () => {};

  const onClickModalAddRow = () => {
    refGridModalDetail?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickGridModalHeader = (e) => {
    rowKey = e.rowKey;
    disRow.handleClickGridCheck(e, isEditMode, ["apply_fg"]);
  };
  const onClickGridModalDetail = (e) => {};
  const onClickModalCancelRow = () => {
    refGridModalDetail?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickModalSave = () => {
    setActSaveDetail(!actSaveDetail);
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setActSearchHeader(!actSearchHeader);
    setActSearchDetail(!actSearchDetail);
  };
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "ModalHeader" or "ModalDetail"
  const onDblClickGridModalHeader = (e) => {
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
      setDblClickGrid("ModalHeader");
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      setActSelectProd(!actSelectProd);
    }
  };
  const onDblClickGridModalDetail = (e) => {
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
      setDblClickGrid("ModalDetail");
      setColumnsSelect(columnsSelectInsp);
      setIsModalSelectOpen(true);
      setActSelectInsp(!actSelectInsp);
    }
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickGridSelect = () => {};
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    if (dblClickGrid === "ModalHeader") {
      refGrid = refGridModalHeader;
      columnName = ["prod_id", "prod_no", "prod_nm"];
    } else if (dblClickGrid === "ModalDetail") {
      refGrid = refGridModalDetail;
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
    disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
  };
  const onClickEditModalSave = () => {
    setActSaveDetailEdit(!actSaveDetailEdit);
  };
  const onEditingFinishGridModalHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishGridModalDetail = (e) => {
    disRow.handleEditingFinishGridCheck(e);
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
        <S.GridHeaderWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsHeader}
            rowHeaders={rowHeadersNum}
            header={header}
            data={gridHeaderData}
            draggable={false}
            refGrid={refGridHeader}
            onClickGrid={onClickGridHeader}
            onDblClickGrid={onDblClickGridHeader}
            onEditingFinish={onEditingFinishGridHeader}
          />
        </S.GridHeaderWrap>
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
        <S.GridDetailWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsDetail}
            rowHeaders={rowHeadersNumCheck}
            header={header}
            data={gridDataDetail}
            draggable={false}
            refGrid={refGridDetail}
            onClickGrid={onClickGridDetail}
            onDblClickGrid={onDblClickGridDetail}
            onEditingFinish={onEditingFinishGridDetail}
          />
        </S.GridDetailWrap>
      </S.paddingBox>
      {isModalOpen || isEditMode ? (
        <ModalNewDetail
          gridDataHeaderEdit={gridDataHeaderEdit}
          gridDataDetail={gridDataDetail}
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          onClickEditModalSave={onClickEditModalSave}
          columnsModalHeader={columnsModalHeader}
          columnsModalDetail={columnsModalDetail}
          columnOptions={columnOptions}
          header={header}
          rowHeadersHeader={isEditMode ? rowHeadersNumCheck : rowHeadersNum}
          rowHeadersDetail={isEditMode ? rowHeadersNumCheck : rowHeadersNum}
          refGridModalHeader={refGridModalHeader}
          refGridModalDetail={refGridModalDetail}
          isEditMode={isEditMode}
          onClickGridModalHeader={onClickGridModalHeader}
          onClickGridModalDetail={onClickGridModalDetail}
          onDblClickGridModalHeader={onDblClickGridModalHeader}
          onDblClickGridModalDetail={onDblClickGridModalDetail}
          onEditingFinishGridModalHeader={onEditingFinishGridModalHeader}
          onEditingFinishGridModalDetail={onEditingFinishGridModalDetail}
        />
      ) : null}
      {isModalSelectOpen ? (
        <ModalSelect
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelect}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridSelect}
          onClickGridSelect={onClickGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
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
