import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as S from "./gridTab.styled";
import GridSingle from "components/grid/GridSingle";
import LineSet from "pages/mes/standard/line/LineSet";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import InputNew from "pages/mes/standard/equipmentResult/InputNew";
import InputNewTab from "pages/mes/standard/equipmentResult/InputNewTab";
import { useEffect, useMemo, useRef, useState } from "react";

function GridTab(props) {
  const {
    tabLength,
    gridTabTitle,
    gridTabId,
    tabListCode = [],
    rowHeaders,
    refGrid,
    refCurrentGrid,
    columnOptions,
    columns,
    header,
    data,
    height = "500px",
    getActiveGrid = () => {},
    InfoButton = false,
    onSelectMorning = () => {},
    onRemoveMorning = () => {},
    onSelectAfternoon = () => {},
    onRemoveAfternoon = () => {},
    onSelectNight = () => {},
    onRemoveNight = () => {},
    emp = {},
    selectEmpState = null,
    setWorkerInfo = () => {},
    empListTemp = [],
    flag = false,
    setActiveTab = () => {},
    setWorkerDataForExcel = () => {},
    setFileNameForExcelExport = () => {},
  } = props;
  const [value, setValue] = useState(0);
  const [toggle, setToggle] = useState(false);

  const [workerData, setWorkerData] = useState([]);
  const [errorCountArr, setErrorCountArr] = useState([]);
  const [nullCountArr, setNullErrorCountArr] = useState([]);
  const dataSetArr = [];
  const splitDataSetArrTmp = [];

  const [splitDataSetArr, setSplitDataSetArr] = useState([]); // splitDataSetArr 상태 추가

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{ height: "100%" }}
        {...other}
      >
        {children}
      </div>
    );
  }

  const initializeWorker = () => {
    const initialWorkerData = gridTabTitle.map(() => [
      {
        tabId: "",
        resultEmpId: "",
        mngEmpId: "",
        mngEmpNm: "",
        aftEmpId: "",
        aftEmpNm: "",
        nigEmpId: "",
        nigEmpNm: "",
      },
    ]);
    for (let i = 0; i < tabLength; i++) {
      initialWorkerData[i][0].tabId = gridTabId[i];
    }
    setWorkerData(initialWorkerData);
  };

  const getErrorCount = (obj) => {
    let tempArr = [];
    let tempNullArr = [];

    for (let i = 0; i < obj.length; i++) {
      let morCounter = 0;
      let morNullCounter = 0;
      let aftCounter = 0;
      let aftNullCounter = 0;
      let nigCounter = 0;
      let nigNullCounter = 0;
      for (let j = 0; j < obj[i].length; j++) {
        const tempData = obj[i][j];

        if (
          tempData.mng_insp_value !== "" &&
          tempData.mng_insp_value !== null &&
          tempData.mng_insp_value !== undefined
        ) {
          const morValue = Number(tempData.mng_insp_value);
          if (tempData.spec_max !== null && tempData.spec_min === null) {
            // 최소값이 없는경우
            if (tempData.spec_max < morValue) {
              morCounter = morCounter + 1;
            }
          } else if (tempData.spec_max === null && tempData.spec_min !== null) {
            //최대값이 없는경우
            if (tempData.spec_min > morValue) {
              morCounter = morCounter + 1;
            }
          } else if (tempData.spec_max !== null && tempData.spec_min !== null) {
            if (tempData.spec_min > morValue || tempData.spec_max < morValue) {
              morCounter = morCounter + 1;
            }
          }
        } else {
          morNullCounter = morNullCounter + 1;
        }

        if (
          tempData.aft_insp_value !== "" &&
          tempData.aft_insp_value !== null &&
          tempData.aft_insp_value !== undefined
        ) {
          const aftValue = Number(tempData.aft_insp_value);
          if (tempData.spec_max !== null && tempData.spec_min === null) {
            // 최소값이 없는경우
            if (tempData.spec_max < aftValue) {
              aftCounter = aftCounter + 1;
            }
          } else if (tempData.spec_max === null && tempData.spec_min !== null) {
            //최대값이 없는경우
            if (tempData.spec_min > aftValue) {
              aftCounter = aftCounter + 1;
            }
          } else if (tempData.spec_max !== null && tempData.spec_min !== null) {
            if (tempData.spec_min > aftValue || tempData.spec_max < aftValue) {
              aftCounter = aftCounter + 1;
            }
          }
        } else {
          aftNullCounter = aftNullCounter + 1;
        }

        if (
          tempData.nig_insp_value !== "" &&
          tempData.nig_insp_value !== null &&
          tempData.nig_insp_value !== undefined
        ) {
          const nigValue = Number(tempData.nig_insp_value);
          if (tempData.spec_max !== null && tempData.spec_min === null) {
            // 최소값이 없는경우
            if (tempData.spec_max < nigValue) {
              nigCounter = nigCounter + 1;
            }
          } else if (tempData.spec_max === null && tempData.spec_min !== null) {
            //최대값이 없는경우
            if (tempData.spec_min > nigValue) {
              nigCounter = nigCounter + 1;
            }
          } else if (tempData.spec_max !== null && tempData.spec_min !== null) {
            if (tempData.spec_min > nigValue || tempData.spec_max < nigValue) {
              nigCounter = nigCounter + 1;
            }
          }
        } else {
          nigNullCounter = nigNullCounter + 1;
        }
      }
      tempArr[i] = [morCounter, aftCounter, nigCounter];
      tempNullArr[i] = [morNullCounter, aftNullCounter, nigNullCounter];
    }
    setNullErrorCountArr(tempNullArr);
    setErrorCountArr(tempArr);
  };

  const setWorkerListData = () => {
    for (let i = 0; i < workerData.length; i++) {
      const empInst = empListTemp?.current;

      for (let j = 0; j < empInst.length; j++) {
        if (
          workerData[i][0]?.tabId === empInst[j].insp_filing_id ||
          workerData[i]?.tabId === empInst[j].insp_filing_id
        ) {
          workerData[i] = {
            ...workerData[i][0],
            tabId: empInst[j].insp_filing_id,
            mngEmpId: empInst[j].mng_emp_id,
            mngEmpNm: empInst[j].mng_emp_nm,
            aftEmpId: empInst[j].aft_emp_id,
            aftEmpNm: empInst[j].aft_emp_nm,
            nigEmpId: empInst[j].nig_emp_id,
            nigEmpNm: empInst[j].nig_emp_nm,
          };
        }
      }
    }
    setWorkerDataForExcel(workerData[value]);
    setWorkerData(workerData);

    if (empListTemp?.current?.length === 0) {
      const initialWorkerData = gridTabTitle.map(() => [
        {
          tabId: "",
          mngEmpId: "",
          mngEmpNm: "",
          aftEmpId: "",
          aftEmpNm: "",
          nigEmpId: "",
          nigEmpNm: "",
        },
      ]);
      for (let i = 0; i < initialWorkerData.length; i++) {
        initialWorkerData[i][0].tabId = gridTabId[i];
      }
      setWorkerDataForExcel(initialWorkerData[value]);
      setWorkerData(initialWorkerData);
    }
    setToggle(!toggle);
  };

  const valueValidation = async (grids) => {
    let gridInstTmp;
    setTimeout(() => {
      for (let x = 0; x < grids.length; x++) {
        const obj = grids[x];
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

            if (findRowMor === true) {
              gridInstTmp.addCellClassName(rowKey, "mng_insp_value", "redText");
            }
            if (findRowAft === true) {
              gridInstTmp.addCellClassName(rowKey, "aft_insp_value", "redText");
            }
            if (findRowNit === true) {
              gridInstTmp.addCellClassName(rowKey, "nig_insp_value", "redText");
            }
          }
        }
      }
    }, 500);
  };

  const splitData = (index) => {
    if (data) {
      // 종류별로 데이터를 분류하기 위한 빈 객체 생성
      const classifiedData = {};
      gridTabTitle.forEach((title) => {
        classifiedData[title] = [];
      });
      // 종류별로 데이터 분류
      data.forEach((item) => {
        const itemType = item.insp_filing_nm;
        classifiedData[itemType].push(item);
      });

      // 분류된 데이터를 다시 JSON 배열로 만들기

      for (const itemType in classifiedData) {
        const items = classifiedData[itemType];
        const itemObject = {};
        itemObject[itemType] = items;
        dataSetArr.push(itemObject);
      }

      for (let x = 0; x < tabLength; x++) {
        splitDataSetArrTmp[x] = dataSetArr[x][gridTabTitle[x]];
      }
      setSplitDataSetArr(splitDataSetArrTmp);
    }
  };

  const updateDataset = (index) => {
    let result = [];
    for (let i = 0; i < refGrid.length; i++) {
      refGrid[i]?.current?.gridInst?.finishEditing();

      for (let x = 0; x < refGrid[i]?.current?.gridInst?.getRowCount(); x++) {
        result.push(refGrid[i]?.current?.gridInst?.getRowAt(x));
      }

      splitDataSetArr[i] = result;

      result = [];
    }
  };

  useEffect(() => {
    setFileNameForExcelExport(tabListCode[0]);
    setActiveTab(refGrid[0]);
    getActiveGrid(refGrid[0]);
    splitData();
    handleChange("", 0);
    valueValidation(refGrid);
    getErrorCount(splitDataSetArrTmp);
  }, [data]);

  useEffect(() => {
    initializeWorker();
    setWorkerListData();
  }, [gridTabTitle, empListTemp.current, refGrid, empListTemp]);

  const setWorkerList = () => {
    if (InfoButton === true) {
      if (selectEmpState === "mng") {
        workerData[value].mngEmpId = emp.mngEmpId;
        workerData[value].mngEmpNm = emp.mngEmpNm;
      } else if (selectEmpState === "aft") {
        workerData[value].aftEmpId = emp.aftEmpId;
        workerData[value].aftEmpNm = emp.aftEmpNm;
      } else if (selectEmpState === "nig") {
        workerData[value].nigEmpId = emp.nigEmpId;
        workerData[value].nigEmpNm = emp.nigEmpNm;
      }
    }

    setWorkerInfo(workerData);
    setToggle(!toggle);
  };

  useEffect(() => {
    setWorkerList();
  }, [emp]);

  const handleChange = (event, newValue) => {
    setFileNameForExcelExport(tabListCode[newValue]);
    setWorkerDataForExcel(workerData[newValue]);
    setActiveTab(refGrid[newValue]);
    updateDataset(newValue);
    getActiveGrid(refGrid[newValue]);
    setValue(newValue);
    valueValidation(refGrid[newValue]);
  };

  function TabGrid(props) {
    const { children, value, index, ...other } = props;

    return (
      <div hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabGrid.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const Grid = useMemo(
    (index) => {
      return gridTabTitle.map((title, index) => (
        <TabPanel value={value} index={index} key={index}>
          <S.TabGridWrap height={`calc(100% - 280px)`}>
            <S.InputNewTab>
              <InputNewTab
                isEditMode={false}
                button={InfoButton}
                onSelectMorning={onSelectMorning}
                onRemoveMorning={onRemoveMorning}
                onSelectAfternoon={onSelectAfternoon}
                onRemoveAfternoon={onRemoveAfternoon}
                onSelectNight={onSelectNight}
                onRemoveNight={onRemoveNight}
                emp={workerData[index]}
                counterArr={errorCountArr[index]}
                nullCountArr={nullCountArr[index]}
                index={index}
              />
            </S.InputNewTab>
            <S.TabSingleGridWrap>
              <GridSingle
                columnOptions={columnOptions}
                columns={columns}
                header={header}
                rowHeaders={rowHeaders}
                data={splitDataSetArr[index]}
                refGrid={refGrid[index]}
              />
            </S.TabSingleGridWrap>
          </S.TabGridWrap>
        </TabPanel>
      ));
    },
    [errorCountArr, value, data]
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            {gridTabTitle.map((title, index) => (
              <Tab key={index} label={title} value={index} />
            ))}
          </TabList>
        </TabContext>
      </Box>
      {Grid}
    </Box>
  );
}
export default GridTab;
