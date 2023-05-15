import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import ProductionOrderSet from "./ProductionOrderSet";
import useInputSet from "custom/useInputSet";
import ButtonNED from "components/button/ButtonNED";
import ButtonNEDS from "components/button/ButtonNEDS";
import ButtonED from "components/button/ButtonED";
import ButtonSES from "components/button/ButtonSES";
import ButtonSE from "components/button/ButtonSE";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
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
import * as RE from "custom/RegularExpression";
import * as S from "./ProductionOrder.styled";
import ModalNew from "components/modal/ModalNew";
import ModalDate from "components/modal/ModalDate";

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
  const [isNewDetail, setIsNewDetail] = useState(false);

  const [isModalHeaderOpen, setIsModalHeaderOpen] = useState(false);
  const [isModalMidOpen, setIsModalMidOpen] = useState(false);
  const [isModalBottomOpen, setIsModalBottomOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [columnsSelect, setColumnsSelect] = useState([]);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataMid, setGridDataMid] = useState(null);
  const [gridDataBottom, setGridDataBottom] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);
  const [headerClickRowKey, setHeaderClickRowKey] = useState(null);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
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
    columnsModalMid,
    columnsModalBottom,
    columnsSelectRequest,
    columnsSelectMid,
    columnsSelectBottom,
    inputSet,
    inputInfo,
  } = ProductionOrderSet(isEditModeHeader, isEditModeMid, isEditModeBottom);

  let clickModalMidRowKey = null;
  let clickModalBottomRowKey = null;

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
    setHeaderClickRowKey(null);
    // actSearchHeaderDI(true, "start_date", "end_date");
  };

  const onClickSelectSearch = () => {
    actSelectRequestOnlyDate("start_date", "end_date");
  };
  const onClickGridHeader = (e) => {
    if (!isEditModeHeader) {
      const rowID = e?.instance.getValue(e?.rowKey, "order_id");
      if (rowID !== null) {
        setHeaderClickRowID(rowID);
        setHeaderClickRowKey(e?.rowKey);
      }
    }
  };

  const onClickNewHeader = () => {
    setIsModalHeaderOpen(true);
  };
  const onClickModalCloseHeader = () => {
    setIsModalHeaderOpen(false);
  };
  const onDblClickModalHeader = (e) => {
    if (Condition(e, ["request_no", "prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalHeader");
      setColumnsSelect(columnsSelectRequest);
      setIsModalSelectOpen(true);
      actSelectRequestOnlyDate("start_date", "end_date");
    }
  };
  const onClickEditHeader = () => {};
  const onClickDeleteHeader = () => {};
  const onClickEditModeSaveHeader = () => {};
  const onClickEditModeExitHeader = () => {};

  const onClickNewMid = () => {
    if (headerClickRowKey !== null) {
      setIsModalMidOpen(true);
    }
  };
  const onClickModalCloseMid = () => {
    setIsModalMidOpen(false);
  };
  const onClickModalAddRowMid = () => {
    refGridModalMid?.current?.gridInst?.appendRow();
  };
  const onClickModalGridMid = (e) => {
    clickModalMidRowKey = e.rowKey;
  };
  const onClickModalCancelRowMid = () => {
    const gridEvent = refGridModalMid?.current?.gridInst;
    gridEvent?.removeRow(clickModalMidRowKey);
    clickModalMidRowKey = null;
  };
  const onDblClickModalMid = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalMid");
      setColumnsSelect(columnsSelectMid); // 관리계획서 투입품
      setIsModalSelectOpen(true);
      // actSelectProd();
    }
  };
  const onClickEditMid = () => {};
  const onClickDeleteMid = () => {};
  const onClickEditModeSaveMid = () => {};
  const onClickEditModeExitMid = () => {};

  const [dateModal, setDateModal] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });
  const onClickNewBottom = () => {
    if (headerClickRowKey !== null) {
      setIsModalBottomOpen(true);
    }
  };
  const onClickModalCloseBottom = () => {
    setIsModalBottomOpen(false);
  };
  const onClickModalAddRowBottom = () => {
    refGridModalBottom?.current?.gridInst?.appendRow();
  };
  const onClickModalGridBottom = (e) => {
    clickModalBottomRowKey = e.rowKey;
  };
  const onClickModalCancelRowBottom = () => {
    const gridEvent = refGridModalBottom?.current?.gridInst;
    gridEvent?.removeRow(clickModalBottomRowKey);
    clickModalBottomRowKey = null;
  };
  const onDblClickModalBottom = (e) => {
    if (
      Condition(e, [
        "proc_nm",
        "equip_nm",
        "insp_item_type_nm",
        "insp_item_nm",
        "insp_item_desc",
        "insp_method_nm",
        "insp_tool_nm",
        "insp_filing_nm",
      ])
    ) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalBottom");
      setColumnsSelect(columnsSelectBottom); // 관리계획서 점검일지
      setIsModalSelectOpen(true);
      // actSelectProd();
    }
  };
  const onClickEditBottom = () => {};
  const onClickDeleteBottom = () => {};
  const onClickEditModeSaveBottom = () => {};
  const onClickEditModeExitBottom = () => {};

  const onClickModalSaveHeader = () => {
    setIsModalHeaderOpen(false);
    setIsModalMidOpen(true);
  };
  const onClickModalSaveMid = () => {
    setIsModalMidOpen(false);
    setIsModalBottomOpen(true);
  };
  const onClickModalSaveBottom = () => {
    setIsModalBottomOpen(false);
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelect = (e) => {
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
    const columnNameInspItem = [
      "insp_item_type_id",
      "insp_item_type_nm",
      "insp_item_id",
      "insp_item_nm",
    ];

    if (dblClickGrid === "Search") {
      if (dblClickGrid === "Header") {
        refGrid = refGridHeader;
        columnName = columnNameRequest;
      } else if (dblClickGrid === "ModalHeader") {
        refGrid = refGridModalHeader;
        columnName = columnNameRequest;
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
      disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
      setIsModalSelectOpen(false);
    }
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
      <S.GridTopWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsHeader}
          rowHeaders={rowHeadersNumCheck}
          header={header}
          data={gridDataHeader}
          draggable={false}
          refGrid={refGridHeader}
          onClickGrid={onClickGridHeader}
        />
      </S.GridTopWrap>
      <S.ContentMid>
        <S.TitleMid>❇️ 투입품목</S.TitleMid>
        <S.ButtonMid>
          {isEditModeMid ? (
            <ButtonSE
              onClickSave={onClickEditModeSaveMid}
              onClickExit={onClickEditModeExitMid}
            />
          ) : (
            <ButtonNED
              onClickNew={onClickNewMid}
              onClickEdit={onClickEditMid}
              onClickDelete={onClickDeleteMid}
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
            <ButtonNED
              onClickNew={onClickNewBottom}
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
        />
      </S.GridBottomWrap>
      {isModalHeaderOpen ? (
        <ModalNew
          step={"01. 생산품목"}
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
      {isModalMidOpen ? (
        <ModalNew
          step={"02. 투입품목"}
          height={"70%"}
          onClickModalSave={onClickModalSaveMid}
          onClickModalClose={onClickModalCloseMid}
          onClickModalAddRow={onClickModalAddRowMid}
          onClickModalCancelRow={onClickModalCancelRowMid}
          onClickModalGrid={onClickModalGridMid}
          onDblClickModalGrid={onDblClickModalMid}
          columns={columnsModalMid}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersNum}
          refModalGrid={refGridModalMid}
        />
      ) : null}
      {isModalBottomOpen ? (
        <ModalNew
          step={"03. 점검기준서"}
          height={"70%"}
          onClickModalSave={onClickModalSaveBottom}
          onClickModalClose={onClickModalCloseBottom}
          onClickModalAddRow={onClickModalAddRowBottom}
          onClickModalCancelRow={onClickModalCancelRowBottom}
          onClickModalGrid={onClickModalGridBottom}
          onDblClickModalGrid={onDblClickModalBottom}
          columns={columnsModalBottom}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersNum}
          refModalGrid={refGridModalBottom}
        />
      ) : null}
      {isModalSelectOpen ? (
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
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
    </S.ContentsArea>
  );
}

export default ProductionOrder;
