//작업자관리✨
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import TuiDatePicker from "tui-date-picker";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProductionLotTrackingSet() {
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
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.date("work_packing_date", CN.work_packing_date, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.number("packing_qty", CN.packing_qty, false, C.WIDTH_SHORT, false),
    col.number("packing_cnt", CN.packing_cnt, false, C.WIDTH_SHORT, false),
    col.text("packing_emp_nm", CN.packing_emp_nm, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT),
    col.button("operation_Report", CN.operation_Report, "운전점검일지"),
    col.button("inspection_Report", CN.inspection_Report, "검사성적서"),
    col.date("create_at", CN.create_at, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_SHORT),
  ];
  const columnsMiddleLeft = [
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.date("work_weigh_date", CN.work_weigh_date, false, C.WIDTH_SHORT),
    col.text("work_weigh_time", CN.work_weigh_time, false, false, C.WIDTH_SHORT),
    col.text("weigh_emp_nm", CN.weigh_emp_nm, false, false, C.WIDTH_SHORT),
    col.date("work_input_date", CN.work_input_date, false, C.WIDTH_SHORT),
    col.text("work_input_time", CN.work_input_time, false, false, C.WIDTH_SHORT),
    col.text("input_emp_nm", CN.input_emp_nm, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT),
    col.date("create_at", CN.create_at, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_SHORT),
  ];

  const columnsMiddleRight = [
    col.text("prod_class_nm", CN.prod_class_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),

    col.number("total_qty", CN.total_qty, false, C.WIDTH_SHORT, false),
    col.number("bag_qty", CN.bag_qty, false, C.WIDTH_SHORT, false),
    col.number("input_qty", CN.input_qty, false, C.WIDTH_SHORT, false),
    col.number("remark", CN.remark, false, C.WIDTH_SHORT, false),
    col.date("create_at", CN.create_at, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_SHORT),
  ];
  const columnsBottomRight = [
    col.text("receive_order_no", CN.receive_order_no, false, true, C.WIDTH_SHORT),
    col.text("receive_no", CN.receive_no, false, true, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.date("income_date", CN.income_date, false, C.WIDTH_SHORT),
    col.text("income_type", CN.income_type, false, false, C.WIDTH_SHORT),
    col.text("unit_nm", CN.unit_nm, false, false, C.WIDTH_SHORT),
    col.number("income_qty", CN.income_qty, false, C.WIDTH_SHORT, false),
    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT),
  ];

  const columnsBottomLeft = [
    col.date("subdivision_date", CN.subdivision_date, false, C.WIDTH_SHORT),
    col.text("subdivision_time", CN.subdivision_time, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.number("subdivision_qty", CN.subdivision_qty, false, C.WIDTH_SHORT, false),
    col.number("subdivision_qty", CN.subdivision_qty, false, C.WIDTH_SHORT, false),
    col.number("before_subdivision_qty", CN.before_subdivision_qty, false, C.WIDTH_SHORT, false),
    col.number("after_subdivision_qty", CN.after_subdivision_qty, false, C.WIDTH_SHORT, false),
    col.number("subdivision_qty", CN.subdivision_qty, false, C.WIDTH_SHORT, false),
    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT),
    col.date("create_at", CN.create_at, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_SHORT),
  ];
  const columnsSelectProd = [
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
  ];

  const columnsModal = [];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["rowNum"];
  const rowHeadersNum = ["rowNum"];
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
    {
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
    },
  ];

  return {
    data,
    columns,
    columnsModal,
    columnOptions,
    rowHeaders,
    rowHeadersNum,
    header,
    columnsMiddleLeft,
    columnsMiddleRight,
    columnsBottomLeft,
    columnsBottomRight,
    columnsSelectProd,
    datePickerSet,
    inputSet,
  };
}

export default ProductionLotTrackingSet;
