import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ContentsArea from "components/layout/common/ContentsArea";
import InputSearch from "components/input/InputSearch";
import * as S from "pages/mes/style/oneGrid.styled";
import * as LS from "./QualitySpc.styled.js";
import GridSingle from "components/grid/GridSingle";
import DateTime from "components/datetime/DateTime.js";
import QualitySpcSet from "./QualitySpcSet.jsx";
import InputPaper from "components/input/InputPaper.jsx";
import BtnComponent from "components/button/BtnComponent.jsx";
import ModalSelect from "components/modal/ModalSelect.jsx";
import * as uSearch from "custom/useSearch";
import NoticeSnack from "components/alert/NoticeSnack.jsx";
import BackDrop from "components/backdrop/BackDrop.jsx";
import restURI from "json/restURI.json";
import useInputSet from "custom/useInputSet.js";
import restAPI from "api/restAPI.js";
import Condition from "custom/Condition";
import * as disRow from "custom/useDisableRowCheck";
import * as uSave from "custom/useSave";
import * as uEdit from "custom/useEdit";
import Chart from "react-apexcharts";
import ModalNew from "components/modal/ModalNew.jsx";
import NoticeAlertModal from "components/alert/NoticeAlertModal.jsx";
import * as uDelete from "custom/useDelete";
import * as col from "custom/GridColumnSet";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import ModalDate from "components/modal/ModalDate";

