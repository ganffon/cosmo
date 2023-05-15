import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import SubdivisionPanelSet from "./SubdivisionPanelSet";
import BtnSubdivisionScale from "components/button/panel/BtnSubdivisionScale";
import BtnSubdivisionSL from "components/button/panel/BtnSubdivisionSL";
import InputPaper from "components/input/InputPaper";
import InputText from "components/input/InputText";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./SubdivisionPanel.styled";
import restAPI from "api/restAPI";
import ModalSubdivision from "./ModalSubdivision";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import BtnSubdivisionDHE from "components/button/panel/BtnSubdivisionDHE";

function SubdivisionPanel() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalSubdivisionOpen, setIsModalSubdivisionOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [isLockScale, setIsLockScale] = useState(true);

  const {
    columnOptions,
    rowHeadersNum,
    header,
    columns,
    columnsSelectProd,
    columnsSelectLoadHeader,
    columnsSelectLoadDetail,
  } = SubdivisionPanelSet();

  const refGridSingle = useRef(null);
  const refGridSelect = useRef(null);
  const refGridSelectDetail = useRef(null);

  const refBarcode = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [gridDataSelectDetail, setGridDataSelectDetail] = useState(null);

  const [require, setRequire] = useState({
    prod_id: "",
    prod_cd: "",
    date: "", //🔸소분일자
    totalQty: "", //🔸소분총량
    lot: "", //🔸잔량Bag LOT
    workSubdivisionID: "", //🔸소분일지ID
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [scaleInfo, setScaleInfo] = useState({
    barcode: "",
    lot: "",
    before: "",
    after: "",
    qty: "",
  });
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  const resetRequire = () => {
    setRequire({
      ...require,
      prod_id: "",
      prod_cd: "",
      date: "",
      lot: "",
      totalQty: "",
      workSubdivisionID: "",
    });
    setGridDataHeader([]);
  };
  const resetScaleInfo = () => {
    setScaleInfo({
      ...scaleInfo,
      barcode: "",
      lot: "",
      before: "",
      after: "",
      qty: "",
    });
  };
  const [actSelectProd] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.product
  ); //➡️ Modal Select Search Prod
  const [actSelectLoadHeader] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.subdivision + "?complete_fg=INCOMPLETE"
  ); //➡️ Modal Select Search Load Header
  const [actSelectLoadDetail] = uSearch.useSearchSelect(
    refGridSelectDetail,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectDetail,
    restURI.subdivisionDetail
  ); //➡️ Modal Select Search Load Detail
  useEffect(() => {
    // refBarcode?.current?.firstChild?.focus();
  }, [gridDataHeader]);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    // refGridSingle?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    let before;
    let after;
    if (scaleInfo.before) {
      before = Number(scaleInfo.before);
    } else {
      before = 0;
    }
    if (scaleInfo.after) {
      after = Number(scaleInfo.after);
    } else {
      after = 0;
    }
    setScaleInfo({ ...scaleInfo, qty: before - after });
  }, [scaleInfo.before, scaleInfo.after]);

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickGridSelect = (e) => {
    if (e?.targetType !== "columnHeader") {
      const Header = refGridSelect?.current?.gridInst;
      const rowID = Header.getValue(e?.rowKey, "work_subdivision_id");
      const params = `?work_subdivision_id=${rowID}`;
      if (rowID !== require.workSubdivisionID) {
        setRequire({
          ...require,
          prod_id: Header.getValue(e?.rowKey, "prod_id"),
          prod_cd: Header.getValue(e?.rowKey, "prod_cd"),
          date: Header.getValue(e?.rowKey, "subdivision_date"),
          lot: Header.getValue(e?.rowKey, "lot_no"),
          totalQty: Header.getValue(e?.rowKey, "total_qty"),
          workSubdivisionID: rowID,
        });
        actSelectLoadDetail(params);
      }
    }
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    if (dblClickGrid === "Search") {
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      setRequire({
        ...require,
        prod_id: data.prod_id,
        prod_cd: data.prod_cd,
        date: DateTime().dateFull,
        totalQty: 0,
        lot: "",
        workSubdivisionID: "",
      });
      setIsModalSelectOpen(false);
    }
  };
  const onClickPick = async () => {
    if (require.prod_id !== "") {
      try {
        const result = await restAPI.get(
          restURI.subdivisionDetail +
            `?work_subdivision_id=${require.workSubdivisionID}`
        );
        setGridDataHeader(result?.data?.data?.rows);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });

        setIsModalSubdivisionOpen(false);
        setIsLockScale(false);
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
    refBarcode?.current?.firstChild?.focus();
  };
  const onClickStart = async (e) => {
    if (require.prod_id === "") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "품번 정보를 입력하세요!",
        severity: "error",
        location: "bottomLeft",
      });
    } else {
      if (require.workSubdivisionID === "") {
        let obj = [];
        obj.push({
          prod_id: require.prod_id,
          subdivision_date: require.date,
        });
        try {
          const result = await restAPI.post(restURI.subdivisions, obj);
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
        }
      }
      setIsLockScale(false);
    }
  };
  const [isDelete, setIsDelete] = useState(false);
  const onClickDelete = () => {
    setIsDelete(true);
  };
  const handleDelete = async () => {
    try {
      const result = await restAPI.delete(
        restURI.subdivision + `/${require.workSubdivisionID}`
      );
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      resetRequire();
      resetScaleInfo();
      setIsLockScale(true);
      setIsDelete(false);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    }
  };
  const onClickLoad = (e) => {
    resetRequire();
    actSelectLoadHeader();
    setIsModalSubdivisionOpen(true);
    setDblClickGrid("Load");
  };
  const [isHold, setIsHold] = useState(false);
  const onClickHold = () => {
    setIsHold(true);
  };
  const handleHold = () => {
    resetRequire();
    resetScaleInfo();
    setIsLockScale(true);
    setIsHold(false);
  };
  const onClickModalSubdivisionClose = () => {
    resetRequire();
    setIsModalSubdivisionOpen(false);
  };
  const [isEnd, setIsEnd] = useState(false);
  const onClickEnd = (e) => {
    setIsEnd(true);
  };
  const handleEnd = async () => {
    try {
      const result = await restAPI.patch(
        restURI.subdivision + `/${require.workSubdivisionID}/complete`
      );
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      resetRequire();
      resetScaleInfo();
      setIsLockScale(true);
      setIsEnd(false);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    }
  };
  const onClickSelect = (e) => {
    if (isLockScale) {
      setDblClickGrid("Search");
      setIsModalSelectOpen(true);
      actSelectProd();
    }
  };
  const onClickRemove = (e) => {
    if (isLockScale) {
      resetRequire();
      resetScaleInfo();
      setIsLockScale(true);
    }
  };
  const onClickBefore = () => {
    refBarcode?.current?.firstChild?.focus();
    setScaleInfo({ ...scaleInfo, before: "505" });
  };
  const onClickAfter = () => {
    refBarcode?.current?.firstChild?.focus();
    setScaleInfo({ ...scaleInfo, after: "465" });
  };
  const onClickNext = async () => {
    if (
      scaleInfo.lot !== "" ||
      scaleInfo.before !== "" ||
      scaleInfo.after !== ""
    ) {
      const raw = [
        {
          work_subdivision_id: require.workSubdivisionID,
          subdivision_date: require.date,
          subdivision_time: `${DateTime().hour}:${DateTime().minute}`,
          lot_no: scaleInfo.lot,
          before_qty: String(scaleInfo.before)
            ? Number(scaleInfo.before)
            : null,
          after_qty: String(scaleInfo.after) ? Number(scaleInfo.after) : null,
          qty: String(scaleInfo.qty) ? Number(scaleInfo.qty) : null,
        },
      ];
      try {
        const result = await restAPI.post(restURI.subdivisionDetail, raw);
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
        try {
          const result = await restAPI.get(
            restURI.subdivisionDetail +
              `?work_subdivision_id=${require.workSubdivisionID}`
          );
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
          setGridDataHeader(result?.data?.data?.rows);
        } catch (err) {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
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
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "투입LOT와 소분 전, 후 중량을 모두 입력하세요!",
        severity: "error",
        location: "bottomLeft",
      });
    }
    refBarcode?.current?.firstChild?.focus();
  };

  const handleBarcodeEnter = async (e) => {
    if (e.key === "Enter") {
      try {
        const result = await restAPI.get(
          restURI.barcodeERP + `?lot_no=${e?.target?.value}`
        );
        setScaleInfo({ ...scaleInfo, lot: "MTM1804130002" });
      } catch (err) {
        alert(`Err : ${err}`);
      }
    }
    refBarcode?.current?.firstChild?.focus();
  };
  const handleChange = (e) => {
    setScaleInfo({ ...scaleInfo, [e.target.id]: e.target.value });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ContentsLeft>
        <S.ScreenTitleBox>❇️ 일일소분일지</S.ScreenTitleBox>
        <S.ItemInfoBox>
          <InputPaper
            width={"500px"}
            height={"60px"}
            name={"품번"}
            nameSize={"20px"}
            namePosition={"-30px"}
            nameColor={"white"}
            value={require.prod_cd || ""}
            size={"22px"}
            btn={true}
            onClickSelect={onClickSelect}
            onClickRemove={onClickRemove}
          />
          <InputPaper
            width={"220px"}
            height={"60px"}
            name={"소분일자"}
            nameSize={"20px"}
            namePosition={"-30px"}
            nameColor={"white"}
            value={require.date}
            size={"22px"}
          />
          <InputPaper
            width={"220px"}
            height={"60px"}
            name={"소분총량"}
            nameSize={"20px"}
            namePosition={"-30px"}
            nameColor={"white"}
            value={require.totalQty}
            size={"22px"}
          />
        </S.ItemInfoBox>
        <S.DataInterfaceBox>
          {isLockScale === false ? (
            <>
              <S.DataInterfaceWrap>
                <InputText
                  id={"barcode"}
                  name={"Barcode"}
                  nameColor={"black"}
                  value={scaleInfo.barcode}
                  refInput={refBarcode}
                  handleEnter={handleBarcodeEnter}
                  onChange={handleChange}
                />
                <InputText
                  id={"lot"}
                  name={"투입LOT"}
                  nameColor={"black"}
                  value={scaleInfo.lot}
                  onChange={handleChange}
                />
                <InputText
                  id={"before"}
                  name={"소분 전"}
                  nameColor={"black"}
                  value={scaleInfo.before}
                  onChange={handleChange}
                />
                <InputText
                  id={"after"}
                  name={"소분 후"}
                  nameColor={"black"}
                  value={scaleInfo.after}
                  onChange={handleChange}
                />
              </S.DataInterfaceWrap>
              <S.MadeButtonWrap>
                <BtnSubdivisionScale
                  onClickBefore={onClickBefore}
                  onClickAfter={onClickAfter}
                  onClickNext={onClickNext}
                />
              </S.MadeButtonWrap>
            </>
          ) : (
            <S.ScaleLock>
              <S.ScaleLockIcon />
            </S.ScaleLock>
          )}
        </S.DataInterfaceBox>
      </S.ContentsLeft>
      <S.ContentsRight>
        <S.ButtonBox>
          {isLockScale ? (
            <BtnSubdivisionSL
              onClickStart={onClickStart}
              startDisable={isLockScale ? false : true}
              onClickLoad={onClickLoad}
              loadDisable={isLockScale ? false : true}
            />
          ) : (
            <BtnSubdivisionDHE
              onClickDelete={onClickDelete}
              deleteDisable={isLockScale}
              onClickHold={onClickHold}
              holdDisable={isLockScale}
              onClickEnd={onClickEnd}
              endDisable={isLockScale}
            />
          )}
        </S.ButtonBox>
        <S.DataHandleBox>
          <GridSingle
            data={gridDataHeader}
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeadersNum}
            refGrid={refGridSingle}
          />
        </S.DataHandleBox>
      </S.ContentsRight>
      {isModalSelectOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelectProd}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataSelect}
          rowHeaders={rowHeadersNum}
          refSelectGrid={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      {isModalSubdivisionOpen ? (
        <ModalSubdivision
          onClickModalClose={onClickModalSubdivisionClose}
          columnsModalHeader={columnsSelectLoadHeader}
          columnsModalDetail={columnsSelectLoadDetail}
          columnOptions={columnOptions}
          header={header}
          setGridDataHeader={setGridDataSelect}
          gridDataHeader={gridDataSelect}
          gridDataDetail={gridDataSelectDetail}
          rowHeadersHeader={rowHeadersNum}
          rowHeadersDetail={rowHeadersNum}
          refGridModalHeader={refGridSelect}
          refGridModalDetail={refGridSelectDetail}
          onClickGridModalHeader={onClickGridSelect}
          onDblClickGridModalHeader={onDblClickGridSelect}
          onClickPick={onClickPick}
          require={require}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
      {isDelete ? (
        <AlertDelete
          setIsDeleteAlertOpen={setIsDelete}
          handleDelete={handleDelete}
          title={"Delete"}
          message={"모든 작업을 취소하고 삭제하시겠습니까?"}
        />
      ) : null}
      {isHold ? (
        <AlertDelete
          setIsDeleteAlertOpen={setIsHold}
          handleDelete={handleHold}
          title={"Hold"}
          message={"모든 작업을 보류시키겠습니까?"}
        />
      ) : null}
      {isEnd ? (
        <AlertDelete
          setIsDeleteAlertOpen={setIsEnd}
          handleDelete={handleEnd}
          title={"End"}
          message={"모든 작업을 완료하고 마감하시겠습니까?"}
        />
      ) : null}
    </S.ContentsArea>
  );
}

export default SubdivisionPanel;
