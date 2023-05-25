import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import SubdivisionSet from "./SubdivisionSet";
import useInputSet from "custom/useInputSet";
import ButtonNES from "components/button/ButtonNES";
import ButtonNED from "components/button/ButtonNED";
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
import * as S from "./Subdivision.styled";
import InputPaper from "components/input/InputPaper";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";

function Subdivision() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

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
  const [inputInfoValue, setInputInfoValue] = useState([]);
  const [headerClickRowID, setHeaderClickRowID] = useState(null);
  const [headerClickRowKey, setHeaderClickRowKey] = useState(null);
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);

  const barcodePrintDetail = async (rowKey) => {
    const gridDetailId =
      refGridDetail?.current?.gridInst.store.data.rawData[rowKey]
        .work_subdivision_detail_id;

    const data = GetPostParams("createSubdivisionDetailBarcode", gridDetailId);
    if (data !== undefined) {
      if (data.length !== 0) {
        setIsBackDrop(true);
        await restAPI
          .post(restURI.createSubdivisionBarcode, data)
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.message,
              severity: "success",
            });
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.message
                ? res?.message
                : res?.response?.data?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };

  const barcodePrintHeader = async (rowKey) => {
    const gridHeaderId =
      refGridHeader?.current?.gridInst.store.data.rawData[rowKey]
        .work_subdivision_id;

    const data = GetPostParams("createSubdivisionBarcode", gridHeaderId);
    if (data !== undefined) {
      if (data.length !== 0) {
        setIsBackDrop(true);
        await restAPI
          .post(restURI.createSubdivisionBarcode, data)
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.message,
              severity: "success",
            });
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.message
                ? res?.message
                : res?.response?.data?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
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
  } = SubdivisionSet(
    isEditModeHeader,
    isEditModeDetail,
    isNewDetail,
    barcodePrintDetail,
    barcodePrintHeader
  );

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

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  useEffect(() => {
    actSearchHeaderDI(true, "start_date", "end_date");
  }, []);

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
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
    actSearchHeaderDI,
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
    actSearchHeaderDI(false, "start_date", "end_date");
    //actSearchDetail(headerClickRowID);
    setDisRowHeader(!disRowHeader);
  };
  const onClickSearch = () => {
    actSearchHeaderDI(true, "start_date", "end_date");
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
    actSearchHeaderDI(true, "start_date", "end_date");
    actSearchDetail(headerClickRowID);
  };
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
      for (
        let i = 0;
        i < refGridModalDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty =
          Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
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
      for (
        let i = 0;
        i < refGridModalDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty =
          Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
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
      const inputInfoValueList = [
        "subdivision_date",
        "prod_cd",
        "prod_nm",
        "lot_no",
        "total_qty",
        "remark",
      ];
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
    setIsNewDetail(true);
    setIsModalOpen(true);
    actSearchEditHeader(headerClickRowID);
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
      for (
        let i = 0;
        i < refGridDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty =
          Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
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
      for (
        let i = 0;
        i < refGridDetail?.current?.gridInst?.getRowCount();
        i++
      ) {
        totalQty =
          Number(totalQty) + Number(Detail.getValue(i, "subdivision_qty"));
      }
      //Header?.setValue(headerClickRowKey, "total_qty", totalQty);
    }

    const inputInfoValueList = [
      "subdivision_date",
      "prod_cd",
      "prod_nm",
      "lot_no",
      "total_qty",
      "remark",
    ];
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

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ContentsLeft>
        <S.SearchLeftWrap>
          <S.SearchWrap>
            <S.Date
              datePickerSet={"range"}
              dateText={dateText}
              setDateText={setDateText}
            />
          </S.SearchWrap>
          <S.SearchWrap>
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
          </S.SearchWrap>
        </S.SearchLeftWrap>
        <S.ContentsHeader>
          <S.TitleMid>❇️ 소분일지</S.TitleMid>
          <S.ContentsHeaderWrap>
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
          </S.ContentsHeaderWrap>
        </S.ContentsHeader>
        <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
      </S.ContentsLeft>
      <S.ContentsRight>
        <S.SearchInfoWrap>
          <S.SearchRightTopWrap>
            {inputInfo.map((v, idx) => {
              return (
                <InputPaper
                  key={v.id}
                  name={v.name}
                  value={inputInfoValue[idx] || ""}
                />
              );
            })}
          </S.SearchRightTopWrap>
        </S.SearchInfoWrap>
        <S.SearchRightWrap>
          <S.TitleMid>❇️ 세부소분일지</S.TitleMid>
          <S.SearchRightBottomWrap>
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
          </S.SearchRightBottomWrap>
        </S.SearchRightWrap>
        <S.GridDetailWrap isAllScreen={isAllScreen}>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsDetail}
            rowHeaders={rowHeadersNumCheck}
            header={header}
            data={gridDataDetail}
            draggable={false}
            refGrid={refGridDetail}
            onDblClickGrid={onDblClickGridHeader}
            onEditingFinish={onEditingFinishGridDetail}
          />
        </S.GridDetailWrap>
      </S.ContentsRight>
      {isModalOpen ? (
        <ModalNewDetail
          isNewDetail={isNewDetail}
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
          gridDataHeaderRowID={gridDataHeaderRowID}
          onClickGridModalDetail={onClickGridModalDetail}
          onDblClickGridModalHeader={onDblClickGridModalHeader}
          onEditingFinishGridModalDetail={onEditingFinishGridModalDetail}
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
          actDeleteDetail={actDeleteDetailDateRange}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default Subdivision;
