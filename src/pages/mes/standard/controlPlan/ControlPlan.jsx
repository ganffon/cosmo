import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import ButtonNES from "components/button/ButtonNES";
import ButtonNED from "components/button/ButtonNED";
import ButtonSES from "components/button/ButtonSES";
import ButtonSE from "components/button/ButtonSE";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
import BackDrop from "components/backdrop/BackDrop";
import ControlPlanSet from "pages/mes/standard/controlPlan/ControlPlanSet";
import useInputSet from "custom/useInputSet";
import InputPaper from "components/input/InputPaper";
import TextField from "@mui/material/TextField";
import * as S from "./ControlPlan.styled";
import CN from "json/ColumnName.json";
import * as disRow from "custom/useDisableRowCheck";
import * as Cbo from "custom/useCboSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import { LayoutContext } from "components/layout/common/Layout";
import ModalControlPlan from "./ModalControlPlan";
import restAPI from "api/restAPI";

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
  const [gridDataModalDetail, setGridDataModalDetail] = useState(null);
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
  const [inspMethodOpt, inspMethodList] = Cbo.useInspMethod();
  const [inspToolOpt, inspToolList] = Cbo.useInspTool();
  const [inspFilingOpt, inspFilingList] = Cbo.useInspFiling();

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
  } = ControlPlanSet(
    isEditModeHeader,
    isEditModeDetail,
    isNewDetail,
    lineList,
    processList,
    equipmentList,
    inspMethodList,
    inspToolList,
    inspFilingList
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
  );
  const [actSelectDocument] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.inspDocumentDetailIncludeHeader,
    "documentDetailIncludeHeader"
  );
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
    restURI.controlPlan
  );
  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.controlPlan
  );
  const [actEditDetail] = uEdit.useEditDetail(
    refGridDetail,
    isEditModeDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.controlPlanDetail
  );
  const [actSaveDetail] = uSave.useSaveDetail(
    refGridModalDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.controlPlanDetail
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
    restURI.controlPlan
  );
  const [actSearchDetail] = uSearch.useSearchDetail(
    setGridDataDetail,
    restURI.controlPlanDetail + "?control_plan_id=",
    disRowDetail,
    setDisRowDetail
  );
  const [actSearchEditHeader] = uSearch.useSearchEditHeader(
    isBackDrop,
    setIsBackDrop,
    setGridDataHeaderRowID,
    restURI.controlPlan
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
    restURI.controlPlanDetail,
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
  const onClickProdRemove = () => {
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
        "control_plan_no",
        "line_nm",
        "prod_cd",
        "prod_nm",
        "control_plan_reg_date",
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
    if (Condition(e, ["prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("Header");
      setModalSelectSize({ ...modalSelectSize, width: "40%", height: "90%" });
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onDblClickGridDetail = (e) => {
    if (
      Condition(e, [
        "prod_cd",
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
      ])
    ) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("Detail");
      setModalSelectSize({ ...modalSelectSize, width: "80%", height: "90%" });
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
    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setIsNewDetail(false);
    setIsEditModeHeader(false);
    actSearchHeaderIC(true);
    setGridDataModalDetail([]);
  }
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const onDblClickGridModalHeader = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setModalSelectSize({ ...modalSelectSize, width: "40%", height: "90%" });
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onDblClickGridModalDetail = (e) => {
    if (
      Condition(e, [
        "prod_cd",
        "prod_nm",
        "equip_nm",
        "insp_proc_gbn",
        "insp_item_type_nm",
        "insp_item_nm",
        "insp_item_desc",
        "spec_std",
        "spec_min",
        "proc_id",
        "proc_nm",
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
      ])
    ) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalDetail");
      setModalSelectSize({ ...modalSelectSize, width: "80%", height: "90%" });
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
    const columnNameProd = ["prod_id", "prod_cd", "prod_nm"];
    const columnNameDocument = [
      "insp_document_id",
      "insp_document_detail_id",
      "prod_id",
      "prod_cd",
      "prod_nm",
      "proc_id",
      "proc_nm",
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
      columnName = ["prod_cd", "prod_nm"];
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
  const onDataLoad = async () => {
    const Grid = refGridModalHeader?.current?.gridInst;
    Grid?.finishEditing();
    const lineId = Grid.getValue(0, "line_id");
    const prodCd = Grid.getValue(0, "prod_cd");
    const prodNm = Grid.getValue(0, "prod_nm");
    if (lineId && prodCd) {
      try {
        setIsBackDrop(true);
        const header = await restAPI.get(
          restURI.inspDocument +
            `?line_id=${lineId}&prod_cd=${prodCd}&prod_nm=${prodNm}`
        );
        if (header?.data?.data?.count !== 0) {
          const documentId = header?.data?.data?.rows[0].insp_document_id;

          try {
            const detail = await restAPI.get(
              restURI.inspDocumentDetail + `?insp_document_id=${documentId}`
            );

            setGridDataModalDetail(detail?.data?.data?.rows);
          } catch (err) {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: err?.response?.data?.message,
              severity: "error",
              location: "bottomRight",
            });
          }
        }
      } catch (err) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: err?.response?.data?.message,
          severity: "error",
          location: "bottomRight",
        });
      } finally {
        setIsBackDrop(false);
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "상단에서 라인과 품목을 선택하세요!",
        severity: "warning",
        location: "bottomRight",
      });
    }
  };

  const onClickEditModalSave = () => {
    actSaveDetail();
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      actSearchHeaderIC(true);
    }
  };
  const GridHeader = useMemo(() => {
    return (
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
    );
  }, [gridDataHeader, isEditModeHeader]);

  const GridModal = useMemo(() => {
    return (
      <ModalControlPlan
        isNewDetail={isNewDetail}
        gridDataHeaderRowID={gridDataHeaderRowID}
        gridDataDetail={gridDataModalDetail}
        onClickModalAddRow={onClickModalAddRow}
        onClickModalCancelRow={onClickModalCancelRow}
        onClickModalSave={onClickModalSave}
        onClickModalClose={onClickModalClose}
        onClickEditModalSave={onClickEditModalSave}
        onDataLoad={onDataLoad}
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
    );
  }, [isNewDetail, gridDataHeaderRowID, gridDataModalDetail, lineList]);

  const onClickGridDetail = (e) => {
    disRow.handleClickGridCheck(e, isEditModeDetail, ["order_input_fg"]);
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
                line_id:
                  newValue?.line_id === undefined ? null : newValue?.line_id,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label={CN.line_nm} size="small" />
            )}
            onKeyDown={onKeyDown}
          />

          {inputSet.map((v, idx) => (
            <InputPaper
              key={v.id}
              id={v.id}
              name={v.name}
              value={inputSearchValue[idx] || ""}
              onKeyDown={onKeyDown}
              width={idx === 1 ? "220px" : "180px"}
              btn={idx === 1 ? true : false}
              onClickSelect={onClickProd}
              onClickRemove={onClickProdRemove}
            />
          ))}
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
      <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
      <S.ShadowBoxInputInfo isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.SearchWrap>
          {inputInfo.map((v, idx) => {
            return (
              <InputPaper
                key={v.id}
                id={v.id}
                name={v.name}
                value={inputInfoValue[idx] || ""}
              />
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
          onClickGrid={onClickGridDetail}
          onDblClickGrid={onDblClickGridDetail}
          onEditingFinish={onEditingFinishGridDetail}
        />
      </S.GridDetailWrap>
      {isModalOpen ? GridModal : null}
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

export default ControlPlan;
