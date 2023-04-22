import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import ButtonHeader from "components/button/ButtonHeader";
import ButtonDetail from "components/button/ButtonDetail";
import ButtonEdit from "components/button/ButtonEdit";
import ButtonEditDetail from "components/button/ButtonEditDetail";
import ButtonGroup from "components/button/ButtonGroup";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
import BackDrop from "components/backdrop/BackDrop";
import ControlPlanSet from "pages/mes/standard/controlPlan/ControlPlanSet";
import useInputSet from "custom/useInputSet";
import InputSearchDisabled from "components/input/InputSearchDisabled";
import TextField from "@mui/material/TextField";
import * as S from "./ControlPlan.styled";
import CN from "json/ColumnName.json";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as uDM from "custom/useDataMulti";
import restURI from "json/restURI.json";
import { LayoutContext } from "components/layout/common/Layout";

function ControlPlan() {
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
  const [selectWidth, setSelectWidth] = useState("40%");
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
    columnsSelectDocument,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    inputSet,
    inputInfo,
    uri,
    uriDetail,
    uriDetailID,
  } = ControlPlanSet(
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
  const SWITCH_NAME_01 = "controlPlan";
  const SWITCH_NAME_02 = "controlPlanDetail";
  let modalDetailClickRowKey = null;

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  useEffect(() => {
    actSearchHeader();
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

  const [actSelectProd] = uDM.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  );
  const [actSelectDocument] = uDM.useSearchSelectIncludeHeader(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    "documentDetailIncludeHeader",
    restURI.inspectDocumentDetailIncludeHeader
  );
  const [actSaveNew] = uDM.useSaveNew(
    refGridModalHeader,
    refGridModalDetail,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    SWITCH_NAME_02,
    uri
  );
  const [actSaveEditHeader] = uDM.useSaveEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    uri
  );
  const [actSaveEditDetail] = uDM.useSaveEditDetail(
    refGridDetail,
    isEditModeDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    uri
  );
  const [actSaveEditNewDetail] = uDM.useSaveEditNewDetail(
    refGridModalDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    uriDetail
  );

  const [actSearchHeader] = uDM.useSearchHeader(
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
    uri
  );
  const [actSearchDetail] = uDM.useSearchDetail(
    setGridDataDetail,
    uriDetailID,
    disRowDetail,
    setDisRowDetail
  );
  const [actSearchEditHeader] = uDM.useSearchEditHeader(
    isBackDrop,
    setIsBackDrop,
    setGridDataHeaderRowID,
    uri
  );
  const [actDelete] = uDM.useDeleteDetail(
    refGridDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    actSearchHeader,
    actSearchDetail,
    headerClickRowID,
    uriDetail,
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
    actSearchHeader();
  };
  const onClickEditModeSave = () => {
    actSaveEditHeader();
    setIsEditModeDetail(false);
  };
  const onClickEditModeExit = () => {
    setIsEditModeHeader(false);
    actSearchHeader(true);
    setDisRowHeader(!disRowHeader);
  };
  const onClickEditSaveDetail = () => {
    actSaveEditDetail();
  };
  const onClickEditExitDetail = () => {
    setIsEditModeDetail(false);
    actSearchDetail(headerClickRowID);
    setDisRowDetail(!disRowDetail);
  };

  const onClickGridHeader = (e) => {
    if (isEditModeHeader === false) {
      const inputInfoValueList = [
        "control_plan_no",
        "line_nm",
        "prod_no",
        "prod_nm",
        "reg_date",
        "apply_date",
        "apply_fg",
        "contents",
        "remark",
      ];
      const rowID = e?.instance.getValue(e?.rowKey, "control_plan_id");
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
      setDblClickGrid("Header");
      setSelectWidth("40%");
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onDblClickGridDetail = (e) => {
    const columnName = [
      "prod_no",
      "prod_nm",
      "equip_nm",
      "insp_proc_gbn",
      "insp_item_type_nm",
      "insp_item_nm",
      "insp_item_desc",
      "spec_std",
      "spec_min",
      "spec_max",
      "spec_lcl",
      "spec_ucl",
      "insp_method_nm",
      "insp_tool_nm",
      "insp_filing_nm",
      "special_property",
      "worker_sample_cnt",
      "worker_insp_cycle",
      "inspector_sample_cnt",
      "inspector_insp_cycle",
    ];
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
      setDblClickGrid("Detail");
      setSelectWidth("80%");
      setColumnsSelect(columnsSelectDocument);
      setIsModalSelectOpen(true);
      actSelectDocument();
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
          "control_plan_id",
          Header.getValue(0, "control_plan_id")
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
    actSaveNew();
  };
  const onClickModalClose = () => {
    setIsModalOpen(false);
    setIsNewDetail(false);
    setIsEditModeHeader(false);
    actSearchHeader(true);
  };
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
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
      setSelectWidth("40%");
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onDblClickGridModalDetail = (e) => {
    const columnName = [
      "prod_no",
      "prod_nm",
      "equip_nm",
      "insp_proc_gbn",
      "insp_item_type_nm",
      "insp_item_nm",
      "insp_item_desc",
      "spec_std",
      "spec_min",
      "spec_max",
      "spec_lcl",
      "spec_ucl",
      "insp_method_nm",
      "insp_tool_nm",
      "insp_filing_nm",
      "special_property",
      "worker_sample_cnt",
      "worker_insp_cycle",
      "inspector_sample_cnt",
      "inspector_insp_cycle",
    ];
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
      setSelectWidth("80%");
      setColumnsSelect(columnsSelectDocument);
      setIsModalSelectOpen(true);
      actSelectDocument();
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
    const columnNameDocument = [
      "insp_document_id",
      "insp_document_detail_id",
      "prod_id",
      "prod_no",
      "prod_nm",
      "equip_id",
      "equip_nm",
      "insp_proc_gbn",
      "insp_item_type_id",
      "insp_item_type_nm",
      "insp_item_id",
      "insp_item_nm",
      "insp_item_desc",
      "spec_std",
      "spec_min",
      "spec_max",
      "spec_lcl",
      "spec_ucl",
      "insp_method_id",
      "insp_method_nm",
      "insp_tool_id",
      "insp_tool_nm",
      "insp_filing_id",
      "insp_filing_nm",
      "special_property",
      "worker_sample_cnt",
      "worker_insp_cycle",
      "inspector_sample_cnt",
      "inspector_insp_cycle",
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
        columnName = columnNameDocument;
      } else if (dblClickGrid === "ModalDetail") {
        refGrid = refGridModalDetail;
        columnName = columnNameDocument;
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
    actSaveEditNewDetail();
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      actSearchHeader(true);
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
            <ButtonEdit
              onClickEditModeSave={onClickEditModeSave}
              onClickEditModeExit={onClickEditModeExit}
              onClickSearch={onClickSearch}
            />
          ) : (
            <ButtonHeader
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
            <ButtonEditDetail
              onClickEditSaveDetail={onClickEditSaveDetail}
              onClickEditExitDetail={onClickEditExitDetail}
            />
          ) : (
            <ButtonDetail
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
          width={selectWidth}
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
          actDelete={actDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default ControlPlan;
