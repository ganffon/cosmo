import { LoginStateChk } from "custom/LoginStateChk";
import * as S from "./subdivisionGround.styled";
import { TextField } from "@mui/material";
import * as Cbo from "custom/useCboSet";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { subdivisionGroundSet } from "./subdivisionGroundSet";
import useInputSet from "custom/useInputSet";
import { LayoutContext } from "components/layout/common/Layout";
import NoticeSnack from "components/alert/NoticeSnack";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import GetPostParams from "../../../../api/GetPostParams";
import restAPI from "../../../../api/restAPI";
import BackDrop from "../../../../components/backdrop/BackDrop";
import GridSingle from "../../../../components/grid/GridSingle";
import DateTime from "../../../../components/datetime/DateTime";
import SubdivisionBarcodePrint from "../../../../components/printer/barcode/subdivisionBarcodePrint";
import restURI from "../../../../json/restURI.json";

export function SubdivisionGround() {
  LoginStateChk();
  const [selectedWorkerGroup, setSelectedWorkerGroup] = useState(null);
  const [comboValue, setComboValue] = useState({
    workGroupKey: "",
  });
  const [comboValueProd, setComboValueProd] = useState({
    productId: "",
  });

  const [selectedLotNo, setSelectedLotNo] = useState("");
  const [selectedLotNoWeight, setSelectedLotNoWeight] = useState("");
  const [selectedRemark, setSelectedRemark] = useState("");
  const [selectedProd, setSelectedProd] = useState(null);
  const [barcodePrintInfo, setBarcodePrintInfo] = useState({});

  const [weightHeaderUID, setWeightHeaderUID] = useState(null);
  const [weightDetailUID, setWeightDetailUID] = useState(null);
  const [rightWeightHeaderUID, setRightWeightHeaderUID] = useState(null);
  const [weightGroundData, setWeightGroundData] = useState(null);
  const [weightData, setWeightData] = useState(null);
  //화면 변환 Flag
  const [screenFlag, setScreenFlag] = useState(true);
  //Bag Flag
  const [bagFlag, setBagFlag] = useState(true);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const componentRef = useRef(null);

  /*이어하기 버튼 함수*/
  const continueFunction = (e, rowKey) => {
    const dataInst = refCommonGrid?.current?.gridInst?.store?.data?.rawData;
    const lotNo = dataInst[rowKey].lot_no;
    const subdivisionId = dataInst[rowKey].work_subdivision_id;
    const workGrouptmp = dataInst[rowKey].worker_group_nm;
    const remarkTmp = dataInst[rowKey].remark;
    const prodId = dataInst[rowKey].prod_id;
    const prodName = dataInst[rowKey].prod_nm;
    setSelectedWorkerGroup({ ...selectedWorkerGroup, text: workGrouptmp, value: workGrouptmp });
    setSelectedProd({ ...selectedProd, prod_nm: prodName, prod_id: prodId });
    setComboValue({ ...comboValue, workGroupKey: workGrouptmp });
    setComboValueProd({ ...comboValueProd, productId: prodId });
    /*LotNo 입력하기*/
    setSelectedLotNo(lotNo);
    setWeightHeaderUID(subdivisionId);
    getSubdivisionDataWeight(subdivisionId);

    /*비고입력하기*/
    // setInputTextChange({ ...inputTextChange, remark: remarkTmp });
    setSelectedRemark(remarkTmp);
    /*비고입력하기 끝*/
    setInputLotTextChange({ ...inputLotTextChange, LotNo: lotNo });
    if (screenFlag === true) {
      setBagFlag(false);
    } else {
      setRightWeightHeaderUID(subdivisionId);
      setWeightRightBagFlag(false);
    }
  };
  /*이어하기 버튼 함수 끝*/

  /* 재출력 버튼 함수 시작 */

  const printBarcode = async (e, rowKey) => {
    const dataInst = refCommonGrid?.current?.gridInst?.store?.data?.rawData;
    const result = await restAPI.post(restURI.createBarcode, {
      barcode_type: "SUBDIVISION",
      reference_id: dataInst[rowKey].work_subdivision_id,
    });
    setBarcodePrintInfo({
      ...barcodePrintInfo,
      prodCD: dataInst[rowKey].prod_cd,
      prodNM: dataInst[rowKey].prod_nm,
      lot: dataInst[rowKey].lot_no,
      qty: dataInst[rowKey].total_qty,
      date: dataInst[rowKey].subdivision_date,
      createBarcode: result?.data?.data?.rows[0].barcode_no,
    });
    setTimeout(() => handlePrint(), 500);
  };
  /* 재출력 버튼 함수 종료 */

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

  const { data, rowHeaders, rowHeadersModal, gridCol, commonGridCol, inputSet } = subdivisionGroundSet(printBarcode);

  const { currentMenuName } = useContext(LayoutContext);
  const [gridData, setGridData] = useState(null);
  // const totalWeight = useRef(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [nowWeight, setNowWeight] = useState(0);

  const [inputLotTextChange, setInputLotTextChange] = useState(null);

  //삭제 Alert 상태변수
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  //Bag내리기 Alert 상태변수
  const [isBagDownAlertOpen, setIsBagDownAlertOpen] = useState(false);
  const [isWorkChangeAlertOpen, setIsWorkChangeAlertOpen] = useState(false);
  const [isWorkChangeToGroundAlertOpen, setIsWorkChangeToGroundAlertOpen] = useState(false);
  //안쪽 그리드 ref
  const refInnerGrid = useRef(null);
  //안쪽 그리드 ref
  const refInnerWeightGrid = useRef(null);
  //공통 그리드 ref
  const refCommonGrid = useRef(null);

  /*좌우저울 사용시 BagFlag*/
  const [weightLeftBagFlag, setWeightLeftBagFlag] = useState(true);
  const [weightRightBagFlag, setWeightRightBagFlag] = useState(true);

  //토스트메시지
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  /*헤더 관련 코드 시작*/
  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);
  //작업조 하드코딩
  const workGroup = [
    {
      text: `A조`,
      value: `A조`,
    },
    {
      text: `B조`,
      value: `B조`,
    },
    {
      text: `C조`,
      value: `C조`,
    },
    {
      text: `D조`,
      value: `D조`,
    },
  ];

  //제품 List
  const [productOpt, productList] = Cbo.useProd();
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, remark: e.target.value });
    setSelectedRemark(e.target.value);
  };

  /*헤더 관련 코드 끝*/

  //Lot번호 관리

  const handleLotTextChange = (e) => {
    setInputLotTextChange({ ...inputLotTextChange, LotNo: e.target.value });
    setSelectedLotNo(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // onClickSearch();
    }
  };

  const changeGroundWork = () => {
    if (screenFlag === false) {
      setScreenFlag(true);
      setBagFlag(true);
      setSelectedLotNo("");
      setWeightGroundData(null);
      setTotalWeight(0);
      setWeightHeaderUID(null);
    }
    setIsWorkChangeAlertOpen(false);
  };
  const changeWeightWork = () => {
    if (screenFlag === true) {
      setScreenFlag(false);
      setWeightLeftBagFlag(true);
      setSelectedLotNoWeight("");
      setNowWeight(0);
      setWeightRightBagFlag(true);
      setWeightData(null);
      setTotalWeight(0);
      setWeightHeaderUID(null);
      setRightWeightHeaderUID(null);
    }
    setIsWorkChangeToGroundAlertOpen(false);
  };
  const searchCommonGrid = async () => {
    const nowDate = DateTime().dateFull;
    const pastDate = DateTime(-7).dateFull;
    const gridData = await restAPI.get(`/prd/subdivision/panel?start_date=${pastDate}&end_date=${nowDate}`);
    setGridData(gridData?.data?.data?.rows);
  };

  const carryingUpBag = async () => {
    let nowDate = new Date();
    let nowDateFull =
      nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 1 < 9 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1) +
      "-" +
      nowDate.getDate();
    const workGroup = comboValue.workGroupKey;
    const prodId = comboValueProd.productId;
    const rawData = comboValue;
    rawData.remark = inputTextChange.remark;
    rawData.prod_id = prodId;
    rawData.subdivision_date = nowDateFull;
    if (
      workGroup !== null &&
      prodId !== null &&
      workGroup !== undefined &&
      prodId !== undefined &&
      workGroup !== "" &&
      prodId !== ""
    ) {
      await actAddNewBag(rawData);
      setBagFlag(false);
      await searchCommonGrid();
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "작업조, 제품은 필수값입니다.",
        severity: "error",
        location: "bottomRight",
      });
    }
  };

  useEffect(() => {
    searchCommonGrid();
    getSubdivisionDataWeight();
  }, [screenFlag]);

  useEffect(() => {
    onEditingFinishWeightGrid();
  }, [weightGroundData, weightData]);

  const actAddNewBag = async (rawData) => {
    let result = [];
    result.push(rawData);

    const data = result.map((raw) => GetPostParams("subdivisionGround", raw));
    if (data !== undefined) {
      if (data.length !== 0) {
        setIsBackDrop(true);
        await restAPI
          .post("/prd/subdivisions", data)
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.message,
              severity: "success",
            });
            if (weightLeftBagFlag !== true) {
              setRightWeightHeaderUID(res?.data?.data?.rows[0].work_subdivision_id);
            } else {
              setWeightHeaderUID(res?.data?.data?.rows[0].work_subdivision_id);
            }
            //좌측저울의 BagFlag가 false이면 우측저울에 Id를 저장함. 그 외에는 모두 일반적으로 header에 저장함
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.response?.data?.message ?? res?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };

  //Bag내리기 함수
  const carryingDownBag = async () => {
    const weightGridDataLength = refInnerGrid?.current?.gridInst?.store?.data?.rawData.length;

    if (weightGridDataLength > 0) {
      await restAPI
        .patch(`prd/subdivision/${weightHeaderUID}/complete`)
        .then(async (res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
          const result = await restAPI.post(restURI.createBarcode, {
            barcode_type: "SUBDIVISION",
            reference_id: res?.data?.data?.rows[0].work_subdivision_id,
          });
          const productResult = await restAPI.get(`std/prod/${res?.data?.data?.rows[0].prod_id}`);
          setBarcodePrintInfo({
            ...barcodePrintInfo,
            prodCD: productResult?.data?.data?.rows[0].prod_cd,
            prodNM: productResult?.data?.data?.rows[0].prod_nm,
            lot: res?.data?.data?.rows[0].lot_no,
            qty: res?.data?.data?.rows[0].total_qty,
            date: res?.data?.data?.rows[0].subdivision_date,
            createBarcode: result?.data?.data?.rows[0].barcode_no,
          });
          setWeightHeaderUID(res?.data?.data?.rows[0].work_subdivision_id);
          setBagFlag(true);
          setWeightGroundData([]);
          setTimeout(() => handlePrint(), 500);
          searchCommonGrid();
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.response?.data?.message ?? res?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
        });
    } else if (weightGridDataLength === 0) {
      await restAPI
        .delete(`prd/subdivision/${weightHeaderUID}`)
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
          setWeightHeaderUID(res?.data?.data?.rows[0].work_subdivision_id);
          setBagFlag(true);
          setWeightGroundData([]);
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.response?.data?.message ?? res?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
          searchCommonGrid();
        });
    }
    setIsBagDownAlertOpen(false);
  };

  //Bag내리기 Modal 작동함수
  const openBagDownModal = () => {
    setIsBagDownAlertOpen(true);
  };
  const moveMaterialFunction = async (lotNo) => {
    let nowDate = new Date();
    let nowDateFull =
      nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 1 < 9 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1) +
      "-" +
      nowDate.getDate();
    const weightValues = await getWeight();
    const rawData = {};
    // ((nowDate.getHours())<9?"0"+(nowDate.getHours())
    let nowTimeFull =
      (nowDate.getHours() < 9 ? "0" + nowDate.getHours() : nowDate.getHours()) +
      ":" +
      (nowDate.getMinutes() < 9 ? "0" + nowDate.getMinutes() : nowDate.getMinutes()) +
      ":" +
      (nowDate.getSeconds() < 9 ? "0" + nowDate.getSeconds() : nowDate.getSeconds());
    rawData.work_subdivision_id = weightHeaderUID;
    rawData.lot_no = lotNo;
    rawData.qty = Number(weightValues[0].value) - Number(totalWeight);
    rawData.subdivision_date = nowDateFull;
    rawData.subdivision_time = nowTimeFull;
    let result = [];
    result.push(rawData);

    let detailId;

    const data = result.map((raw) => GetPostParams("subdivisionGroundDetail", raw));
    if (data !== undefined) {
      if (data.length !== 0) {
        setIsBackDrop(true);
        const detailResult = await restAPI
          .post("/prd/subdivision-detail", data)
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
              message: res?.response?.data?.message ?? res?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
    await getSubdivisionDataWeight(weightHeaderUID);
    return detailId;
  };

  const getWeight = async () => {
    const gridData = await restAPI.get("/prd/weight/raws?proc=SUBDIVISION");
    return gridData?.data?.data?.rows;
  };

  const getSubdivisionDataWeight = async (subdivisionId) => {
    if (subdivisionId !== null && subdivisionId !== undefined && subdivisionId !== "") {
      const gridData = await restAPI.get(`/prd/subdivision-detail?work_subdivision_id=${subdivisionId}`);
      //지면-> 좌측저울이면 해당 그리드에 저울 두개 쓰면 그에 맞는그리드에 데이터 입력
      if (screenFlag === true) {
        await setWeightGroundData(gridData?.data?.data?.rows);
      } else {
        await setWeightData(gridData?.data?.data?.rows);
      }
    }
  };
  const moveMaterial = async () => {
    if (bagFlag) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "Bag을 먼저 올려주세요!",
        severity: "error",
        location: "bottomRight",
      });
    } else {
      if (inputLotTextChange !== null) {
        if (inputLotTextChange.LotNo !== "") {
          await moveMaterialFunction(inputLotTextChange.LotNo);
          await searchCommonGrid();
        } else {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: "LotNo를 입력해주세요!",
            severity: "error",
            location: "bottomRight",
          });
        }
      } else {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "LotNo를 입력해주세요!",
          severity: "error",
          location: "bottomRight",
        });
      }
    }
  };

  //소분 행 삭제 함수
  const deleteRow = async () => {
    let lastRowKey;
    if (screenFlag === true) {
      lastRowKey = refInnerGrid?.current?.gridInst?.store?.data?.viewData.length - 1;
    } else {
      lastRowKey = refInnerWeightGrid?.current?.gridInst?.store?.data?.viewData.length - 1;
    }
    let deleteId;
    if (screenFlag === true) {
      deleteId = refInnerGrid?.current?.gridInst?.store?.data?.rawData[lastRowKey].work_subdivision_detail_id;
    } else {
      deleteId = refInnerWeightGrid?.current?.gridInst?.store?.data?.rawData[lastRowKey].work_subdivision_detail_id;
    }

    // const result = await restAPI
    //   .delete(`/prd/subdivision-detail/` + deleteId)
    //   .then((res) => {
    //     setIsSnackOpen({
    //       ...isSnackOpen,
    //       open: true,
    //       message: res?.data?.message,
    //       severity: "success",
    //     });
    //     getSubdivisionDataWeight(weightHeaderUID);
    //     setIsDeleteAlertOpen(false);
    //   })
    //   .catch((res) => {
    //     setIsSnackOpen({
    //       ...isSnackOpen,
    //       open: true,
    //       message: res?.response?.data?.message ?? res?.message,
    //       severity: "error",
    //     });
    //   })
    //   .finally(() => {
    //     setIsBackDrop(false);
    //   });

    try {
      setIsBackDrop(true);

      const result = await restAPI.delete(`/prd/subdivision-detail/` + deleteId);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      getSubdivisionDataWeight(weightHeaderUID);
      searchCommonGrid();
      const scaleGrid = refInnerGrid.current?.gridInst;
      if (scaleGrid.getRowCount() === 1) {
        setBagFlag(true);
      }

      setIsDeleteAlertOpen(false);
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

  //소분 행 삭제 팝업 확인
  const openDeleteModal = () => {
    let gridInst;

    if (screenFlag === true) {
      gridInst = refInnerGrid?.current?.gridInst?.store?.data?.rawData;
    } else {
      gridInst = refInnerWeightGrid?.current?.gridInst?.store?.data?.rawData;
    }
    //추가된 Row가 있을때만 팝업 호출

    if (gridInst.length > 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const onEditingFinishWeightGrid = async (e) => {
    let weight = 0;
    let gridInsttmp;
    if (screenFlag === true) {
      gridInsttmp = refInnerGrid?.current?.gridInst?.store?.data;
      if (e !== undefined) {
        let rawData = {};
        const detailIdForChange = gridInsttmp.rawData[e.rowKey].work_subdivision_detail_id;
        rawData.qty = Number(gridInsttmp.rawData[e.rowKey].subdivision_qty);
        await restAPI.put(`prd/subdivision-detail/${detailIdForChange}`, rawData);
      }
    } else {
      gridInsttmp = refInnerWeightGrid?.current?.gridInst?.store?.data;
    }

    let dataLength = gridInsttmp?.rawData.length;
    const rawData = gridInsttmp?.rawData;
    for (let i = 0; i < dataLength; i++) {
      if (rawData[i].subdivision_qty !== null && rawData[i].subdivision_qty !== "") {
        weight = weight + Number(rawData[i].subdivision_qty);
      }
    }
    setTotalWeight(weight.toFixed(2));
    // totalWeight.current = weight;
  };
  /* Grid Memo 관련 코드 시작*/
  const weightGroundGrid = useMemo(() => {
    return (
      <GridSingle
        columns={gridCol}
        data={weightGroundData}
        refGrid={refInnerGrid}
        rowHeaders={rowHeaders}
        onEditingFinish={onEditingFinishWeightGrid}
      />
    );
  }, [bagFlag, weightGroundData]);
  /* Grid Memo 관련 코드 끝*/

  /* Grid Memo 관련 코드 시작*/
  const totalWeightGrid = useMemo(() => {
    return <S.TotalWeight>총 무게&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{totalWeight}&emsp;Kg</S.TotalWeight>;
  }, [totalWeight, weightGroundData, weightData]);
  /* Grid Memo 관련 코드 끝*/
  /*헤더관련 useMemo*/

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
    <S.OuterLayout>
      <S.TopWrap>
        <S.ComboBox
          disablePortal
          id="workGroupCombo"
          size="small"
          options={workGroup || null}
          value={selectedWorkerGroup || null}
          key={(option) => option?.text}
          getOptionLabel={(option) => option?.text || ""}
          onChange={(_, newValue) => {
            // setComboValue(selectedWorkerGroup);
            const result = workGroup?.find((workerGroup) => workerGroup?.text === newValue?.text);
            setSelectedWorkerGroup(result);
            setComboValue({
              ...comboValue,
              workGroupKey: newValue?.value === undefined ? null : newValue?.value,
            });
          }}
          isOptionEqualToValue={(option, value) => option.text === value.text}
          renderInput={(params) => <TextField {...params} label={"작업조"} size="small" />}
          onKeyDown={onKeyDown}
        />
        <S.ComboBox
          disablePortal
          id="productCbo"
          size="small"
          key={(option) => option?.prod_id}
          options={productOpt || null}
          value={selectedProd || null}
          getOptionLabel={(option) => option?.prod_nm || ""}
          onChange={(_, newValue) => {
            // setComboValue(selectedWorkerGroup);
            const result = productOpt?.find((prodList) => prodList?.prod_nm === newValue?.prod_nm);
            setSelectedProd(result);
            setComboValueProd({
              ...comboValue,
              productId: newValue?.prod_id === undefined ? null : newValue?.prod_id,
            });
          }}
          isOptionEqualToValue={(option, value) => option.prod_nm === value.prod_nm}
          renderInput={(params) => <TextField {...params} label={"제품"} size="small" />}
          onKeyDown={onKeyDown}
        />
        <S.InputBox
          id={"remark"}
          label={"비고"}
          size={"small"}
          autoComplete={"off"}
          onChange={handleInputTextChange}
          value={selectedRemark}
          onKeyDown={onKeyDown}
        />
      </S.TopWrap>
      <S.BottomWrapGround>
        <S.BottomLeftGroundContent>
          <S.GroundLeftContentsWrap>
            <S.GroundLeftTopContents>
              <S.GroundLeftTopContentsTitle>좌측 저울</S.GroundLeftTopContentsTitle>
              <S.GroundLeftTopContentsButtons>
                {bagFlag ? (
                  <S.CarryingUpButton onClick={carryingUpBag}>
                    <p>빈 Bag</p> <p>작업시작</p>
                  </S.CarryingUpButton>
                ) : (
                  <S.CarryingDownButton onClick={openBagDownModal}>
                    <p>좌측 Bag</p> <p>내리기</p>
                  </S.CarryingDownButton>
                )}
              </S.GroundLeftTopContentsButtons>
            </S.GroundLeftTopContents>
            <S.GroundLeftBottomContents>
              <S.InnerGridWrap>
                <S.ButtonWrap>
                  <S.DeleteButton onClick={openDeleteModal}>최근 작업 삭제</S.DeleteButton>
                </S.ButtonWrap>
                {weightGroundGrid}
                {totalWeightGrid}
              </S.InnerGridWrap>
            </S.GroundLeftBottomContents>
          </S.GroundLeftContentsWrap>
          <S.GroundRightContentsWrap>
            <S.ArrowStyle>⬆️</S.ArrowStyle>
            <S.GroundRightContentsInputBoxTitleWrap>지면</S.GroundRightContentsInputBoxTitleWrap>
            <S.GroundRightContentsInputBoxContentsWrap>
              <S.GroundRightContentsInputBoxWrap>
                <S.InputLotTitle>LOT NO</S.InputLotTitle>
                <S.InputLot onChange={handleLotTextChange} value={selectedLotNo} placeholder={"LotNo를 입력해주세요"} />
              </S.GroundRightContentsInputBoxWrap>
              <S.MoveButton onClick={moveMaterial}>옮기기</S.MoveButton>
            </S.GroundRightContentsInputBoxContentsWrap>
          </S.GroundRightContentsWrap>
        </S.BottomLeftGroundContent>
        <S.BottomRightGroundContent>
          <S.CommonGridWrap>
            <GridSingle columns={commonGridCol} refGrid={refCommonGrid} data={gridData} />
          </S.CommonGridWrap>
        </S.BottomRightGroundContent>
      </S.BottomWrapGround>

      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={deleteRow}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      ) : null}

      {isBagDownAlertOpen ? (
        <NoticeAlertModal
          textContent={"완료한 Bag을 내리시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isConfirm={true}
          isCancel={true}
          onConfirm={carryingDownBag}
          onCancel={() => {
            setIsBagDownAlertOpen(false);
          }}
        />
      ) : null}

      <BackDrop isBackDrop={isBackDrop} />
      {BarcodePrint}
    </S.OuterLayout>
  );
}
