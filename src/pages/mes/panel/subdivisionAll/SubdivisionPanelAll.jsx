import { useContext, useState, useEffect, useRef, useMemo } from "react";

import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import SubdivisionPanelAllSet from "./SubdivisionPanelAllSet";
//import BtnSubdivisionSL from "components/button/panel/BtnSubdivisionSL";
import InputPaper from "components/input/InputPaper";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./SubdivisionPanelAll.styled";
import restAPI from "api/restAPI";
import ModalSubdivision from "./ModalSubdivision";
import GridPanel from "components/grid/GridPanel";
import ContentsArea from "components/layout/common/ContentsArea";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import BtnPanel from "components/button/BtnPanel";
import BarcodeScan from "./BarcodeScan";
import SubdivisionBarcodePrint from "components/printer/barcode/subdivisionBarcodePrint";

function SubdivisionPanelAll() {
  const { isMenuSlide } = useContext(LayoutContext);

  const prodID = useRef("");
  const prodCD = useRef("");
  const prodNM = useRef("");
  const date = useRef("");
  const lot = useRef("");
  const workSubdivisionID = useRef("");

  const [totalQty, setTotalQty] = useState("");

  const [scaleInfo, setScaleInfo] = useState({
    createBarcode: "",
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
  } = SubdivisionPanelAllSet(onClickGridButton);

  const refGridSingle = useRef(null);
  const refGridSelect = useRef(null);
  const refGridSelectDetail = useRef(null);

  const refBtnNext = useRef(null);
  const componentRef = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [gridDataSelectDetail, setGridDataSelectDetail] = useState(null);

  const [barcodeScan, setBarcodeScan] = useState({});
  const [barcodePrintInfo, setBarcodePrintInfo] = useState({});

  const [isLotChk, setIsLotChk] = useState(false);

  const refBarcodeScan = useRef(null);
  const refBarcodeTimeStamp = useRef(null);

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
    prodNM.current = "";
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
    restURI.product + `?use_fg=true`
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
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridSingle?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickGridSelect = (e) => {
    if (e?.targetType === "cell") {
      const Header = refGridSelect?.current?.gridInst;
      const rowID = Header.getValue(e?.rowKey, "work_subdivision_id");
      const params = `?work_subdivision_id=${rowID}`;
      if (rowID !== workSubdivisionID.current && rowID !== null) {
        prodID.current = Header.getValue(e?.rowKey, "prod_id");
        prodCD.current = Header.getValue(e?.rowKey, "prod_cd");
        prodNM.current = Header.getValue(e?.rowKey, "prod_nm");
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
      prodNM.current = data.prod_nm;
      date.current = DateTime().dateFull;
      setTotalQty("0");
      lot.current = "";
      workSubdivisionID.current = "";
      setIsModalSelectOpen(false);
    }
  };

  async function onClickGridButton(e, rowKey) {
    if (workSubdivisionID.current) {
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
  }
  const onGetWorkSubdivisionID = async () => {
    if (!workSubdivisionID.current) {
      let obj = [];
      obj.push({
        // prod_id: prodID.current,
        subdivision_date: date.current,
      });
      try {
        const result = await restAPI.post(restURI.subdivisions, obj);
        workSubdivisionID.current = result?.data?.data?.rows[0]?.work_subdivision_id;
        setIsLockScale(false);
        setTotalQty("0");
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
  };
  const onClickStart = () => {
    if (prodID.current === "") {
      setIsBarcodeScanOpen(true);
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
    const Grid = refGridSingle?.current?.gridInst;
    if (Grid.getRowCount() > 0) {
      setIsEnd(true);
    }
  };
  const handleEnd = async () => {
    try {
      const result = await restAPI.patch(restURI.subdivision + `/${workSubdivisionID.current}/complete`);
      const headerLot = result?.data?.data?.rows[0].lot_no;
      const referenceID = result?.data?.data?.rows[0].work_subdivision_id;
      const date = result?.data?.data?.rows[0].subdivision_date;
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });

      try {
        const result = await restAPI.post(restURI.createBarcode, {
          barcode_type: "SUBDIVISION",
          reference_id: referenceID,
        });

        setBarcodePrintInfo({
          ...barcodePrintInfo,
          prodCD: prodCD.current,
          prodNM: prodNM.current,
          lot: headerLot,
          qty: String(totalQty),
          date: date,
          createBarcode: result?.data?.data?.rows[0].barcode_no,
        });

        resetRequire();
        resetScaleInfo();
        setIsLockScale(true);
        setIsEnd(false);

        setTimeout(() => {
          handlePrint();
        }, 100);
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
  };
  const handleLotChk = () => {
    date.current = DateTime().dateFull;
    lot.current = scaleInfo.lotNo;
    onGetWorkSubdivisionID();
    setScaleInfo({ ...scaleInfo, inputLot: scaleInfo.lotNo });
    onCloseBarcodeScan();
    if (isLockScale === true) {
      setIsLockScale(false);
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
  const onClickBefore = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.opcWeight + `?proc=SUBDIVISION`);
      const data = result?.data?.data?.rows[0];
      setScaleInfo({ ...scaleInfo, inputLot: lot.current, before: String(data.value) });
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
  const onClickAfter = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.opcWeight + `?proc=SUBDIVISION`);
      const data = result?.data?.data?.rows[0];
      const leaveBag = result?.data?.data?.rows[1].value;
      setScaleInfo({ ...scaleInfo, after: String(data.value) });
      setTotalQty(String(leaveBag));
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

  const onClickNext = async () => {
    if (Number(scaleInfo.before) > Number(scaleInfo.after)) {
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
          const referenceID = result?.data?.data?.rows[0].work_subdivision_detail_id;
          try {
            setIsBackDrop(true);
            const result = await restAPI.get(restURI.opcWeight + `?proc=SUBDIVISION`);
            const data = result?.data?.data?.rows[1].value;
            setTotalQty(data);
          } catch (err) {
          } finally {
            setIsBackDrop(false);
          }
          try {
            const result = await restAPI.post(restURI.createBarcode, {
              barcode_type: "SUBDIVISION_DETAIL",
              reference_id: referenceID,
            });

            setBarcodePrintInfo({
              ...barcodePrintInfo,
              prodCD: prodCD.current,
              prodNM: prodNM.current,
              lot: lot.current,
              qty: String(scaleInfo.after),
              date: date.current,
              createBarcode: result?.data?.data?.rows[0].barcode_no,
            });
          } catch (err) {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: err?.response?.data?.message,
              severity: "error",
              location: "bottomRight",
            });
            return;
          }

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
            const resultData = result?.data?.data?.rows;
            setGridDataHeader(resultData);
            resetScaleInfo();
            // let totalQty = 0;
            // for (let i = 0; resultData.length > i; i++) {
            //   totalQty = totalQty + resultData[i].subdivision_qty;
            // }
            // setTotalQty(totalQty);
            setIsBarcodeScanOpen(true);
            refBtnNext?.current?.blur();

            handlePrint();
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
  };
  const handleChange = (e) => {
    setScaleInfo({ ...scaleInfo, [e.target.id]: e.target.value });
  };
  const handleChangeTotal = (e) => {
    setTotalQty(e.target.value);
  };

  const onCloseBarcodeScan = () => {
    setBarcodeScan({});
    setIsBarcodeScanOpen(false);
  };

  //🔸timeStamp 2개를 받아서 서로 몇 초 차이 나는지 구하는 함수
  function getTimeDifferenceInSeconds(timeStamp1, timeStamp2) {
    if (timeStamp1 === null) return 0;
    const difference = Math.abs(timeStamp1 - timeStamp2);
    const seconds = difference / 1000;
    return seconds;
  }

  const transferBarcode = async (lotNo) => {
    try {
      setIsBackDrop(true);
      // const result = await restAPI.get(restURI.barcodeERP + `?lot_no=${lotNo}`);
      // const data = result?.data?.data?.rows[0];
      // if (prodID.current === data.prod_id || prodID.current === "") {
      //시작된 ID와 비교해서 같은 경우만 입력
      // prodID.current = data.prod_id;
      // prodCD.current = data.prod_cd;
      // prodNM.current = data.prod_nm;
      date.current = DateTime().dateFull;
      lot.current = lotNo;
      onGetWorkSubdivisionID();
      onCloseBarcodeScan();
      setScaleInfo({ ...scaleInfo, inputLot: lotNo });
      onClickBefore(); //소분 전 무게 자동으로 가져옴
      if (isLockScale === true) {
        setIsLockScale(false);
      }
      // } else {
      // setBarcodeScan({ ...barcodeScan, value: "현재 진행중인 작업과 다른 품목입니다.", lot: "", className: "red" });
      // }
    } catch (err) {
      // setBarcodeScan({ ...barcodeScan, value: err?.response?.data?.message, lot: "", className: "red" });
      // setIsLotChk(true);
    } finally {
      setIsBackDrop(false);
    }
  };

  const onLotConfirm = () => {
    if (barcodeScan.lot !== "") {
      transferBarcode(barcodeScan.lot);
    }
  };
  const barcodeNo = useRef("");
  useEffect(() => {
    const onBarcodeScan = (e) => {
      //timeStamp 가 서로 몇초 차이인지 구함
      const differenceTime = getTimeDifferenceInSeconds(refBarcodeTimeStamp.current, e?.timeStamp);
      //차이 시간이 0.03초 이상이라면 저장되어 있던 값을 초기화
      //바코드 스캐너로 입력되는 문자들은 입력 사이가 0.005초 전후 이기 때문
      if (differenceTime > 0.03) {
        barcodeNo.current = "";
      }

      // e?.key 가 "Process"는 한글인 경우
      if (e?.key === "Process") {
        // e?.key 가 "Process" 이면서 e?.code 가 "Digit" 숫자로 들어오는 경우가 있는데 무시해야 함
        if (e?.code.includes("Key")) {
          barcodeNo.current = barcodeNo.current + e?.code.replace("Key", "");
        }
        // e?.key 가 "Shift" 인 경우 1차적으로 모두 무시
      } else if (e?.key !== "Shift") {
        // Digit, Key, Minus 외의 값들은 전부 무시
        if (e?.code.includes("Digit")) {
          barcodeNo.current = barcodeNo.current + e?.code.replace("Digit", "");
        }
        if (e?.code.includes("Key")) {
          barcodeNo.current = barcodeNo.current + e?.code.replace("Key", "");
        }
        if (e?.code.includes("Minus")) {
          barcodeNo.current = barcodeNo.current + e?.key;
        }
      }

      refBarcodeTimeStamp.current = e?.timeStamp;
      if (e?.key === "Enter") {
        setBarcodeScan({ ...barcodeScan, value: barcodeNo.current, className: "" });
        /**
         * ✅ SQM LITHIUM 바코드
         *    자릿수 : 52
         *    LOT : 20자리부터 30자리 구간
         */
        if (barcodeNo.current.length === 52) {
          const lot = barcodeNo.current.slice(20, 30);
          transferBarcode(lot);
        } else {
          if (barcodeScan.lot) {
            onLotConfirm();
          } else {
            setBarcodeScan({ ...barcodeScan, value: "정의되지 않은 바코드입니다.", lot: "", className: "red" });
          }
        }
        barcodeNo.current = "";
      }
    };
    window.addEventListener("keydown", onBarcodeScan);
    return () => {
      window.removeEventListener("keydown", onBarcodeScan);
    };
  }, [barcodeScan.lot]);

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
    <ContentsArea>
      <S.ContentsEmp>
        <S.EmpTitle>작업자 정보</S.EmpTitle>
        <S.EmpTitle>조명</S.EmpTitle>
        <S.EmpTitle>이름</S.EmpTitle>
      </S.ContentsEmp>
      <S.ContentsMain>
        <S.ContentsLeft>
          <S.ObjectSection>
            <S.ObjectWrap>
              <S.ButtonWrap></S.ButtonWrap>
              <S.SackWrap>
                <S.Sack></S.Sack>
              </S.SackWrap>
            </S.ObjectWrap>
            <S.ObjectWrap></S.ObjectWrap>
          </S.ObjectSection>
          <S.ObjectSection className={"objectBottom"}>
            <S.ObjectWrap></S.ObjectWrap>
          </S.ObjectSection>
        </S.ContentsLeft>
        <S.ContentsRight></S.ContentsRight>
      </S.ContentsMain>
      {isBarcodeScanOpen && (
        <BarcodeScan
          width={"1300px"}
          height={"700px"}
          onClose={onCloseBarcodeScan}
          onLotConfirm={onLotConfirm}
          setBarcodeScan={setBarcodeScan}
          barcodeScan={barcodeScan}
        />
      )}
      {isModalSelectOpen && (
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
      )}
      {isModalSubdivisionOpen && (
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
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
      {isDelete && (
        <NoticeAlertModal
          textContent={"모든 작업을 취소하고 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDelete(false);
          }}
        />
      )}
      {isWarning.open && (
        <NoticeAlertModal
          textContent={isWarning.message}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isConfirm={true}
          onConfirm={() => {
            setIsWarning(false);
          }}
        />
      )}
      {/* {BarcodePrint} */}
    </ContentsArea>
  );
}

export default SubdivisionPanelAll;
