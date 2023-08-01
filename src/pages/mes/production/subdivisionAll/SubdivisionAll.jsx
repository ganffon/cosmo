import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import SubdivisionSet from "./SubdivisionAllSet";
import useInputSet from "custom/useInputSet";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as uSave from "custom/useSave";
import * as uEdit from "custom/useEdit";
import * as uDelete from "custom/useDelete";
import * as disRow from "custom/useDisableRowCheck";
import * as RE from "custom/RegularExpression";
import * as S from "./SubdivisionAll.styled";
import InputPaper from "components/input/InputPaper";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import SubdivisionBarcodePrint from "components/printer/barcode/subdivisionBarcodePrint";
import GetDeleteParams from "api/GetDeleteParams";

function SubdivisionAll() {
  LoginStateChk();
  const { currentMenuName, isMenuSlide } = useContext(LayoutContext);

  const prodID = useRef("");
  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");

  const resetProd = () => {
    prodID.current = "";
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };
  const componentRef = useRef(null);

  const [isEditModeHeader, setIsEditModeHeader] = useState(false);
  const [isEditModeDetail, setIsEditModeDetail] = useState(false);
  const [isNewDetail, setIsNewDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleteHeaderAlertOpen, setIsDeleteHeaderAlertOpen] = useState(false);
  const [inputInfoValue, setInputInfoValue] = useState([]);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);
  const [headerClickRowKey, setHeaderClickRowKey] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);

  const [barcodePrintInfo, setBarcodePrintInfo] = useState({});

  const handlePrint = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const left = window.screenX + window.innerWidth / 2 - width / 2;
    const top = window.screenY + window.innerHeight / 2 - height / 2;
    const printWindow = window.open("", "Print", `width=${width},height=${height},left=${left},top=${top}`);
    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
      </head>
      <body>
        ${componentRef?.current?.outerHTML}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const barcodePrintDetail = async (e, rowKey) => {
    if (!isEditModeDetail) {
      const gridDetailId = refGridDetail?.current?.gridInst.store.data.rawData[rowKey].work_subdivision_detail_id;

      const data = GetPostParams("createSubdivisionDetailBarcode", gridDetailId);
      if (data !== undefined) {
        if (data.length !== 0) {
          setIsBackDrop(true);
          await restAPI
            .post(restURI.createBarcode, data)
            .then((res) => {
              setBarcodePrintInfo({
                ...barcodePrintInfo,
                lot: res?.data?.data?.rows[0].lot_no,
                qty: String(res?.data?.data?.rows[0].subdivision_qty),
                date: res?.data?.data?.rows[0].subdivision_date,
                createBarcode: res?.data?.data?.rows[0].barcode_no,
              });
              setTimeout(() => {
                handlePrint();
              }, 100);
            })
            .catch((res) => {
              setIsSnackOpen({
                ...isSnackOpen,
                open: true,
                message: res?.message ? res?.message : res?.response?.data?.message,
                severity: "error",
              });
            })
            .finally(() => {
              setIsBackDrop(false);
            });
        }
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "수정 모드에서는 출력할 수 없습니다.",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
  };

  const barcodePrintHeader = async (e, rowKey) => {
    if (!isEditModeHeader) {
      const gridHeaderId = refGridHeader?.current?.gridInst.store.data.rawData[rowKey].work_subdivision_id;

      const data = GetPostParams("createBarcode", gridHeaderId);
      if (data !== undefined) {
        if (data.length !== 0) {
          setIsBackDrop(true);
          await restAPI
            .post(restURI.createBarcode, data)
            .then((res) => {
              setBarcodePrintInfo({
                ...barcodePrintInfo,
                lot: res?.data?.data?.rows[0].lot_no,
                qty: String(res?.data?.data?.rows[0].total_qty),
                date: res?.data?.data?.rows[0].subdivision_date,
                createBarcode: res?.data?.data?.rows[0].barcode_no,
              });
              setTimeout(() => {
                handlePrint();
              }, 100);
            })
            .catch((res) => {
              setIsSnackOpen({
                ...isSnackOpen,
                open: true,
                message: res?.message ? res?.message : res?.response?.data?.message,
                severity: "error",
              });
            })
            .finally(() => {
              setIsBackDrop(false);
            });
        }
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "수정 모드에서는 출력할 수 없습니다.",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
  };

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnsSelectProd,
    inputSet,
    inputInfo,
  } = SubdivisionSet(isEditModeHeader, isEditModeDetail, isNewDetail, barcodePrintDetail, barcodePrintHeader);

  const SWITCH_NAME_01 = "subdivision";
  const SWITCH_NAME_02 = "subdivisionDetail";
  let modalDetailClickRowKey = null;

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const refGridSelect = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);
  const [disRowDetail, setDisRowDetail] = disRow.useDisableRowCheck(isEditModeDetail, refGridDetail);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  useEffect(() => {
    // actSearchHeaderDI(true, "start_date", "end_date");
    onClickSearch();
  }, []);

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product + `?use_fg=true`
  ); //➡️ Modal Select Search Prod

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
    restURI.subdivision
  );
  const [actSearchHeaderDI] = uSearch.useSearchDI(
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
    restURI.subdivision
  );

  const [actSearchDetail] = uSearch.useSearchDetail(
    setGridDataDetail,
    restURI.subdivisionDetail + "?work_subdivision_id=",
    disRowDetail,
    setDisRowDetail
  );

  const [actDeleteDetailDateRange] = uDelete.useDeleteDetailDateRange(
    refGridDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    onClickSearch,
    actSearchDetail,
    headerClickRowID,
    restURI.subdivisionDetail,
    SWITCH_NAME_02
  );

  const [actSearchEditHeader] = uSearch.useSearchEditHeader(
    isBackDrop,
    setIsBackDrop,
    setGridDataHeaderRowID,
    restURI.subdivision
  );
  const [actEditHeader] = uEdit.useEditHeader(
    refGridHeader,
    isEditModeHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.subdivision
  );
  const [actEditDetail] = uEdit.useEditDetail(
    refGridDetail,
    isEditModeDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.subdivisionDetail
  );
  const [actSaveDetail] = uSave.useSaveDetail(
    refGridModalDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_02,
    restURI.subdivisionDetail
  );

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current]);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridDetail.current]);

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEditModalSave = () => {
    actSaveDetail();
  };
  const onClickEditHeader = () => {
    setIsEditModeHeader(true);
    setDisRowHeader(!disRowHeader);
  };
  const onClickProdCancel = () => {
    resetProd();
    setInputSearchValue([]);
  };
  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    actSelectProd();
  };
  const onClickEditModeSave = () => {
    actEditHeader();
    setIsEditModeDetail(false);
  };
  const onClickEditModeExit = () => {
    setIsEditModeHeader(false);
    onClickSearch();
    // actSearchHeaderDI(false, "start_date", "end_date");
    //actSearchDetail(headerClickRowID);
    setDisRowHeader(!disRowHeader);
  };
  async function onClickSearch() {
    try {
      setIsBackDrop(true);
      let conditionProdID;
      prodCD.current !== "품목코드"
        ? (conditionProdID = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`)
        : (conditionProdID = "");
      const result = await restAPI.get(
        restURI.subdivision + `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` + conditionProdID
      );
      setGridDataHeader(result?.data?.data?.rows);
      setGridDataDetail([]);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      if (isEditModeHeader) {
        setDisRowHeader(!disRowHeader);
      }
      setIsBackDrop(false);
    }
  }
  const onClickModalAddRow = () => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    Header?.finishEditing();
    Detail?.finishEditing();
    Detail?.appendRow();

    Detail?.setValue(Detail.store.data.rawData.length - 1, "subdivision_date", DateTime().dateFull);
    Detail?.setValue(
      Detail.store.data.rawData.length - 1,
      "subdivision_time",
      DateTime().hour + ":" + DateTime().minute
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
    setIsModalOpen(false);

    setTimeout(() => {
      onClickSearch();
    }, 300);
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    setIsNewDetail(false);
    setIsEditModeHeader(false);
    // actSearchHeaderDI(true, "start_date", "end_date");
    actSearchDetail(headerClickRowID);
  }
  const onDblClickGridModalHeader = (e) => {
    if (!isNewDetail) {
      if (Condition(e, ["prod_cd", "prod_nm"])) {
        setDblClickRowKey(e?.rowKey);
        setDblClickGrid("ModalHeader");
        setColumnsSelect(columnsSelectProd);
        setIsModalSelectOpen(true);
        actSelectProd();
      }
    }
  };

  const onEditingFinishGridModalDetail = (e) => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    if (Condition(e, ["subdivision_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridModalDetail, "subdivision_time");
    }
    if (Condition(e, ["before_subdivision_qty"])) {
      const beforeQty = e?.value;
      const afterQty = Detail.getValue(e?.rowKey, "after_subdivision_qty");
      if (afterQty) {
        Detail?.setValue(e?.rowKey, "subdivision_qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "subdivision_qty", beforeQty);
      }
      let totalQty = 0;
      for (let i = 0; i < refGridModalDetail?.current?.gridInst?.getRowCount(); i++) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
      }
      //Header?.setValue(0, "total_qty", totalQty); 합계내역 보여주지 않기로 하여 주석처리
    }
    if (Condition(e, ["after_subdivision_qty"])) {
      const beforeQty = Detail.getValue(e?.rowKey, "before_subdivision_qty");
      const afterQty = e?.value;
      if (beforeQty) {
        Detail?.setValue(e?.rowKey, "subdivision_qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "subdivision_qty", -e?.value);
      }
      let totalQty = 0;
      for (let i = 0; i < refGridModalDetail?.current?.gridInst?.getRowCount(); i++) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
      }
      //Header?.setValue(0, "total_qty", totalQty);
    }
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
    actSearchDetail(headerClickRowID);
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameProd = ["prod_id", "prod_cd", "prod_nm"];

    if (dblClickGrid === "Search") {
      // setInputSearchValue([]);
      // columnName = ["prod_cd", "prod_nm"];
      // for (let i = 0; i < columnName.length; i++) {
      //   setInputSearchValue((prevList) => {
      //     return [...prevList, e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]];
      //   });
      // }
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      prodID.current = data.prod_id;
      prodCD.current = data.prod_cd;
      prodNM.current = data.prod_nm;
    } else {
      if (dblClickGrid === "Header") {
        refGrid = refGridHeader;
        columnName = columnNameProd;
      } else if (dblClickGrid === "ModalHeader") {
        refGrid = refGridModalHeader;
        columnName = columnNameProd;
      } else if (dblClickGrid === "Detail") {
        refGrid = refGridDetail;
      } else if (dblClickGrid === "ModalDetail") {
        refGrid = refGridModalDetail;
        columnName = columnNameProd;
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
  const onClickGridHeader = (e) => {
    if (!isEditModeHeader) {
      const inputInfoValueList = ["subdivision_date", "lot_no", "total_qty", "remark"];
      const rowID = e?.instance.getValue(e?.rowKey, "work_subdivision_id");
      if (rowID !== null) {
        setInputInfoValue([]);
        setHeaderClickRowID(rowID);
        setHeaderClickRowKey(e?.rowKey);
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
    }
  };
  const onClickEditSaveDetail = () => {
    actEditDetail();
  };

  const onDblClickGridHeader = (e) => {
    if (Condition(e, ["prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("Header");
      setColumnsSelect(columnsSelectProd);
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };

  const onClickEditExitDetail = () => {
    setIsEditModeDetail(false);
    actSearchDetail(headerClickRowID);
    setDisRowDetail(!disRowDetail);
  };
  const onClickEditNew = () => {
    if (headerClickRowID) {
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
  const onClickDeleteHeader = () => {
    const data = refGridHeader?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteHeaderAlertOpen(true);
    }
  };
  const onDeleteHeader = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridHeader?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid?.getCheckedRows()?.map((raw) => GetDeleteParams("subdivision", raw));
      if (data) {
        const result = await restAPI.delete(restURI.subdivision, { data });
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        setIsDeleteHeaderAlertOpen(false);
        onClickSearch();
        setGridDataDetail([]);
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
  };
  const onEditingFinishGridHeader = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onEditingFinishGridDetail = (e) => {
    if (Condition(e, ["subdivision_time"])) {
      //🔸시간 정규표현식 적용
      RE.Time(e, refGridDetail, "subdivision_time");
    }
    disRow.handleEditingFinishGridCheck(e);

    const Header = refGridHeader?.current?.gridInst;
    const Detail = refGridDetail?.current?.gridInst;

    if (Condition(e, ["before_subdivision_qty"])) {
      const beforeQty = e?.value;
      const afterQty = Detail.getValue(e?.rowKey, "after_subdivision_qty");
      if (afterQty) {
        Detail?.setValue(e?.rowKey, "subdivision_qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "subdivision_qty", beforeQty);
      }
      let totalQty = 0;
      for (let i = 0; i < refGridDetail?.current?.gridInst?.getRowCount(); i++) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
      }
      //Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }
    if (Condition(e, ["after_subdivision_qty"])) {
      const beforeQty = Detail.getValue(e?.rowKey, "before_subdivision_qty");
      const afterQty = e?.value;
      if (beforeQty) {
        Detail?.setValue(e?.rowKey, "subdivision_qty", beforeQty - afterQty);
      } else {
        Detail?.setValue(e?.rowKey, "subdivision_qty", -e?.value);
      }
      let totalQty = 0;
      for (let i = 0; i < refGridDetail?.current?.gridInst?.getRowCount(); i++) {
        totalQty = Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
      }
      //Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }

    const inputInfoValueList = ["subdivision_date", "lot_no", "total_qty", "remark"];
    setInputInfoValue([]);
    for (let i = 0; i < inputInfoValueList.length; i++) {
      let data = Header.getValue(headerClickRowKey, inputInfoValueList[i]);
      if (data === false) {
        //🔸false 인 경우 데이터 안찍혀서 강제로 찍음
        data = "false";
      }
      setInputInfoValue((prevList) => {
        return [...prevList, data];
      });
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  const GridHeader = useMemo(() => {
    return isEditModeHeader ? (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        isEditMode={isEditModeHeader}
        onClickGrid={onClickGridHeader}
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
        isEditMode={isEditModeHeader}
        onClickGrid={onClickGridHeader}
        onEditingFinish={onEditingFinishGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);

  const BarcodePrint = useMemo(() => {
    return (
      <SubdivisionBarcodePrint
        productCode={barcodePrintInfo.prodCD || ""}
        partName={barcodePrintInfo.prodNM || ""}
        lotNo={barcodePrintInfo.lot || ""}
        weight={barcodePrintInfo.qty || ""}
        legDate={barcodePrintInfo.date || ""}
        barcodeValue={barcodePrintInfo.createBarcode || "Ready"}
        componentRef={componentRef}
      />
    );
  }, [barcodePrintInfo, componentRef.current]);

  return (
    <ContentsArea flexColumn={false}>
      <S.ContentsLeft>
        <S.SearchLeftWrap>
          <S.SearchWrapDate>
            <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={onClickSearch} />
            </S.ButtonWrap>
          </S.SearchWrapDate>
          {/* <S.SearchWrap>
            <S.InputPaperWrap>
              <InputPaper
                width={"180px"}
                name={"품목코드"}
                namePositionTop={"-12px"}
                value={prodCD.current || ""}
                btn={false}
              />
            </S.InputPaperWrap>
            <S.InputPaperWrap>
              <InputPaper
                width={"240px"}
                name={"품목"}
                namePositionTop={"-12px"}
                value={prodNM.current || ""}
                btn={true}
                onClickSelect={onClickProd}
                onClickRemove={onClickProdCancel}
              />
            </S.InputPaperWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={onClickSearch} />
            </S.ButtonWrap>
          </S.SearchWrap> */}
        </S.SearchLeftWrap>
        <S.ContentsHeader>
          <S.ContentsHeaderWrap>
            <S.TitleMidLeft>소분일지</S.TitleMidLeft>
            {isEditModeHeader ? (
              <S.ButtonBox>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Save"} onClick={onClickEditModeSave} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Cancel"} onClick={onClickEditModeExit} />
                </S.InnerButtonWrap>
              </S.ButtonBox>
            ) : (
              <S.ButtonBox>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"New"} onClick={onClickNew} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Edit"} onClick={onClickEditHeader} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Delete"} onClick={onClickDeleteHeader} />
                </S.InnerButtonWrap>
              </S.ButtonBox>
            )}
          </S.ContentsHeaderWrap>
          <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
        </S.ContentsHeader>
      </S.ContentsLeft>
      <S.ContentsRight>
        <S.SearchInfoWrap>
          {inputInfo.map((v, idx) => {
            return <InputPaper key={v.id} name={v.name} value={inputInfoValue[idx] || ""} />;
          })}
        </S.SearchInfoWrap>
        <S.SearchRightWrap>
          <S.ContentsHeaderWrap>
            <S.TitleMid>세부소분일지</S.TitleMid>
            {isEditModeDetail ? (
              <S.ButtonBox>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Save"} onClick={onClickEditSaveDetail} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Cancel"} onClick={onClickEditExitDetail} />
                </S.InnerButtonWrap>
              </S.ButtonBox>
            ) : (
              <S.ButtonBox>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"New"} onClick={onClickEditNew} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Edit"} onClick={onClickEditDetail} />
                </S.InnerButtonWrap>
                <S.InnerButtonWrap>
                  <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
                </S.InnerButtonWrap>
              </S.ButtonBox>
            )}
          </S.ContentsHeaderWrap>
          <S.GridDetailWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsDetail}
              rowHeaders={rowHeadersNumCheck}
              header={header}
              data={gridDataDetail}
              draggable={false}
              refGrid={refGridDetail}
              isEditMode={isEditModeDetail}
              onDblClickGrid={onDblClickGridHeader}
              onEditingFinish={onEditingFinishGridDetail}
            />
          </S.GridDetailWrap>
        </S.SearchRightWrap>
      </S.ContentsRight>

      {isModalOpen ? (
        <ModalNewDetail
          isNewDetail={isNewDetail}
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          onClickModalDetailClose={onClickModalClose}
          onClickEditModalSave={onClickEditModalSave}
          columnsModalHeader={columnsModalHeader}
          columnsModalDetail={columnsModalDetail}
          columnOptions={columnOptions}
          header={header}
          rowHeadersHeader={rowHeadersNum}
          rowHeadersDetail={rowHeadersNum}
          refGridModalHeader={refGridModalHeader}
          refGridModalDetail={refGridModalDetail}
          gridDataHeaderRowID={gridDataHeaderRowID}
          onClickGridModalDetail={onClickGridModalDetail}
          onDblClickGridModalHeader={onDblClickGridModalHeader}
          onEditingFinishGridModalDetail={onEditingFinishGridModalDetail}
          modalTitle={"소분일지"}
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
      {isDeleteAlertOpen && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={actDeleteDetailDateRange}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      )}
      {isDeleteHeaderAlertOpen && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={onDeleteHeader}
          onCancel={() => {
            setIsDeleteHeaderAlertOpen(false);
          }}
        />
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
      {BarcodePrint}
    </ContentsArea>
  );
}

export default SubdivisionAll;
