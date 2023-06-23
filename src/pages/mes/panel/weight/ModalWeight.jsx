import React, { useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalWeight.styled";
import InputPaper from "components/input/InputPaper";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import DateTime from "components/datetime/DateTime";
import InputText from "components/input/InputText";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import BarcodeScan from "./BarcodeScan";

function ModalWeight(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
    onClickWeightSave = () => {},
    onEditingFinishWeight = () => {},
    refGridWeight = null,
    columnsWeight = [],
    columnOptions = [],
    header = [],
    rowHeadersDetail = [],
    gridDataWeight = [],
    selectInputInfo = {},
    // lineNM = "",
    // empNM = "",
  } = props;
  const { currentMenuName } = useContext(LayoutContext);
  const [inputChange, setInputChange] = useState();

  const [barcodeScan, setBarcodeScan] = useState({});
  const [isBarcodeScanOpen, setIsBarcodeScanOpen] = useState(false);
  const onClickReadOnly = () => {
    setIsBarcodeScanOpen(true);
  };

  const onCloseBarcodeScan = () => {
    setBarcodeScan({});
    setIsBarcodeScanOpen(false);
  };

  const handleInputChange = (e) => {
    setInputChange(e.target.value);
  };
  const handleBarcodeEnter = async (e) => {
    if (e.key === "Enter") {
      // let uri;
      // try {
      //   if (inputChange === undefined) {
      //     uri = restURI.subdivision + `?complete_fg=INCOMPLETE`;
      //   } else {
      //     if (inputChange.length === 0) {
      //       uri = restURI.subdivision + `?complete_fg=INCOMPLETE`;
      //     } else {
      //       uri =
      //         restURI.subdivision +
      //         `?complete_fg=INCOMPLETE&prod_cd=${inputChange}`;
      //     }
      //   }
      //   const result = await restAPI.get(uri);
      //   setGridDataHeader(result?.data?.data?.rows);
      // } catch (err) {
      //   alert(err);
      // }
    }
  };

  /**바코드 스캔 영역 시작 */

  const onLotConfirm = () => {
    if (barcodeScan.lot !== "") {
      transferBarcode(barcodeScan.lot);
    }
  };

  const transferBarcodeSubdivision = async (barcode) => {
    const result = await restAPI.get(
      restURI.createBarcode + `?barcode_no=${barcode}`
    );
    const data = result?.data?.data?.rows[0];

    inputLotNo(data.lot_no, data.prod_id);
  };
  const inputLotNo = (lotNo, prodCode) => {
    let modalGridDataLength =
      refGridWeight?.current?.gridInst?.store?.data?.rawData.length;
    const modalData = refGridWeight?.current?.gridInst?.store?.data?.rawData;
    let counter = 0;
    for (let i = 0; i < modalGridDataLength; i++) {
      if (prodCode === modalData[i].prod_id) {
        refGridWeight?.current?.gridInst.setValue(i, "lot_no", lotNo);
        counter = counter + 1;
        onCloseBarcodeScan();
      }
    }
    if (counter === 0) {
      setBarcodeScan({
        ...barcodeScan,
        value: "현재 진행중인 작업과 다른 품목입니다.",
        lot: "",
        className: "red",
      });
    }
  };

  const transferBarcode = async (lotNo) => {
    try {
      const result = await restAPI.get(restURI.barcodeERP + `?lot_no=${lotNo}`);
      const data = result?.data?.data?.rows[0];
      inputLotNo(lotNo, data.prod_id);

      //const data = result?.data?.data?.rows[0];
      /*
    if (prodID.current === data.prod_id || prodID.current === "") {
      //시작된 ID와 비교해서 같은 경우만 입력
      prodID.current = data.prod_id;
      prodCD.current = data.prod_cd;
      prodNM.current = data.prod_nm;
      date.current = DateTime().dateFull;
      lot.current = lotNo;
      onGetWorkSubdivisionID();
      setScaleInfo({ ...scaleInfo, inputLot: lotNo });

      onCloseBarcodeScan();
      if (isLockScale === true) {
        setIsLockScale(false);
      }
    } else {
      setBarcodeScan({
        ...barcodeScan,
        value: "현재 진행중인 작업과 다른 품목입니다.",
        lot: "",
        className: "red",
      });
    }
    */
    } catch (err) {
      setBarcodeScan({
        ...barcodeScan,
        value: err?.response?.data?.message,
        lot: "",
        className: "red",
      });
    } finally {
    }
  };
  function getTimeDifferenceInSeconds(timeStamp1, timeStamp2) {
    if (timeStamp1 === null) return 0;
    const difference = Math.abs(timeStamp1 - timeStamp2);
    const seconds = difference / 1000;
    return seconds;
  }
  const refBarcodeTimeStamp = useRef(null);
  const barcodeNo = useRef("");
  useEffect(() => {
    const onBarcodeScan = (e) => {
      //timeStamp 가 서로 몇초 차이인지 구함
      const differenceTime = getTimeDifferenceInSeconds(
        refBarcodeTimeStamp.current,
        e?.timeStamp
      );
      //차이 시간이 0.01초 이상이라면 저장되어 있던 값을 초기화
      //바코드 스캐너로 입력되는 문자들은 입력 사이가 0.005초 전후 이기 때문
      if (differenceTime > 0.01) {
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
        if (e?.code.includes("Slash")) {
          barcodeNo.current = barcodeNo.current + e?.code.replace("Slash", "/");
        }
      }

      refBarcodeTimeStamp.current = e?.timeStamp;
      if (e?.key === "Enter") {
        setBarcodeScan({
          ...barcodeScan,
          value: barcodeNo.current,
          className: "",
        });
        /**
         * ✅ SQM LITHIUM 바코드
         *    자릿수 : 52
         *    LOT : 20자리부터 30자리 구간
         */
        barcodeFunctions();
        barcodeNo.current = "";
      }
    };

    window.addEventListener("keydown", onBarcodeScan);
    return () => {
      window.removeEventListener("keydown", onBarcodeScan);
    };
  }, [barcodeScan.lot]);
  /**바코드 스캔 영역 종료 */

  const barcodeFunctions = () => {
    if (barcodeNo.current.length === 52) {
      const lot = barcodeNo.current.slice(20, 30);
      transferBarcode(lot);
    } else if (barcodeNo.current.slice(0, 3) === "FDR") {
      transferBarcodeSubdivision(barcodeNo.current);
    } else {
      if (barcodeScan.lot) {
        if (barcodeScan.lot.slice(-3) === "/SD") {
          transferLotNoSubdivision(barcodeScan.lot);
        } else {
          onLotConfirm();
        }
      } else {
        setBarcodeScan({
          ...barcodeScan,
          value: "정의되지 않은 바코드입니다.",
          lot: "",
          className: "red",
        });
      }
    }
  };

  //KeyIn한 LotNo를 조회하는 함수
  const transferLotNoSubdivision = async (lotNo) => {
    const result = await restAPI.get(
      restURI.createBarcode + `?lot_no=${lotNo}`
    );
    const data = result?.data?.data?.rows[0];
    inputLotNo(data.lot_no, data.prod_id);
  };

  return (
    <S.ModalWrapBox width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>${currentMenuName}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Content>
        <S.GridTitleBox>
          <S.TitleWrap>일일계량일지</S.TitleWrap>
          <BtnComponent
            width={"150px"}
            height={"40px"}
            btnName={"Save"}
            onClick={onClickWeightSave}
          />
        </S.GridTitleBox>
        <S.InfoBox>
          <S.InfoTitle>라인</S.InfoTitle>
          <InputPaper
            width={"150px"}
            height={"60px"}
            nameColor={"black"}
            value={selectInputInfo.lineNM}
            size={"30px"}
            btn={false}
          />
          <S.InfoTitle>계량일자</S.InfoTitle>
          <InputPaper
            width={"200px"}
            height={"60px"}
            nameColor={"black"}
            value={DateTime().dateFull}
            size={"30px"}
            btn={false}
          />
          <S.InfoTitle>계량자</S.InfoTitle>
          <InputPaper
            width={"250px"}
            height={"60px"}
            nameColor={"black"}
            value={selectInputInfo.empNM}
            size={"30px"}
            btn={true}
            onClickSelect={onClickSelect}
            onClickRemove={onClickRemove}
          />
          <S.InfoTitle>바코드</S.InfoTitle>
          <InputPaper
            id={"barcode"}
            width={"640px"}
            height={"60px"}
            placeHolder={"바코드 혹은 투입LOT 수기입력은 여기를 클릭하세요"}
            nameColor={"black"}
            value={inputChange}
            size={"25px"}
            btn={false}
            handleEnter={handleBarcodeEnter}
            onClickReadOnly={onClickReadOnly}
            onChange={handleInputChange}
          />
        </S.InfoBox>
        <S.GridBox>
          <GridModal
            data={gridDataWeight}
            columns={columnsWeight}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersDetail}
            refGrid={refGridWeight}
            draggable={false}
            onEditingFinish={onEditingFinishWeight}
          />
        </S.GridBox>
      </S.Content>
      {isBarcodeScanOpen && (
        <BarcodeScan
          refGridWeight={refGridWeight}
          width={"900px"}
          height={"200px"}
          onClose={onCloseBarcodeScan}
          onLotConfirm={barcodeFunctions}
          setBarcodeScan={setBarcodeScan}
          barcodeScan={barcodeScan}
        />
      )}
    </S.ModalWrapBox>
  );
}

export default ModalWeight;
