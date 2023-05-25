import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
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
import ModalNew from "./ModalNew";
import ModalSelectMulti from "./ModalSelectMulti";
import GetPostParams from "api/GetPostParams";
import GetDeleteParams from "api/GetDeleteParams";

function PackingPanel() {
  const workPackingID = useRef("");
  const workOrderID = useRef("");
  const workWeightID = useRef("");
  const targetRowKey = useRef("");
  const currentRowKey = useRef("");
  LoginStateChk();
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isPackingHeaderOpen, setIsPackingHeaderOpen] = useState(false);
  const [isModalNewOpen, setIsModalNewOpen] = useState(false);
  const [isModalSelectMulti, setIsModalSelectMulti] = useState(false);

  const {
    columnOptions,
    rowHeadersNum,
    rowHeadersNumCheck,
    header,
    columnsHeader,
    columnsDetail,
    columnsSelectPackingHeader,
    columnsNewHeader,
    columnsNewDetail,
    columnsSelectHeader,
    columnsSelectDetail,
  } = PackingPanelSet(onClickGridButton);

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridPackingHeader = useRef(null);
  const refGridNewHeader = useRef(null);
  const refGridSelectHeader = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataPackingHeader, setGridDataPackingHeader] = useState(null);
  const [gridDataNewHeader, setGridDataNewHeader] = useState(null);
  const [gridDataNewDetail, setGridDataNewDetail] = useState(null);
  const [gridDataSelectHeader, setGridDataSelectHeader] = useState(null);
  const [gridDataSelectDetail, setGridDataSelectDetail] = useState(null);

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
  const [actSelectWeightHeader] = uSearch.useSearchSelect(
    refGridSelectHeader,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelectHeader,
    restURI.prdWeight
  );

  const onClickGridHeader = async (e) => {
    if (currentRowKey.current !== e?.rowKey) {
      if (e?.rowKey !== undefined) {
        currentRowKey.current = e?.rowKey;
        const Header = refGridHeader?.current?.gridInst;
        workWeightID.current = Header.getValue(e?.rowKey, "work_weigh_id");
        if (workWeightID.current) {
          try {
            setIsBackDrop(true);
            const result = await restAPI.get(
              restURI.prdWeightDetail + `?work_weigh_id=${workWeightID.current}`
            );
            setGridDataDetail(result?.data?.data?.rows);
          } catch (err) {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: err?.response?.data?.message,
              severity: "error",
              location: "bottomRight",
            });
          } finally {
            workWeightID.current = "";
            setIsBackDrop(false);
          }
        }
      }
    }
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
  const handleGridHeaderSearch = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(
        restURI.prdPackingDetail + `?work_packing_id=${workPackingID.current}`
      );
      setGridDataHeader(result?.data?.data?.rows);
      setGridDataDetail([]);
      currentRowKey.current = "";
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
      handleGridHeaderSearch();
    }
  };
  const onClickNew = () => {
    if (info.lineNM) {
      setIsModalNewOpen(true);
    }
  };
  const onClickModalNewClose = () => {
    setIsModalNewOpen(false);
    setGridDataNewDetail([]);
  };
  const onClickDelete = async () => {
    try {
      setIsBackDrop(true);
      const data = refGridHeader?.current?.gridInst
        ?.getCheckedRows()
        ?.map((raw) => GetDeleteParams("packingDetail", raw));

      const result = await restAPI.delete(restURI.prdPackingDetail, { data });

      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      handleGridHeaderSearch();
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
  const onClickAddRow = () => {
    const Grid = refGridNewHeader?.current?.gridInst;
    Grid?.appendRow();

    Grid?.setValue(
      Grid.getRowCount() - 1,
      "work_packing_id",
      workPackingID.current
    );
  };
  const onClickCancelRow = () => {
    refGridNewHeader?.current?.gridInst?.removeRow(currentRowKey.current);
    currentRowKey.current = "";
    setGridDataNewDetail([]);
  };
  const onClickSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refGridNewHeader?.current?.gridInst;
      Grid?.finishEditing();
      let result = [];
      for (let i = 0; i < Grid?.getRowCount(); i++) {
        result.push(Grid?.getRowAt(i));
      }
      const data = result.map((raw) => GetPostParams("packingDetail", raw));
      const res = await restAPI.post(restURI.prdPackingDetail, data);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      setIsModalNewOpen(false);
      setGridDataNewDetail([]);
      handleGridHeaderSearch();
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
  const onClickNewHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      if (currentRowKey.current !== e?.rowKey) {
        currentRowKey.current = e?.rowKey;
        const Header = refGridNewHeader?.current?.gridInst;
        workWeightID.current = Header?.getValue(e?.rowKey, "work_weigh_id");
        if (workWeightID.current) {
          try {
            setIsBackDrop(true);
            const result = await restAPI.get(
              restURI.prdWeightDetail + `?work_weigh_id=${workWeightID.current}`
            );
            setGridDataNewDetail(result?.data?.data?.rows);
          } catch (err) {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: err?.response?.data?.message,
              severity: "error",
              location: "bottomRight",
            });
          } finally {
            workWeightID.current = "";
            setIsBackDrop(false);
          }
        }
      }
    }
  };
  const onDblClickNewHeader = (e) => {
    if (
      Condition(e, [
        "prod_cd",
        "prod_nm",
        "lot_no",
        "work_weigh_time",
        "weigh_emp_nm",
        "work_input_time",
        "input_emp_nm",
      ])
    ) {
      targetRowKey.current = e?.rowKey;
      setIsModalSelectMulti(true);
      actSelectWeightHeader(
        `?complete_fg=COMPLETE&work_order_id=${workOrderID.current}`
      );
    }
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectMulti(false);
  };
  const onClickModalSelectGrid = async (e) => {
    if (e?.targetType !== "etc") {
      if (currentRowKey.current !== e?.rowKey) {
        try {
          setIsBackDrop(true);
          const Grid = refGridSelectHeader?.current?.gridInst;
          const workWeighID = Grid.getValue(e?.rowKey, "work_weigh_id");
          const result = await restAPI.get(
            restURI.prdWeightDetail + `?work_weigh_id=${workWeighID}`
          );
          setGridDataSelectDetail(result?.data?.data?.rows);
          currentRowKey.current = e?.rowKey;
        } catch (err) {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
            location: "bottomRight",
          });
          currentRowKey.current = "";
        } finally {
          setIsBackDrop(false);
        }
      }
    }
  };
  const handleDataSelect = (rowKey) => {
    const Header = refGridNewHeader?.current?.gridInst;
    const Select = refGridSelectHeader?.current?.gridInst;
    workWeightID.current = Select?.getValue(rowKey, "work_weigh_id");
    Header?.setValue(
      targetRowKey.current,
      "work_weigh_id",
      Select?.getValue(rowKey, "work_weigh_id")
    );
    Header?.setValue(
      targetRowKey.current,
      "prod_id",
      Select?.getValue(rowKey, "prod_id")
    );
    Header?.setValue(
      targetRowKey.current,
      "prod_cd",
      Select?.getValue(rowKey, "prod_cd")
    );
    Header?.setValue(
      targetRowKey.current,
      "prod_nm",
      Select?.getValue(rowKey, "prod_nm")
    );
    Header?.setValue(
      targetRowKey.current,
      "lot_no",
      Select?.getValue(rowKey, "lot_no")
    );
    Header?.setValue(
      targetRowKey.current,
      "work_weigh_time",
      Select?.getValue(rowKey, "work_weigh_time")
    );
    Header?.setValue(
      targetRowKey.current,
      "weigh_emp_id",
      Select?.getValue(rowKey, "weigh_emp_id")
    );
    Header?.setValue(
      targetRowKey.current,
      "weigh_emp_nm",
      Select?.getValue(rowKey, "weigh_emp_nm")
    );
    Header?.setValue(
      targetRowKey.current,
      "work_input_time",
      Select?.getValue(rowKey, "work_input_time")
    );
    Header?.setValue(
      targetRowKey.current,
      "input_emp_id",
      Select?.getValue(rowKey, "input_emp_id")
    );
    Header?.setValue(
      targetRowKey.current,
      "input_emp_nm",
      Select?.getValue(rowKey, "input_emp_nm")
    );
    Header?.setValue(
      targetRowKey.current,
      "inv_to_store_id",
      Select?.getValue(rowKey, "inv_to_store_id")
    );
    Header?.setValue(
      targetRowKey.current,
      "store_nm",
      Select?.getValue(rowKey, "store_nm")
    );
    Header?.setValue(
      targetRowKey.current,
      "inv_to_location_id",
      Select?.getValue(rowKey, "inv_to_location_id")
    );
    Header?.setValue(
      targetRowKey.current,
      "location_nm",
      Select?.getValue(rowKey, "location_nm")
    );
  };

  async function onClickGridButton(rowKey) {
    handleDataSelect(rowKey);
    setIsModalSelectMulti(false);
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(
        restURI.prdWeightDetail + `?work_weigh_id=${workWeightID.current}`
      );
      setGridDataNewDetail(result?.data?.data?.rows);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      workWeightID.current = "";
      setIsBackDrop(false);
    }
  }

  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columns={columnsHeader}
        columnOptions={columnOptions}
        rowHeaders={rowHeadersNumCheck}
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
      />
    );
  }, [gridDataDetail]);
  const GridModalNew = useMemo(() => {
    return (
      <ModalNew
        height={"90%"}
        width={"90%"}
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
        onClickSelectGrid={onClickNewHeader}
        onDblClickGridSelect={onDblClickNewHeader}
        // onClickSearch={onClickSearchSelectDate}
      />
    );
  }, [gridDataNewDetail]);

  return (
    <>
      <S.ContentsArea isAllScreen={isAllScreen}>
        <S.TopWrap>
          <S.ScreenTitleBox>❇️ 일일포장일지</S.ScreenTitleBox>
          <S.SearchBox>
            <BarcodeBox onClickSelect={onClickSelect} info={info} />
          </S.SearchBox>
          <S.ButtonWrap>
            <BtnPacking onClickNew={onClickNew} onClickDelete={onClickDelete} />
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
      {isModalNewOpen ? GridModalNew : null}
      {isModalSelectMulti ? (
        <ModalSelectMulti
          height={"80%"}
          width={"80%"}
          onClickModalSelectClose={onClickModalSelectClose}
          onClickSelectGrid={onClickModalSelectGrid}
          columns={columnsSelectHeader}
          columnsDetail={columnsSelectDetail}
          rowHeaders={rowHeadersNum}
          columnOptions={columnOptions}
          gridDataSelect={gridDataSelectHeader}
          gridDataDetail={gridDataSelectDetail}
          refGridSelect={refGridSelectHeader}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </>
  );
}

export default PackingPanel;
