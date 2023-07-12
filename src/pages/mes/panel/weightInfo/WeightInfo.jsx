import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./WeightInfo.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import BackDrop from "components/backdrop/BackDrop";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";
import jsonStr from "./WeightInfoJson.json";
const WeightInfo = ({ toggle }) => {
  LoginStateChk();
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [index, setIndex] = useState(0);
  const [numberInput, setNumberInput] = useState(1001);
  const [li, setLi] = useState(0);
  const [al, setAl] = useState(0);
  const [sum, setSum] = useState(0);
  const handleSearchButtonClick = () => {};
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (i) => {
    setIndex(i);
    // setNumberInput(prod_type_small[i].in + 1);
  };
  const prod_type_small = jsonStr;
  // [
  //   { prod_type_small_nm: "CN5S20", item1Nm: "NCM(OH)2", item2Nm: "Li2CO3", item3Nm: "Al203", in: 1000.0, Li: 437.0, Al: 2.79 },
  //   { prod_type_small_nm: "HCS5", item1Nm: "Co3O4", item2Nm: "Li2CO3", item3Nm: "Al203", in: 120.59, Li: 55.87, Al: 1.28 },
  // ];
  const inputProps = {
    style: {
      fontSize: "30px", // 원하는 폰트 크기로 설정
    },
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const onChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9.]/g, ""); // 숫자와 소수점만 허용

    // 숫자만 입력된 값으로 상태 업데이트
    setNumberInput(numericValue);
    setNumberInput(event.target.value);
  };

  useEffect(() => {
    const calculatedLi = (numberInput * prod_type_small[index].Li) / prod_type_small[index].in;
    const roundedLi = Math.round(calculatedLi * 100) / 100; // 소수점 두 번째 자리까지 반올림
    setLi(roundedLi);

    const calculatedAl = (numberInput * prod_type_small[index].Al) / prod_type_small[index].in;
    const roundedAl = Math.round(calculatedAl * 100) / 100; // 소수점 두 번째 자리까지 반올림
    setAl(roundedAl);

    const sum = roundedLi + roundedAl + numberInput;
    const roundedSum = Math.round(sum * 100) / 100;
    setSum(roundedSum);
    // setAl((numberInput * prod_type_small[index].Al) / prod_type_small[index].in);
    // setAl(((numberInput * prod_type_small[index].Al) / prod_type_small[index].in).toFixed(2));
  }, [numberInput, index]);
  return (
    <ContentsArea>
      <S.TopWrap>
        <S.Left>
          {prod_type_small.map((item, i) => (
            <S.BtnComponent key={i} height={"60px"} width={"100%"} clicked={isClicked} onClick={() => handleClick(i)}>
              <S.SearchTitle>{item.prod_type_small_nm}</S.SearchTitle>
            </S.BtnComponent>
          ))}
        </S.Left>
        <S.Right>
          <S.Title>투입 비율 확인</S.Title>
          <S.ColGridContainer Template="20% 20% 20% 40%">
            <S.RowsGridContainer Template="25% 25% 25% 25%">
              <S.GridData Bcolor="yellow">{prod_type_small[index].item1Nm}</S.GridData>
              {/* <S.GridData>리튬</S.GridData> */}
              <S.GridData Bcolor="yellow">{prod_type_small[index].item2Nm}</S.GridData>
              {/* <S.GridData>전구체</S.GridData> */}
              <S.GridData Bcolor="yellow">{prod_type_small[index].item3Nm}</S.GridData>
              {/* <S.GridData>첨가제</S.GridData> */}
              <S.GridData Bcolor="rgb(253 251 178 / 100%)">혼합품 총량</S.GridData>
            </S.RowsGridContainer>
            <S.RowsGridContainer Template="25% 25% 25% 25%">
              <S.GridData>{prod_type_small[index].in}</S.GridData>
              <S.GridData>{prod_type_small[index].Li}</S.GridData>
              <S.GridData>{prod_type_small[index].Al}</S.GridData>
              <S.GridData Bcolor="rgb(253 251 178 / 100%)">
                {prod_type_small[index].in + prod_type_small[index].Li + prod_type_small[index].Al}
              </S.GridData>
            </S.RowsGridContainer>
            <S.RowsGridContainer Template="25% 25% 25% 25%">
              <S.InputSet value={numberInput} onChange={onChange} Bcolor="yellow">
                {numberInput}
              </S.InputSet>
              <S.GridData Bcolor="yellow">{li}</S.GridData>
              <S.GridData Bcolor="yellow">{al} </S.GridData>
              <S.GridData Bcolor="rgb(253 251 178 / 100%)"> {sum}</S.GridData>
            </S.RowsGridContainer>
          </S.ColGridContainer>

          <S.RowsGridContainer2 Template="25% 25% 25% 25%">
            <S.GridData>bag 무게(Kg)</S.GridData>
            <S.ColGridContainer2>
              <S.GridData Bcolor="rgb(253 251 178 / 100%)">Jontong NCM(OH)2</S.GridData>
              <S.GridData>2.2</S.GridData>
            </S.ColGridContainer2>
            <S.ColGridContainer2>
              <S.GridData Bcolor="rgb(242 94 94 / 30%)" color="red">
                Albemarle Li2CO3
              </S.GridData>
              <S.GridData color="red">2.6</S.GridData>
            </S.ColGridContainer2>
            <S.ColGridContainer2>
              <S.GridData Bcolor="rgb(242 94 94 / 30%)">SQM LI2CO3</S.GridData>
              <S.GridData>3.0</S.GridData>
            </S.ColGridContainer2>
          </S.RowsGridContainer2>
        </S.Right>
      </S.TopWrap>
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};

export default WeightInfo;
