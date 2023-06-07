import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function PackingPanelSet(onClickGridButton) {
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
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("input_qty", CN.input_qty),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
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
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.date("work_packing_date", CN.work_packing_date),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("packing_qty", CN.packing_qty),
    col.number("packing_cnt", CN.packing_cnt),
    col.id("packing_emp_id", CN.packing_emp_id, C.HIDDEN_ID),
    col.text("packing_emp_nm", CN.packing_emp_nm),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
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
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.id("work_packing_detail_id", CN.work_packing_detail_id, C.HIDDEN_ID),
    col.id("work_weigh_id", CN.work_weigh_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("work_weigh_time", CN.work_weigh_time, C.U, C.U, C.U, "center"),
    col.id("weigh_emp_id", CN.weigh_emp_id, C.HIDDEN_ID),
    col.text("weigh_emp_nm", CN.weigh_emp_nm),
    col.text("work_input_time", CN.work_input_time, C.U, C.U, C.U, "center"),
    col.id("input_emp_id", CN.input_emp_id, C.HIDDEN_ID),
    col.text("input_emp_nm", CN.input_emp_nm),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm),
    col.number("total_qty", CN.total_qty),
    col.button("select", "선택", "데이터 선택", onClickGridButton),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
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
    inputSet,
    inputInfo,
  };
}
export default PackingPanelSet;
