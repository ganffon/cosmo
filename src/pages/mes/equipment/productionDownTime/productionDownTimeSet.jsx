//작업자관리✨
import "components/grid/setting/GridStyle.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProductionDownTimeSet(
  isEditMode,
  deptList,
  gradeList,
  workerGroupList
) {
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
  const columns = [
    col.id("work_downtime_id", CN.work_downtime_id, C.HIDDEN_ID),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.select("line_nm", CN.line_nm, isEditMode, C.WIDTH_SHORT),
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.select("proc_nm", CN.proc_nm, isEditMode, C.WIDTH_SHORT),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.select("equip_nm", CN.equip_nm, isEditMode, C.WIDTH_SHORT),
    col.id("downtime_id", CN.downtime_id, C.HIDDEN_ID),
    col.select(
      "downtime_type_nm",
      CN.downtime_type_nm,
      isEditMode,
      C.WIDTH_SHORT
    ),
    col.select("downtime_nm", CN.downtime_nm, isEditMode, C.WIDTH_SHORT),
    col.date("downtime_date", CN.downtime_date, isEditMode, C.WIDTH_SHORT),
    col.date("start_date", CN.start_date, isEditMode, C.WIDTH_SHORT),
    col.text("start_time", CN.start_time, isEditMode, false, C.WIDTH_SHORT),
    col.date("end_date", CN.end_date, isEditMode, C.WIDTH_SHORT),
    col.text("end_time", CN.end_time, isEditMode, false, C.WIDTH_SHORT),
    col.text("downtime", CN.downtime, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditMode, false, C.WIDTH_SUPER_LONG),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text(
      "create_user_nm",
      CN.create_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),

    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text(
      "update_user_nm",
      CN.update_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
  ];
  const columnsModal = [
    col.id("work_downtime_id", CN.work_downtime_id, C.HIDDEN_ID),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.select("line_nm", CN.line_nm, true, C.WIDTH_SHORT),
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.select("proc_nm", CN.proc_nm, true, C.WIDTH_SHORT),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.select("equip_nm", CN.equip_nm, true, C.WIDTH_SHORT),
    col.id("downtime_id", CN.downtime_id, C.HIDDEN_ID),
    col.select("downtime_type_nm", CN.downtime_type_nm, true, C.WIDTH_SHORT),
    col.select("downtime_nm", CN.downtime_nm, true, C.WIDTH_SHORT),
    col.date("downtime_date", CN.downtime_date, true, C.WIDTH_SHORT),
    col.date("start_date", CN.start_date, true, C.WIDTH_SHORT),
    col.text("start_time", CN.start_time, true, false, C.WIDTH_SHORT),
    col.date("end_date", CN.end_date, true, C.WIDTH_SHORT),
    col.text("end_time", CN.end_time, true, false, C.WIDTH_SHORT),
    col.text("downtime", CN.downtime, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, true, false, C.WIDTH_SUPER_LONG),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text(
      "create_user_nm",
      CN.create_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text(
      "update_user_nm",
      CN.update_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
  ];

  const columnLineSelect = [
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text(
      "line_nm",
      CN.line_nm,
      false,
      false,
      C.WIDTH_SHORT,
      false,
      false,
      true
    ),
  ];

  const columnDownTimeSelect = [
    col.id("downtime_id", CN.downtime_id, C.HIDDEN_ID),
    col.text(
      "downtime_type_nm",
      CN.downtime_type_nm,
      false,
      false,
      C.WIDTH_SHORT,
      false,
      false,
      true
    ),
    col.text(
      "downtime_nm",
      CN.downtime_nm,
      false,
      false,
      C.WIDTH_SHORT,
      false,
      false,
      true
    ),
  ];

  const columnProcEquipSelect = [
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.text(
      "proc_nm",
      CN.proc_nm,
      false,
      false,
      C.WIDTH_SHORT,
      false,
      false,
      true
    ),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text(
      "equip_nm",
      CN.equip_nm,
      false,
      false,
      C.WIDTH_SHORT,
      false,
      false,
      true
    ),
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = {};
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

  return {
    data,
    columns,
    columnsModal,
    columnOptions,
    rowHeaders,
    rowHeadersModal,
    header,
    columnLineSelect,
    columnProcEquipSelect,
    columnDownTimeSelect,
    datePickerSet,
    inputSet,
  };
}

export default ProductionDownTimeSet;
