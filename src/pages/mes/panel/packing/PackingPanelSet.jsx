import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function PackingPanelSet(isEditMode, onPerformance, onReprint) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columnsHeader = [
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_packing_detail_id", CN.work_packing_detail_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm),
    col.text("line_dept_nm", CN.line_dept_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("packing_qty", CN.packing_qty, isEditMode),
    col.number("packing_no", CN.packing_no),
    col.button("reprint", "재출력", "재출력", onReprint),
    col.id("packing_emp_id", CN.packing_emp_id, C.HIDDEN_ID),
    col.select("packing_emp_nm", CN.packing_emp_nm, isEditMode),
    col.date("work_packing_date", CN.work_packing_date, isEditMode),
    col.text("work_packing_time", CN.work_packing_time, isEditMode, C.U, C.U, "center"),
    col.button("performance", "실적등록", "실적등록", onPerformance),
    col.text("barcode_no", CN.barcode_no, C.U, true),
    col.text("remark", CN.remark, isEditMode, C.U, C.WIDTH_LONG),
  ];
  const columnsDetail = [
    col.text("prod_class_nm", CN.prod_class_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.total_qty),
    col.number("bag_qty", CN.bag_qty),
    col.number("input_qty", CN.input_qty),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsSelectPackingHeader = [
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("request_no", CN.request_no, false, true, C.WIDTH_SHORT, false, false, false, false, false),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.date("work_order_date", CN.work_order_date, C.U, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE, false, false, false, false, false),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE, false, false, false, false, false),
    col.date("work_start_date", CN.work_start_date, C.U, C.WIDTH_SHORT),
    col.date("work_end_date", CN.work_end_date, C.U, C.WIDTH_SHORT),
    col.number("work_order_qty", CN.work_order_qty, C.U, C.WIDTH_SHORT, false),
    col.check("complete_fg", CN.complete_fg, C.U, false, C.WIDTH_SHORT),
    col.date("complete_date", CN.complete_date, C.U, C.WIDTH_SHORT),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("remark", CN.remark, C.U, false, C.WIDTH_SHORT, false, false, false, false, false),
  ];
  const columnsNewHeader = [
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_packing_detail_id", CN.work_packing_detail_id, C.HIDDEN_ID),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true, C.WIDTH_MIDDLE),
    col.select("prod_nm", CN.prod_nm, true, C.WIDTH_MIDDLE),
    col.select("lot_no", CN.lot_no, true, C.WIDTH_MIDDLE),
    col.select("work_weigh_time", CN.work_weigh_time, true, C.U, "center"),
    col.id("weigh_emp_id", CN.weigh_emp_id, C.HIDDEN_ID),
    col.select("weigh_emp_nm", CN.weigh_emp_nm),
    col.select("work_input_time", CN.work_input_time, true, C.U, "center"),
    col.id("input_emp_id", CN.input_emp_id, C.HIDDEN_ID),
    col.select("input_emp_nm", CN.input_emp_nm),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm),
    col.number("input_qty", CN.input_qty),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsNewDetail = [
    col.text("prod_class_nm", CN.prod_class_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.total_qty),
    col.number("bag_qty", CN.bag_qty),
    col.number("input_qty", CN.input_qty),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsSelectHeader = [
    // col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    // col.id("work_packing_detail_id", CN.work_packing_detail_id, C.HIDDEN_ID),
    // col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    // col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    // col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    // col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    // col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    // col.text("work_weigh_time", CN.work_weigh_time, C.U, C.U, C.U, "center"),
    // col.id("weigh_emp_id", CN.weigh_emp_id, C.HIDDEN_ID),
    // col.text("weigh_emp_nm", CN.weigh_emp_nm),
    // col.text("work_input_time", CN.work_input_time, C.U, C.U, C.U, "center"),
    // col.id("input_emp_id", CN.input_emp_id, C.HIDDEN_ID),
    // col.text("input_emp_nm", CN.input_emp_nm),
    // col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    // col.text("store_nm", CN.store_nm),
    // col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    // col.text("location_nm", CN.location_nm),
    // col.number("total_qty", CN.total_qty),
    // col.button("select", "선택", "데이터 선택", onClickGridButton),
    // col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsSelectDetail = [
    col.text("prod_class_nm", CN.prod_class_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.total_qty),
    col.number("bag_qty", CN.bag_qty),
    col.number("input_qty", CN.input_qty),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsSelectEmp = [
    col.text("dept_nm", CN.dept_nm, C.U, C.U, C.WIDTH_MIDDLE, false, false, true),
    col.text("grade_nm", CN.grade_nm, C.U, C.U, C.U, false, false, true),
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, C.U, C.U, C.U, false, false, true),
    col.text("emp_nm", CN.emp_nm, C.U, C.U, C.U, false, false, true),
  ];
  const inputSet = [
    {
      id: "lot_no",
      name: CN.lot_no,
    },
    {
      id: "packing_no",
      name: CN.packing_no,
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
      name: CN.total_qty,
    },
    {
      id: "remark",
      name: CN.remark,
    },
  ];
  return {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsSelectPackingHeader,
    columnsNewHeader,
    columnsNewDetail,
    columnsSelectHeader,
    columnsSelectDetail,
    columnsSelectEmp,
    inputSet,
    inputInfo,
  };
}
export default PackingPanelSet;
