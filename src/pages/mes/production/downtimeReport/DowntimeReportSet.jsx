//비가동현황(충진)✨
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";
import * as CustomGrid from "components/grid/setting/CustomGrid";

function DowntimeReportSet(onDowntimeInput) {
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
    col.text("line_nm", CN.line_nm, C.U, C.U, C.WIDTH_SHORT, "center", C.U, true),
    col.text("downtime_date", CN.downtime_date, C.U, C.U, C.WIDTH_SHORT, "center", C.U, true),
    col.text("start_date", CN.start_date, C.U, C.U, C.WIDTH_SHORT, "center", C.U, true),
    col.text("start_time", CN.work_start_time, C.U, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.text("end_date", CN.end_date, C.U, C.U, C.WIDTH_SHORT, "center", C.U, true),
    col.text("end_time", CN.work_end_time, C.U, C.U, C.WIDTH_SUPER_SHORT, "center"),
    col.text("downtime", CN.downtime, C.U, C.U, C.WIDTH_SHORT, "center"),
    col.text("downtime_status", CN.downtime_status, C.U, C.U, C.WIDTH_SHORT, "center", C.U, true),
    col.button("send_fg", "비가동 등록", "비가동 등록", onDowntimeInput, "등록 완료", "downtimeInput"),
    // col.text("send_fg", CN.send_fg),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_at", CN.update_at, C.U, true, C.WIDTH_LONG, "center"),
  ];
  const columnsDowntime = [
    col.id("downtime_type_id", CN.downtime_type_id, C.HIDDEN_ID),
    col.text("downtime_type_nm", CN.downtime_type_nm, false, false, C.WIDTH_MIDDLE, C.U, true, true),
    col.id("downtime_id", CN.downtime_id, C.HIDDEN_ID),
    col.text("downtime_nm", CN.downtime_nm, false, false, C.WIDTH_MIDDLE, C.U, true, true),
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
    //     name: "start_time",
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    //   {
    //     name: "end_time",
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
  const datePickerSet = "range";

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
    columnsDowntime,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default DowntimeReportSet;
