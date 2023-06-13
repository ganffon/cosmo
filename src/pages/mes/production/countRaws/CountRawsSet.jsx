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

function CountRawsSet() {
  const data = [];
  

  const columnsDetail = [
    col.text('scan_dt', "시간", false, false,C.WIDTH_LONG),
    col.text("scan_value", "Count", false, false, C.WIDTH_LONG),
  ];

  const rowHeadersNum = ["rowNum"];

  return {
    data,
    columnsDetail,
    rowHeadersNum,
  };
}

export default CountRawsSet;
