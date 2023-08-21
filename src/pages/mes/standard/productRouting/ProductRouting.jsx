import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import ProductRoutingSet from "./ProductRoutingSet";
import GridSingle from "components/grid/GridSingle";
import ModalNewDetail from "components/modal/ModalNewDetail";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import Condition from "custom/Condition";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as disRow from "custom/useDisableRowCheck";
import * as S from "./ProductRouting.styled";
import GetPostParams from "api/GetPostParams";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import GetDeleteParams from "api/GetDeleteParams";

export function ProductRouting() {
  const { currentMenuName, isMenuSlide } = useContext(LayoutContext);

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
  const [gridDataHeaderRowID, setGridDataHeaderRowID] = useState(null);

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsModal,
    columnsSelect,
    inputSet,
    inputInfo,
  } = ProductRoutingSet();

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const refGridSelect = useRef(null);
  const prodID = useRef("");

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

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(isEditModeHeader, refGridHeader);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  useEffect(() => {
    // actSearchHeaderDI(true, "start_date", "end_date");
    onClickSearch();
  }, []);

  const [actSearchHeader] = uSearch.useSearchEditHeader(
    isBackDrop,
    setIsBackDrop,
    setGridDataHeaderRowID,
    restURI.product
  );

  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.syncProduct
  ); //➡️ Modal Select Search Prod

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current]);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridDetail.current]);

  const onClickNew = () => {
    if (prodID.current !== "") {
      actSearchHeader(prodID.current);
      setIsModalOpen(true);
    }
  };
  async function onClickSearch() {
    try {
      setIsBackDrop(true);
      let conditionProdID;
      const result = await restAPI.get(restURI.product + `?` + conditionProdID);
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
      setIsBackDrop(false);
    }
  }
  const onClickModalAddRow = () => {
    const Header = refGridModalHeader?.current?.gridInst;
    const Detail = refGridModalDetail?.current?.gridInst;
    Detail?.appendRow();
    for (let i = 0; i < Detail.store.viewport.rows.length; i++) {
      Detail?.setValue(Detail.store.viewport.rows[i].rowKey, "prod_id_fdr", Header.getValue(0, "prod_id"));
    }
  };
  const onClickEditModalSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridModalDetail?.current?.gridInst;
      Grid?.finishEditing();

      let data = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        data.push(Grid?.getRowAt(i));
      }
      const resultData = data.map((raw) => GetPostParams("ProductRouting", raw));
      if (resultData) {
        const result = await restAPI.post(restURI.prodMapping, resultData);
        handleClickGridHeader(prodID.current);
        setIsModalOpen(false);
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
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
  function onClickModalClose() {
    setIsModalOpen(false);
    setIsEditModeHeader(false);
  }
  const onDblClickGridModalDetail = (e) => {
    if (!isNewDetail) {
      if (
        Condition(e, ["prod_gbn_nm", "model_nm", "prod_type_small_nm", "prod_cd", "prod_nm", "prod_std", "unit_nm"])
      ) {
        setDblClickRowKey(e?.rowKey);
        setIsModalSelectOpen(true);
        actSelectProd();
      }
    }
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;
    const columnNameProd = [
      "prod_gbn_nm",
      "model_nm",
      "prod_type_small_nm",
      "prod_id",
      "prod_cd",
      "prod_nm",
      "prod_std",
      "unit_nm",
      "mapping_system",
    ];
    refGrid = refGridModalDetail;
    columnName = columnNameProd;
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
  const handleClickGridHeader = async (rowID) => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.prodMapping + `?prod_id=${rowID}`);

      setGridDataDetail(result?.data?.data?.rows);
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
  const onClickGridHeader = async (e) => {
    if (e?.targetType === "cell") {
      prodID.current = e?.instance.getValue(e?.rowKey, "prod_id");
      handleClickGridHeader(prodID.current);
    }
  };

  const onClickDelete = () => {
    const data = refGridDetail?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const onDelete = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridDetail?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid?.getCheckedRows()?.map((raw) => GetDeleteParams("ProductRouting", raw));
      if (data) {
        const result = await restAPI.delete(restURI.prodMapping, { data });
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        setIsDeleteAlertOpen(false);
        handleClickGridHeader(prodID.current);
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
        rowHeaders={rowHeadersNum}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        isEditMode={isEditModeHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataHeader, isEditModeHeader]);

  return (
    <ContentsArea flexColumn={false}>
      <S.ContentsLeft>
        <S.ContentsHeader>
          <S.ContentsHeaderWrap>
            <S.TitleMidLeft>FacdoriOn 품목 정보</S.TitleMidLeft>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ContentsHeaderWrap>
          <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
        </S.ContentsHeader>
      </S.ContentsLeft>
      <S.ContentsRight>
        <S.SearchRightWrap>
          <S.ContentsHeaderWrap>
            <S.TitleMid>ERP 품목 정보</S.TitleMid>
            <S.ButtonBox>
              <S.InnerButtonWrap>
                <BtnComponent btnName={"New"} onClick={onClickNew} />
              </S.InnerButtonWrap>
              <S.InnerButtonWrap>
                <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
              </S.InnerButtonWrap>
            </S.ButtonBox>
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
            />
          </S.GridDetailWrap>
        </S.SearchRightWrap>
      </S.ContentsRight>
      {isModalOpen ? (
        <ModalNewDetail
          isNewDetail={true}
          onClickModalAddRow={onClickModalAddRow}
          onClickModalClose={onClickModalClose}
          onClickModalDetailClose={onClickModalClose}
          onClickEditModalSave={onClickEditModalSave}
          columnsModalHeader={columnsHeader}
          columnsModalDetail={columnsModal}
          columnOptions={columnOptions}
          header={header}
          rowHeadersHeader={rowHeadersNum}
          rowHeadersDetail={rowHeadersNum}
          refGridModalHeader={refGridModalHeader}
          refGridModalDetail={refGridModalDetail}
          gridDataHeaderRowID={gridDataHeaderRowID}
          onDblClickGridModalDetail={onDblClickGridModalDetail}
          modalTitle={"FacdoriOn 품목 정보"}
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
          onDelete={onDelete}
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
          // onDelete={onDeleteHeader}
          onCancel={() => {
            setIsDeleteHeaderAlertOpen(false);
          }}
        />
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
