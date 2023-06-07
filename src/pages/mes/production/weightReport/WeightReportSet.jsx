import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function WeightReportSet() {
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
  const columnsHeader = [
    col.text("order_no", CN.order_no, false, false, C.WIDTH_SHORT),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.date("work_weigh_date", CN.work_weigh_date, false, C.WIDTH_SHORT),
    col.text(
      "work_weigh_time",
      CN.work_weigh_time,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.text(
      "weigh_emp_nm",
      CN.weigh_emp_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.date("work_input_date", CN.work_input_date, false, C.WIDTH_SHORT),
    col.text(
      "work_input_time",
      CN.work_input_time,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.text(
      "work_input_emp_nm",
      CN.work_input_emp_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.text("remark", CN.remark, false, false, C.WIDTH_LONG),
    col.date("create_at", CN.create_at, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_SHORT),
  ];

  const columnsDetail = [
    col.text("prod_class_nm", CN.prod_class_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("input_qty", CN.input_qty, false, C.WIDTH_SHORT, false),
    col.number("bag_qty", CN.bag_qty, false, C.WIDTH_SHORT, false),
    col.text("remark", CN.remark, false, false, C.WIDTH_LONG),

    col.date("create_at", CN.create_at, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_SHORT),
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

export default WeightReportSet;
