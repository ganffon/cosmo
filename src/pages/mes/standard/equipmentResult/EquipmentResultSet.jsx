//설비관리✨
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function EquipmentResultSet() {
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
    col.id("insp_result_id", CN.insp_result_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("insp_result_date", CN.insp_result_date, C.U, C.U, C.U, "center"),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("mng_emp_id", CN.mng_emp_id, C.HIDDEN_ID),
    col.text("mng_emp_nm", CN.mng_emp_nm),
    col.id("aft_emp_id", CN.aft_emp_id, C.HIDDEN_ID),
    col.text("aft_emp_nm", CN.aft_emp_nm),
    col.id("nig_emp_id", CN.nig_emp_id, C.HIDDEN_ID),
    col.text("nig_emp_nm", CN.nig_emp_nm),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsDetail = [
    col.text(
      "insp_result_detail_id",
      CN.insp_result_detail_id,
      C.U,
      C.HIDDEN_ID
    ),
    col.id("insp_result_id", CN.insp_result_id, C.HIDDEN_ID),
    col.id("work_order_detail_id", CN.work_order_detail_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("equip_nm", CN.equip_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("insp_item_type_id", CN.insp_item_type_id, C.HIDDEN_ID),
    col.text(
      "insp_item_type_nm",
      CN.insp_item_type_nm,
      C.U,
      C.U,
      C.WIDTH_MIDDLE
    ),
    col.id("insp_item_id", CN.insp_item_id, C.HIDDEN_ID),
    col.text("insp_item_nm", CN.insp_item_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("insp_item_desc", CN.insp_item_desc, C.U, C.U, C.WIDTH_LONG),
    col.text("spec_std", CN.spec_std, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("spec_min", CN.spec_min),
    col.number("spec_max", CN.spec_max),
    col.number("spec_lcl", CN.spec_lcl),
    col.number("spec_ucl", CN.spec_ucl),
    col.text("mng_insp_value", CN.mng_insp_value),
    col.text("aft_insp_value", CN.aft_insp_value),
    col.text("nig_insp_value", CN.nig_insp_value),
    col.id("insp_method_id", CN.insp_method_id, C.HIDDEN_ID),
    col.text("insp_method_nm", CN.insp_method_nm),
    col.id("insp_tool_id", CN.insp_tool_id, C.HIDDEN_ID),
    col.text("insp_tool_nm", CN.insp_tool_nm),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.check("insp_result_fg", CN.insp_result_fg),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsNew = [
    col.text(
      "insp_result_detail_id",
      CN.insp_result_detail_id,
      C.U,
      C.HIDDEN_ID
    ),
    col.id("insp_result_id", CN.insp_result_id, C.HIDDEN_ID),
    col.id("work_order_detail_id", CN.work_order_detail_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_nm", CN.equip_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("insp_item_type_id", CN.insp_item_type_id, C.HIDDEN_ID),
    col.text(
      "insp_item_type_nm",
      CN.insp_item_type_nm,
      C.U,
      C.U,
      C.WIDTH_MIDDLE
    ),
    col.id("insp_item_id", CN.insp_item_id, C.HIDDEN_ID),
    col.text("insp_item_nm", CN.insp_item_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("insp_item_desc", CN.insp_item_desc, C.U, C.U, C.WIDTH_LONG),
    col.text("spec_std", CN.spec_std, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("spec_min", CN.spec_min),
    col.number("spec_max", CN.spec_max),
    col.number("spec_lcl", CN.spec_lcl),
    col.number("spec_ucl", CN.spec_ucl),
    col.text("mng_insp_value", CN.mng_insp_value, true),
    col.text("aft_insp_value", CN.aft_insp_value, true),
    col.text("nig_insp_value", CN.nig_insp_value, true),
    col.id("insp_method_id", CN.insp_method_id, C.HIDDEN_ID),
    col.text("insp_method_nm", CN.insp_method_nm),
    col.id("insp_tool_id", CN.insp_tool_id, C.HIDDEN_ID),
    col.text("insp_tool_nm", CN.insp_tool_nm),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.check("insp_result_fg", CN.insp_result_fg),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
  ];
  const columnsSelectOrder = [
    col.text("request_no", CN.request_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("work_order_date", CN.work_order_date, C.U, C.U, C.U, "center"),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm),
    col.text("work_start_date", CN.work_start_date, C.U, C.U, C.U, "center"),
    col.text("work_end_date", CN.work_end_date, C.U, C.U, C.U, "center"),
  ];
  const columnsSelectEmp = [
    col.text("dept_nm", CN.dept_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("grade_nm", CN.grade_nm),
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd),
    col.text("emp_nm", CN.emp_nm),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersCheck = ["checkbox", "rowNum"];
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
      id: "equip_cd",
      name: CN.equip_cd,
    },
    {
      id: "equip_nm",
      name: CN.equip_nm,
    },
  ];
  const inputInfo = [
    {
      id: "inspResultDate",
      name: CN.insp_result_date,
    },
    {
      id: "lineNm",
      name: CN.line_nm,
    },
    {
      id: "prodCd",
      name: CN.prod_cd,
    },
    {
      id: "prodNm",
      name: CN.prod_nm,
    },
    {
      id: "orderNo",
      name: CN.work_order_no,
    },
    {
      id: "mngEmpNm",
      name: CN.mng_emp_nm,
    },
    {
      id: "aftEmpNm",
      name: CN.aft_emp_nm,
    },
    {
      id: "nigEmpNm",
      name: CN.nig_emp_nm,
    },
    {
      id: "remark",
      name: CN.remark,
    },
  ];

  return {
    data,
    columns,
    columnsDetail,
    columnsNew,
    columnsSelectOrder,
    columnsSelectEmp,
    columnOptions,
    rowHeadersCheck,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
    inputInfo,
  };
}

export default EquipmentResultSet;
