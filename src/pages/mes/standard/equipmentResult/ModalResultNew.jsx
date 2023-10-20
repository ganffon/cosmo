import CloseIcon from "@mui/icons-material/Close";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalResultNew.styled";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import ButtonModule from "components/button/ButtonModule";
import InputNew from "./InputNew";
import BtnComponent from "components/button/BtnComponent";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import BasicTabs from "components/gridtab/gridTab";
import EditTabs from "components/gridtab/gridTabEdit";
import NoticeSnack from "components/alert/NoticeSnack";
import { BackDrop } from "components/backdrop/BackDrop.styled";
import DateTime from "components/datetime/DateTime";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import InputNewTab from "./InputNewTab";

function ModalResultNew(props) {
  const {
    width = "90%",
    height = "90%",
    onClose = () => {},
    refSelectGrid = null,
    columns = [],
    columnOptions = [],
    header = [],
    rowHeaders = [],
    gridDataSelect = [],
    //  onMapping = () => {},
    //onSaveNew = () => {},
    onSelectOrder = () => {},
    onRemoveOrder = () => {},
    onSelectMorning = () => {},
    onRemoveMorning = () => {},
    onSelectAfternoon = () => {},
    onRemoveAfternoon = () => {},
    onSelectNight = () => {},
    onRemoveNight = () => {},
    onTextChange = () => {},
    onTextChangeEdit = () => {},
    dateText = {},
    setDateText = {},
    info = {},
    emp = {},
    mainInfo = {},
    textChange = {},
    refGridArrayModal = [],
    isEditMode = false,
    tabTitleList = [],
    tabTitleLength = 0,
    resetInfo = () => {},
    resetEmp = () => {},
    onClickSearch = () => {},
    onResultNewClose = () => {},
    clickedWorkOrderId = null,
    selectEmpState = null,
    gridTabId,
    employeeList = [],
    flag = null,
    onClickGrid = () => {},
    isSelectEmpOpen = false,
    dataSaveFlag = [],
  } = props;

  /*저장함수 필요변수 시작*/
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isBackDrop, setIsBackDrop] = useState(false);

  const [mappingFlag, setMappingFlag] = useState(false);

  const [workerInfo, setWorkerInfo] = useState([]);

  const [mappingToggle, setMappingToggle] = useState(false);

  const [dateCheck, setDateCheck] = useState({
    checkDate: DateTime().dateFull,
  });
  const [remarkChange, setRemarkChange] = useState({});

  /*저장함수 필요변수 끝*/

  /* 탭 시작 */
  const tabListTmp = useRef([]);

  const [activeTab, setActiveTab] = useState(null);

  const refs = useRef([]);
  // ref 배열 초기화
  useEffect(() => {
    refs.current = [];
    for (let i = 0; i < tabListTmp.current.length; i++) {
      refs.current.push(createRef());
    }
  }, [tabListTmp]);

  // const refGridArrayModal = tabListTmp.current.map((title, index) => ({
  //   ref: refs.current[index],
  // }));

  /**데이터 로드함수 시작 */

  const getActiveTab = () => {
    onMapping();
    setMappingFlag(!mappingFlag);
    valueValidation(activeTab);
  };

  const valueValidation = async (obj) => {
    let gridInstTmp;
    setTimeout(() => {
      gridInstTmp = obj?.current?.getInstance();
      let rawDataTmp = obj?.current?.gridInst?.store?.data?.rawData;
      for (let i = 0; i < rawDataTmp.length; i++) {
        const element = rawDataTmp[i];
        let rowKey = element.rowKey;
        let findRowMor = false,
          findRowAft = false,
          findRowNit = false;
        if (element.spec_min !== null && element.spec_max === null) {
          const specMin = Number(element.spec_min);

          if (element.mng_insp_value !== null && element.mng_insp_value !== "") {
            const morValue = Number(element.mng_insp_value);
            if (specMin > morValue) {
              findRowMor = true;
            }
          }
          if (element.aft_insp_value !== null && element.aft_insp_value !== "") {
            const aftValue = Number(element.aft_insp_value);
            if (specMin > aftValue) {
              findRowAft = true;
            }
          }
          if (element.nig_insp_value !== null && element.nig_insp_value !== "") {
            const nitValue = Number(element.nig_insp_value);
            if (specMin > nitValue) {
              findRowNit = true;
            }
          }
        } else if (element.spec_min === null && element.spec_max !== null) {
          const specMax = Number(element.spec_max);
          if (element.mng_insp_value !== null && element.mng_insp_value !== "") {
            const morValue = Number(element.mng_insp_value);
            if (specMax < morValue) {
              findRowMor = true;
            }
          }
          if (element.aft_insp_value !== null && element.aft_insp_value !== "") {
            const aftValue = Number(element.aft_insp_value);
            if (specMax < aftValue) {
              findRowAft = true;
            }
          }
          if (element.nig_insp_value !== null && element.nig_insp_value !== "") {
            const nitValue = Number(element.nig_insp_value);
            if (specMax < nitValue) {
              findRowNit = true;
            }
          }
        } else if (element.spec_min !== null && element.spec_max !== null) {
          const specMin = Number(element.spec_min);
          const specMax = Number(element.spec_max);
          if (element.mng_insp_value !== null && element.mng_insp_value !== "") {
            const morValue = Number(element.mng_insp_value);
            if (specMax < morValue || specMin > morValue) {
              findRowMor = true;
            }
          }
          if (element.aft_insp_value !== null && element.aft_insp_value !== "") {
            const aftValue = Number(element.aft_insp_value);
            if (specMax < aftValue || specMin > aftValue) {
              findRowAft = true;
            }
          }
          if (element.nig_insp_value !== null && element.nig_insp_value !== "") {
            const nitValue = Number(element.nig_insp_value);
            if (specMax < nitValue || specMin > nitValue) {
              findRowNit = true;
            }
          }
        }
        if (findRowMor === true || findRowAft === true || findRowNit === true) {
          gridInstTmp.addCellClassName(rowKey, "proc_nm", "redText");
          gridInstTmp.addCellClassName(rowKey, "equip_nm", "redText");
          gridInstTmp.addCellClassName(rowKey, "insp_item_type_nm", "redText");
          gridInstTmp.addCellClassName(rowKey, "insp_item_nm", "redText");
          gridInstTmp.addCellClassName(rowKey, "insp_item_desc", "redText");
        } else {
          gridInstTmp.removeCellClassName(rowKey, "proc_nm", "redText");
          gridInstTmp.removeCellClassName(rowKey, "equip_nm", "redText");
          gridInstTmp.removeCellClassName(rowKey, "insp_item_type_nm", "redText");
          gridInstTmp.removeCellClassName(rowKey, "insp_item_nm", "redText");
          gridInstTmp.removeCellClassName(rowKey, "insp_item_desc", "redText");
        }
        if (findRowMor === true) {
          gridInstTmp.addCellClassName(rowKey, "mng_insp_value", "redText");
        } else {
          gridInstTmp.removeCellClassName(rowKey, "mng_insp_value", "redText");
        }
        if (findRowAft === true) {
          gridInstTmp.addCellClassName(rowKey, "aft_insp_value", "redText");
        } else {
          gridInstTmp.removeCellClassName(rowKey, "aft_insp_value", "redText");
        }
        if (findRowNit === true) {
          gridInstTmp.addCellClassName(rowKey, "nig_insp_value", "redText");
        } else {
          gridInstTmp.removeCellClassName(rowKey, "nig_insp_value", "redText");
        }
      }
    }, 400);
  };

  const onMapping = async () => {
    let timeString = DateTime().hour + ":" + DateTime().minute + ":" + DateTime().seconds;

    const morningStart = "06:00:00";
    const morningEnd = "13:59:59";

    const afternoonStart = "14:00:00";
    const afternoonEnd = "21:59:59";

    if (morningStart <= timeString && timeString <= morningEnd) {
      if (activeTab?.current?.gridInst?.store?.data?.rawData?.length > 0) {
        const workOrderIdForNew = activeTab?.current?.gridInst.store.data.rawData[0].work_order_id;
        if (workOrderIdForNew === null || workOrderIdForNew === "" || workOrderIdForNew === undefined) {
          await getRawData(clickedWorkOrderId.current, "mng_insp_value");
        } else {
          await getRawData(workOrderIdForNew, "mng_insp_value");
        }
      }
    } else if (afternoonStart <= timeString && timeString <= afternoonEnd) {
      if (activeTab?.current?.gridInst?.store?.data?.rawData?.length > 0) {
        const workOrderIdForNew = activeTab?.current?.gridInst.store.data.rawData[0].work_order_id;

        if (workOrderIdForNew === null || workOrderIdForNew === "" || workOrderIdForNew === undefined) {
          await getRawData(clickedWorkOrderId.current, "aft_insp_value");
        } else {
          await getRawData(workOrderIdForNew, "aft_insp_value");
        }
      }
    } else {
      if (activeTab?.current?.gridInst?.store?.data?.rawData?.length > 0) {
        const workOrderIdForNew = activeTab?.current?.gridInst.store.data.rawData[0].work_order_id;

        if (workOrderIdForNew === null || workOrderIdForNew === "" || workOrderIdForNew === undefined) {
          await getRawData(clickedWorkOrderId.current, "nig_insp_value");
        } else {
          await getRawData(workOrderIdForNew, "nig_insp_value");
        }
      }
    }
  };

  const getRawData = async (workOrderId, Term) => {
    const result = await restAPI.get(restURI.getOrderDetailsRawData + "?work_order_id=" + workOrderId);
    const rowLength = result?.data?.data?.count;
    const rowData = result?.data?.data?.rows;
    const GridRowDataLength = activeTab?.current?.gridInst?.store?.data?.rawData?.length;

    const GridRowData = activeTab?.current?.gridInst;
    for (let i = 0; i < GridRowDataLength; i++) {
      for (let j = 0; j < rowLength; j++) {
        if (GridRowData?.store?.data?.rawData[i].tag_id === rowData[j].node_id) {
          GridRowData?.setValue(GridRowData.store.data.rawData[i].rowKey, Term, String(rowData[j].value));
        }
      }
    }
    setMappingToggle(!mappingToggle);
  };

  /**데이터 로드함수 종료 */

  /**저장 함수 시작 */
  const onSaveNew = async () => {
    setMappingToggle(!mappingToggle);
    if (!isBackDrop) {
      if (!isEditMode) {
        if (info.orderId) {
          setIsBackDrop(true);
          const dataHeader = {
            work_order_id: info.orderId,
            line_dept_id: info.lineDeptId,
            line_id: info.lineId,
            prod_id: info.prodId,
            insp_result_date: dateCheck.checkDate,
            remark: remarkChange.remark ? remarkChange.remark : null,
          };

          let result = [];
          for (let i = 0; i < refGridArrayModal.length; i++) {
            const Grid = refGridArrayModal[i]?.current?.gridInst;
            Grid?.finishEditing();
            for (let i = 0; i < Grid?.getRowCount(); i++) {
              result.push(Grid?.getRowAt(i));
            }
          }
          const dataDetail = result.map((raw) => {
            return {
              work_order_detail_id: raw.work_order_detail_id,
              mng_insp_value: raw.mng_insp_value,
              aft_insp_value: raw.aft_insp_value,
              nig_insp_value: raw.nig_insp_value,
              insp_result_fg: null,
              remark: raw.remark,
            };
          });
          let workerResult = [];

          for (let i = 0; i < workerInfo.length; i++) {
            workerResult.push(workerInfo[i]);
          }

          const dataEmps = workerResult.map((raw) => {
            return {
              insp_filing_id: raw[0].tabId ? raw[0].tabId : null,
              mng_emp_id: raw[0].mngEmpId ? raw[0].mngEmpId : null,
              aft_emp_id: raw[0].aftEmpId ? raw[0].aftEmpId : null,
              nig_emp_id: raw[0].nigEmpId ? raw[0].nigEmpId : null,
            };
          });

          const query = {
            header: dataHeader,
            details: dataDetail,
            emps: dataEmps,
          };
          try {
            const result = await restAPI.post(restURI.qmsInspResult, query);
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: result?.data?.message,
              severity: "success",
              location: "bottomRight",
            });
            resetInfo();
            resetEmp();

            onResultNewClose();
            onClickSearch();
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
      } else {
        setIsBackDrop(true);
        const dataHeader = {
          insp_result_id: mainInfo.inspResultId,
          insp_result_date: mainInfo.inspResultDate ? mainInfo.inspResultDate : dateCheck.checkDate,

          remark: mainInfo.remark ? mainInfo.remark : null,
        };
        let result = [];
        for (let i = 0; i < refGridArrayModal.length; i++) {
          const Grid = refGridArrayModal[i]?.current?.gridInst;
          Grid?.finishEditing();
          for (let i = 0; i < Grid?.getRowCount(); i++) {
            result.push(Grid?.getRowAt(i));
          }
        }
        const dataDetail = result.map((raw) => {
          return {
            insp_result_detail_id: raw.insp_result_detail_id,
            mng_insp_value: raw.mng_insp_value,
            aft_insp_value: raw.aft_insp_value,
            nig_insp_value: raw.nig_insp_value,
            insp_result_fg: null,
            remark: raw.remark,
          };
        });
        let workerResult = [];

        for (let i = 0; i < workerInfo.length; i++) {
          workerResult.push(workerInfo[i]);
        }

        const dataEmps = workerResult.map((raw) => {
          return {
            insp_result_emp_id: raw[0].resultEmpId ? raw[0].resultEmpId : null,
            mng_emp_id: raw[0].mngEmpId ? raw[0].mngEmpId : null,
            aft_emp_id: raw[0].aftEmpId ? raw[0].aftEmpId : null,
            nig_emp_id: raw[0].nigEmpId ? raw[0].nigEmpId : null,
          };
        });
        const query = {
          header: dataHeader,
          details: dataDetail,
          emps: dataEmps,
        };
        try {
          const result = await restAPI.put(restURI.qmsInspResultInclude.replace("{id}", mainInfo.inspResultId), query);
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
          resetInfo();
          resetEmp();

          onResultNewClose();
          onClickSearch();
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
    }
  };
  /**저장 함수 종료 */

  const GridTab = useMemo(() => {
    return (
      <EditTabs
        tabLength={tabTitleLength}
        gridTabTitle={tabTitleList}
        columnOptions={columnOptions}
        rowHeaders={rowHeaders}
        columns={columns}
        refGrid={refGridArrayModal}
        header={header}
        data={gridDataSelect}
        height={"520px"}
        getActiveGrid={setActiveTab}
        mappingToggle={mappingToggle}
        InfoButton={true}
        onSelectMorning={onSelectMorning}
        onRemoveMorning={onRemoveMorning}
        onSelectAfternoon={onSelectAfternoon}
        onRemoveAfternoon={onRemoveAfternoon}
        onSelectNight={onSelectNight}
        onRemoveNight={onRemoveNight}
        emp={emp}
        selectEmpState={selectEmpState}
        gridTabId={gridTabId}
        setWorkerInfo={setWorkerInfo}
        empListTemp={employeeList}
        flag={flag}
        mappingFlag={mappingFlag}
        isSelectEmpOpen={isSelectEmpOpen}
        validationFunction={valueValidation}
        isEditOrNewFlag={true}
      />
    );
  }, [refGridArrayModal, emp, mappingFlag]);

  /**탭 종료 */

  // ModalResultNew 컴포넌트
  const selectedObjectRef = useRef(null); // useRef로 선택된 객체를 참조할 변수 생성

  const InputNews = useMemo(() => {
    return (
      <InputNew
        onSelectOrder={onSelectOrder}
        onRemoveOrder={onRemoveOrder}
        onSelectMorning={onSelectMorning}
        onRemoveMorning={onRemoveMorning}
        onSelectAfternoon={onSelectAfternoon}
        onRemoveAfternoon={onRemoveAfternoon}
        onSelectNight={onSelectNight}
        onRemoveNight={onRemoveNight}
        dateText={dateText}
        setDateText={setDateText}
        info={info}
        emp={emp}
        mainInfo={mainInfo}
        // onTextChange={onTextChange}
        // onTextChangeEdit={onTextChangeEdit}
        textChange={textChange}
        isEditMode={isEditMode}
      />
    );
  }, [emp, mainInfo, info]);

  return (
    <ModalWrapMulti width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{isEditMode ? `[일일운전점검일지 수정]` : `[일일운전점검일지 신규]`}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ContentsArea>
        <S.ButtonWrap>
          <BtnComponent
            btnName={"Mapping"}
            width={"130px"}
            onClick={getActiveTab}
            toolTipTitle={"dataMapping"}
          ></BtnComponent>

          <ButtonModule saveBtn={true} onClickSave={onSaveNew} />
        </S.ButtonWrap>
        <S.ContentsTop>{InputNews}</S.ContentsTop>
        <S.ContentsBottom>{GridTab}</S.ContentsBottom>
      </S.ContentsArea>

      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ModalWrapMulti>
  );
}

export default ModalResultNew;
