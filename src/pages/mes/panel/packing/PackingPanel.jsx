import { useContext, useState, useEffect, useRef, useMemo } from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import PackingPanelSet from "./PackingPanelSet";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./PackingPanel.styled";
import restAPI from "api/restAPI";
import DateRange from "components/datetime/DateRange";
import InputSearch from "components/input/InputSearch";
import BtnWeight from "components/button/panel/BtnWeight";
import Condition from "custom/Condition";
import ModalSelectDate from "components/modal/ModalSelectDate";
import BarcodeBox from "./BarcodeBox";
import BtnPacking from "components/button/panel/BtnPacking";
import ModalSelectMulti from "./ModalSelectMulti";

function PackingPanel() {
  const workPackingID = useRef("");
  const workOrderID = useRef("");
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [nowDateTime, setNowDateTime] = useState({
    nowDate: DateTime().dateFull,
    nowTime: DateTime().hour + ":" + DateTime().minute,
  });

  const [selectInfo, setSelectInfo] = useState({});
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isPackingHeaderOpen, setIsPackingHeaderOpen] = useState(false);
  const [isModalNewOpen, setIsModalNewOpen] = useState(false);

  const {
    columnOptions,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsSelectPackingHeader,
    columnsNewHeader,
    columnsNewDetail,
    columnsWeight,
    columnsSelectEmp,
    columnsSelectStore,
    columnsInput,
    columnsInputDetail,
  } = PackingPanelSet();

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridInput = useRef(null);
  const refGridPackingHeader = useRef(null);
  const refGridNewHeader = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataPackingHeader, setGridDataPackingHeader] = useState(null);
  const [gridDataNewHeader, setGridDataNewHeader] = useState(null);
  const [gridDataNewDetail, setGridDataNewDetail] = useState(null);
  const [gridDataInput, setGridDataInput] = useState(null);

  const [modalSelectSize, setModalSelectSize] = useState({
    width: "50%",
    height: "60%",
  });

  const [info, setInfo] = useState({
    lineNM: "",
    packingDate: "",
    prodCD: "",
    prodNM: "",
    lotNo: "",
    weight: "",
    empNM: "",
    remark: "",
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    onClickSearch();
  }, []);

  const [actSelectPackingHeader] = uSearch.useSearchSelect(
    refGridPackingHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataPackingHeader,
    restURI.prdPacking +
      `?start_date=${dateText.startDate}&end_date=${dateText.endDate}`
  );

  const handleInputSaveInfo = (rowKey) => {
    const Header = refGridInput?.current?.gridInst;
    // prodCD.current = Header.getValue(rowKey, "prod_cd");
    // prodNM.current = Header.getValue(rowKey, "prod_nm");
  };
  const handleInputSearch = async () => {
    try {
      const result = await restAPI.get(
        restURI.prodWeight + `?complete_fg=INCOMPLETE`
      );
      setGridDataInput(result?.data?.data?.rows);
      // setIsModalInputOpen(true);
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
  const onClickSearch = async () => {
    if (isBackDrop === false) {
      // try {
      //   setIsBackDrop(true);
      //   let conditionLine;
      //   let conditionProdCD;
      //   let conditionProdNM;
      //   inputTextChange.line
      //     ? (conditionLine = `&line_nm=${inputTextChange.line}`)
      //     : (conditionLine = "");
      //   inputTextChange.prod_cd
      //     ? (conditionProdCD = `&prod_cd=${inputTextChange.prod_cd}`)
      //     : (conditionProdCD = "");
      //   inputTextChange.prod_nm
      //     ? (conditionProdNM = `&prod_nm=${inputTextChange.prod_nm}`)
      //     : (conditionProdNM = "");
      //   const result = await restAPI.get(
      //     restURI.prdOrder +
      //       `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
      //       conditionLine +
      //       conditionProdCD +
      //       conditionProdNM
      //   );
      //   setGridDataHeader(result?.data?.data?.rows);
      //   setIsSnackOpen({
      //     ...isSnackOpen,
      //     open: true,
      //     message: result?.data?.message,
      //     severity: "success",
      //     location: "bottomRight",
      //   });
      // } catch (err) {
      //   setIsSnackOpen({
      //     ...isSnackOpen,
      //     open: true,
      //     message: err?.response?.data?.message,
      //     severity: "error",
      //     location: "bottomRight",
      //   });
      // } finally {
      //   setIsBackDrop(false);
      // }
    }
  };

  const onClickGridHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      const Header = refGridHeader?.current?.gridInst;
      // prodID.current = Header.getValue(e?.rowKey, "prod_id");
      setSelectInfo({
        ...selectInfo,
        orderDate: Header.getValue(e?.rowKey, "work_order_date"),
        line: Header.getValue(e?.rowKey, "line_nm"),
        orderQty: Header.getValue(e?.rowKey, "work_order_qty"),
        prodCD: Header.getValue(e?.rowKey, "prod_cd"),
        prodNM: Header.getValue(e?.rowKey, "prod_nm"),
      });
    }
  };

  const [inputTextChange, setInputTextChange] = useState({});
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSelect = () => {
    setIsPackingHeaderOpen(true);
    actSelectPackingHeader();
  };
  const onClickSelectDateClose = () => {
    setIsPackingHeaderOpen(false);
  };
  const onClickSearchSelectDate = () => {
    actSelectPackingHeader();
  };
  const onDblClickPackingHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      const Grid = refGridPackingHeader?.current?.gridInst;
      setInfo({
        ...info,
        lineNM: Grid.getValue(e?.rowKey, "line_nm"),
        packingDate: Grid.getValue(e?.rowKey, "work_packing_date"),
        prodCD: Grid.getValue(e?.rowKey, "prod_cd"),
        prodNM: Grid.getValue(e?.rowKey, "prod_nm"),
        lotNo: Grid.getValue(e?.rowKey, "lot_no"),
        weight: Grid.getValue(e?.rowKey, "packing_qty"),
        empNM: Grid.getValue(e?.rowKey, "packing_emp_nm"),
        remark: Grid.getValue(e?.rowKey, "remark"),
      });
      workPackingID.current = Grid.getValue(e?.rowKey, "work_packing_id");
      workOrderID.current = Grid.getValue(e?.rowKey, "work_order_id");
      setIsPackingHeaderOpen(false);

      try {
        setIsBackDrop(true);
        const result = await restAPI.get(
          restURI.prdPackingDetail + `?work_packing_id=${workPackingID.current}`
        );
        setGridDataHeader(result?.data?.data?.rows);
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
  const onClickNew = () => {
    setIsModalNewOpen(true);
  };
  const onClickModalNewClose = () => {
    setIsModalNewOpen(false);
  };
  const onClickEdit = () => {};
  const onClickDelete = () => {};
  const onClickAddRow = () => {};
  const onClickCancelRow = () => {};
  const onClickSave = () => {};
  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columns={columnsHeader}
        columnOptions={columnOptions}
        rowHeaders={rowHeadersNum}
        data={gridDataHeader}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataHeader]);

  const GridDetail = useMemo(() => {
    return (
      <GridSingle
        columns={columnsDetail}
        columnOptions={columnOptions}
        rowHeaders={rowHeadersNum}
        data={gridDataDetail}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataDetail]);
  return (
    <>
      <S.ContentsArea isAllScreen={isAllScreen}>
        <S.TopWrap>
          <S.ScreenTitleBox>❇️ 일일포장일지</S.ScreenTitleBox>
          <S.SearchBox>
            <BarcodeBox onClickSelect={onClickSelect} info={info} />
          </S.SearchBox>
          <S.ButtonWrap>
            <BtnPacking
              onClickNew={onClickNew}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          </S.ButtonWrap>
        </S.TopWrap>
        <S.MidWrap>
          <S.GridHeader>{GridHeader}</S.GridHeader>
        </S.MidWrap>
        <S.BottomWrap>
          <S.GridDetail>{GridDetail}</S.GridDetail>
        </S.BottomWrap>
      </S.ContentsArea>
      {isPackingHeaderOpen ? (
        <ModalSelectDate
          height={"60%"}
          onClickModalSelectDateClose={onClickSelectDateClose}
          columns={columnsSelectPackingHeader}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={gridDataPackingHeader}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridPackingHeader}
          dateText={dateText}
          setDateText={setDateText}
          onClickSearch={onClickSearchSelectDate}
          onDblClickGridSelectDate={onDblClickPackingHeader}
          // onClickSearch={onClickSearchSelectDate}
        />
      ) : null}
      {isModalNewOpen ? (
        <ModalSelectMulti
          height={"90%"}
          onClickModalSelectClose={onClickModalNewClose}
          columns={columnsNewHeader}
          columnsDetail={columnsNewDetail}
          columnOptions={columnOptions}
          gridDataSelect={gridDataNewHeader}
          gridDataDetail={gridDataNewDetail}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridNewHeader}
          info={info}
          onClickAddRow={onClickAddRow}
          onClickCancelRow={onClickCancelRow}
          onClickSave={onClickSave}
          // onClickSearch={onClickSearchSelectDate}
          // onDblClickGridSelectDate={onDblClickPackingHeader}
          // onClickSearch={onClickSearchSelectDate}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </>
  );
}

export default PackingPanel;
