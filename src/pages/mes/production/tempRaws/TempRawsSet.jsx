import CN from "json/ColumnName.json";
import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";


import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
  MODAL_BACK_COLOR,
  NORMAL_BACK_COLOR,
} from "constant/Grid.js";

function TempRawsSet() {
  const data = [];
  const columnsHeader = ({
    height: 80,
    complexColumns: [
      {
        header: "자재창고",
        name: "A",
        childNames: ["ns=2;s=자재창고_온습도계.자재창고_온습도계.humidity", "ns=2;s=자재창고_온습도계.자재창고_온습도계.temperture"],
      },
      {
        header: "제품창고",
        name: "B",
        childNames: ["ns=2;s=제품창고_온습도계.제품창고_온습도계.humidity", "ns=2;s=제품창고_온습도계.제품창고_온습도계.temperture"],
      },
      {
        header: "투입실",
        name: "C",
        childNames: ["ns=2;s=계량공정(외부)온습도계.계량공정(외부)온습도계.humidity", "ns=2;s=계량공정(외부)온습도계.계량공정(외부)온습도계.temperture"],
      },
      {
        header: "첨가제측정실",
        name: "D",
        childNames: ["ns=2;s=계량공정(첨가제측정실)온습도계.계량공정(첨가제측정실)온습도계.humidity", "ns=2;s=계량공정(첨가제측정실)온습도계.계량공정(첨가제측정실)온습도계.temperture"],
      },
      {
        header: "통제실",
        name: "E",
        childNames: ["ns=2;s=IoTGw.IoTGw.humi1", "ns=2;s=IoTGw.IoTGw.temp1"],
      }
    ],
  });

  const columnsDetail = [
    col.text('time', "시간", false, false,C.WIDTH_SHORT),
    col.text("ns=2;s=자재창고_온습도계.자재창고_온습도계.humidity", "습도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=자재창고_온습도계.자재창고_온습도계.temperture", "온도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=제품창고_온습도계.제품창고_온습도계.humidity", "습도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=제품창고_온습도계.제품창고_온습도계.temperture", "온도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=계량공정(외부)온습도계.계량공정(외부)온습도계.humidity", "습도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=계량공정(외부)온습도계.계량공정(외부)온습도계.temperture", "온도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=계량공정(첨가제측정실)온습도계.계량공정(첨가제측정실)온습도계.humidity", "습도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=계량공정(첨가제측정실)온습도계.계량공정(첨가제측정실)온습도계.temperture", "온도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=IoTGw.IoTGw.humi1", "습도", false, false, C.WIDTH_SHORT),
    col.text("ns=2;s=IoTGw.IoTGw.temp1", "온도", false, false, C.WIDTH_SHORT),
    
    
  ];

  const rowHeadersNum = ["rowNum"];

  return {
    data,
    columnsHeader,
    columnsDetail,
    // columnsModalHeader,
    // columnsModalDetail,
    // columnsSelectProd,
    // columnsSelectInsp,
    // columnOptions,
    // rowHeadersNumCheck,
    rowHeadersNum,
    // header,
    // datePickerSet,
    // inputSet,
    // inputInfo,
  };
}

export default TempRawsSet;
