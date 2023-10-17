import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./createTheory.styled";
import BtnComponent from "components/button/BtnComponent";
import NoticeSnack from "components/alert/NoticeSnack";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import InputPaper from "components/input/InputPaper";
import * as RE from "custom/RegularExpression";
import BackDrop from "components/backdrop/BackDrop";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ProductionOrderSet from "./ProductionOrderSet";

function EditTheory(props) {
  const {
    onClose = () => {},
    refTheoryGrid = null,
    rowHeaders = [],
    width = "95%",
    height = "95%",
    theoryData = {},
    headerID = "",
    resetTheory = () => {},
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const { columnOptions, columnsEditTheory, header } = ProductionOrderSet();

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);

  const [inputText, setInputText] = useState({
    plasticityLength: "",
    rollerSpeed: "",
    saggerLength: "",
    topSaggerQty: "",
    topSaggerFillingQty: "",
    bottomSaggerQty: "",
    bottomSaggerFillingQty: "",
    yieldValue: "",
  });
  const [calc, setCalc] = useState({
    plasticityTime: "",
    topSaggerTheoryQty: "",
    topSaggerFillingTheoryQty: "",
    bottomSaggerTheoryQty: "",
    bottomSaggerFillingTheoryQty: "",
    theoryInputQty: "",
    theoryProdQty: "",
  });
  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsBackDrop(true);
        const result = await restAPI.get("/prd/order/" + headerID);

        setGridData(result?.data?.data?.rows);
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
    getOrder();
    setInputText({
      ...inputText,
      plasticityLength: theoryData.plasticity_length,
      rollerSpeed: theoryData.roller_speed,
      saggerLength: theoryData.sagger_length,
      topSaggerQty: theoryData.top_sagger_qty,
      topSaggerFillingQty: theoryData.top_sagger_filling_qty,
      bottomSaggerQty: theoryData.bottom_sagger_qty,
      bottomSaggerFillingQty: theoryData.bottom_sagger_filling_qty,
      yieldValue: theoryData.yield,
    });
    setCalc({
      ...calc,
      plasticityTime: theoryData.plasticity_time,
      topSaggerTheoryQty: theoryData.top_sagger_theory_qty,
      topSaggerFillingTheoryQty: theoryData.top_sagger_filling_theory_qty,
      bottomSaggerTheoryQty: theoryData.bottom_sagger_theory_qty,
      bottomSaggerFillingTheoryQty: theoryData.bottom_sagger_filling_theory_qty,
      theoryInputQty: theoryData.theory_input_qty,
      theoryProdQty: theoryData.theory_prod_qty,
    });
  }, []);
  const handleTheoryAutoCal = (e) => {
    let RegExCheck;
    const REGEX_ONLY_NUM = /^\d*$/;
    const REGEX_DECIMAL_TWO = /^[0-9]*(\.[0-9]{0,2})?$/;
    // const REGEX_DECIMAL_FOUR = /^[0-9]*(\.[0-9]{0,4})?$/;
    switch (e?.target?.id) {
      case "plasticityLength":
      case "rollerSpeed":
        RegExCheck = REGEX_ONLY_NUM.test(e?.target?.value);
        break;
      case "topSaggerFillingQty":
      case "bottomSaggerFillingQty":
      case "yieldValue":
        RegExCheck = REGEX_DECIMAL_TWO.test(e?.target?.value);
        break;
      // RegExCheck = REGEX_DECIMAL_FOUR.test(e?.target?.value);
      // break;
      default:
        RegExCheck = true;
    }
    if (RegExCheck) {
      setInputText({ ...inputText, [e?.target?.id]: e?.target?.value });
    }
  };
  const calcPlasticityTime = () => {
    // 소성시간(Day)
    const plasticityLength = inputText.plasticityLength;
    const rollerSpeed = inputText.rollerSpeed;
    let plasticityTime;
    if (plasticityLength === "" || rollerSpeed === "") {
      plasticityTime = "";
    } else {
      plasticityTime = (24 * 60 * rollerSpeed) / plasticityLength;
      if (isNaN(plasticityTime)) {
        plasticityTime = "";
      }
    }
    return plasticityTime;
  };
  const calcTopSaggerTheoryQty = () => {
    // 이론사야수량(상)
    const plasticityLength = inputText.plasticityLength;
    const topSaggerQty = inputText.topSaggerQty;
    const saggerLength = inputText.saggerLength;
    let topSaggerTheoryQty;
    if (plasticityLength === "" || topSaggerQty === "" || saggerLength === "") {
      topSaggerTheoryQty = "";
    } else {
      topSaggerTheoryQty = (plasticityLength * topSaggerQty) / saggerLength;
      if (topSaggerTheoryQty === Infinity || isNaN(topSaggerTheoryQty)) {
        topSaggerTheoryQty = "";
      }
    }
    return topSaggerTheoryQty;
  };
  const calcTopSaggerFillingTheoryQty = () => {
    // 이론충진량(상)
    const topSaggerTheoryQty = calcTopSaggerTheoryQty();
    const topSaggerFillingQty = inputText.topSaggerFillingQty;
    let topSaggerFillingTheoryQty;
    if (topSaggerTheoryQty === "" || topSaggerFillingQty === "") {
      topSaggerFillingTheoryQty = "";
    } else {
      topSaggerFillingTheoryQty = topSaggerTheoryQty * topSaggerFillingQty;
      if (isNaN(topSaggerFillingTheoryQty)) {
        topSaggerFillingTheoryQty = "";
      }
    }
    return topSaggerFillingTheoryQty;
  };
  const calcBottomSaggerTheoryQty = () => {
    // 이론사야수량(하)
    const plasticityLength = inputText.plasticityLength;
    const bottomSaggerQty = inputText.bottomSaggerQty;
    const saggerLength = inputText.saggerLength;
    let bottomSaggerTheoryQty;
    if (plasticityLength === "" || bottomSaggerQty === "" || saggerLength === "") {
      bottomSaggerTheoryQty = "";
    } else {
      bottomSaggerTheoryQty = (plasticityLength * bottomSaggerQty) / saggerLength;
      if (bottomSaggerTheoryQty === Infinity || isNaN(bottomSaggerTheoryQty)) {
        bottomSaggerTheoryQty = "";
      }
    }
    return bottomSaggerTheoryQty;
  };
  const calcBottomSaggerFillingTheoryQty = () => {
    // 이론충진량(하)
    const bottomSaggerTheoryQty = calcBottomSaggerTheoryQty();
    const bottomSaggerFillingQty = inputText.bottomSaggerFillingQty;
    let bottomSaggerFillingTheoryQty;
    if (bottomSaggerTheoryQty === "" || bottomSaggerFillingQty === "") {
      bottomSaggerFillingTheoryQty = "";
    } else {
      bottomSaggerFillingTheoryQty = bottomSaggerTheoryQty * bottomSaggerFillingQty;
      if (isNaN(bottomSaggerFillingTheoryQty)) {
        bottomSaggerFillingTheoryQty = "";
      }
    }
    return bottomSaggerFillingTheoryQty;
  };
  const calcTheoryInputQty = () => {
    // 이론원부재투입량
    const topSaggerFillingTheoryQty = calcTopSaggerFillingTheoryQty();
    const bottomSaggerFillingTheoryQty = calcBottomSaggerFillingTheoryQty();
    const plasticityTime = calcPlasticityTime();
    let theoryInputQty;
    if (topSaggerFillingTheoryQty === "" || bottomSaggerFillingTheoryQty === "" || plasticityTime === "") {
      theoryInputQty = "";
    } else {
      theoryInputQty = (topSaggerFillingTheoryQty + bottomSaggerFillingTheoryQty) * plasticityTime;
      if (isNaN(theoryInputQty)) {
        theoryInputQty = "";
      }
    }
    return theoryInputQty;
  };
  const calcTheoryProdQty = () => {
    // 이론제품생산량
    const theoryInputQty = calcTheoryInputQty();
    const yieldValue = inputText.yieldValue;
    let theoryProdQty;
    if (theoryInputQty === "" || yieldValue === "") {
      theoryProdQty = "";
    } else {
      theoryProdQty = theoryInputQty * ((yieldValue * 100) / 10000);
      if (isNaN(theoryProdQty)) {
        theoryProdQty = "";
      }
    }
    return theoryProdQty;
  };

  useEffect(() => {
    setCalc({
      ...calc,
      plasticityTime: RE.DecimalTwo(calcPlasticityTime()),
      topSaggerTheoryQty: RE.DecimalTwo(calcTopSaggerTheoryQty()),
      topSaggerFillingTheoryQty: RE.DecimalTwo(calcTopSaggerFillingTheoryQty()),
      bottomSaggerTheoryQty: RE.DecimalTwo(calcBottomSaggerTheoryQty()),
      bottomSaggerFillingTheoryQty: RE.DecimalTwo(calcBottomSaggerFillingTheoryQty()),
      theoryInputQty: RE.DecimalTwo(calcTheoryInputQty()),
      theoryProdQty: RE.DecimalTwo(calcTheoryProdQty()),
    });
  }, [inputText]);

  const theoryCompleteCheck = () => {
    if (
      calc.plasticityTime !== "" &&
      calc.topSaggerTheoryQty !== "" &&
      calc.topSaggerFillingTheoryQty !== "" &&
      calc.bottomSaggerTheoryQty !== "" &&
      calc.bottomSaggerFillingTheoryQty !== "" &&
      calc.theoryInputQty !== "" &&
      calc.theoryProdQty !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSave = async () => {
    if (!theoryCompleteCheck()) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "이론생산량 계산이 완료되지 않았습니다!",
        severity: "warning",
        location: "topCenter",
      });
    } else {
      try {
        setIsBackDrop(true);
        const theory = [
          {
            work_order_theory_production_id: theoryData.work_order_theory_production_id,
            plasticity_length: Number(inputText.plasticityLength),
            roller_speed: Number(inputText.rollerSpeed),
            plasticity_time: Number(calc.plasticityTime),
            sagger_length: Number(inputText.saggerLength),
            top_sagger_qty: Number(inputText.topSaggerQty),
            top_sagger_theory_qty: Number(calc.topSaggerTheoryQty),
            top_sagger_filling_qty: Number(inputText.topSaggerFillingQty),
            top_sagger_filling_theory_qty: Number(calc.topSaggerFillingTheoryQty),
            bottom_sagger_qty: Number(inputText.bottomSaggerQty),
            bottom_sagger_theory_qty: Number(calc.bottomSaggerTheoryQty),
            bottom_sagger_filling_qty: Number(inputText.bottomSaggerFillingQty),
            bottom_sagger_filling_theory_qty: Number(calc.bottomSaggerFillingTheoryQty),
            yield: Number(inputText.yieldValue),
            theory_input_qty: Number(calc.theoryInputQty),
            theory_prod_qty: Number(calc.theoryProdQty),
          },
        ];
        if (theory) {
          const result = await restAPI.put(restURI.prdOrderTheoryProduction, theory);

          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
          resetTheory();
          setTimeout(() => {
            onClose();
          }, 300);
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
    }
  };

  const Grid = useMemo(() => {
    return (
      <GridModal
        columns={columnsEditTheory}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeaders}
        refGrid={refTheoryGrid}
        draggable={false}
        data={gridData}
      />
    );
  }, [gridData]);

  return (
    <ModalWrapMulti width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Main>
        <S.MakeOrder>
          <S.ButtonBox>
            <S.TitleWrap>{"생산품목"}</S.TitleWrap>
            <S.ButtonWrap>
              <BtnComponent btnName="Save" onClick={onSave} />
            </S.ButtonWrap>
          </S.ButtonBox>
          <S.GridBox>{Grid}</S.GridBox>
        </S.MakeOrder>
        <S.OrderTheoryProduction>
          <S.ButtonBox>
            <S.TitleWrap>{"이론생산량 계산"}</S.TitleWrap>
          </S.ButtonBox>
          <S.AutoCalArea>
            <S.AutoCalWrap>
              <S.GroupWrapFlex>
                <S.InputWrap>
                  <S.InputTitle>{"소성길이(mm)"}</S.InputTitle>
                  <InputPaper
                    id={"plasticityLength"}
                    value={inputText.plasticityLength || ""}
                    readOnly={false}
                    placeHolder={"정수 입력"}
                    width={"100px"}
                    onTextChange={handleTheoryAutoCal}
                  />
                </S.InputWrap>
                <S.InputWrap>
                  <S.InputTitle>{"롤러속도(mm/min)"}</S.InputTitle>
                  <InputPaper
                    id={"rollerSpeed"}
                    value={inputText.rollerSpeed || ""}
                    readOnly={false}
                    placeHolder={"정수 입력"}
                    width={"100px"}
                    onTextChange={handleTheoryAutoCal}
                  />
                </S.InputWrap>
                <S.InputWrap>
                  <S.InputTitle>{"소성시간(cycle)"}</S.InputTitle>
                  <InputPaper
                    id={"plasticityTime"}
                    value={calc.plasticityTime || ""}
                    placeHolder={"24*60*롤러속도/소성길이"}
                    width={"200px"}
                  />
                </S.InputWrap>
                <S.InputWrap>
                  <S.InputTitle>{"사야길이(mm)"}</S.InputTitle>
                  <InputPaper
                    id={"saggerLength"}
                    value={inputText.saggerLength || ""}
                    readOnly={false}
                    placeHolder={"정수 입력"}
                    width={"100px"}
                    onTextChange={handleTheoryAutoCal}
                  />
                </S.InputWrap>
              </S.GroupWrapFlex>
            </S.AutoCalWrap>
            <S.AutoCalWrap>
              <S.GroupWrap>
                <S.ButtonBox>
                  <S.TitleWrap>{"상단 사야"}</S.TitleWrap>
                </S.ButtonBox>
                <S.AutoCalArea>
                  <S.AutoCalWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"사야수량(ea)"}</S.InputTitle>
                      <InputPaper
                        id={"topSaggerQty"}
                        value={inputText.topSaggerQty || ""}
                        readOnly={false}
                        placeHolder={"정수 입력"}
                        width={"100px"}
                        onTextChange={handleTheoryAutoCal}
                      />
                    </S.InputWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"이론사야수량(ea)"}</S.InputTitle>
                      <InputPaper
                        id={"topSaggerTheoryQty"}
                        value={calc.topSaggerTheoryQty || ""}
                        placeHolder={"소성길이*사야수량(상)/사야길이"}
                        width={"250px"}
                      />
                    </S.InputWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"충진량(kg)"}</S.InputTitle>
                      <InputPaper
                        id={"topSaggerFillingQty"}
                        value={inputText.topSaggerFillingQty || ""}
                        readOnly={false}
                        placeHolder={"소수점 2자리 입력"}
                        width={"150px"}
                        onTextChange={handleTheoryAutoCal}
                      />
                    </S.InputWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"이론충진량(kg)"}</S.InputTitle>
                      <InputPaper
                        id={"topSaggerFillingTheoryQty"}
                        value={calc.topSaggerFillingTheoryQty || ""}
                        placeHolder={"이론사야수량*충진량(상)"}
                        width={"200px"}
                      />
                    </S.InputWrap>
                  </S.AutoCalWrap>
                </S.AutoCalArea>
              </S.GroupWrap>
            </S.AutoCalWrap>
            <S.AutoCalWrap>
              <S.GroupWrap>
                <S.ButtonBox>
                  <S.TitleWrap>{"하단 사야"}</S.TitleWrap>
                </S.ButtonBox>
                <S.AutoCalArea>
                  <S.AutoCalWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"사야수량(ea)"}</S.InputTitle>
                      <InputPaper
                        id={"bottomSaggerQty"}
                        value={inputText.bottomSaggerQty || ""}
                        readOnly={false}
                        placeHolder={"정수 입력"}
                        width={"100px"}
                        onTextChange={handleTheoryAutoCal}
                      />
                    </S.InputWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"이론사야수량(ea)"}</S.InputTitle>
                      <InputPaper
                        id={"bottomSaggerTheoryQty"}
                        value={calc.bottomSaggerTheoryQty || ""}
                        placeHolder={"소성길이*사야수량(하)/사야길이"}
                        width={"250px"}
                      />
                    </S.InputWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"충진량(kg)"}</S.InputTitle>
                      <InputPaper
                        id={"bottomSaggerFillingQty"}
                        value={inputText.bottomSaggerFillingQty || ""}
                        readOnly={false}
                        placeHolder={"소수점 2자리 입력"}
                        width={"150px"}
                        onTextChange={handleTheoryAutoCal}
                      />
                    </S.InputWrap>
                    <S.InputWrap>
                      <S.InputTitle>{"이론충진량(kg)"}</S.InputTitle>
                      <InputPaper
                        id={"bottomSaggerFillingTheoryQty"}
                        value={calc.bottomSaggerFillingTheoryQty || ""}
                        placeHolder={"이론사야수량*충진량(하)"}
                        width={"200px"}
                      />
                    </S.InputWrap>
                  </S.AutoCalWrap>
                </S.AutoCalArea>
              </S.GroupWrap>
            </S.AutoCalWrap>
            <S.AutoCalWrap>
              <S.GroupWrapFlex>
                <S.InputWrap>
                  <S.InputTitle>{"수율(%)"}</S.InputTitle>
                  <InputPaper
                    id={"yieldValue"}
                    value={inputText.yieldValue || ""}
                    readOnly={false}
                    placeHolder={"소수점 2자리 입력"}
                    width={"150px"}
                    onTextChange={handleTheoryAutoCal}
                  />
                </S.InputWrap>
                <S.InputWrap>
                  <S.InputTitle>{"이론원부재투입량(kg)"}</S.InputTitle>
                  <InputPaper
                    id={"theoryInputQty"}
                    value={calc.theoryInputQty || ""}
                    placeHolder={"(이론충진량(상)+이론충진량(하))*소성시간(Day)"}
                    width={"350px"}
                  />
                </S.InputWrap>
                <S.InputWrap>
                  <S.InputTitle>{"이론제품생산량(kg)"}</S.InputTitle>
                  <InputPaper
                    id={"theoryProdQty"}
                    value={calc.theoryProdQty || ""}
                    placeHolder={"이론원부재투입량*수율"}
                    width={"200px"}
                  />
                </S.InputWrap>
              </S.GroupWrapFlex>
            </S.AutoCalWrap>
          </S.AutoCalArea>
        </S.OrderTheoryProduction>
      </S.Main>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ModalWrapMulti>
  );
}

export default EditTheory;
