import * as React from "react";
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

function GridTabEdit(props) {
  const {
    tabLength,
    gridTabTitle,
    gridTabId,
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
    flag = null,
  } = props;
  const [value, setValue] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(null);
  const [toggle, setToggle] = React.useState(false);

  const [gridData, setGridData] = React.useState([]);

  const [workerDataEdit, setWorkerDataEdit] = React.useState([]);
  const [workerRawData, setWorkerRawData] = React.useState([]);
  const dataSetArr = [];
  const splitDataSetArrTmp = [];

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [splitDataSetArr, setSplitDataSetArr] = React.useState([]); // splitDataSetArr 상태 추가

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

    if (flag === "Edit") {
      const empInst = empListTemp.current;

      for (let i = 0; i < initialWorkerData.length; i++) {
        for (let j = 0; j < empInst.length; j++) {
          if (
            initialWorkerData[i][0].tabId === empInst[j].insp_filing_id ||
            initialWorkerData[i].tabId === empInst[j].insp_filing_id
          ) {
            initialWorkerData[i][0].resultEmpId = empInst[j].insp_result_emp_id;
            initialWorkerData[i][0].mngEmpId = empInst[j].mng_emp_id;
            initialWorkerData[i][0].mngEmpNm = empInst[j].mng_emp_nm;
            initialWorkerData[i][0].aftEmpId = empInst[j].aft_emp_id;
            initialWorkerData[i][0].aftEmpNm = empInst[j].aft_emp_nm;
            initialWorkerData[i][0].nigEmpId = empInst[j].nig_emp_id;
            initialWorkerData[i][0].nigEmpNm = empInst[j].nig_emp_nm;
          }
        }
      }
    }

    setWorkerDataEdit(initialWorkerData);
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
    console.log(refGrid);
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

  React.useEffect(() => {
    getActiveGrid(refGrid[0]);
    splitData();
  }, [data]);

  React.useEffect(() => {
    initializeWorker();
  }, [gridTabTitle]);

  React.useEffect(() => {
    if (workerDataEdit.length > 0) {
      setWorkerList();
    }
  }, [emp]);

  const setWorkerList = () => {
    if (InfoButton === true) {
      if (selectEmpState === "mng") {
        workerDataEdit[value][0].mngEmpId = emp.mngEmpId;
        workerDataEdit[value][0].mngEmpNm = emp.mngEmpNm;
      } else if (selectEmpState === "aft") {
        workerDataEdit[value][0].aftEmpId = emp.aftEmpId;
        workerDataEdit[value][0].aftEmpNm = emp.aftEmpNm;
      } else if (selectEmpState === "nig") {
        workerDataEdit[value][0].nigEmpId = emp.nigEmpId;
        workerDataEdit[value][0].nigEmpNm = emp.nigEmpNm;
      }
    }

    setWorkerInfo(workerDataEdit);
    if (workerDataEdit[value]) {
    }

    setToggle(!toggle);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    updateDataset(newValue);
    getActiveGrid(refGrid[newValue]);
    setValue(newValue);
  };

  function TabGrid(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }} height={"530px"}>
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

  const Grid = React.useMemo(
    (index) => {
      return gridTabTitle.map((title, index) => (
        <TabPanel value={value} index={index} key={index}>
          <S.TabGridWrap height={height}>
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
                emp={
                  Array.isArray(workerDataEdit[index])
                    ? workerDataEdit[index][0]
                    : workerDataEdit[index]
                }
              />
            </S.InputNewTab>
            <GridSingle
              columnOptions={columnOptions}
              columns={columns}
              header={header}
              rowHeaders={rowHeaders}
              data={splitDataSetArr[index]}
              refGrid={refGrid[index]}
            />
          </S.TabGridWrap>
        </TabPanel>
      ));
    },
    [
      splitDataSetArr,
      value,
      data,
      refGrid,
      emp,
      toggle,
      workerDataEdit.current,
      empListTemp.current,
    ]
  );

  return (
    <Box sx={{ width: "100%", height: "500px" }}>
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </div>
    );
  }
}
export default GridTabEdit;
