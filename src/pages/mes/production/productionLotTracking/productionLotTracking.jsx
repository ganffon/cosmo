import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useRef, useState } from "react";
import * as LS from "./productionLotTracking.styled";

import { InputSet } from "components/input/InputSearch.styled";
import InputSearch from "components/input/InputSearch";
import * as S from "pages/mes/style/oneGrid.styled";
import DateTime from "components/datetime/DateTime";
import useInputSet from "custom/useInputSet";
import InputPaper from "components/input/InputPaper";
import ProductionLotTrackingSet from "./productionLotTrackingSet";
import * as disRow from "custom/useDisableRowCheck";
import ButtonSearch from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import * as uSearch from "custom/useSearch";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import ModalSelect from "components/modal/ModalSelect";

function ProductionLotTracking() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const refMainleGrid = useRef(null);
  const refMiddleLeftGrid = useRef(null);
  const refMiddleRightGrid = useRef(null);
  const refBottomLeftGrid = useRef(null);
  const refBottomRightGrid = useRef(null);
  const refGridSelect = useRef(null);
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  const prodCD = useRef("");
  const prodNM = useRef("");

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataMiddleLeft, setGridDataMiddleLeft] = useState(null);
  const [gridDataMiddleRight, setGridDataMiddleRight] = useState(null);
  const [gridDataBottomLeft, setGridDataBottomLeft] = useState(null);
  const {
    rowHeaders,
    rowHeadersNum,
    header,
    columns,
    columnOptions,
    columnsMiddleLeft,
    columnsMiddleRight,
    columnsBottomLeft,
    columnsBottomRight,
    columnsSelectProd,
    inputSet,
  } = ProductionLotTrackingSet();

  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(
    false,
    refMainleGrid
  );

  const [gridDataSelect, setGridDataSelect] = useState(null);

  const [disRowHeader, setDisRowHeader] = disRow.useDisableRowCheck(
    false,
    refMainleGrid
  );

  const [gridData, setGridData] = useState(null);
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
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

  const onClickSearch = () => {
    actSearch();
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

  const actSearch = async () => {
    try {
      let readURI =
        restURI.prdPacking +
        `?start_date=${dateText.startDate}&end_date=${dateText.endDate}&`;
      console.log(prodCD.current);
      if (prodCD.current !== "" && prodCD.current !== null) {
        readURI = readURI + `prod_cd=${prodCD.current}&`;
      }
      if (prodNM.current !== "" && prodNM.current !== null) {
        readURI = readURI + `prod_nm=${prodNM.current}&`;
      }

      setIsBackDrop(true);

      if (inputTextChange && inputBoxID) {
        let cnt = 1;
        //🔸inputBox 가 있다면?!
        if (inputBoxID.length > 0) {
          //🔸inputBox 갯수만큼 반복!
          for (let i = 0; i < inputBoxID.length; i++) {
            //🔸inputBox에 검색조건 있으면 가져오기
            if (inputTextChange[inputBoxID[i]]) {
              //🔸처음 가져오는 것이면 params에 ? 세팅
              if (cnt === 0) {
                readURI = "?";
                cnt++;
              }
              readURI =
                readURI +
                inputBoxID[i] +
                "=" +
                inputTextChange[inputBoxID[i]] +
                "&";
            }
          }
          //🔸마지막에 찍힌 & 기호 제거
          readURI = readURI.slice(0, readURI.length - 1);
        }
      } else {
        readURI = readURI.slice(0, readURI.length - 1);
      }
      console.log(readURI);
      let gridData = await restAPI.get(readURI);

      setGridDataHeader(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const onClickGrid = (e) => {
    actSearchGrid(e);
  };

  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName;

    if (dblClickGrid === "Search") {
      setInputSearchValue([]);
      columnName = ["prod_cd", "prod_nm"];

      prodNM.current = "";
      for (let i = 0; i < columnName.length; i++) {
        setInputSearchValue((prevList) => {
          if (columnName[i] === "prod_cd") {
            prodCD.current =
              e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
          }
          if (columnName[i] === "prod_nm") {
            prodNM.current =
              e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
          }
        });
      }
    }
    setIsModalSelectOpen(false);
  };

  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
    //actSearchDetail(headerClickRowID);
  };

  const actSearchGrid = async (e) => {
    try {
      const workPackingID =
        e?.instance?.store?.data?.rawData[e?.rowKey].work_packing_id;
      const lotNo = e?.instance?.store?.data?.rawData[e?.rowKey].lot_no;
      setIsBackDrop(true);
      let readURI =
        restURI.prdLotTracking +
        `?work_packing_id=${workPackingID}&lot_no=${lotNo}&`;
      if (inputTextChange && inputBoxID) {
        let cnt = 1;
        //🔸inputBox 가 있다면?!
        if (inputBoxID.length > 0) {
          //🔸inputBox 갯수만큼 반복!
          for (let i = 0; i < inputBoxID.length; i++) {
            //🔸inputBox에 검색조건 있으면 가져오기
            if (inputTextChange[inputBoxID[i]]) {
              //🔸처음 가져오는 것이면 params에 ? 세팅
              if (cnt === 0) {
                readURI = "?";
                cnt++;
              }
              readURI =
                readURI +
                inputBoxID[i] +
                "=" +
                inputTextChange[inputBoxID[i]] +
                "&";
            }
          }
          //🔸마지막에 찍힌 & 기호 제거
          readURI = readURI.slice(0, readURI.length - 1);
        }
      } else {
        readURI = readURI.slice(0, readURI.length - 1);
      }
      let gridData = await restAPI.get(readURI);

      setGridDataMiddleLeft(gridData?.data?.data?.rows[0].weigh);
      setGridDataMiddleRight(gridData?.data?.data?.rows[0].weighDetail);
      setGridDataMiddleRight(gridData?.data?.data?.rows[0].weighDetail);
      setGridDataBottomLeft(gridData?.data?.data?.rows[0].subdivision);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const onClickRemoveProd = () => {
    setInputSearchValue([(prodCD.current = ""), (prodNM.current = "")]);
  };

  return (
    <LS.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <LS.ToolWrap>
          <LS.SearchWrap>
            <LS.Date
              datePickerSet={"range"}
              dateText={dateText}
              setDateText={setDateText}
            />

            <InputSearch
              id={"line_nm"}
              name={"라인명"}
              handleInputTextChange={handleInputTextChange}
              onClickSearch={onClickSearch}
            />
            <InputPaper
              width={"180px"}
              name={"품번"}
              value={prodCD.current || ""}
              btn={false}
            />
            <InputPaper
              width={"240px"}
              name={"품목"}
              value={prodNM.current || ""}
              btn={true}
              onClickSelect={onClickProd}
              onClickRemove={onClickRemoveProd}
            />
          </LS.SearchWrap>
          <LS.ButtonTop>
            <ButtonSearch onClickSearch={onClickSearch} />
          </LS.ButtonTop>
        </LS.ToolWrap>
      </S.ShadowBoxButton>
      <LS.ContentTop>
        <LS.TitleMid>❇️ 생산품목</LS.TitleMid>
      </LS.ContentTop>
      <LS.TopGridWrap>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridDataHeader}
            draggable={false}
            refGrid={refMainleGrid}
            onClickGrid={onClickGrid}
          />
        </S.GridWrap>
      </LS.TopGridWrap>
      <LS.ContentTop>
        <LS.TitleMid>❇️ 계량 / 투입 현황</LS.TitleMid>
      </LS.ContentTop>
      <LS.ModdleGridWrap>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsMiddleLeft}
            rowHeaders={rowHeaders}
            header={header}
            data={gridDataMiddleLeft}
            draggable={false}
            refGrid={refMiddleRightGrid}
          />
        </S.GridWrap>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsMiddleRight}
            rowHeaders={rowHeaders}
            header={header}
            data={gridDataMiddleRight}
            draggable={false}
            refGrid={refMiddleLeftGrid}
          />
        </S.GridWrap>
      </LS.ModdleGridWrap>
      <LS.TitleWrap>
        <LS.ContentBottom>
          <LS.TitleMid>❇️ 소분 현황</LS.TitleMid>
        </LS.ContentBottom>
        <LS.ContentBottom>
          <LS.TitleMid>❇️ 입고 현황</LS.TitleMid>
        </LS.ContentBottom>
      </LS.TitleWrap>
      <LS.ModdleGridWrap>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsBottomLeft}
            rowHeaders={rowHeaders}
            header={header}
            data={gridDataBottomLeft}
            draggable={false}
            refGrid={refBottomLeftGrid}
          />
        </S.GridWrap>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columnsBottomRight}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refBottomRightGrid}
          />
        </S.GridWrap>
      </LS.ModdleGridWrap>
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
          refGridSelect={refGridSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
    </LS.ContentsArea>
  );
}

export default ProductionLotTracking;
