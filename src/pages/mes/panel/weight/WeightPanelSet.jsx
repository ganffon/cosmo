import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function WeightPanelSet(
  onInput = () => {},
  onBarcodeScanButton = () => {},
  onCopyRow = () => {},
  onCancelRow = () => {}
) {
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columns = [
    col.text("request_no", CN.request_no, C.U, true, C.WIDTH_MIDDLE),
    col.text("work_order_no", CN.work_order_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.date("work_order_date", CN.work_order_date),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm),
    col.date("work_start_date", CN.work_start_date),
    col.date("work_end_date", CN.work_end_date),
    col.number("work_order_qty", CN.work_order_qty),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("thickness", CN.thickness, C.U, C.U, C.U, C.U, true, true),
    col.text("width", CN.width, C.U, C.U, C.U, C.U, true, true),
    col.text("length", CN.length, C.U, C.U, C.U, C.U, true, true),
  ];
  const columnsWeight = [
    col.id("work_order_input_id", CN.work_order_input_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_class_nm", CN.prod_class_nm, C.U, C.U, C.U, C.U, true, true, C.U, true),
    col.button("barcodeScan", "바코드 스캔", "바코드 스캔", onBarcodeScanButton),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true, C.U, true),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true, C.U, true),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true, C.U, true),
    col.button("copyRow", "Lot 추가", "Lot 추가", onCopyRow, "", "copy"),
    col.button("cancelRow", "Lot 취소", "Lot 취소", onCancelRow, "", "cancel", true),
    col.text("lot_no", CN.lot_no, true, C.U, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.total_qty2, true),
    col.number("bag_qty", CN.bag_qty, true),
    col.number("input_qty", CN.input_qty),
    col.text("spec_std", CN.spec_std, C.U, C.U, C.U, C.U, C.U, C.U, C.U, true),
    col.number("spec_min", CN.spec_min, C.U, C.U, C.U, C.U, C.U, true),
    col.number("spec_max", CN.spec_max, C.U, C.U, C.U, C.U, C.U, true),
    col.number("spec_lcl", CN.spec_lcl, C.U, C.U, C.U, C.U, C.U, true),
    col.number("spec_ucl", CN.spec_ucl, C.U, C.U, C.U, C.U, C.U, true),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.id("tag_id", CN.tag_id, C.HIDDEN_ID),
    col.id("weight", "가중치", C.HIDDEN_ID),
    col.id("constant_value", CN.constant_value, C.HIDDEN_ID),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
  ];
  const columnsInput = [
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, C.U, C.U, C.WIDTH_MIDDLE, false, false, true),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, C.U, C.U, C.WIDTH_MIDDLE, false, false, true),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, C.U, C.U, C.U, false, false, true),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, false, false, true),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, false, false, true),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE, false, false, true),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, C.U, C.U, C.U, false, false, true),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, C.U, C.U, C.U, false, false, true),
    col.button("inputSave", "투입", "투입", onInput),
    col.date("work_weigh_date", CN.work_weigh_date),
    col.text("work_weigh_time", CN.work_weigh_time, C.U, C.U, C.U, "center", false, true),
    col.id("weigh_emp_id", CN.weigh_emp_id, C.HIDDEN_ID),
    col.text("weigh_emp_nm", CN.weigh_emp_nm, C.U, C.U, C.U, false, false, true),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG, false, false, true),
  ];
  const columnsInputDetail = [
    col.id("work_weigh_detail_id", CN.work_weigh_detail_id, C.HIDDEN_ID),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("total_qty", CN.total_qty2),
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
  const columnsSelectStore = [
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, C.U, C.U, C.WIDTH_MIDDLE),
  ];
  const inputSet = [
    {
      id: "lot_no",
      name: CN.lot_no,
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
      name: CN.total_qty2,
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
    columns,
    columnsSelectProd,
    columnsWeight,
    columnsInput,
    columnsInputDetail,
    columnsSelectEmp,
    columnsSelectStore,
    inputSet,
    inputInfo,
  };
}
export default WeightPanelSet;
