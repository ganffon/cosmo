//사용자관리✨
import { useEffect } from "react";
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import {
  WIDTH_SUPER_SHORT,
  WIDTH_SHORT,
  WIDTH_MIDDLE,
  WIDTH_LONG,
  WIDTH_SUPER_LONG,
} from "constant/Grid.js";

function EquipmentRawDataViewSet(tmpColumns, isEditMode) {
  const data = [];
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
  //const columns = tmpColumns;

  const columns = tmpColumns;
  const header = {};
  const rowHeaders = ["rowNum"];
  const inputSet = [];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 1, // 🔸frozenColumn은 여기 값만 수정
  };
  return {
    data,
    header,
    columns,
    inputSet,
    columnOptions,
    rowHeaders,
  };
}
export default EquipmentRawDataViewSet;
