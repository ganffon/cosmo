import { useContext, useState, useEffect, useRef, useMemo } from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import ProductionOrderSet from "./ProductionOrderSet";
import useInputSet from "custom/useInputSet";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonED from "components/button/ButtonED";
import ButtonSES from "components/button/ButtonSES";
import ButtonSE from "components/button/ButtonSE";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import AlertDeleteDetail from "components/onlySearchSingleGrid/modal/AlertDeleteDetail";
import BackDrop from "components/backdrop/BackDrop";

import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as uSave from "custom/useSave";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as disRow from "custom/useDisableRowCheck";
import * as S from "./ProductionOrder.styled";
import ModalNew from "components/modal/ModalNew";
import ModalDate from "components/modal/ModalDate";
import restAPI from "api/restAPI";

function ProductionOrder() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  const refGridHeader = useRef(null);
  const refGridMid = useRef(null);
  const refGridBottom = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalMid = useRef(null);
  const refGridModalBottom = useRef(null);
  const refGridSelect = useRef(null);

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeMid, setIsEditModeMid] = useState(false);
  const [isEditModeBottom, setIsEditModeBottom] = useState(false);

  const [isModalHeaderOpen, setIsModalHeaderOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isMidDeleteAlertOpen, setIsMidDeleteAlertOpen] = useState(false);

  const [isTopDeleteAlertOpen, setIsTopDeleteAlertOpen] = useState(false);
  const [isBottomDeleteAlertOpen, setIsBottomDeleteAlertOpen] = useState(false);

  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [columnsSelect, setColumnsSelect] = useState([]);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataMid, setGridDataMid] = useState(null);

  const [gridDataBottom, setGridDataBottom] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [headerModalControl, setHeaderModalControl] = useState(null);
  const [inputSearchValue, setInputSearchValue] = useState([]);

  const SWITCH_NAME_01 = "order";
  const SWITCH_NAME_02 = "orderInput";
  const SWITCH_NAME_03 = "orderDetail";

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    isEditModeMid,
    refGridMid
  );

  const [disableRowToggleMid, setDisableRowToggleMid] =
    disRow.useDisableRowCheck(isEditModeMid, refGridMid);

  const [disableRowToggleTop, setDisableRowToggleTop] =
    disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);

  const [disableRowToggleBottom, setDisableRowToggleBottom] =
    disRow.useDisableRowCheck(isEditModeBottom, refGridBottom);

  const [disRowTop, setDisRowTop] = disRow.useDisableRowCheck(
    isEditModeHeader,
    refGridHeader
  );

  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(
    isEditModeMid,
    refGridMid
  );

  const [disRowTopBottom, setDisRowBottom] = disRow.useDisableRowCheck(
    isEditModeBottom,
    refGridBottom
  );

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsMid,
    columnsBottom,
    columnsModalHeader,
    columnsSelectRequest,
    columnsSelectLineDept,
    inputSet,
  } = ProductionOrderSet(isEditModeHeader, isEditModeMid, isEditModeBottom);

  const headerRowID = useRef("");

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridMid?.current?.gridInst?.refreshLayout();
    refGridBottom?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    headerRowID.current = "";
    actSearchGridTop();
    refGridMid?.current?.gridInst?.clear();
    refGridBottom?.current?.gridInst?.clear();
  };

  const onClickSelectSearch = () => {
    actSelectRequestOnlyDate("start_date", "end_date");
  };
  const onClickGridHeader = (e) => {
    if (!isEditModeHeader) {
      headerRowID.current = e?.instance.getValue(e?.rowKey, "work_order_id");

      if (headerRowID.current !== null) {
        actSearchMidDI();
        actSearchBottomDI();
      }
    }
  };

  const onClickNewHeader = () => {
    setIsModalHeaderOpen(true);
  };
  const onClickModalCloseHeader = () => {
    setIsModalHeaderOpen(false);
    onClickSearch();
  };
  const onDblClickModalHeader = (e) => {
    if (Condition(e, ["request_no", "prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setHeaderModalControl("request");
      setColumnsSelect(columnsSelectRequest);
      setIsModalSelectOpen(true);
      actSelectRequestOnlyDate("start_date", "end_date");
    } else if (Condition(e, ["line_dept_id", "line_dept_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setHeaderModalControl("linedept");
      setColumnsSelect(columnsSelectLineDept);
      setIsModalSelectOpen(true);
      actSelectLineDept();
    }
  };
  const onClickEditHeader = () => {
    if (headerRowID.current.length > 0) {
      setDisableRowToggleTop(!disableRowToggleTop);
      setIsEditModeHeader(true);
    }
  };
  const onClickDeleteHeader = () => {
    const data = refGridHeader?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsTopDeleteAlertOpen(true);
    }
  };
  const onClickEditModeSaveHeader = () => {
    actEditHeader();
  };
  const onClickEditModeExitHeader = () => {
    setIsEditModeHeader(false);
    setDisRowTop(!disRowTop);
  };

  const onClickMidDelete = () => {
    const data = refGridMid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsMidDeleteAlertOpen(true);
    }
  };

  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishGridMid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };

  const onEditingFinishGridBottom = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };

  const actSearchGridTop = async () => {
    try {
      setIsBackDrop(true);
      let readURI = `/prd/order?start_date=${dateText.startDate}&end_date=${dateText.endDate}&`;
      if (inputTextChange && inputBoxID) {
        let cnt = 1;
        //🔸inputBox 가 있다면?!
        if (inputBoxID.length > 0) {
          //🔸inputBox 갯수만큼 반복!
          for (let i = 0; i < inputBoxID.length; i++) {
            //🔸inputBox에 검색조건 있으면 가져오기
            if (inputTextChange[inputBoxID[i]]) {
              //🔸처음 가져오는 것이면 params에 ? 세팅
              if (cnt === 0) {
                readURI = "?";
                cnt++;
              }
              readURI =
                readURI +
                inputBoxID[i] +
                "=" +
                inputTextChange[inputBoxID[i]] +
                "&";
            }
          }
          //🔸마지막에 찍힌 & 기호 제거
          readURI = readURI.slice(0, readURI.length - 1);
        }
      } else {
        readURI = readURI.slice(0, readURI.length - 1);
      }
      let gridData = await restAPI.get(readURI);

      setGridDataHeader(gridData?.data?.data?.rows);
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

  const actSearchMidDI = async () => {
    try {
      setIsBackDrop(true);
      const readURI = `/prd/order-input?work_order_id=${headerRowID.current}`;
      let gridData = await restAPI.get(readURI);
      setGridDataMid(gridData?.data?.data?.rows);
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

  const actSearchBottomDI = async () => {
    try {
      setIsBackDrop(true);

      const readURI = `/prd/order-detail?work_order_id=${headerRowID.current}`;
      let gridData = await restAPI.get(readURI);
      console.log(readURI);
      setGridDataBottom(gridData?.data?.data?.rows);
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

  useEffect(() => {
    setInputTextChange();
    //actSearchHeaderDI("start_date", "end_date");
    actSearchGridTop();
  }, []);

  const onClickEditMid = () => {
    setDisableRowToggleMid(!disableRowToggleMid);
    setIsEditModeMid(true);
  };

  const onClickEditModeSaveMid = () => {
    actEditMid();
  };
  const onClickEditModeExitMid = () => {
    setIsEditModeMid(false);
    setDisRowDetail(!disRowTopBottom);
  };

  const [dateModal, setDateModal] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const onClickEditBottom = () => {
    setDisableRowToggleBottom(!disableRowToggleBottom);
    setIsEditModeBottom(true);
  };
  const onClickDeleteBottom = () => {
    const data = refGridBottom?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsBottomDeleteAlertOpen(true);
    }
  };
  const onClickEditModeSaveBottom = () => {
    actEditBottom();
  };
  const onClickEditModeExitBottom = () => {
    setIsEditModeBottom(false);
    setDisRowBottom(!disRowDetail);
  };

  const onClickModalSaveHeader = async (e) => {
    actSave();
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelect = async (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameRequest = [
      "request_id",
      "request_no",
      "prod_id",
      "prod_cd",
      "prod_nm",
    ];

    const columnNameLineDept = ["line_dept_id", "line_dept_nm", "line_id"];

    const columnNameInspItem = [
      "insp_item_type_id",
      "insp_item_type_nm",
      "insp_item_id",
      "insp_item_nm",
    ];
    const prodCode = e?.instance?.store?.data?.rawData[e?.rowKey].prod_cd;
    let prodId;
    if (prodCode && headerModalControl === "request") {
      const productDataSet = await restAPI.get(`/std/prod?prod_cd=${prodCode}`);
      prodId = productDataSet.data.data.rows[0].prod_id;
    }

    if (dblClickGrid === "Search") {
    } else if (dblClickGrid === "Header") {
      refGrid = refGridHeader;
      columnName = columnNameRequest;
    } else if (dblClickGrid === "ModalHeader") {
      if (headerModalControl === "request") {
        refGrid = refGridModalHeader;
        columnName = columnNameRequest;
      } else {
        refGrid = refGridModalHeader;
        columnName = columnNameLineDept;
      }
    } else if (dblClickGrid === "ModalMid") {
      refGrid = refGridModalMid;
      columnName = columnNameInspItem;
    } else if (dblClickGrid === "ModalBottom") {
      refGrid = refGridModalBottom;
      columnName = columnNameRequest;
    }
    for (let i = 0; i < columnName.length; i++) {
      refGrid?.current?.gridInst?.setValue(
        dblClickRowKey,
        columnName[i],
        e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]
      );
    }

    if (headerModalControl === "request") {
      refGrid?.current?.gridInst.setValue(dblClickRowKey, "prod_id", prodId);
    }

    disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  const [actSelectRequestOnlyDate] = uSearch.useSearchOnlyDate(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    dateModal,
    restURI.prdOrderRequest,
    "prdOrderRequest"
  ); //➡️ Modal Select Search Prod

  const [actSelectLineDept] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.lineDepartment
  );

  const [actSave] = uSave.useSave(
    refGridModalHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.prdOrder
  );

  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.prdOrder
  );

  const [actEditMid] = uEdit.useEditHeader(
    refGridMid,
    isEditModeMid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.prdOrderInput
  );

  const [actDeleteMid] = uDelete.useDeleteDetail(
    refGridMid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsMidDeleteAlertOpen,
    actSearchMidDI,
    actSearchMidDI,
    headerRowID,
    restURI.prdOrderInput,
    SWITCH_NAME_02
  );

  const [actDeleteBottom] = uDelete.useDeleteDetail(
    refGridBottom,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsBottomDeleteAlertOpen,
    actSearchBottomDI,
    actSearchBottomDI,
    headerRowID,
    restURI.prdOrderDetail,
    SWITCH_NAME_03
  );

  const [actDeleteTop] = uDelete.useDeleteDetail(
    refGridHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsTopDeleteAlertOpen,
    onClickSearch,
    onClickSearch,
    headerRowID,
    restURI.prdOrder,
    SWITCH_NAME_01
  );

  const [actEditBottom] = uEdit.useEditHeader(
    refGridBottom,
    isEditModeBottom,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_03,
    restURI.prdOrderDetail
  );

  const GridTop = useMemo(() => {
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
        {inputSet.map((v) => (
          <S.InputS
            key={v.id}
            id={v.id}
            name={v.name}
            value={inputSearchValue || ""}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
            onKeyDown={onKeyDown}
          />
        ))}
      </S.SearchCondition>
      <S.ContentTop>
        <S.TitleMid>❇️ 생산품목</S.TitleMid>
        <S.ButtonTop>
          {isEditModeHeader ? (
            <ButtonSES
              onClickEditModeSave={onClickEditModeSaveHeader}
              onClickEditModeExit={onClickEditModeExitHeader}
              onClickSearch={onClickSearch}
            />
          ) : (
            <ButtonNEDS
              onClickNew={onClickNewHeader}
              onClickEdit={onClickEditHeader}
              onClickDelete={onClickDeleteHeader}
              onClickSearch={onClickSearch}
            />
          )}
        </S.ButtonTop>
      </S.ContentTop>
      <S.GridTopWrap>{GridTop}</S.GridTopWrap>
      <S.ContentMid>
        <S.TitleMid>❇️ 투입품목</S.TitleMid>
        <S.ButtonMid>
          {isEditModeMid ? (
            <ButtonSE
              onClickSave={onClickEditModeSaveMid}
              onClickExit={onClickEditModeExitMid}
            />
          ) : (
            <ButtonED
              onClickEdit={onClickEditMid}
              onClickDelete={onClickMidDelete}
            />
          )}
        </S.ButtonMid>
      </S.ContentMid>
      <S.GridMidWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsMid}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataMid}
          draggable={false}
          refGrid={refGridMid}
          onEditingFinish={onEditingFinishGridMid}
        />
      </S.GridMidWrap>
      <S.ContentBottom>
        <S.TitleBottom>❇️ 점검기준서</S.TitleBottom>
        <S.ButtonBottom>
          {isEditModeBottom ? (
            <ButtonSE
              onClickSave={onClickEditModeSaveBottom}
              onClickExit={onClickEditModeExitBottom}
            />
          ) : (
            <ButtonED
              onClickEdit={onClickEditBottom}
              onClickDelete={onClickDeleteBottom}
            />
          )}
        </S.ButtonBottom>
      </S.ContentBottom>
      <S.GridBottomWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsBottom}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataBottom}
          draggable={false}
          refGrid={refGridBottom}
          onEditingFinish={onEditingFinishGridBottom}
        />
      </S.GridBottomWrap>
      {isModalHeaderOpen ? (
        <ModalNew
          title={"01. 생산품목"}
          height={"30%"}
          onClickModalSave={onClickModalSaveHeader}
          onClickModalClose={onClickModalCloseHeader}
          onDblClickModalGrid={onDblClickModalHeader}
          columns={columnsModalHeader}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersNum}
          refModalGrid={refGridModalHeader}
          isAddOneRow={true}
          buttonType={"Save"}
        />
      ) : null}
      {isModalSelectOpen ? (
        headerModalControl === "request" ? (
          <ModalDate
            onClickModalSearch={onClickSelectSearch}
            onClickModalClose={onClickModalSelectClose}
            columns={columnsSelect}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersNum}
            refModalGrid={refGridSelect}
            dateText={dateText}
            setDateText={setDateModal}
            datePickerSet={"range"}
            buttonType={"Search"}
            data={gridDataSelect}
            refGridSelect={refGridSelect}
            onDblClickModalGrid={onDblClickGridSelect}
          />
        ) : (
          <ModalSelect
            onClickModalSelectClose={onClickModalSelectClose}
            columns={columnsSelect}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersNum}
            refModalGrid={refGridSelect}
            gridDataSelect={gridDataSelect}
            refGridSelect={refGridSelect}
            onDblClickGridSelect={onDblClickGridSelect}
          />
        )
      ) : null}
      {isMidDeleteAlertOpen ? (
        <AlertDeleteDetail
          headerClickRowID={headerRowID}
          actSearchDetail={actSearchMidDI}
          actDeleteDetail={actDeleteMid}
          setIsDeleteAlertOpen={setIsMidDeleteAlertOpen}
        />
      ) : null}
      {isBottomDeleteAlertOpen ? (
        <AlertDeleteDetail
          headerClickRowID={headerRowID}
          actSearchDetail={actSearchBottomDI}
          actDeleteDetail={actDeleteBottom}
          setIsDeleteAlertOpen={setIsBottomDeleteAlertOpen}
        />
      ) : null}
      {isTopDeleteAlertOpen ? (
        <AlertDeleteDetail
          headerClickRowID={headerRowID}
          actSearchDetail={onClickSearch}
          actDeleteDetail={actDeleteTop}
          setIsDeleteAlertOpen={setIsTopDeleteAlertOpen}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default ProductionOrder;
