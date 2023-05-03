import { useContext, useState, useEffect, useRef, useCallback } from "react";
import LoginStateChk from "custom/LoginStateChk";
import ButtonNES from "components/button/ButtonNES";
import ButtonNED from "components/button/ButtonNED";
import ButtonSES from "components/button/ButtonSES";
import ButtonSE from "components/button/ButtonSE";
import ButtonGroup from "components/button/ButtonGroup";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
import BackDrop from "components/backdrop/BackDrop";
import DocumentSet from "pages/mes/standard/document/DocumentSet";
import useInputSet from "custom/useInputSet";
import InputSearchDisabled from "components/input/InputSearchDisabled";
import TextField from "@mui/material/TextField";
import * as S from "./Document.styled";
import CN from "json/ColumnName.json";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import Condition from "custom/Condition";
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

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeDetail, setIsEditModeDetail] = useState(false);
  const [isNewDetail, setIsNewDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [inputInfoValue, setInputInfoValue] = useState([]);

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
  } = DocumentSet(
    isEditModeHeader,
    isEditModeDetail,
    isNewDetail,
    lineList,
    processList,
    equipmentList,
    inspectMethodList,
    inspectToolList,
    inspectFilingList
  );
  const SWITCH_NAME_01 = "document";
  const SWITCH_NAME_02 = "documentDetail";
  let modalDetailClickRowKey = null;

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  useEffect(() => {
    actSearchHeaderIC();
  }, []);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(
    isEditModeHeader,
    refGridHeader
  );
  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(
    isEditModeDetail,
    refGridDetail
  );

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  ); //➡️ Modal Select Search Prod
  const [actSelectInsp] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.inspectItem
  ); //➡️ Modal Select Search Insp
  const [actSave] = uSave.useSaveMulti(
    refGridModalHeader,
    refGridModalDetail,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    SWITCH_NAME_02,
    restURI.inspectDocument
  );
  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.inspectDocument
  );
  const [actEditDetail] = uEdit.useEditDetail(
    refGridDetail,
    isEditModeDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.inspectDocument
  );
  const [actSaveDetail] = uSave.useSaveDetail(
    refGridModalDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.inspectDocumentDetail
  );

  const [actSearchHeaderIC] = uSearch.useSearchHeaderIC(
    refGridHeader,
    refGridDetail,
    setInputInfoValue,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputSearchValue,
    comboValue,
    setGridDataHeader,
    disRowHeader,
    setDisRowHeader,
    restURI.inspectDocument
  );
  const [actSearchDetail] = uSearch.useSearchDetail(
    setGridDataDetail,
    restURI.inspectDocumentDetailID,
    disRowDetail,
    setDisRowDetail
  );
  const [actSearchEditHeader] = uSearch.useSearchEditHeader(
    isBackDrop,
    setIsBackDrop,
    setGridDataHeaderRowID,
    restURI.inspectDocument
  );
  const [actDeleteDetail] = uDelete.useDeleteDetail(
    refGridDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    actSearchHeaderIC,
    actSearchDetail,
    headerClickRowID,
    restURI.inspectDocumentDetail,
    SWITCH_NAME_02
  );
  /**
   * 🔥Header Screen Button Event
   */
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEditHeader = () => {
    setIsEditModeHeader(true);
    setDisRowHeader(!disRowHeader);
    // }
  };
  const onClickEditNew = () => {
    if (refGridDetail?.current?.gridInst?.getRowCount() !== 0) {
      setIsNewDetail(true);
      setIsModalOpen(true);
      actSearchEditHeader(headerClickRowID);
    }
  };
  const onClickEditDetail = () => {
    setIsEditModeDetail(true);
    setDisRowDetail(!disRowDetail);
  };
  const onClickDelete = () => {
    const data = refGridDetail?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };
  const onClickProdCancel = () => {
    setInputSearchValue([]);
  };
  const onClickSearch = () => {
    actSearchHeaderIC();
  };
  const onClickEditModeSave = () => {
    actEditHeader();
    setIsEditModeDetail(false);
  };
  const onClickEditModeExit = () => {
    setIsEditModeHeader(false);
    actSearchHeaderIC(true);
    setDisRowHeader(!disRowHeader);
  };
  const onClickEditSaveDetail = () => {
    actEditDetail();
  };
  const onClickEditExitDetail = () => {
    setIsEditModeDetail(false);
    actSearchDetail(headerClickRowID);
    setDisRowDetail(!disRowDetail);
  };

  const onClickGridHeader = (e) => {
    if (isEditModeHeader === false) {
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
      const rowID = e?.instance.getValue(e?.rowKey, "insp_document_id");
      if (rowID !== null) {
        setInputInfoValue([]);
        setHeaderClickRowID(rowID);
        actSearchDetail(rowID);
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
    } else {
      disRow.handleClickGridCheck(e, isEditModeHeader, ["apply_fg"]);
    }
  };
  const onDblClickGridHeader = (e) => {
    if (Condition(e, ["prod_no", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("Header");
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onDblClickGridDetail = (e) => {
    if (Condition(e, ["insp_item_type_nm", "insp_item_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("Detail");
      setColumnsSelect(columnsSelectInsp);
      setIsModalSelectOpen(true);
      actSelectInsp();
    }
  };
  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishGridDetail = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onClickModalAddRow = () => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    Header?.finishEditing();
    Detail?.finishEditing();
    Detail?.appendRow();
    if (isNewDetail === true) {
      for (let i = 0; i < Detail.store.viewport.rows.length; i++) {
        Detail?.setValue(
          Detail.store.viewport.rows[i].rowKey,
          "insp_document_id",
          Header.getValue(0, "insp_document_id")
        );
      }
    }
  };
  const onClickGridModalDetail = (e) => {
    modalDetailClickRowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    const gridEvent = refGridModalDetail?.current?.gridInst;
    gridEvent?.removeRow(modalDetailClickRowKey);
    modalDetailClickRowKey = null;
  };
  const onClickModalSave = () => {
    actSave();
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setIsNewDetail(false);
    setIsEditModeHeader(false);
    actSearchHeaderIC(true);
  };
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const onDblClickGridModalHeader = (e) => {
    if (Condition(e, ["prod_no", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onDblClickGridModalDetail = (e) => {
    if (Condition(e, ["insp_item_type_nm", "insp_item_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalDetail");
      setColumnsSelect(columnsSelectInsp);
      setIsModalSelectOpen(true);
      actSelectInsp();
    }
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameProd = ["prod_id", "prod_no", "prod_nm"];
    const columnNameInspItem = [
      "insp_item_type_id",
      "insp_item_type_nm",
      "insp_item_id",
      "insp_item_nm",
    ];

    if (dblClickGrid === "Search") {
      setInputSearchValue([]);
      columnName = ["prod_no", "prod_nm"];
      for (let i = 0; i < columnName.length; i++) {
        setInputSearchValue((prevList) => {
          return [
            ...prevList,
            e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]],
          ];
        });
      }
    } else {
      if (dblClickGrid === "Header") {
        refGrid = refGridHeader;
        columnName = columnNameProd;
      } else if (dblClickGrid === "ModalHeader") {
        refGrid = refGridModalHeader;
        columnName = columnNameProd;
      } else if (dblClickGrid === "Detail") {
        refGrid = refGridDetail;
        columnName = columnNameInspItem;
      } else if (dblClickGrid === "ModalDetail") {
        refGrid = refGridModalDetail;
        columnName = columnNameInspItem;
      }
      for (let i = 0; i < columnName.length; i++) {
        refGrid?.current?.gridInst?.setValue(
          dblClickRowKey,
          columnName[i],
          e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
        );
      }
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    }
    setIsModalSelectOpen(false);
  };

  const onClickEditModalSave = () => {
    actSaveDetail();
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      actSearchHeaderIC(true);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButtonHeader
        isMenuSlide={isMenuSlide}
        isAllScreen={isAllScreen}
      >
        <S.ComboWrap>
          <S.ComboBox
            disablePortal
            id="lineCbo"
            size="small"
            key={(option) => option?.line_id}
            options={lineOpt || null}
            getOptionLabel={(option) => option?.line_nm || ""}
            onChange={(_, newValue) => {
              setComboValue({
                ...comboValue,
                line_nm:
                  newValue?.line_nm === undefined ? null : newValue?.line_nm,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label={CN.line_nm} size="small" />
            )}
            onKeyDown={onKeyDown}
          />

          {inputSet.map((v, idx) => (
            <InputSearchDisabled
              key={v.id}
              id={v.id}
              name={v.name}
              value={inputSearchValue[idx] || ""}
              onKeyDown={onKeyDown}
            />
          ))}
          <ButtonGroup
            onClickSelect={onClickProd}
            onClickCancel={onClickProdCancel}
          />
        </S.ComboWrap>
        <S.ButtonWrap>
          {isEditModeHeader ? (
            <ButtonSES
              onClickEditModeSave={onClickEditModeSave}
              onClickEditModeExit={onClickEditModeExit}
              onClickSearch={onClickSearch}
            />
          ) : (
            <ButtonNES
              onClickNew={onClickNew}
              onClickEdit={onClickEditHeader}
              onClickSearch={onClickSearch}
            />
          )}
        </S.ButtonWrap>
      </S.ShadowBoxButtonHeader>
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
          onDblClickGrid={onDblClickGridHeader}
          onEditingFinish={onEditingFinishGridHeader}
        />
      </S.GridHeaderWrap>
      <S.ShadowBoxInputInfo isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.SearchWrap>
          {inputInfo.map((v, idx) => {
            return (
              <S.InputBox key={v.id}>
                <S.Title variant="overline">{v.name}</S.Title>
                <S.Input
                  // disabled
                  value={inputInfoValue[idx] || ""}
                  // contentEditable={false}
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </S.InputBox>
            );
          })}
        </S.SearchWrap>
      </S.ShadowBoxInputInfo>
      <S.ShadowBoxButtonDetail
        isMenuSlide={isMenuSlide}
        isAllScreen={isAllScreen}
      >
        <S.ButtonWrap>
          {isEditModeDetail ? (
            <ButtonSE
              onClickSave={onClickEditSaveDetail}
              onClickExit={onClickEditExitDetail}
            />
          ) : (
            <ButtonNED
              onClickNew={onClickEditNew}
              onClickEdit={onClickEditDetail}
              onClickDelete={onClickDelete}
            />
          )}
        </S.ButtonWrap>
      </S.ShadowBoxButtonDetail>
      <S.GridDetailWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsDetail}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataDetail}
          draggable={false}
          refGrid={refGridDetail}
          onDblClickGrid={onDblClickGridDetail}
          onEditingFinish={onEditingFinishGridDetail}
        />
      </S.GridDetailWrap>
      {isModalOpen ? (
        <ModalNewDetail
          isNewDetail={isNewDetail}
          gridDataHeaderRowID={gridDataHeaderRowID}
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          onClickEditModalSave={onClickEditModalSave}
          columnsModalHeader={columnsModalHeader}
          columnsModalDetail={columnsModalDetail}
          columnOptions={columnOptions}
          header={header}
          rowHeadersHeader={rowHeadersNum}
          rowHeadersDetail={rowHeadersNum}
          refGridModalHeader={refGridModalHeader}
          refGridModalDetail={refGridModalDetail}
          onClickGridModalDetail={onClickGridModalDetail}
          onDblClickGridModalHeader={onDblClickGridModalHeader}
          onDblClickGridModalDetail={onDblClickGridModalDetail}
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
      {isDeleteAlertOpen ? (
        <AlertDeleteDetail
          headerClickRowID={headerClickRowID}
          actSearchDetail={actSearchDetail}
          actDeleteDetail={actDeleteDetail}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default Document;
