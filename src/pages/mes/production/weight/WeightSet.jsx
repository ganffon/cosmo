import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function WeightSet(isEditModeHeader, isEditModeDetail, isNewDetail, isDetailEditFlag) {
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
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_cd", CN.line_cd, false, false, C.WIDTH_SHORT),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.date("work_weigh_date", CN.work_weigh_date, false, C.WIDTH_SHORT),
    col.text("work_weigh_time", CN.work_weigh_time, false, false, C.WIDTH_SHORT, "center"),
    col.id("weigh_emp_id", CN.weigh_emp_id, C.HIDDEN_ID),
    col.select("weigh_emp_nm", CN.weigh_emp_nm, isEditModeHeader, C.WIDTH_SHORT),
    col.date("work_input_date", CN.work_input_date, false, C.WIDTH_SHORT),
    col.text("work_input_time", CN.work_input_time, false, false, C.WIDTH_SHORT, "center"),
    col.id("input_emp_id", CN.input_emp_id, C.HIDDEN_ID),
    col.select("input_emp_nm", CN.input_emp_nm, isEditModeHeader, C.WIDTH_SHORT),
    col.number("total_qty", CN.total_qty2, false),
    col.text("remark", CN.remark, isEditModeHeader, false, C.WIDTH_MIDDLE),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT),
  ];

  const columnsDetail = [
    col.id("work_weigh_detail_id", CN.work_weigh_detail_id, C.HIDDEN_ID),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("work_order_input_id", CN.work_order_input_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_class_nm", CN.prod_class_nm, false, false, C.WIDTH_LONG),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_LONG),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_LONG),
    col.text("lot_no", CN.lot_no, isDetailEditFlag, false, C.WIDTH_LONG),
    col.number("total_qty", CN.total_qty2, isDetailEditFlag),
    col.number("bag_qty", CN.bag_qty, isDetailEditFlag),
    col.number("input_qty", CN.input_qty, false),
    col.text("remark", CN.remark, isEditModeDetail, false, C.WIDTH_LONG),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT, false, false, "select"),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT, false, false, "select"),
  ];

  const columnsSelectOrder = [
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT, false, false, true),
    col.date("work_weigh_date", CN.work_weigh_date, false, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT, false, false, true),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_cd", CN.line_cd, false, false, C.WIDTH_SHORT, false, false, true),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT, false, false, true),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT, false, false, true),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT, false, false, true),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_SHORT, false, false, true),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_SHORT, false, false, true),
  ];

  const columnsModalHeader = [
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.select("work_order_no", CN.work_order_no, true, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.select("line_dept_nm", CN.line_dept_nm, true, C.WIDTH_SHORT),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.select("line_cd", CN.line_cd, true, C.WIDTH_SHORT),
    col.select("line_nm", CN.line_nm, true, C.WIDTH_SHORT),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true, C.WIDTH_SHORT),
    col.select("prod_nm", CN.prod_nm, true, C.WIDTH_SHORT),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.select("store_nm", CN.store_nm, true, C.WIDTH_SHORT),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.select("location_nm", CN.location_nm, true, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_LONG),
    col.date("work_weigh_date", CN.work_weigh_date, true, C.WIDTH_SHORT),
    col.text("work_weigh_time", CN.work_weigh_time, true, false, C.WIDTH_SHORT, "center"),
    col.id("weigh_emp_id", CN.weigh_emp_id, C.HIDDEN_ID),
    col.select("weigh_emp_nm", CN.weigh_emp_nm, true, C.WIDTH_SHORT),
    col.date("work_input_date", CN.work_input_date, true, C.WIDTH_SHORT),
    col.text("work_input_time", CN.work_input_time, true, false, C.WIDTH_SHORT, "center"),
    col.id("input_emp_id", CN.input_emp_id, C.HIDDEN_ID),
    col.select("input_emp_nm", CN.input_emp_nm, true, C.WIDTH_SHORT),
    col.text("remark", CN.remark, true, false, C.WIDTH_MIDDLE),
  ];

  const columnsModalDetail = [
    col.id("work_weigh_detail_id", CN.work_weigh_detail_id, C.HIDDEN_ID),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("work_order_input_id", CN.work_order_input_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_class_nm", CN.prod_class_nm, false, false, C.WIDTH_LONG),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_LONG),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_LONG),
    col.text("lot_no", CN.lot_no, true, false, C.WIDTH_LONG, "center"),
    col.number("total_qty", CN.total_qty2, true, C.WIDTH_LONG, false),
    col.number("bag_qty", CN.bag_qty, true, C.WIDTH_LONG, false),
    col.number("input_qty", CN.input_qty, false, C.WIDTH_LONG, false),
    col.text("remark", CN.remark, true, false, C.WIDTH_LONG),
  ];

  const columnsSelectWeightEmployee = [
    col.text("dept_nm", CN.dept_nm, false, false, C.WIDTH_MIDDLE, false, false, true),
    col.text("grade_nm", CN.grade_nm, false, false, C.WIDTH_MIDDLE, false, false, true),
    col.id("weigh_emp_id", CN.weigh_emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, false, true, C.WIDTH_SHORT, false, false, true),
    col.text("weigh_emp_nm", CN.weigh_emp_nm, false, false, C.WIDTH_SHORT, "left", C.U, "select"),
    col.text("worker_group_nm", CN.worker_group_nm, false, true, C.WIDTH_MIDDLE, false, false, true),
  ];

  const columnsSelectInputEmployee = [
    col.text("dept_nm", CN.dept_nm, false, false, C.WIDTH_MIDDLE, false, false, true),
    col.text("grade_nm", CN.grade_nm, false, false, C.WIDTH_MIDDLE, false, false, true),
    col.id("input_emp_id", CN.input_emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, false, true, C.WIDTH_SHORT, false, false, true),
    col.text("input_emp_nm", CN.input_emp_nm, false, false, C.WIDTH_SHORT, C.U, C.U, "select"),
    col.text("worker_group_nm", CN.worker_group_nm, false, true, C.WIDTH_MIDDLE, false, false, true),
  ];

  const columnsSelectStoreLocation = [
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_SHORT, C.U, C.U, "select"),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_SHORT, C.U, C.U, "select"),
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
    columnsSelectOrder,
    columnsSelectWeightEmployee,
    columnsSelectInputEmployee,
    columnsSelectStoreLocation,
  };
}

export default WeightSet;
