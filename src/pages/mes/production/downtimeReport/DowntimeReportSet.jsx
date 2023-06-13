//비가동현황(충진)✨
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function DowntimeReportSet() {
  const data = [];
  const rowHeaders = ["rowNum"];
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
  const columns = [
    col.id("sys_downtime_id", CN.sys_downtime_id, C.HIDDEN_ID),
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, C.U, C.U, C.WIDTH_SUPER_SHORT, "center", C.U, true),
    col.text("downtime_date", CN.downtime_date, C.U, C.U, C.WIDTH_MIDDLE, "center", C.U, true),
    col.text("start_date", CN.start_date, C.U, C.U, C.WIDTH_MIDDLE, "center", C.U, true),
    col.text("start_time", CN.start_time, C.U, C.U, C.WIDTH_MIDDLE, "center", C.U, true),
    col.text("end_date", CN.end_date, C.U, C.U, C.WIDTH_MIDDLE, "center", C.U, true),
    col.text("end_time", CN.end_time, C.U, C.U, C.WIDTH_MIDDLE, "center", C.U, true),
    col.text("downtime", CN.downtime, C.U, C.U, C.WIDTH_MIDDLE, "center", C.U, true),
    col.text("downtime_status", CN.downtime_status, C.U, C.U, C.WIDTH_SUPER_SHORT, "center", C.U, true),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };

  const header = {
    //🔸headerMerge
    // height: 100,
    // complexColumns: [
    //   {
    //     header: "test",
    //     name: "test_test",
    //     childNames: ["line_cd", "line_nm"],
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
    //🔸multiLine
    // columns: [
    //   {
    //     name: "line_cd",
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
  };
  // const header = {
  //   height: "60",
  //   complexColumns: [
  //     {
  //       header: "ID + Name",
  //       name: "parent1",
  //       childNames: ["id", "name"],
  //     },
  //   ],
  // };

  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안씀 - null
   */
  const datePickerSet = Range;

  /**
   * 🔸inputSet id 값이 ⭐ BE : query params
   */
  const inputSet = [
    {
      id: "line_nm",
      name: CN.line_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    columns,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default DowntimeReportSet;
