import { LayoutContext } from "components/layout/common/Layout";

import { useContext, useEffect, useRef, useState } from "react";
import * as S from "./productionPackingView.styled";
import DateTime from "components/datetime/DateTime";
import InputPaper from "components/input/InputPaper";
import ProductionPackingViewSet from "./productionPackingViewSet";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import * as Cbo from "custom/useCboSet";
import CN from "json/ColumnName.json";
import * as uSearch from "custom/useSearch";
import ModalSelect from "components/modal/ModalSelect";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import BackDrop from "components/backdrop/BackDrop";
import { TextField } from "@mui/material";

export function ProductionPackingView() {
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridSelect = useRef(null);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const prodCD = useRef("품목코드");
  const prodNM = useRef("품목");

  const resetProd = () => {
    prodCD.current = "품목코드";
    prodNM.current = "품목";
  };

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refGridHeader?.current !== null) {
      refGridHeader?.current?.gridInst?.refreshLayout();
    }
    if (refGridDetail?.current !== null) {
      refGridDetail?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const { columnOptions, rowHeadersNum, header, columns, columnsSelectProd } = ProductionPackingViewSet();

  useEffect(() => {
    onClickSearch();
  }, []);

  const onClickSearch = () => {
    // actSearchHeader();
    actSearchDetail();
  };

  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let columnName;

    if (dblClickGrid === "Search") {
      setInputSearchValue([]);
      columnName = ["prod_cd", "prod_nm"];

      prodNM.current = "";
      for (let i = 0; i < columnName.length; i++) {
        setInputSearchValue((prevList) => {
          if (columnName[i] === "prod_cd") {
            prodCD.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
          }
          if (columnName[i] === "prod_nm") {
            prodNM.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
          }
        });
      }
    }
    setIsModalSelectOpen(false);
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };

  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const onClickProdCancel = () => {
    resetProd();
    setInputSearchValue([]);
  };

  const actSearchDetail = async () => {
    try {
      setIsBackDrop(true);
      let conditionProdID, conditionLineID;
      prodCD.current !== "품목코드"
        ? (conditionProdID = `&prod_cd=${prodCD.current}&prod_nm=${prodNM.current}`)
        : (conditionProdID = "");
      comboValue.line_id ? (conditionLineID = `&line_id=${comboValue.line_id}`) : (conditionLineID = "");

      let readURI =
        restURI.prdPackingDetail +
        `?start_date=${dateText.startDate}&end_date=${dateText.endDate}&report_fg=true` +
        conditionProdID +
        conditionLineID +
        `&complete_fg=true`;
      // const readURI = `/prd/packing-detail?work_packing_id=${headerRowID.current}`;

      let gridData = await restAPI.get(readURI);
      setGridDataDetail(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const onClickProd = () => {
    setDblClickGrid("Search");
    setIsModalSelectOpen(true);
    actSelectProd();
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

  return (
    <ContentsArea isAllScreen={isAllScreen}>
      <S.SearchCondition>
        <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
        <S.ComboBox
          disablePortal
          id="lineCbo"
          size="small"
          key={(option) => option?.line_id}
          options={lineOpt || null}
          getOptionLabel={(option) => option?.line_nm || ""}
          onChange={(_, newValue) => {
            setComboValue({
              ...comboValue,
              line_id: newValue?.line_id === undefined ? null : newValue?.line_id,
            });
          }}
          renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
        />
        <S.InputPaperWrap>
          <InputPaper width={"180px"} name={"품목코드"} value={prodCD.current || ""} btn={false} />
        </S.InputPaperWrap>
        <S.InputPaperWrap>
          <InputPaper
            width={"240px"}
            name={"품목"}
            value={prodNM.current || ""}
            btn={true}
            onClickSelect={onClickProd}
            onClickRemove={onClickProdCancel}
          />
        </S.InputPaperWrap>
        <S.ButtonTop>
          <BtnComponent btnName={"Search"} onClick={onClickSearch} />
        </S.ButtonTop>
      </S.SearchCondition>
      <S.ContentWrap>
        <S.TitleMid>포장 실적</S.TitleMid>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeadersNum}
            header={header}
            data={gridDataDetail}
            draggable={false}
            refGrid={refGridDetail}
          />
        </S.GridWrap>
      </S.ContentWrap>
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
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
