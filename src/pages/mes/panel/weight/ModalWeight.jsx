import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalWeight.styled";
import InputPaper from "components/input/InputPaper";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import DateTime from "components/datetime/DateTime";
import BtnComponent from "components/button/BtnComponent";
import BarcodeScan from "./BarcodeScan";
import WeightPanelSet from "./WeightPanelSet";

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
    columnOptions = [],
    header = [],
    rowHeadersDetail = [],
    gridDataWeight = [],
    selectInputInfo = {},
    // lineNM = "",
    // empNM = "",
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const { columnsWeight } = WeightPanelSet(onClickGridButton, onBarcodeScanButton);

  const [inputChange, setInputChange] = useState();

  const [barcodeScan, setBarcodeScan] = useState({});
  const [isBarcodeScanOpen, setIsBarcodeScanOpen] = useState(false);

  const targetRowKey = useRef("");
  const tagID = useRef("");
  const weight = useRef(1);
  const constantValue = useRef(0);

  const onClickReadOnly = () => {
    setIsBarcodeScanOpen(true);
  };

  const onCloseBarcodeScan = () => {
    targetRowKey.current = "";
    tagID.current = "";
    weight.current = 1;
    constantValue.current = 0;
    setBarcodeScan({});
    setIsBarcodeScanOpen(false);
  };
  function onClickGridButton() {}
  function onBarcodeScanButton(rowKey) {
    const Grid = refGridWeight?.current?.gridInst;
    targetRowKey.current = rowKey;
    tagID.current = Grid.getValue(rowKey, "tag_id");
    weight.current = Grid.getValue(rowKey, "weight");
    constantValue.current = Grid.getValue(rowKey, "constant_value");
    setIsBarcodeScanOpen(true);
  }

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
    const result = await restAPI.get(restURI.createBarcode + `?barcode_no=${barcode}`);
    const data = result?.data?.data?.rows[0];

    inputLotNo(data.lot_no, data.prod_id);
  };
  const inputLotNo = (lotNo, prodCode) => {
    let modalGridDataLength = refGridWeight?.current?.gridInst?.store?.data?.rawData.length;
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
      const differenceTime = getTimeDifferenceInSeconds(refBarcodeTimeStamp.current, e?.timeStamp);
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
        console.log(barcodeNo.current);
        setBarcodeScan({
          ...barcodeScan,
          value: barcodeNo.current,
          className: "",
        });

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

  const barcodeFunctions = async () => {
    if (barcodeNo.current.length === 52) {
      /**
       * ✅ SQM LITHIUM 바코드
       *    자릿수 : 52
       *    LOT : 20자리부터 30자리 구간
       */
      const lot = barcodeNo.current.slice(20, 30);

      barcodeOnGrid(lot);
    } else if (barcodeNo.current.slice(0, 3) === "FDR") {
      // transferBarcodeSubdivision(barcodeNo.current);
      try {
        const result = await restAPI.get(restURI.createBarcode + `?barcode_no=${barcodeNo.current}`);
        if (result?.data?.data?.rows.length === 0) {
          setBarcodeScan({
            ...barcodeScan,
            value: "데이터가 삭제 된 바코드입니다.",
            lot: "",
            className: "red",
          });
        } else {
          const data = result?.data?.data?.rows[0];
          barcodeOnGrid(data.lot_no);
        }
      } catch (err) {
        setBarcodeScan({
          ...barcodeScan,
          value: err?.response?.data?.message,
          lot: "",
          className: "red",
        });
      }
    } else {
      setBarcodeScan({
        ...barcodeScan,
        value: "정의되지 않은 바코드입니다.",
        lot: "",
        className: "red",
      });
    }
  };

  const barcodeOnGrid = (lot) => {
    const Grid = refGridWeight?.current?.gridInst;
    Grid.setValue(targetRowKey.current, "lot_no", lot);
    getWeight();
  };

  const getWeight = async () => {
    try {
      if (tagID.current) {
        const result = await restAPI.get(
          restURI.opcWeight +
            `?tag_id=${tagID.current}&weight=${weight.current}&constant_value=${constantValue.current}`
        );
        const data = result?.data?.data?.rows[0];
        const Grid = refGridWeight?.current?.gridInst;
        Grid.setValue(targetRowKey.current, "total_qty", data.value);
      }
      onCloseBarcodeScan();
    } catch (err) {
      setBarcodeScan({
        ...barcodeScan,
        value: err?.response?.data?.message,
        lot: "",
        className: "red",
      });
    }
  };

  const GridMain = useMemo(() => {
    return (
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
    );
  }, [gridDataWeight]);

  return (
    <S.ModalWrapBox width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>${currentMenuName}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Content>
        <S.GridTitleBox>
          <S.TitleWrap>일일계량일지</S.TitleWrap>
          <BtnComponent width={"150px"} height={"40px"} btnName={"Save"} onClick={onClickWeightSave} />
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
          {/* <S.InfoTitle>바코드</S.InfoTitle>
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
          /> */}
        </S.InfoBox>
        <S.GridBox>{GridMain}</S.GridBox>
      </S.Content>
      {isBarcodeScanOpen && (
        <BarcodeScan
          width={"900px"}
          height={"200px"}
          onClose={onCloseBarcodeScan}
          setBarcodeScan={setBarcodeScan}
          barcodeScan={barcodeScan}
        />
      )}
    </S.ModalWrapBox>
  );
}

export default ModalWeight;
