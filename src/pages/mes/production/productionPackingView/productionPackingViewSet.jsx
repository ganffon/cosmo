import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProductionPackingViewSet(onClickDetailInputButton) {
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const datePickerSet = null;

  const columnsHeader = [
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_LONG),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_LONG),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_LONG),
    col.date("work_packing_date", CN.work_packing_date, false, C.WIDTH_LONG),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_LONG),
    col.number("packing_qty", CN.packing_qty, false, C.WIDTH_LONG, false),
    col.number("packing_cnt", CN.packing_cnt, false, C.WIDTH_LONG, false),
    col.text("packing_emp_nm", CN.packing_emp_nm, false, false, C.WIDTH_LONG),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
  ];

  const columnsDetail = [
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_LONG),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_LONG),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_LONG),
    col.number("input_qty", CN.input_qty, false, C.WIDTH_LONG, false),
    col.text("remark", CN.remark, false, false, C.WIDTH_LONG),
    col.button(
      "input_report",
      CN.input_report,
      CN.input_report,
      onClickDetailInputButton
    ),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
  ];

  const columnsModalHeader = [
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.date("work_weigh_date", CN.work_weigh_date, false, C.WIDTH_SHORT),
    col.text(
      "work_weigh_time",
      CN.work_weigh_time,
      false,
      false,
      C.WIDTH_SHORT
    ),
    col.text("weigh_emp_nm", CN.weigh_emp_nm, false, false, C.WIDTH_SHORT),
    col.date("work_input_date", CN.work_input_date, false, C.WIDTH_SHORT),
    col.text(
      "work_input_time",
      CN.work_input_time,
      false,
      false,
      C.WIDTH_SHORT
    ),
    col.text("input_emp_nm", CN.input_emp_nm, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT),
  ];

  const columnsModalDetail = [
    col.text("prod_class_nm", CN.prod_class_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.number("total_qty", CN.total_qty, false, C.WIDTH_SHORT, false),
    col.number("bag_qty", CN.bag_qty, false, C.WIDTH_SHORT, false),
    col.number("input_qty", CN.input_qty, false, C.WIDTH_SHORT, false),
    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT),
  ];

  const inputSet = [
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
    columnsHeader,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
    columnsDetail,
    columnsSelectProd,
    columnsModalHeader,
    columnsModalDetail,
  };
}

export default ProductionPackingViewSet;
