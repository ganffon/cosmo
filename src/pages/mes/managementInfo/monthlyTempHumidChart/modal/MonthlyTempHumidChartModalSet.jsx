import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function MonthlyTempHumidChartModalSet() {
  /** 🔸columns ❗
   * editor: false||"text"
   * whiteSpace: "nowrap"||"normal"||"pre"||"pre-wrap"||"pre-line"
   * sortable: true||false
   * require: true||false
   * rowSpan: true||false
   * hidden: true||false
   * align: "left"||"center"||"right"
   * filter: false||"select"||{type:"text",operator:"OR"}
   */

  const rowHeaders = ["rowNum"];
  const columnOptions = {
    resizable: false,
    frozenCount: 0, // frozenColumn은 여기 값만 수정
  };

  return {
    rowHeaders,
    columnOptions,
    // header,
  };
}

export default MonthlyTempHumidChartModalSet;
