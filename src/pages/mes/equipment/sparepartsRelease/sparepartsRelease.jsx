import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import * as disRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as uSave from "custom/useSave";
import * as S from "pages/mes/style/oneGrid.styled";
import * as L from "./sparepartsRelease.styled";
import restURI from "json/restURI.json";
import SparePartReleaseSet from "./sparepartsReleaseSet";
import DateTime from "components/datetime/DateTime";
import ModalSelect from "components/modal/ModalSelect";
import Condition from "custom/Condition";
import ModalDate from "components/modal/ModalDate";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";

import restAPI from "api/restAPI";

function SparepartsRelease() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const refModalSelectGrid = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerModalControl, setHeaderModalControl] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [columnsSelect, setColumnsSelect] = useState(false);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Grid" or "Modal"

  const SWITCH_NAME_01 = "sparepartsOutgo";

  const {
    rowHeaders,
    rowHeadersModal,
    header,
    columns,
    columnsModal,
    columnOptions,
    inputSet,
    columnsModalHeader,
    columnsModalSelectProduct,
    columnsModalSelectEquipDetail,
    columnsModalSelectLine,
    columnsModalSelectStore,
    columnsModalSelectReleaseUser,
  } = SparePartReleaseSet(isEditMode);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  //===============================================
  const onClickGrid = (e) => {
    disRow.handleClickGridCheck(e, isEditMode, []);
  };
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalCancelRow = () => {
    //refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };

  const [dateModal, setDateModal] = useState({
    startDate: DateTime().dateFull,
  });

  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickModalSave = () => {
    actSave();
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setSearchToggle(!searchToggle);
  }

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  //==== 수정
  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.sparepartsOutgo
  );

  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.sparepartsOutgo,
    onClickModalClose
  );

  const [actSearchSelectEquipDetail] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.equipmentDetail
  );

  const [actSearchSelectStore] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.storeIncludeLocation,
    "storeFrom"
  );

  const [actSearchSelectReleaseUser] = uSearch.useSearchSelect(
    refModalSelectGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.employee + `?use_fg=true&worker_fg=true`,
    "releaseUser"
  );

  const [actSearchGridUpdateEquipDetail] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.equipmentDetail
  );

  const [actSearchGridUpdateStore] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.storeIncludeLocation,
    "storeFrom"
  );

  const [actSearchGridUpdateReleaseUser] = uSearch.useSearchSelect(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridModalSelectData,
    restURI.employee + `?use_fg=true&worker_fg=true`,
    "releaseUser"
  );

  // 검색 시작
  const [actSearch] = uSearch.useSearchDI(
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
    restURI.sparepartsOutgo
  );
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);
  useEffect(() => {
    setTimeout(() => {
      onClickSearch();
    }, 100);
  }, [searchToggle]);

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
    restURI.sparepartsOutgo,
    SWITCH_NAME_01
  );
  const onClickEditModeSave = () => {
    actEdit();
  };

  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setSearchToggle(!searchToggle);
    onClickSearch();
  };
  //==== 수정 끝

  const handleDelete = () => {
    actDelete();
  };
  const onClickSearch = () => {
    actSearch("start_date", "end_date");
  };

  // 검색 끝

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
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const onDblClickModalSelectGrid = (e) => {
    let refGrid;
    let columnName = [];
    let columnNameProd = [
      "prod_id",
      "prod_cd",
      "prod_nm",
      "lot_no",
      "store_id",
      "store_nm",
      "location_id",
      "location_nm",
      "stock",
    ];
    let columnNameEquip = ["equip_detail_nm", "equip_detail_id"];
    let columnNameLine = ["line_id", "line_nm"];
    let columnNameStore = ["from_store_id", "from_store_nm", "from_location_id", "from_location_nm"];
    let columnNameEmployee = ["release_uid", "release_nm"];
    if (dblClickGrid === "Grid") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    } else if (dblClickGrid === "ModalProd") {
      refGrid = refModalGrid;
      columnName = columnNameProd;
    } else if (dblClickGrid === "ModalLine") {
      refGrid = refModalGrid;
      columnName = columnNameLine;
    } else if (dblClickGrid === "ModalEquip") {
      refGrid = refModalGrid;
      columnName = columnNameEquip;
    } else if (dblClickGrid === "ModalStore") {
      refGrid = refModalGrid;
      columnName = columnNameStore;
    } else if (dblClickGrid === "ModalEmployee") {
      refGrid = refModalGrid;
      columnName = columnNameEmployee;
    } else if (dblClickGrid === "GridLine") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameLine;
    } else if (dblClickGrid === "GridEquip") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameEquip;
    } else if (dblClickGrid === "GridEmployee") {
      refGrid = refSingleGrid;
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      columnName = columnNameEmployee;
    }

    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
      );
    }
    if (dblClickGrid === "ModalProd") {
      refGrid?.current?.gridInst?.setValue(dblClickRowKey, "outgo_date", dateModal.startDate);
    }

    setIsModalSelectOpen(false);
  };

  const searchSelectProdList = async () => {
    try {
      let readURI = restURI.sparepartsStoreView + `?tran_reg_date=${dateModal.startDate}&`;

      setIsBackDrop(true);

      let gridData = await restAPI.get(readURI);

      setGridModalSelectData(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const searchSelectLineList = async () => {
    try {
      let readURI = restURI.line;

      setIsBackDrop(true);

      let gridData = await restAPI.get(readURI);

      setGridModalSelectData(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const onDblClickModalGrid = (e) => {
    if (Condition(e, ["prod_id", "prod_cd", "prod_nm", "store_id", "store_nm", "location_id", "location_nm"])) {
      setHeaderModalControl("prodSelect");
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalProd");
      setColumnsSelect(columnsModalSelectProduct);
      setIsModalSelectOpen(true);
      //actSearchSelect();
      searchSelectProdList();
    }
    if (Condition(e, ["line_id", "line_nm"])) {
      setHeaderModalControl("line");
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalLine");
      setColumnsSelect(columnsModalSelectLine);
      setIsModalSelectOpen(true);
      //actSearchSelect();
      searchSelectLineList();
    }
    if (Condition(e, ["equip_detail_nm", "equip_detail_id"])) {
      setHeaderModalControl("equip");
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalEquip");
      setColumnsSelect(columnsModalSelectEquipDetail);
      setIsModalSelectOpen(true);
      actSearchSelectEquipDetail();
    }

    if (Condition(e, ["release_uid", "release_nm"])) {
      setHeaderModalControl("emp");
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalEmployee");
      setColumnsSelect(columnsModalSelectReleaseUser);
      setIsModalSelectOpen(true);
      actSearchSelectReleaseUser();
    }
  };

  const onDblClickGrid = (e) => {
    if (Condition(e, ["line_id", "line_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("GridLine");
      setColumnsSelect(columnsModalSelectLine);

      setIsModalSelectOpen(true);
      searchSelectLineList();
    }

    if (Condition(e, ["equip_detail_id", "equip_detail_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("GridEquip");
      setColumnsSelect(columnsModalSelectEquipDetail);
      setIsModalSelectOpen(true);
      actSearchGridUpdateEquipDetail();
    }

    if (Condition(e, ["release_uid", "release_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("GridEmployee");
      setColumnsSelect(columnsModalSelectReleaseUser);
      setIsModalSelectOpen(true);
      actSearchGridUpdateReleaseUser();
    }
  };

  const ModalNews = useMemo(() => {
    return (
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
        onDblClickModalGrid={onDblClickModalGrid}
      />
    );
  }, []);

  const onClickSelectSearch = () => {
    searchSelectProdList();
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <L.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
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
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={onClickSearch} />
            </S.ButtonWrap>
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
          {isEditMode ? (
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
          ) : (
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
          )}
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
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
      {isModalOpen ? ModalNews : null}
      {headerModalControl === "prodSelect" ? (
        isModalSelectOpen ? (
          <ModalDate
            onClickModalSearch={onClickSelectSearch}
            onClickModalClose={onClickModalSelectClose}
            columns={columnsSelect}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersModal}
            refModalGrid={refModalSelectGrid}
            dateText={dateModal}
            setDateText={setDateModal}
            datePickerSet={"single"}
            buttonType={"Search"}
            data={gridModalSelectData}
            refGridSelect={refModalSelectGrid}
            onDblClickModalGrid={onDblClickModalSelectGrid}
          />
        ) : null
      ) : isModalSelectOpen ? (
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
    </ContentsArea>
  );
}
export default SparepartsRelease;