function QualitySpc(props) {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalManageSelectOpen, setIsModalManageSelectOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"
  const [dblClickRowKey, setDblClickRowKey] = useState(); //🔸DblClick 했을 때의 rowKey 값
  const [columnsSelect, setColumnsSelect] = useState([]);
  const [gridDataSelect, setGridDataSelect] = useState(null);
  const [manageData, setManageData] = useState(null);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [gridModalSelectData, setGridModalSelectData] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [dateModal, setDateModal] = useState({
    startDate: DateTime().dateFull,
  });
  const [cp, setCp] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [cpl, setCpl] = useState(0);
  const [cpk, setCpk] = useState(0);
  const [xbarChartData, setXbarChartData] = useState(null);
  const [rChartData, setRChartData] = useState(null);
  const [spcGridData, setSpcGridData] = useState(null);
  const [lotNo, setLotNo] = useState("");
  const [inspVal, setInspVal] = useState("");
  const refSingleGrid = useRef(null);
  const refSecondGrid = useRef(null);
  const refGridModalSelect = useRef(null);
  const refModalGrid = useRef(null);
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(isEditMode, refSingleGrid);
  const [gridDataHeader, setGridDataHeader] = useState(null);
  const prodID = useRef("");
  const workOrderId = useRef("");
  const lineNm = useRef("라인명");
  const prodNM = useRef("품목명");
  const prodCD = useRef("품목코드");
  const inspItemNm = useRef("관리항목");
  const procNm = useRef("공정명");
  const equipNm = useRef("설비명");
  const [sampleCnt, setSampleCnt] = useState(5);
  const specMin = useRef("LSL");
  const specMax = useRef("USL");
  const memoryId = useRef("");
  const [realColumns, setRealColumns] = useState([col.text("date", CN.work_date, false, false, false, C.WIDTH_SHORT)]);
  const resetRef = () => {
    prodID.current = "품목코드";
    prodCD.current = "품목코드";
    prodNM.current = "품목명";
    workOrderId.current = "";
    lineNm.current = "라인명";
    inspItemNm.current = "관리항목";
    procNm.current = "공정명";
    equipNm.current = "설비명";
    specMin.current = "LSL";
    specMax.current = "USL";
    memoryId.current = "";
  };
  const resetManageRef = () => {
    inspItemNm.current = "관리항목";
    procNm.current = "공정명";
    equipNm.current = "설비명";
    specMin.current = "LSL";
    specMax.current = "USL";
    memoryId.current = "";
  };
  // useEffect(() => {
  //   //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
  //   refSingleGrid?.current?.gridInst?.refreshLayout();
  // }, [isMenuSlide]);
  const SWITCH_NAME_01 = "inspectionResultUpload";

  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });

  const {
    columns,
    columnOptions,
    columnsModal,
    columnProdSelect,
    rowHeaders,
    rowHeadersModal,
    header,
    inputSet,
    columnsSelectProd,
    columnsSelectManage,
    rowHeadersNum,
  } = QualitySpcSet(isEditMode);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };

  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };

  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };

  const onDblClickGridModal = (e) => {
    if (Condition(e, ["prod_id", "prod_cd", "prod_nm"])) {
      setDblClickRowKey(e?.rowKey);
      setDblClickGrid("ModalSelectProd");
      setColumnsSelect(columnProdSelect);
      setIsModalSelectOpen(true);

      actSelectProd();
    }
  };

  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickEditModeSave = () => {
    actEdit();
  };
  const [actEdit] = uEdit.useEdit(
    refSingleGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.inspectionResultUpload
  );

  const onClickEditModeExit = () => {
    setIsEditMode(false);
    setDisableRowToggle(!disableRowToggle);
    onClickSearch();
  };

  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setDisableRowToggle(!disableRowToggle);
    setIsEditMode(true);
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };

  const handleDelete = () => {
    const handleAsync = async () => {
      await actDelete();
      onClickSearch();
    };
    handleAsync();
  };
  const [actDelete] = uDelete.useDelete(
    refSingleGrid,
    isBackDrop,
    isEditMode,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setIsDeleteAlertOpen,
    searchToggle,
    setSearchToggle,
    restURI.inspectionResultUpload,
    SWITCH_NAME_01
  );

  const onClickModalSave = () => {
    actSave();
    onClickSearch();
  };
  const [actSave] = uSave.useSave(
    refModalGrid,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    SWITCH_NAME_01,
    restURI.inspectionResultUpload,
    onClickModalClose
  );
  const onClickProd = () => {
    setDblClickGrid("Search");
    setColumnsSelect(columnsSelectProd);
    setIsModalSelectOpen(true);
    onClickSelectSearch();
    actSelectProd();
  };
  const onClickManage = () => {
    if (lineNm.current === "라인명") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "라인명을 선택 해주세요.",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    setDblClickGrid("Manage");
    setColumnsSelect(columnsSelectManage);
    setIsModalManageSelectOpen(true);
    actSelectManage();
  };
  const onClickModalSelectClose = () => {
    setIsModalSelectOpen(false);
    setIsModalManageSelectOpen(false);
  };
  const onClickManageModalSelectClose = () => {
    setIsModalManageSelectOpen(false);
  };
  function onClickModalClose() {
    setIsModalOpen(false);
    actSearch();
  }

  const onClickProdCancel = () => {
    resetRef();
    setInputSearchValue([]);
  };
  const onClickManageCancel = () => {
    resetManageRef();
    setInputSearchValue([]);
  };
  const [actSelectProd] = uSearch.useSearchSelect(
    refGridModalSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setGridDataSelect,
    // restURI.product
    restURI.prdOrder + `?start_date=${dateText.startDate}&end_date=${dateText.endDate}&`
  ); //➡️ Modal Select Search Prod
  const [actSelectManage] = uSearch.useSearchSelect(
    refGridModalSelect,
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    setManageData,
    // restURI.product
    restURI.prdOrderDetail + `?work_order_id=${workOrderId.current}&`
    // /prd/order-input?work_order_id=${workOrderId.current}
  );
  // useEffect(() => {
  //   onClickSearch();
  // }, []);
  const searchSelectProdList = async () => {
    try {
      let readURI = restURI.prdOrder + `?reg_date=${dateModal.startDate}&`;

      setIsBackDrop(true);

      let gridData = await restAPI.get(readURI);

      setGridModalSelectData(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };
  const onClickSelectSearch = () => {
    searchSelectProdList();
  };
  const onClickSearch = () => {
    //
    try {
      actSearchGridTop();

      const updatedColumns = [col.text("date", CN.work_date, false, false, false, C.WIDTH_SHORT)];

      for (let i = 1; i <= sampleCnt; i++) {
        updatedColumns.push(col.text("sample" + i, "시료 " + i, false, false, false, C.WIDTH_SHORT));
      }

      updatedColumns.push(
        col.text("avg", CN.average, false, false, false, C.WIDTH_SHORT),
        col.text("deviation", CN.diviation, false, false, false, C.WIDTH_SHORT)
      );

      setRealColumns(updatedColumns);
      actSearch();
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const actSearchGridTop = async () => {
    setIsBackDrop(true);
    try {
      let readURI = `/prd/order?start_date=${dateText.startDate}&end_date=${dateText.endDate}&`;
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
              readURI = readURI + inputBoxID[i] + "=" + inputTextChange[inputBoxID[i]] + "&";
            }
          }
          //🔸마지막에 찍힌 & 기호 제거
          readURI = readURI.slice(0, readURI.length - 1);
        }
      } else {
        readURI = readURI.slice(0, readURI.length - 1);
      }
      let gridData = await restAPI.get(readURI);

      setGridDataHeader(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setDisableRowToggle(!disableRowToggle);
      setIsBackDrop(false);
    }
  };

  const GetSPCData = async () => {
    if (inspItemNm.current === "관리항목") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "관리항목을 선택 해주세요.",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
    setIsBackDrop(true);
    restAPI
      .get(restURI.spc, {
        params: {
          start_date: dateText.startDate,
          end_date: dateText.endDate,
          sample_cnt: sampleCnt,
          // tag_id: "ns=2;s=E1_PLC.E1_PLC.ACM_01_1_RPM.PV", //memoryId.current,
          // lsl: 930, //specMin.current,
          // usl: 940, //specMax.current,

          tag_id: memoryId.current,
          lsl: specMin.current,
          usl: specMax.current,
        },
      })
      .then((response) => {
        const xbarseries = response?.data?.data?.rows[0].xbar;

        setXbarChartData(xbarseries);
        setRChartData(response?.data?.data?.rows[0].r);
        setSpcGridData(response?.data?.data?.rows[0].grid);
        setCp(response?.data?.data?.rows[0].processCapacity.cp);
        setCpu(response?.data?.data?.rows[0].processCapacity.cpu);
        setCpl(response?.data?.data?.rows[0].processCapacity.cpl);
        setCpk(response?.data?.data?.rows[0].processCapacity.cpk);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      })
      .finally(() => {
        setIsBackDrop(false);
      });
  };

  const actSearch = async () => {
    setIsBackDrop(true);
    try {
      GetSPCData();
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const cOptions = {
    stroke: {
      width: 3,
      curve: "straight",
      dashArray: [8, 8, 8, 8, 8, 0],
    },
    title: {
      text: "X-bar Chart",
      align: "left",
    },
    colors: ["#FF4500", "#FF4500", "#FFD700", "#FFD700", "#00E396", "#0090FF"],

    dataLabels: {
      color: ["#000000"],
      style: {
        colors: ["black"],
      },
      enabled: false,
    },
  };
  const rChartOptions = {
    stroke: {
      width: 3,
      curve: "straight",
      dashArray: [8, 8, 8, 0],
    },
    title: {
      text: "R Chart",
      align: "left",
    },
    colors: ["#FFD700", "#00E396", "#FFD700", "#0090FF"],

    dataLabels: {
      color: ["#000000"],
      style: {
        colors: ["black"],
      },
      enabled: false,
    },
  };

  const onDblClickGridSelect = (e) => {
    //🔸Select Grid에서 DblClick
    let refGrid;
    let columnName = ["prod_cd", "prod_nm", "line_nm", "work_order_id"];
    let manageColumnName = ["insp_item_nm", "proc_nm", "equip_nm", "spec_min", "spec_max", "tag_id"];
    if (dblClickGrid === "Search") {
      prodNM.current = "";
      for (let i = 0; i < columnName.length; i++) {
        if (columnName[i] === "prod_cd") {
          prodCD.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
        if (columnName[i] === "prod_nm") {
          prodNM.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
        if (columnName[i] === "line_nm") {
          lineNm.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
        if (columnName[i] === "work_order_id") {
          workOrderId.current = e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]];
        }
      }
    } else if (dblClickGrid === "ModalSelectProd") {
      refGrid = refModalGrid;

      for (let i = 0; i < columnName.length; i++) {
        refGrid?.current?.gridInst?.setValue(dblClickRowKey, columnName[i], e?.instance?.store?.data?.rawData[e?.rowKey][columnName[i]]);
      }
    } else if (dblClickGrid === "Manage") {
      refGrid = refModalGrid;

      for (let i = 0; i < manageColumnName.length; i++) {
        if (manageColumnName[i] === "insp_item_nm") {
          inspItemNm.current = e?.instance?.store?.data?.rawData[e?.rowKey][manageColumnName[i]];
        }
        if (manageColumnName[i] === "proc_nm") {
          procNm.current = e?.instance?.store?.data?.rawData[e?.rowKey][manageColumnName[i]];
        }
        if (manageColumnName[i] === "equip_nm") {
          equipNm.current = e?.instance?.store?.data?.rawData[e?.rowKey][manageColumnName[i]];
        }
        if (manageColumnName[i] === "spec_min") {
          specMin.current = e?.instance?.store?.data?.rawData[e?.rowKey][manageColumnName[i]];
        }
        if (manageColumnName[i] === "spec_max") {
          specMax.current = e?.instance?.store?.data?.rawData[e?.rowKey][manageColumnName[i]];
        }
        if (manageColumnName[i] === "tag_id") {
          memoryId.current = e?.instance?.store?.data?.rawData[e?.rowKey][manageColumnName[i]];
        }
      }
    }
    disRow.handleGridSelectCheck(refGrid, dblClickRowKey);
    setIsModalSelectOpen(false);
    setIsModalManageSelectOpen(false);
  };
  const handleChange = (event) => {
    let targetVal = event.target.value;
    if (event.target.value > 10) {
      targetVal = 10;
    } else if (event.target.value < 3) {
      targetVal = 3;
    }
    setSampleCnt(targetVal);
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  const GridModalSelect = useMemo(() => {
    return (
      <ModalNew
        onClickModalAddRow={onClickModalAddRow}
        onClickModalCancelRow={onClickModalCancelRow}
        onClickModalSave={onClickModalSave}
        onClickModalClose={onClickModalClose}
        columns={columnsModal}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersModal}
        refModalGrid={refModalGrid}
        onClickModalGrid={onClickModalGrid}
        onDblClickModalGrid={onDblClickGridModal}
      />
    );
  }, []);
  return (
    <ContentsArea>
      <LS.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <LS.EachToolWrap>
          <S.ToolWrap>
            <LS.SearchWrap>
              <LS.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
            </LS.SearchWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={onClickSearch} />
            </S.ButtonWrap>
          </S.ToolWrap>
          <S.ToolWrap>
            <LS.SearchWrap>
              <LS.InputPaperWrap>
                <InputPaper
                  width={"240px"}
                  name={"라인명"}
                  value={lineNm.current || ""}
                  btn={true}
                  onClickSelect={onClickProd}
                  onClickRemove={onClickProdCancel}
                />
              </LS.InputPaperWrap>
              <LS.InputPaperWrap>
                <InputPaper width={"180px"} name={"품목코드"} value={prodCD.current || ""} btn={false} />
              </LS.InputPaperWrap>
              <LS.InputPaperWrap>
                <InputPaper width={"180px"} name={"품목명"} value={prodNM.current || ""} btn={false} />
              </LS.InputPaperWrap>
            </LS.SearchWrap>
          </S.ToolWrap>
          <S.ToolWrap>
            <LS.SearchWrap>
              <LS.InputPaperWrap>
                <InputPaper
                  width={"240px"}
                  name={"관리항목"}
                  value={inspItemNm.current || ""}
                  btn={true}
                  onClickSelect={onClickManage}
                  onClickRemove={onClickManageCancel}
                />
              </LS.InputPaperWrap>
              <LS.InputPaperWrap>
                <InputPaper width={"180px"} name={"공정명"} value={procNm.current || ""} btn={false} />
              </LS.InputPaperWrap>
              <LS.InputPaperWrap>
                <InputPaper width={"180px"} name={"설비명"} value={equipNm.current || ""} btn={false} />
              </LS.InputPaperWrap>
              <LS.InputPaperWrap>
                <LS.InputText id="outlined-number" label="시료수" type="number" onChange={handleChange} value={sampleCnt} size="small" />
              </LS.InputPaperWrap>
              <LS.InputPaperWrap>
                <InputPaper width={"180px"} name={"LSL"} value={specMin.current || ""} btn={false} />
              </LS.InputPaperWrap>
              <LS.InputPaperWrap>
                <InputPaper width={"180px"} name={"USL"} value={specMax.current || ""} btn={false} />
              </LS.InputPaperWrap>
            </LS.SearchWrap>
          </S.ToolWrap>
        </LS.EachToolWrap>
      </LS.ShadowBoxButton>
      <LS.ShadowBoxGrid isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        {/* <LS.ColGridContainer rowTemplate={"70% 30%"}> */}
        <LS.CntGridContainer>
          {/* <LS.CntGridContainer rowTemplate={"100% 0%"}> */}
          <LS.ChartWrap>
            {xbarChartData && <Chart id={"chart"} options={cOptions} series={xbarChartData} type="line" width={"99%"} height={"99%"} />}
          </LS.ChartWrap>
          <LS.ChartWrap>
            {rChartData && <Chart id={"chart"} options={rChartOptions} series={rChartData} type="line" width={"99%"} height={"99%"} />}
          </LS.ChartWrap>
        </LS.CntGridContainer>
        {/* <LS.ChartWrap>
          {stackedTmpData && <Chart id={"chart"} options={cOptions} series={stackedTmpData} type="bar" width={"99%"} height={"99%"} />}
        </LS.ChartWrap> */}
        {/* </LS.ColGridContainer> */}
        <LS.ColGridContainer height="30%" rowTemplate={"80% 20%"}>
          <LS.GridWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={realColumns}
              header={header}
              data={spcGridData}
              draggable={false}
              refGrid={refSingleGrid}
              isEditMode={isEditMode}
            />
          </LS.GridWrap>
          <LS.ChartWrap customHeight={"100%"}>
            <LS.CntGridContainer rowTemplate={"20% 20% 20% 20% 20%"}>
              <LS.Title>공정 능력 지수{cp}</LS.Title>
              <LS.Title>Cp : {cp}</LS.Title>
              <LS.Title>Cpl : {cpl}</LS.Title>
              <LS.Title>Cpu : {cpu}</LS.Title>
              <LS.Title>Cpk : {cpk}</LS.Title>
            </LS.CntGridContainer>
          </LS.ChartWrap>
        </LS.ColGridContainer>
      </LS.ShadowBoxGrid>
      {isModalOpen ? GridModalSelect : null}
      {isModalSelectOpen ? (
        <ModalDate
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSearch={onClickSelectSearch}
          onClickModalClose={onClickModalSelectClose}
          columns={columnsSelect}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersModal}
          // refModalGrid={refGridModalSelect}
          dateText={dateModal}
          setDateText={setDateModal}
          datePickerSet={"single"}
          buttonType={"Search"}
          // data={gridDataSelect}
          data={gridModalSelectData}
          refGridSelect={refGridModalSelect}
          onDblClickModalGrid={onDblClickGridSelect}
        />
      ) : // <ModalSelect
      // width={modalSelectSize.width}
      // height={modalSelectSize.height}
      // onClickModalSelectClose={onClickModalSelectClose}
      // columns={columnsSelectProd}
      // columnOptions={columnOptions}
      // header={header}
      // gridDataSelect={gridDataSelect}
      // rowHeaders={rowHeadersNum}
      // refGridSelect={refGridModalSelect}
      // onDblClickGridSelect={onDblClickGridSelect}
      // />
      null}
      {isModalManageSelectOpen ? (
        <ModalSelect
          width={modalSelectSize.width}
          height={modalSelectSize.height}
          onClickModalSelectClose={onClickModalSelectClose}
          columns={columnsSelectManage}
          columnOptions={columnOptions}
          header={header}
          gridDataSelect={manageData}
          rowHeaders={rowHeadersNum}
          refGridSelect={refGridModalSelect}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      {isDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      ) : null}

      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default QualitySpc;
