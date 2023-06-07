import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function PackingSet(isEditModeHeader, barcodePrintDetail, barcodePrintHeader) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    minWidth: C.WIDTH_SHORT,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columnsHeader = [
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.date("work_packing_date", CN.work_packing_date, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("packing_qty", CN.packing_qty, false, C.WIDTH_SHORT, false),
    col.number("packing_cnt", CN.packing_cnt, false, C.WIDTH_SHORT, false),
    col.id("packing_emp_id", CN.packing_emp_id, C.HIDDEN_ID),
    col.select(
      "packing_emp_nm",
      CN.packing_emp_nm,
      isEditModeHeader,
      C.WIDTH_SHORT
    ),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_SHORT),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditModeHeader, false, C.WIDTH_MIDDLE),
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
  const columnsDetail = [
    col.id("work_packing_detail_id", CN.work_packing_detail_id, C.HIDDEN_ID),
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("input_qty", CN.input_qty, false, C.WIDTH_SHORT, false),
    col.text("remark", CN.remark, false, false, C.WIDTH_MIDDLE),

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
  const columnsHeaderNew = [
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.select("work_order_no", CN.work_order_no, true, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.select("line_dept_nm", CN.line_dept_nm, true, C.WIDTH_SHORT),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.select("line_nm", CN.line_nm, true, C.WIDTH_SHORT),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true, C.WIDTH_MIDDLE),
    col.select("prod_nm", CN.prod_nm, true, C.WIDTH_MIDDLE),
    col.date("work_packing_date", CN.work_packing_date, true, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, true, false, C.WIDTH_MIDDLE),
    col.number("packing_qty", CN.packing_qty, true, C.WIDTH_SHORT, false),
    col.number("packing_cnt", CN.packing_cnt, true, C.WIDTH_SHORT, false),
    col.id("packing_emp_id", CN.packing_emp_id, C.HIDDEN_ID),
    col.select("packing_emp_nm", CN.packing_emp_nm, true, C.WIDTH_SHORT),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.select("store_nm", CN.store_nm, true, C.WIDTH_SHORT),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.select("location_nm", CN.location_nm, true, C.WIDTH_SHORT),
    col.text("remark", CN.remark, true, false, C.WIDTH_MIDDLE),
  ];
  const columnsDetailNew = [
    col.id("work_packing_detail_id", CN.work_packing_detail_id, C.HIDDEN_ID),
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.select("prod_id", CN.prod_id, true, C.WIDTH_MIDDLE),
    col.select("prod_cd", CN.prod_cd, true, C.WIDTH_MIDDLE),
    col.select("prod_nm", CN.prod_nm, true, C.WIDTH_MIDDLE),
    col.select("lot_no", CN.lot_no, true, C.WIDTH_MIDDLE),
    col.number("input_qty", CN.input_qty, true, C.WIDTH_SHORT, false),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.select("store_nm", CN.store_nm, true, C.WIDTH_MIDDLE),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.select("location_nm", CN.location_nm, true, C.WIDTH_MIDDLE),
    col.text("remark", CN.remark, true, false, C.WIDTH_MIDDLE),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text(
      "prod_cd",
      CN.prod_cd,
      false,
      false,
      C.WIDTH_MIDDLE,
      false,
      false,
      "select"
    ),
    col.text(
      "prod_nm",
      CN.prod_nm,
      false,
      false,
      C.WIDTH_MIDDLE,
      false,
      false,
      "select"
    ),
  ];
  const columnsSelectOrder = [
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("request_no", CN.request_no, false, false, C.WIDTH_SHORT),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT),
    col.date("work_order_date", CN.work_order_date, false, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_SHORT),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_SHORT),
    col.date("work_start_date", CN.work_start_date, false, C.WIDTH_SHORT),
    col.date("work_end_date", CN.work_end_date, false, C.WIDTH_SHORT),
  ];
  const columnsSelectEmp = [
    col.text("dept_nm", CN.dept_nm, false, false, C.WIDTH_MIDDLE),
    col.text("grade_nm", CN.grade_nm, false, false, C.WIDTH_MIDDLE),
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, false, true, C.WIDTH_SHORT),
    col.text("emp_nm", CN.emp_nm, false, false, C.WIDTH_SHORT),
    col.text(
      "worker_group_nm",
      CN.worker_group_nm,
      false,
      true,
      C.WIDTH_MIDDLE
    ),
  ];
  const columnsSelectWeight = [
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.actual_weight, false, C.WIDTH_SHORT, true),
    col.date("work_input_date", CN.work_input_date, false, C.WIDTH_SHORT),
    col.text(
      "work_input_time",
      CN.work_input_time,
      false,
      false,
      C.WIDTH_SHORT
    ),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_MIDDLE),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_MIDDLE),
  ];
  const columnsSelectWeightDetail = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.actual_weight, false, C.WIDTH_SHORT, false),
    col.number("bag_qty", CN.bag_qty, false, C.WIDTH_SHORT, false),
    col.number("input_qty", CN.input_qty, false, C.WIDTH_SHORT, false),
  ];
  const inputSet = [
    {
      id: "line_nm",
      name: CN.line_nm,
    },
  ];
  const inputInfo = [
    {
      id: "subdivision_date",
      name: CN.subdivision_date,
    },
    {
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
    },
    {
      id: "lot_no",
      name: CN.lot_no,
    },
    {
      id: "total_qty",
      name: CN.actual_weight,
    },
    {
      id: "remark",
      name: CN.remark,
    },
  ];
  const columnsSelectStore = [
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_MIDDLE),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_MIDDLE),
  ];
  return {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsHeaderNew,
    columnsDetailNew,
    columnsSelectProd,
    columnsSelectOrder,
    columnsSelectEmp,
    columnsSelectWeight,
    columnsSelectWeightDetail,
    columnsSelectStore,
    inputSet,
    inputInfo,
  };
}
export default PackingSet;
