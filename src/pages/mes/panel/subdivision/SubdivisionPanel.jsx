import { useContext, useState, useEffect, useRef } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import SubdivisionPanelSet from "./SubdivisionPanelSet";
//import BtnSubdivisionSL from "components/button/panel/BtnSubdivisionSL";
import InputPaper from "components/input/InputPaper";
import InputText from "components/input/InputText";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./SubdivisionPanel.styled";
import restAPI from "api/restAPI";
import ModalSubdivision from "./ModalSubdivision";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import GridPanel from "components/grid/GridPanel";
import ContentsArea from "components/layout/common/ContentsArea";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import BtnPanel from "components/button/BtnPanel";
import BarcodeScan from "./BarcodeScan";

function SubdivisionPanel() {
  LoginStateChk();
  const { isMenuSlide } = useContext(LayoutContext);

  const prodID = useRef("");
  const prodCD = useRef("");
  const date = useRef("");
  const lot = useRef("");
  const workSubdivisionID = useRef("");

  const [totalQty, setTotalQty] = useState();

  const [scaleInfo, setScaleInfo] = useState({
    barcode: "",
    inputLot: "",
    before: "",
    after: "",
    qty: "",
  });

  const [isBarcodeScanOpen, setIsBarcodeScanOpen] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalSubdivisionOpen, setIsModalSubdivisionOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [isLockScale, setIsLockScale] = useState(true);

  const [isWarning, setIsWarning] = useState({
    open: false,
    title: "",
    message: "",
  });

  const {
    columnOptions,
    rowHeadersNum,
    header,
    columns,
    columnsSelectProd,
    columnsSelectLoadHeader,
    columnsSelectLoadDetail,
  } = SubdivisionPanelSet(onClickGridButton);

  const refGridSingle = useRef(null);
  const refGridSelect = useRef(null);
  const refGridSelectDetail = useRef(null);

  const refBarcode = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [gridDataSelectDetail, setGridDataSelectDetail] = useState(null);

  // const [require, setRequire] = useState({
  //   prod_id: "",
  //   prod_cd: "",
  //   date: "", //🔸소분일자
  //   totalQty: "", //🔸소분총량
  //   lot: "", //🔸잔량Bag LOT
  //   workSubdivisionID: "", //🔸소분일지ID
  // });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  const resetRequire = () => {
    prodID.current = "";
    prodCD.current = "";
    date.current = "";
    lot.current = "";
    workSubdivisionID.current = "";
    setTotalQty("");

    setGridDataHeader([]);
  };
  const resetScaleInfo = () => {
    setScaleInfo({
      ...scaleInfo,
      barcode: "",
      inputLot: "",
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
    refBarcode?.current?.firstChild?.focus();
  }, [gridDataHeader]);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridSingle?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    let beforeQty;
    let afterQty;
    if (scaleInfo.before) {
      beforeQty = Number(scaleInfo.before);
    } else {
      beforeQty = 0;
    }
    if (scaleInfo.after) {
      afterQty = Number(scaleInfo.after);
    } else {
      afterQty = 0;
    }
    setScaleInfo({ ...scaleInfo, qty: beforeQty - afterQty });
  }, [scaleInfo.before, scaleInfo.after]);

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickGridSelect = (e) => {
    if (e?.targetType !== "columnHeader") {
      const Header = refGridSelect?.current?.gridInst;
      const rowID = Header.getValue(e?.rowKey, "work_subdivision_id");
      const params = `?work_subdivision_id=${rowID}`;
      if (rowID !== workSubdivisionID.current) {
        prodID.current = Header.getValue(e?.rowKey, "prod_id");
        prodCD.current = Header.getValue(e?.rowKey, "prod_cd");
        date.current = Header.getValue(e?.rowKey, "subdivision_date");
        lot.current = Header.getValue(e?.rowKey, "lot_no");
        setTotalQty(Header.getValue(e?.rowKey, "total_qty"));
        workSubdivisionID.current = rowID;
        if (e?.columnName === "select") {
          onClickGridButton(e?.rowKey);
        } else {
          actSelectLoadDetail(params);
        }
      }
    }
  };
  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    if (dblClickGrid === "Search") {
      const data = e?.instance?.store?.data?.rawData[e?.rowKey];
      prodID.current = data.prod_id;
      prodCD.current = data.prod_cd;
      date.current = DateTime().dateFull;
      setTotalQty(0);
      lot.current = "";
      workSubdivisionID.current = "";
      setIsModalSelectOpen(false);
    }
  };

  async function onClickGridButton(rowKey) {
    if (prodID.current) {
      try {
        const Header = refGridSelect?.current?.gridInst;
        const workSubdivisionID = Header.getValue(rowKey, "work_subdivision_id");
        const result = await restAPI.get(restURI.subdivisionDetail + `?work_subdivision_id=${workSubdivisionID}`);
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
  }
  const onClickStart = async (e) => {
    if (prodID.current === "") {
      setIsWarning({
        ...isWarning,
        open: true,
        title: "Warning",
        message: "품목코드를 입력하세요!",
      });
    } else {
      if (!workSubdivisionID.current) {
        let obj = [];
        obj.push({
          prod_id: prodID.current,
          subdivision_date: date.current,
        });
        try {
          const result = await restAPI.post(restURI.subdivisions, obj);
          workSubdivisionID.current = result?.data?.data?.rows[0]?.work_subdivision_id;
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
      const result = await restAPI.delete(restURI.subdivision + `/${workSubdivisionID.current}`);
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
      const result = await restAPI.patch(restURI.subdivision + `/${workSubdivisionID.current}/complete`);
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
  const handleWarning = () => {
    setIsWarning({
      ...isWarning,
      open: false,
    });
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
    if (Number(scaleInfo.before) >= Number(scaleInfo.after)) {
      if (scaleInfo.inputLot !== "" && scaleInfo.before !== "" && scaleInfo.after !== "") {
        const raw = [
          {
            work_subdivision_id: workSubdivisionID.current,
            subdivision_date: date.current,
            subdivision_time: `${DateTime().hour}:${DateTime().minute}`,
            lot_no: scaleInfo.inputLot,
            before_qty: String(scaleInfo.before) ? Number(scaleInfo.before) : null,
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
              restURI.subdivisionDetail + `?work_subdivision_id=${workSubdivisionID.current}`
            );
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: result?.data?.message,
              severity: "success",
              location: "bottomRight",
            });
            setGridDataHeader(result?.data?.data?.rows);
            resetScaleInfo();
            const resultData = result?.data?.data?.rows;
            let totalQty = 0;
            for (let i = 0; resultData.length > i; i++) {
              totalQty = totalQty + resultData[i].subdivision_qty;
            }
            setTotalQty(totalQty);
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
        setIsWarning({
          ...isWarning,
          open: true,
          title: "Warning",
          message: "투입LOT와 소분 전, 후 중량을 입력하세요!",
        });
      }
    } else {
      setIsWarning({
        ...isWarning,
        open: true,
        title: "Warning",
        message: "소분 전/후 중량을 다시 확인하세요!",
      });
    }
    refBarcode?.current?.firstChild?.focus();
  };

  const handleBarcodeEnter = async (e) => {
    if (e.key === "Enter") {
      try {
        const result = await restAPI.get(restURI.barcodeERP + `?lot_no=${e?.target?.value}`);
        setScaleInfo({ ...scaleInfo, inputLot: "MTM1804130002" });
      } catch (err) {
        alert(`Err : ${err}`);
      }
    }
    refBarcode?.current?.firstChild?.focus();
  };
  const handleChange = (e) => {
    setScaleInfo({ ...scaleInfo, [e.target.id]: e.target.value });
  };

  const [barcodeScan, setBarcodeScan] = useState({});
  const refBarcodeScan = useRef(null);

  useEffect(() => {
    let barcodeNo = "";
    const onBarcodeScan = (e) => {
      console.log(e);
      // e?.Key 가 "Process"는 한글인 경우
      if (e?.key === "Process") {
        // e?.Key 가 "Process" 이면서 e?.code 가 "Digit" 숫자로 들어오는 경우가 있는데 무시해야 함
        if (e?.code.includes("Key")) {
          barcodeNo = barcodeNo + e?.code.replace("Key", "");
        }
      } else if (e?.key !== "Shift") {
        if (e?.code.includes("Digit")) {
          barcodeNo = barcodeNo + e?.code.replace("Digit", "");
        }
        if (e?.code.includes("Key")) {
          barcodeNo = barcodeNo + e?.code.replace("Key", "");
        }
        if (e?.code.includes("Minus")) {
          barcodeNo = barcodeNo + e?.key;
        }
      }

      if (e?.key === "Enter") {
        console.log(barcodeNo);
        barcodeNo = "";
      }
    };
    window.addEventListener("keydown", onBarcodeScan);

    const interval = setInterval(() => {
      barcodeNo = "";
    }, 1000);

    return () => {
      window.removeEventListener("keydown", onBarcodeScan);
      clearInterval(interval);
    };
  }, []);

  return (
    <ContentsArea flexColumn={false}>
      <S.ContentsLeft ref={refBarcodeScan}>
        <S.ItemInfoBox>
          <S.ScreenTopTitleBox>일일소분일지</S.ScreenTopTitleBox>
          <InputPaper
            width={"500px"}
            height={"60px"}
            name={"품목코드"}
            nameSize={"20px"}
            namePositionTop={"-30px"}
            value={prodCD.current || ""}
            size={"22px"}
            btn={true}
            onClickSelect={onClickSelect}
            onClickRemove={onClickRemove}
          />
          <InputPaper
            width={"230px"}
            height={"60px"}
            name={"소분일자"}
            nameSize={"20px"}
            namePositionTop={"-30px"}
            value={date.current || ""}
            size={"22px"}
          />
          <InputPaper
            width={"230px"}
            height={"60px"}
            name={"소분총량"}
            nameSize={"20px"}
            namePositionTop={"-30px"}
            value={totalQty || ""}
            size={"22px"}
          />
        </S.ItemInfoBox>

        {isLockScale ? (
          <S.ButtonBox>
            <BtnPanel
              title={"시작하기"}
              height={"70px"}
              width={"48%"}
              color={"#1491CE"}
              fontSize={"26px"}
              fontColor={"#FFFFFF"}
              onClick={onClickStart}
            />
            <BtnPanel
              title={"불러오기"}
              height={"70px"}
              width={"48%"}
              color={"#FFFFFF"}
              fontSize={"26px"}
              fontColor={"#1491CE"}
              onClick={onClickLoad}
            />
          </S.ButtonBox>
        ) : (
          <S.ButtonBox>
            <BtnPanel
              title={"작업취소"}
              height={"70px"}
              width={"30%"}
              color={"#DD3640"}
              fontSize={"26px"}
              fontColor={"#FFFFFF"}
              onClick={onClickDelete}
            />
            <BtnPanel
              title={"작업보류"}
              height={"70px"}
              width={"30%"}
              color={"#555555"}
              fontSize={"26px"}
              fontColor={"#FFFFFF"}
              onClick={onClickHold}
            />
            <BtnPanel
              title={"작업종료"}
              height={"70px"}
              width={"30%"}
              color={"#1491CE"}
              fontSize={"26px"}
              fontColor={"#FFFFFF"}
              onClick={onClickEnd}
            />
          </S.ButtonBox>
        )}

        <S.DataInterfaceBox>
          {isLockScale === false ? (
            <>
              <S.DataInterfaceWrap>
                <InputPaper
                  width={"470px"}
                  height={"60px"}
                  id={"inputLot"}
                  name={"투입LOT"}
                  nameColor={"black"}
                  nameSize={"20px"}
                  namePositionTop={"-30px"}
                  placeHolder={"바코드 혹은 투입LOT를 입력하시려면 클릭하세요."}
                  size={"20px"}
                  onClickReadOnly={() => setIsBarcodeScanOpen(true)}
                  value={scaleInfo.inputLot}
                  onChange={handleChange}
                />
                <InputPaper
                  width={"230px"}
                  height={"60px"}
                  id={"before"}
                  name={"소분 전"}
                  nameColor={"black"}
                  nameSize={"20px"}
                  namePositionTop={"-30px"}
                  value={scaleInfo.before}
                  onTextChange={handleChange}
                  readOnly={false}
                />
                <InputPaper
                  width={"230px"}
                  height={"60px"}
                  id={"after"}
                  name={"소분 후"}
                  nameColor={"black"}
                  nameSize={"20px"}
                  namePositionTop={"-30px"}
                  value={scaleInfo.after}
                  onTextChange={handleChange}
                  readOnly={false}
                />
              </S.DataInterfaceWrap>
              <S.MadeButtonWrap>
                <S.ButtonBox>
                  <BtnPanel
                    title={"소분 전 무게"}
                    height={"70px"}
                    width={"50%"}
                    color={"#FFFFFF"}
                    fontSize={"26px"}
                    fontColor={"#1491CE"}
                    bordercolor={"#1491CE"}
                    onClick={onClickBefore}
                  />
                  <BtnPanel
                    title={"소분 후 무게"}
                    height={"70px"}
                    width={"50%"}
                    color={"#FFFFFF"}
                    fontSize={"26px"}
                    fontColor={"#1491CE"}
                    bordercolor={"#1491CE"}
                    onClick={onClickAfter}
                  />
                </S.ButtonBox>
                <S.ButtonBox>
                  <BtnPanel
                    title={"다음"}
                    height={"70px"}
                    width={"100%"}
                    color={"#1491CE"}
                    fontSize={"26px"}
                    fontColor={"#FFFFFF"}
                    onClick={onClickNext}
                  />
                </S.ButtonBox>
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
        <S.DataHandleBox>
          <GridPanel
            data={gridDataHeader}
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeadersNum}
            refGrid={refGridSingle}
          />
        </S.DataHandleBox>
      </S.ContentsRight>
      {isBarcodeScanOpen ? (
        <BarcodeScan width={"700px"} height={"300px"} onClose={() => setIsBarcodeScanOpen(false)} />
      ) : null}
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
          width={"60%"}
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
          setIsSnackOpen={setIsSnackOpen}
          isSnackOpen={isSnackOpen}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
      {isDelete ? (
        <NoticeAlertModal
          textContent={"모든 작업을 취소하고 삭제하시겠습니까?"}
          textfontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancle={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDelete(false);
          }}
        />
      ) : null}
      {isHold ? (
        <NoticeAlertModal
          textContent={"모든 작업을 보류시키겠습니까?"}
          textfontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isConfirm={true}
          isCancle={true}
          cancelColor={"#DD3640"}
          onConfirm={handleHold}
          onCancel={() => {
            setIsHold(false);
          }}
        />
      ) : null}
      {isEnd ? (
        <NoticeAlertModal
          textContent={"모든 작업을 완료하고 마감하시겠습니까?"}
          textfontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isConfirm={true}
          cancelColor={"#DD3640"}
          isCancle={true}
          onConfirm={handleEnd}
          onCancel={() => {
            setIsEnd(false);
          }}
        />
      ) : null}
      {isWarning.open ? (
        <NoticeAlertModal
          textContent={isWarning.message}
          textfontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isConfirm={true}
          onConfirm={() => {
            setIsWarning(false);
          }}
        />
      ) : null}
    </ContentsArea>
  );
}

export default SubdivisionPanel;
