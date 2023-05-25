import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import { useContext, useState, useEffect, useRef, useMemo } from "react";
import * as uSearch from "custom/useSearch";
import * as S from "./Weight.styled";
import DateTime from "components/datetime/DateTime";
import WeightSet from "./WeightSet";
import useInputSet from "custom/useInputSet";
import InputPaper from "components/input/InputPaper";
import ButtonSES from "components/button/ButtonSES";
import GridSingle from "components/grid/GridSingle";
import * as disRow from "custom/useDisableRowCheck";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import * as uSave from "custom/useSave";
import * as RE from "custom/RegularExpression";
import ModalSelect from "components/modal/ModalSelect";
import * as uDelete from "custom/useDelete";
import Condition from "custom/Condition";
import * as uEdit from "custom/useEdit";
import ModalDate from "components/modal/ModalDate";
import ModalWeightNew from "./ModalWeightNew";
import ButtonED from "components/button/ButtonED";
import ButtonSE from "components/button/ButtonSE";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import ButtonNES from "components/button/ButtonNES";
function Weight() {
  LoginStateChk();
  const SWITCH_NAME_01 = "weight";
  const SWITCH_NAME_02 = "weightDetail";
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridSelect = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);

  const { currentMenuName, isAllScreen } = useContext(LayoutContext);
  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeDetail, setIsEditModeDetail] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isNewDetail, setIsNewDetail] = useState(false);
  const [headerModalControl, setHeaderModalControl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [inputInfoValue, setInputInfoValue] = useState([]);
  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);

  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [gridDataModalDetail, setgridDataModalDetail] = useState(null);

  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [columnsSelect, setColumnsSelect] = useState([]);

  const headerRowID = useRef("");
  const refGridModalHeaderKey = useRef("");
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  let modalDetailClickRowKey = null;
  const onEditingFinishGridBottom = (e) => {
    onEditingFinishGridDetail(e);
    disRow.handleEditingFinishGridCheck(e);
  };

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(
    isEditModeHeader,
    refGridHeader
  );
  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(
    isEditModeDetail,
    refGridDetail
  );

  useEffect(() => {
    actSearchHeaderDI(true, "start_date", "end_date");
  }, []);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const onClickProdCancel = () => {
    setInputSearchValue([]);
  };

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    inputSet,
    columnsSelectProd,
    columnsmodalHeader,
    columnsModalDetail,
    columnsSelectOrder,
    columnsSelectWeightEmployee,
    columnsSelectInputEmployee,
    columnsSelectStoreLocation,
  } = WeightSet(isEditModeHeader, isEditModeDetail, isNewDetail);

  /*
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };
  */

  const [inputBoxID] = useInputSet(currentMenuName, inputSet);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditModeDetail,
    refGridDetail
  );

  const onClickGridHeader = (e) => {
    if (!isEditModeHeader) {
      headerRowID.current = e?.instance.getValue(e?.rowKey, "work_weigh_id");

      if (headerRowID.current !== null) {
        actSearchDetail();
      }
    }
  };
  const [dateModal, setDateModal] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const actSearchDetail = async () => {
    try {
      setIsBackDrop(true);
      const readURI = `/prd/weigh-detail?work_weigh_id=${headerRowID.current}`;
      let gridData = await restAPI.get(readURI);
      setGridDataDetail(gridData?.data?.data?.rows);
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
  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
    //actSearchDetail(headerClickRowID);
  };

  const onClickModalClose = () => {
    setgridDataModalDetail(null);
    setIsModalOpen(false);
    onClickSearch();
  };

  const [actSearchHeaderDI] = uSearch.useSearchHeaderDI(
    refGridHeader,
    refGridDetail,
    setInputInfoValue,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputSearchValue,
    dateText,
    setGridDataHeader,
    disRowHeader,
    setDisRowHeader,
    restURI.prdWeight
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

  /**
   * refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.prdOrder
   */
  const [actSelectWorkOrder] = uSearch.useSearchOnlyDate(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    dateModal,
    restURI.prdOrder
  ); //➡️ Modal Select Search Prod

  const [actSelectWeightEmployee] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.employee,
    "weightEmployee"
  ); //➡️ Modal Select Search Prod

  const [actSelectInputEmployee] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.employee,
    "inputEmployee"
  ); //➡️ Modal Select Search Prod
  const [actSelectStoreLocation] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.storeIncludeLocation,
    "storeIncludeLocation"
  ); //➡️ Modal Select Search Prod

  const onClickSearch = () => {
    actSearchHeaderDI(true, "start_date", "end_date");
  };

  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameProd = ["prod_id", "prod_cd", "prod_nm"];
    const columnNameModalHeader = [
      "work_order_id",
      "work_order_no",
      "line_dept_id",
      "line_dept_nm",
      "line_id",
      "line_cd",
      "line_nm",
      "prod_id",
      "prod_cd",
      "prod_nm",
      "inv_to_store_id",
      "store_nm",
      "inv_to_location_id",
      "location_nm",
    ];
    const columnNameWeightEmployee = ["weigh_emp_id", "weigh_emp_nm"];
    const columnNameInputEmployee = ["input_emp_id", "input_emp_nm"];
    const columnNameStoreLocation = [
      "inv_to_store_id",
      "store_nm",
      "inv_to_location_id",
      "location_nm",
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
      }
      if (dblClickGrid === "ModalHeader") {
        refGrid = refGridModalHeader;
        columnName = columnNameModalHeader;
        refGridModalHeaderKey.current =
          e?.instance?.store?.data?.rawData[e?.rowKey]["work_order_id"];
        onClickGetModalBottomData();
      }
      if (dblClickGrid === "ModalHeaderWeightEmployee") {
        refGrid = refGridModalHeader;
        columnName = columnNameWeightEmployee;
      }
      if (dblClickGrid === "ModalHeaderInputEmployee") {
        refGrid = refGridModalHeader;
        columnName = columnNameInputEmployee;
      }
      if (dblClickGrid === "ModalHeaderStoreLocation") {
        refGrid = refGridModalHeader;
        columnName = columnNameStoreLocation;
      }

      if (dblClickGrid === "HeaderWeightEmployee") {
        refGrid = refGridHeader;
        columnName = columnNameWeightEmployee;
      }

      if (dblClickGrid === "HeaderInputEmployee") {
        refGrid = refGridHeader;
        columnName = columnNameInputEmployee;
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

  const onClickGetModalBottomData = async () => {
    try {
      setIsBackDrop(true);
      const readURI = `/prd/order-input/?work_order_id=${refGridModalHeaderKey.current}`;
      let gridData = await restAPI.get(readURI);
      setgridDataModalDetail(gridData?.data?.data?.rows);
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

  const onClickModalCancelRow = () => {
    const gridEvent = refGridModalDetail?.current?.gridInst;
    gridEvent?.removeRow(modalDetailClickRowKey);
    modalDetailClickRowKey = null;
  };

  const onClickGridModalDetail = (e) => {
    modalDetailClickRowKey = e.rowKey;
  };
  const onClickModalAddRow = () => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    Header?.finishEditing();
    Detail?.finishEditing();
    Detail?.appendRow();

    Detail?.setValue(
      Detail.store.data.rawData.length - 1,
      "subdivision_date",
      DateTime().dateFull
    );

    if (isNewDetail === true) {
      for (let i = 0; i < Detail.store.data.rawData.length; i++) {
        Detail?.setValue(
          Detail.store.data.rawData[i].rowKey,
          "work_subdivision_id",
          Header.getValue(0, "work_subdivision_id")
        );
      }
    }
  };

  const onDblClickGridHeader = (e) => {
    if (Condition(e, ["weigh_emp_id", "weigh_emp_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("HeaderWeightEmployee");
      setColumnsSelect(columnsSelectWeightEmployee);
      setHeaderModalControl("-");
      setIsModalSelectOpen(true);
      actSelectWeightEmployee();
    }
    if (Condition(e, ["input_emp_id", "input_emp_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("HeaderInputEmployee");
      setColumnsSelect(columnsSelectInputEmployee);
      setHeaderModalControl("-");
      setIsModalSelectOpen(true);
      actSelectInputEmployee();
    }
  };

  const onDblClickGridModalHeader = (e) => {
    if (!isNewDetail) {
      if (
        Condition(e, [
          "work_order_id",
          "work_order_no",
          "line_dept_id",
          "line_dept_nm",
          "line_id",
          "line_cd",
          "line_nm",
          "prod_id",
          "prod_cd",
          "prod_nm",
        ])
      ) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("ModalHeader");
        setColumnsSelect(columnsSelectOrder);
        setHeaderModalControl("Order");
        setIsModalSelectOpen(true);
        actSelectWorkOrder("start_date", "end_date");
      } else if (Condition(e, ["weigh_emp_id", "weigh_emp_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("ModalHeaderWeightEmployee");
        setColumnsSelect(columnsSelectWeightEmployee);
        setHeaderModalControl("-");
        setIsModalSelectOpen(true);
        actSelectWeightEmployee();
      } else if (Condition(e, ["input_emp_id", "input_emp_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("ModalHeaderInputEmployee");
        setColumnsSelect(columnsSelectInputEmployee);
        setHeaderModalControl("-");
        setIsModalSelectOpen(true);
        actSelectInputEmployee();
      } else if (
        Condition(e, [
          "inv_to_store_id",
          "store_nm",
          "inv_to_location_id",
          "location_nm",
        ])
      ) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("ModalHeaderStoreLocation");
        setColumnsSelect(columnsSelectStoreLocation);
        setHeaderModalControl("-");
        setIsModalSelectOpen(true);
        actSelectStoreLocation();
      }
    }
  };

  const onEditingFinishGridHeader = (e) => {
    if (Condition(e, ["work_weigh_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridHeader, "work_weigh_time");
    }
    if (Condition(e, ["work_input_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridHeader, "work_input_time");
    }
    disRow.handleEditingFinishGridCheck(e);
  };

  const onEditingFinishGridModalHeader = (e) => {
    if (Condition(e, ["work_weigh_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridModalHeader, "work_weigh_time");
    }
    if (Condition(e, ["work_input_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridModalHeader, "work_input_time");
    }
    disRow.handleEditingFinishGridCheck(e);
  };

  const onEditingFinishGridDetail = (e) => {
    const Detail = refGridDetail?.current?.gridInst;
    if (Condition(e, ["bag_qty"])) {
      const beforeQty = Detail.getValue(e?.rowKey, "total_qty");
      const afterQty = e?.value;
      if (beforeQty) {
        Detail?.setValue(
          e?.rowKey,
          "input_qty",
          Number(beforeQty) - Number(afterQty)
        );
      } else {
        Detail?.setValue(e?.rowKey, "input_qty", e?.value);
      }
      let totalQty = 0;
      for (
        let i = 0;
        i < refGridDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "input_qty"));
      }
      //Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }
  };

  const onEditingFinishGridModalDetail = (e) => {
    const Detail = refGridModalDetail?.current?.gridInst;
    if (Condition(e, ["input_qty"])) {
      const beforeQty = e?.value;
      const afterQty = Detail.getValue(e?.rowKey, "bag_qty");
      if (afterQty) {
        Detail?.setValue(e?.rowKey, "total_qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "total_qty", beforeQty);
      }
      let totalQty = 0;
      for (
        let i = 0;
        i < refGridModalDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "total_qty"));
      }
      //Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }
    if (Condition(e, ["bag_qty"])) {
      const beforeQty = Detail.getValue(e?.rowKey, "input_qty");
      const afterQty = e?.value;
      if (beforeQty) {
        Detail?.setValue(
          e?.rowKey,
          "total_qty",
          Number(beforeQty) + Number(afterQty)
        );
      } else {
        Detail?.setValue(e?.rowKey, "total_qty", e?.value);
      }
      let totalQty = 0;
      for (
        let i = 0;
        i < refGridModalDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "total_qty"));
      }
      //Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }
  };

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickModalSave = () => {
    actSave();
  };

  const onClickEditModeSaveHeader = () => {
    actEditHeader();
  };

  const onClickEditModeSaveDetail = () => {
    actEditDetail();
  };

  const onClickEditHeader = () => {
    setIsEditModeHeader(true);
    setDisRowHeader(!disRowHeader);
  };

  const onClickEditModeExitHeader = () => {
    setIsEditModeHeader(false);
    actSelectWorkOrder("start_date", "end_date");
    setDisRowHeader();
  };

  const onClickEditDetail = () => {
    setDisRowDetail(!disRowDetail);
    setIsEditModeDetail(true);
  };

  const onClickEditModeExitDetail = () => {
    setIsEditModeDetail(false);
    setDisRowDetail();
  };

  const onClickSelectSearch = () => {
    actSelectWorkOrder("start_date", "end_date");
  };

  const onClickDeleteDetail = () => {
    const data = refGridDetail?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.prdWeight
  );
  const [actEditDetail] = uEdit.useEditDetail(
    refGridDetail,
    isEditModeDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.prdWeightDetail
  );

  const [actDeleteDetail] = uDelete.useDeleteDetail(
    refGridDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    onClickSearch,
    actSearchDetail,
    headerRowID,
    restURI.prdWeightDetail,
    SWITCH_NAME_02
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
    restURI.prdWeight
  );

  const GridTop = useMemo(() => {
    return isEditModeHeader ? (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        onDblClickGrid={onDblClickGridHeader}
        onEditingFinish={onEditingFinishGridHeader}
      />
    ) : (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
        onEditingFinish={onEditingFinishGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.SearchCondition>
        <S.Date
          datePickerSet={"range"}
          dateText={dateText}
          setDateText={setDateText}
        />
        {inputSet.map((v, idx) => (
          <InputPaper
            key={v.id}
            id={v.id}
            name={v.name}
            nameSize={"12px"}
            width={idx === 1 ? "240px" : "180px"}
            btn={idx === 1 ? true : false}
            value={inputSearchValue[idx] || ""}
            onClickSelect={onClickProd}
            onClickRemove={onClickProdCancel}
          />
        ))}
      </S.SearchCondition>
      <S.ContentsHeader>
        <S.TitleMid>❇️ 계량 / 투입</S.TitleMid>
        <S.ButtonTop>
          {isEditModeHeader ? (
            <ButtonSES
              onClickEditModeSave={onClickEditModeSaveHeader}
              onClickEditModeExit={onClickEditModeExitHeader}
              onClickSearch={onClickSearch}
            />
          ) : (
            <ButtonNES
              onClickNew={onClickNew}
              onClickEdit={onClickEditHeader}
              // onClickDelete={onClickDeleteHeader}
              onClickSearch={onClickSearch}
            />
          )}
        </S.ButtonTop>
      </S.ContentsHeader>
      <S.GridTopWrap>{GridTop}</S.GridTopWrap>

      <S.ContentsHeader>
        <S.TitleBottom>❇️ 계량 / 투입 상세</S.TitleBottom>
        <S.ButtonTop>
          {isEditModeDetail ? (
            <ButtonSE
              onClickSave={onClickEditModeSaveDetail}
              onClickExit={onClickEditModeExitDetail}
            />
          ) : (
            <ButtonED
              onClickEdit={onClickEditDetail}
              onClickDelete={onClickDeleteDetail}
              // onClickSearch={onClickSearch}
            />
          )}
        </S.ButtonTop>
      </S.ContentsHeader>
      <S.GridBottomWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsDetail}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataDetail}
          draggable={false}
          refGrid={refGridDetail}
          onEditingFinish={onEditingFinishGridBottom}
        />
      </S.GridBottomWrap>
      {isModalOpen ? (
        <ModalWeightNew
          isNewDetail={isNewDetail}
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          // onClickEditModalSave={onClickEditModalSave}
          columnsModalHeader={columnsmodalHeader}
          columnsModalDetail={columnsModalDetail}
          columnOptions={columnOptions}
          header={header}
          gridDataDetail={gridDataModalDetail}
          rowHeadersHeader={rowHeadersNum}
          rowHeadersDetail={rowHeadersNum}
          refGridModalHeader={refGridModalHeader}
          refGridModalDetail={refGridModalDetail}
          gridDataHeaderRowID={gridDataHeaderRowID}
          onClickGridModalDetail={onClickGridModalDetail}
          onDblClickGridModalHeader={onDblClickGridModalHeader}
          onEditingFinishGridModalHeader={onEditingFinishGridModalHeader}
          onEditingFinishGridModalDetail={onEditingFinishGridModalDetail}
        />
      ) : null}

      {isModalSelectOpen ? (
        headerModalControl === "Order" ? (
          <ModalDate
            onClickModalSearch={onClickSelectSearch}
            onClickModalClose={onClickModalSelectClose}
            columns={columnsSelect}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersNum}
            refModalGrid={refGridSelect}
            dateText={dateModal}
            setDateText={setDateModal}
            datePickerSet={"range"}
            buttonType={"Search"}
            data={gridDataSelect}
            refGridModalDetail={refGridModalDetail}
            columnsModalDetail={columnsModalDetail}
            onDblClickModalGrid={onDblClickGridSelect}
          />
        ) : (
          <ModalSelect
            onClickModalSelectClose={onClickModalSelectClose}
            columns={columnsSelect}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersNum}
            refSelectGrid={refGridSelect}
            gridDataSelect={gridDataSelect}
            onDblClickGridSelect={onDblClickGridSelect}
          />
        )
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

export default Weight;
