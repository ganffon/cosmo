import {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import WeightPanelSet from "./WeightPanelSet";
import BtnSubdivisionScale from "components/button/panel/BtnSubdivisionScale";
import Button5 from "components/button/panel/BtnSubdivisionSL";
import InputPaper from "components/input/InputPaper";
import InputText from "components/input/InputText";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./WeightPanel.styled";
import restAPI from "api/restAPI";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import DateRange from "components/datetime/DateRange";
import InputSearch from "components/input/InputSearch";
import BtnWeight from "components/button/panel/BtnWeight";
import ModalWeight from "./ModalWeight";
import Condition from "custom/Condition";
import ModalInput from "./ModalInput";

function WeightPanel() {
  const prodID = useRef("");
  const lineDeptID = useRef("");
  const lineID = useRef("");
  const lineNM = useRef("");
  const workOrderID = useRef("");
  const empID = useRef("");
  const empNM = useRef("");
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });
  const [nowDateTime, setNowDateTime] = useState({
    nowDate: DateTime().dateFull,
    nowTime: DateTime().hour + ":" + DateTime().minute,
  });

  const [selectInfo, setSelectInfo] = useState({});
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalWeightOpen, setIsModalWeightOpen] = useState(false);
  const [isModalInputOpen, setIsModalInputOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const {
    columnOptions,
    rowHeadersNum,
    header,
    columns,
    columnsWeight,
    columnsSelectEmp,
    columnsInput,
    columnsInputDetail,
  } = WeightPanelSet();

  const resetRequire = () => {
    prodID.current = "";
    lineDeptID.current = "";
    lineID.current = "";
    lineNM.current = "";
    workOrderID.current = "";
    setSelectInfo({
      ...selectInfo,
      orderDate: "",
      line: "",
      orderQty: "",
      prodCD: "",
      prodNM: "",
    });
  };
  const resetEmp = () => {
    empID.current = "";
    empNM.current = "";
  };

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridSelect = useRef(null);
  const refGridWeight = useRef(null);
  const refGridInput = useRef(null);
  const refGridInputDetail = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [gridDataWeight, setGridDataWeight] = useState(null);
  const [gridDataInput, setGridDataInput] = useState(null);
  const [gridDataInputDetail, setGridDataInputDetail] = useState(null);
  const [gridDataSelect, setGridDataSelect] = useState(null);

  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    onClickSearch();
  }, []);

  const [actSelectEmp] = uSearch.useSearchSelect(
    refGridSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    restURI.employee + `?use_fg=true`
  ); //➡️ Modal Select Search Prod

  const onClickNowTime = () => {
    setNowDateTime({
      ...nowDateTime,
      nowDate: DateTime().dateFull,
      nowTime: DateTime().hour + ":" + DateTime().minute,
    });
  };
  const onClickGridInput = (e) => {
    if (e?.rowKey !== undefined) {
      const Header = refGridInputDetail?.current?.gridInst;
      prodID.current = Header.getValue(e?.rowKey, "prod_id");
      lineID.current = Header.getValue(e?.rowKey, "line_id");
      lineNM.current = Header.getValue(e?.rowKey, "line_nm");
      lineDeptID.current = Header.getValue(e?.rowKey, "line_dept_id");
      workOrderID.current = Header.getValue(e?.rowKey, "work_order_id");
    }
  };
  const onClickInput = async () => {
    if (workOrderID.current !== "") {
      setNowDateTime({
        nowDate: DateTime().dateFull,
        nowTime: DateTime().hour + ":" + DateTime().minute,
      });
      try {
        const result = await restAPI.get(
          restURI.prodWeight + `?complete_fg=INCOMPLETE`
        );
        setGridDataInput(result?.data?.data?.rows);
        setIsModalInputOpen(true);
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
  const onClickWeight = async () => {
    if (workOrderID.current !== "") {
      try {
        const result = await restAPI.get(
          restURI.prdOrderInput + `?work_order_id=${workOrderID.current}`
        );
        setGridDataWeight(result?.data?.data?.rows);
        setIsModalWeightOpen(true);
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
  const onClickSearch = async () => {
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        let conditionLine;
        let conditionProdCD;
        let conditionProdNM;
        inputTextChange.line
          ? (conditionLine = `&line_nm=${inputTextChange.line}`)
          : (conditionLine = "");
        inputTextChange.prod_cd
          ? (conditionProdCD = `&prod_cd=${inputTextChange.prod_cd}`)
          : (conditionProdCD = "");
        inputTextChange.prod_nm
          ? (conditionProdNM = `&prod_nm=${inputTextChange.prod_nm}`)
          : (conditionProdNM = "");
        const result = await restAPI.get(
          restURI.prdOrder +
            `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
            conditionLine +
            conditionProdCD +
            conditionProdNM
        );
        setGridDataHeader(result?.data?.data?.rows);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
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

  const onClickWeightClose = () => {
    resetRequire();
    resetEmp();
    setIsModalWeightOpen(false);
  };

  const onClickGridHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      const Header = refGridHeader?.current?.gridInst;
      prodID.current = Header.getValue(e?.rowKey, "prod_id");
      lineID.current = Header.getValue(e?.rowKey, "line_id");
      lineNM.current = Header.getValue(e?.rowKey, "line_nm");
      lineDeptID.current = Header.getValue(e?.rowKey, "line_dept_id");
      workOrderID.current = Header.getValue(e?.rowKey, "work_order_id");
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
    setIsModalSelectOpen(true);
    actSelectEmp();
  };
  const [removeToggle, setRemoveToggle] = useState(false);
  const onClickRemove = () => {
    resetEmp();
    setRemoveToggle(!removeToggle);
  };
  const onClickWeightSave = async () => {
    if (isBackDrop === false) {
      if (empNM.current !== "") {
        refGridWeight?.current?.gridInst?.finishEditing();
        let result = [];
        for (
          let i = 0;
          i < refGridWeight?.current?.gridInst?.getRowCount();
          i++
        ) {
          result.push(refGridWeight?.current?.gridInst?.getRowAt(i));
        }

        const dataBottom = result.map((raw) => {
          return {
            work_order_input_id: raw.work_order_input_id,
            prod_id: raw.prod_id,
            lot_no: raw.lot_no,
            total_qty: String(raw.total_qty) ? Number(raw.total_qty) : null,
            bag_qty: String(raw.bag_qty) ? Number(raw.bag_qty) : null,
            input_qty: String(raw.input_qty) ? Number(raw.input_qty) : null,
            remark: raw.remark,
          };
        });

        const dataTop = {
          work_order_id: workOrderID.current,
          line_id: lineID.current,
          line_dept_id: lineDeptID.current,
          prod_id: prodID.current,
          work_weigh_date: DateTime().dateFull,
          work_weigh_time: DateTime().hour + ":" + DateTime().minute,
          weigh_emp_id: empID.current,
        };

        const query = {
          header: dataTop,
          details: dataBottom,
        };
        try {
          const result = await restAPI.post(restURI.prdWeightPanel, query);
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
          resetRequire();
          resetEmp();
          setIsModalWeightOpen(false);
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
        alert("계량자 넣어라 새캬");
      }
    }
  };
  const onEditingFinishWeight = (e) => {
    const Grid = refGridWeight?.current?.gridInst;
    if (Condition(e, ["total_qty"])) {
      const beforeQty = e?.value;
      const afterQty = Grid.getValue(e?.rowKey, "bag_qty");
      if (afterQty) {
        Grid?.setValue(e?.rowKey, "input_qty", beforeQty - afterQty);
      } else {
        Grid?.setValue(e?.rowKey, "input_qty", beforeQty);
      }
    }
    if (Condition(e, ["bag_qty"])) {
      const beforeQty = Grid.getValue(e?.rowKey, "total_qty");
      const afterQty = e?.value;
      if (beforeQty) {
        Grid?.setValue(e?.rowKey, "input_qty", beforeQty - afterQty);
      } else {
        Grid?.setValue(e?.rowKey, "input_qty", -e?.value);
      }
    }
  };
  const onClickInputClose = () => {
    resetRequire();
    resetEmp();
    setIsModalInputOpen(false);
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
  };
  const onClickInputSave = () => {
    if (empNM.current !== "") {
    } else {
      alert("투입자 넣어라 새캬");
    }
  };
  const onDblClickGridSelect = (e) => {
    const data = e?.instance?.store?.data?.rawData[e?.rowKey];
    empID.current = data.emp_id;
    empNM.current = data.emp_nm;
    setIsModalSelectOpen(false);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };
  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columns={columns}
        columnOptions={columnOptions}
        rowHeaders={rowHeadersNum}
        data={gridDataHeader}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataHeader]);
  return (
    <>
      <S.ContentsArea isAllScreen={isAllScreen}>
        <S.TopWrap>
          <S.ScreenTitleBox>❇️ 작업지시 List</S.ScreenTitleBox>
          <S.SearchBox>
            <S.SearchCondition>
              <DateRange
                dateText={dateText}
                setDateText={setDateText}
                onClickSearch={onClickSearch}
              />
              <InputSearch
                id={"line"}
                name={"라인명"}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
              />
              <InputSearch
                id={"prod_cd"}
                name={"품번"}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
              />
              <InputSearch
                id={"prod_nm"}
                name={"품목"}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
              />
            </S.SearchCondition>
            <S.SearchButton>
              <BtnWeight onClickSearch={onClickSearch} />
            </S.SearchButton>
          </S.SearchBox>
          <S.GridHeader>{GridHeader}</S.GridHeader>
        </S.TopWrap>
        <S.BottomWrap>
          <S.ContentBottomLeft>
            <S.SelectInfo
              width={"180px"}
              height={"60px"}
              name={"지시일자"}
              nameSize={"20px"}
              namePositionTop={"-25px"}
              nameColor={"white"}
              value={selectInfo.orderDate}
              size={"30px"}
              btn={false}
            />
            <S.SelectInfo
              width={"150px"}
              height={"60px"}
              name={"라인"}
              nameSize={"20px"}
              namePositionTop={"-25px"}
              nameColor={"white"}
              value={selectInfo.line}
              size={"30px"}
              btn={false}
            />
            <S.SelectInfo
              width={"150px"}
              height={"60px"}
              name={"지시수량"}
              nameSize={"20px"}
              namePositionTop={"-25px"}
              nameColor={"white"}
              value={selectInfo.orderQty}
              size={"30px"}
              btn={false}
            />
            <S.SelectInfo
              width={"400px"}
              height={"60px"}
              name={"품번"}
              nameSize={"20px"}
              namePositionTop={"-25px"}
              nameColor={"white"}
              value={selectInfo.prodCD}
              size={"30px"}
              btn={false}
            />
            <S.SelectInfo
              width={"400px"}
              height={"60px"}
              name={"품목"}
              nameSize={"20px"}
              namePositionTop={"-25px"}
              nameColor={"white"}
              value={selectInfo.prodNM}
              size={"30px"}
              btn={false}
            />
          </S.ContentBottomLeft>
          <S.ButtonBox>
            <S.ButtonSet
              color={"#415c76"}
              hoverColor={"#ffc125"}
              onClick={onClickWeight}
            >
              계량
            </S.ButtonSet>
            <S.ButtonSet
              color={"#415c76"}
              hoverColor={"#990b11"}
              onClick={onClickInput}
            >
              투입
            </S.ButtonSet>
          </S.ButtonBox>
        </S.BottomWrap>
        {isModalWeightOpen ? (
          <ModalWeight
            onClickModalClose={onClickWeightClose}
            columnsWeight={columnsWeight}
            columnOptions={columnOptions}
            header={header}
            gridDataWeight={gridDataWeight}
            rowHeadersHeader={rowHeadersNum}
            rowHeadersDetail={rowHeadersNum}
            refGridWeight={refGridWeight}
            onClickSelect={onClickSelect}
            onClickRemove={onClickRemove}
            onClickWeightSave={onClickWeightSave}
            onEditingFinishWeight={onEditingFinishWeight}
            lineNM={lineNM.current}
            empID={empID.current}
            empNM={empNM.current}
          />
        ) : null}
        {isModalInputOpen ? (
          <ModalInput
            onClickModalClose={onClickInputClose}
            columnsInput={columnsInput}
            columnsInputDetail={columnsInputDetail}
            columnOptions={columnOptions}
            header={header}
            gridDataInput={gridDataInput}
            gridDataInputDetail={gridDataInputDetail}
            rowHeadersHeader={rowHeadersNum}
            rowHeadersDetail={rowHeadersNum}
            refGridInput={refGridInput}
            refGridInputDetail={refGridInputDetail}
            onClickSelect={onClickSelect}
            onClickRemove={onClickRemove}
            onClickInputSave={onClickInputSave}
            onClickNowTime={onClickNowTime}
            onClickGridInput={onClickGridInput}
            nowDateTime={nowDateTime}
            lineNM={lineNM.current}
            empID={empID.current}
            empNM={empNM.current}
          />
        ) : null}
        {isModalSelectOpen ? (
          <ModalSelect
            width={modalSelectSize.width}
            height={modalSelectSize.height}
            onClickModalSelectClose={onClickModalSelectClose}
            columns={columnsSelectEmp}
            columnOptions={columnOptions}
            header={header}
            gridDataSelect={gridDataSelect}
            rowHeaders={rowHeadersNum}
            refSelectGrid={refGridSelect}
            onDblClickGridSelect={onDblClickGridSelect}
          />
        ) : null}
      </S.ContentsArea>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </>
  );
}

export default WeightPanel;
