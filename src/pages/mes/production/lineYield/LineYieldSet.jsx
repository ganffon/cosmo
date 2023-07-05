import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function LineYieldSet(onClickApply, e) {
  const data = [];
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    minWidth: C.WIDTH_SHORT,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["rowNum"];
  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안쓰는경우 - null
   */
  const datePickerSet = null;

  /**
   * 🔸inputSet id 값이 ✨ BE : query params
   */
  const inputSet = [
    {
      id: "line_nm",
      name: CN.line_nm,
    },
  ];

  const columnsHeader = [
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_cd", CN.line_cd, false, true),
    col.text("line_nm", CN.line_nm, false, false),
    col.number("yield_value", CN.yield_value, false, false),
    col.number("after_yield_value", CN.after_yield_value, true),
    col.text("remark", CN.remark, true, false),
    col.button("apply_button", CN.apply, "적용", onClickApply, false),
  ];
  const columnsDetail = [
    col.id("work_yield_id", CN.work_yield_id, C.HIDDEN_ID),
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.date("start_date", CN.start_date, false),
    col.text("start_time", CN.start_time, false, false),
    col.date("end_date", CN.end_date, false),
    col.text("end_time", CN.end_time, false, false),
    col.text("yield_value", CN.yield_value, false, false),
    col.check("apply_fg", CN.apply_fg, false, false),
  ];

  return {
    data,
    rowHeadersNumCheck,
    columnsHeader,
    columnsDetail,
    columnOptions,
    rowHeaders,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
  };
}

export default LineYieldSet;
