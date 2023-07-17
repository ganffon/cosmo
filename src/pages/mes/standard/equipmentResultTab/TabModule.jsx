import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./TabModule.styled";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import TabModuleSet from "./TabModuleSet";
import BtnComponent from "components/button/BtnComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <S.TabWrap role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && children}
    </S.TabWrap>
  );
}

const TabTitle = async () => {
  try {
    const result = await restAPI.get(restURI.inspFiling);
    const data = result?.data?.data?.rows;
    return data;
  } catch (err) {
  } finally {
  }
};

function TabModule() {
  const { rowHeaders, rowHeadersModal, header, columns, columnsModal, columnOptions, inputSet } = TabModuleSet();
  const [value, setValue] = useState(0);
  const refGrid = useRef([]);
  const [tabTitle, setTabTitle] = useState([]);
  const [gridData, setGridData] = useState([]);

  const initializeGridData = () => {
    const initialData = tabTitle.map(() => []);
    setGridData(initialData);
  };

  useEffect(() => {
    initializeGridData();
  }, [tabTitle]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setGridData((prevData) => {
      const newData = [...prevData];
      newData[value] = refGrid.current[value]?.gridInst.getData();
      return newData;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TabTitle();
        setTabTitle(data);
      } catch (err) {
        // 에러 처리
      }
    };

    fetchData();
  }, []);

  const onAddRow = (idx) => {
    const Grid = refGrid?.current[idx]?.gridInst;
    if (Grid) {
      Grid.appendRow();
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", height: "50px" }}>
        <Tabs value={value} onChange={handleChange}>
          {tabTitle.map((data) => (
            <Tab key={data.insp_filing_id} id={data.insp_filing_id} label={data.insp_filing_nm} />
          ))}
        </Tabs>
      </Box>
      {tabTitle.map((data, idx) => (
        <TabPanel value={value} key={idx} index={idx}>
          <S.ButtonWrap>
            <BtnComponent btnName="AddRow" onClick={() => onAddRow(idx)} />
          </S.ButtonWrap>
          <S.GridWrap>
            <GridSingle
              refGrid={(el) => {
                refGrid.current[idx] = el;
              }}
              columnOptions={columnOptions}
              columns={columns}
              rowHeaders={rowHeaders}
              header={header}
              data={gridData[idx]}
            />
          </S.GridWrap>
        </TabPanel>
      ))}
    </Box>
  );
}

export default TabModule;
