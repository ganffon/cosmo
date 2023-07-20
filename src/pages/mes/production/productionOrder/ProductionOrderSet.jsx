import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import "components/grid/setting/GridStyle.css";
import * as col from "custom/GridColumnSet";

function ProductionOrderSet(
  isEditModeHeader,
  isEditModeMid,
  isEditModeBottom,
  lineList,
  processList,
  equipmentList,
  inspMethodList,
  inspToolList,
  inspFilingList
) {
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {
    columns: [
      {
        name: "complete_fg",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
    ],
  };
  const datePickerSet = null;

  const columnsHeader = [
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.date("work_order_date", CN.work_order_date, isEditModeHeader, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE, false, false, false, false, false),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE, false, false, false, false, false),
    col.text("prod_std", CN.prod_std, false, false, C.WIDTH_MIDDLE, false, false, false, false, false),
    col.date("work_start_date", CN.work_start_date, isEditModeHeader, C.WIDTH_SHORT),
    col.date("work_end_date", CN.work_end_date, isEditModeHeader, C.WIDTH_SHORT),
    col.number("work_order_qty", CN.work_order_qty, isEditModeHeader, C.WIDTH_SHORT, false),
    col.check("complete_fg", CN.complete_fg, isEditModeHeader, false, C.WIDTH_SHORT),
    col.date("complete_date", CN.complete_date, isEditModeHeader, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditModeHeader, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.text("create_at", CN.create_at, false, false, C.WIDTH_LONG, false, false, false, false, false),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT, "center", false, false, false, false),
    col.text("update_at", CN.update_at, false, false, C.WIDTH_LONG, "center", false, false, false, false),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT, "center", false, false, false, false),
    col.text("delete_at", CN.delete_at, false, true, C.WIDTH_LONG, "center", false, false, false, false),
    col.text("delete_user_nm", CN.delete_user_nm, false, true, C.WIDTH_SHORT, false, false, false, false, false),
  ];
  const columnsMid = [
    col.id("work_order_input_id", CN.work_order_input_id, C.HIDDEN_ID),
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, false, false, C.WIDTH_MIDDLE),
    col.text("spec_std", CN.spec_std, isEditModeMid, false, C.WIDTH_SHORT),
    col.number("spec_min", CN.spec_min, isEditModeMid, C.WIDTH_SHORT, false),
    col.number("spec_max", CN.spec_max, isEditModeMid, C.WIDTH_SHORT, false),
    col.number("spec_lcl", CN.spec_lcl, isEditModeMid, C.WIDTH_SHORT, false),
    col.number("spec_ucl", CN.spec_ucl, isEditModeMid, C.WIDTH_SHORT, false),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.text("infc_memory_nm", CN.infc_memory_nm, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditModeMid, false, C.WIDTH_SHORT),
    col.text("create_at", CN.create_at, false, false, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT, "center"),
    col.text("update_at", CN.update_at, false, false, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT, "center"),
    col.text("delete_at", CN.delete_at, false, true, C.WIDTH_LONG, "center"),
    col.text("delete_user_nm", CN.delete_user_nm, false, true, C.WIDTH_SHORT, "center"),
  ];
  const columnsBottom = [
    col.id("work_order_detail_id", CN.work_order_detail_id, C.HIDDEN_ID),
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.text("proc_nm", CN.proc_nm, false, false, C.WIDTH_SHORT),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_nm", CN.equip_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_item_type_id", CN.insp_item_type_id, C.HIDDEN_ID),
    col.text("insp_item_type_nm", CN.insp_item_type_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_item_id", CN.insp_item_id, C.HIDDEN_ID),
    col.text("insp_item_nm", CN.insp_item_nm, false, false, C.WIDTH_SHORT),
    col.text("insp_item_desc", CN.insp_item_desc, false, false, C.WIDTH_SHORT),
    col.text("spec_std", CN.spec_std, isEditModeBottom, false, C.WIDTH_SHORT),
    col.number("spec_min", CN.spec_min, isEditModeBottom, C.WIDTH_SHORT, false),
    col.number("spec_max", CN.spec_max, isEditModeBottom, C.WIDTH_SHORT, false),
    col.number("spec_lcl", CN.spec_lcl, isEditModeBottom, C.WIDTH_SHORT, false),
    col.number("spec_ucl", CN.spec_ucl, isEditModeBottom, C.WIDTH_SHORT, false),
    col.id("insp_method_id", CN.insp_method_id, C.HIDDEN_ID),
    col.text("insp_method_nm", CN.insp_method_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_tool_id", CN.insp_tool_id, C.HIDDEN_ID),
    col.text("insp_tool_nm", CN.insp_tool_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_filing_id", CN.insp_filing_id, C.HIDDEN_ID),
    col.text("insp_filing_nm", CN.insp_filing_nm, false, false, C.WIDTH_SHORT),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.text("infc_memory_nm", CN.infc_memory_nm, false, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditModeBottom, false, C.WIDTH_SHORT),
    col.text("create_at", CN.create_at, false, false, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT, "center"),
    col.text("update_at", CN.update_at, false, false, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT, "center"),
    col.text("delete_at", CN.delete_at, false, true, C.WIDTH_LONG, "center"),
    col.text("delete_user_nm", CN.delete_user_nm, false, true, C.WIDTH_SHORT, "center"),
  ];
  const columnsModalHeader = [
    col.id("insp_document_id", CN.insp_document_id, C.HIDDEN_ID),
    col.date("work_order_date", CN.work_order_date, true, C.WIDTH_SHORT),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true),
    col.select("prod_nm", CN.prod_nm, true, C.WIDTH_SHORT),
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.select("line_dept_nm", CN.line_dept_nm, true, C.WIDTH_SHORT),
    col.date("work_start_date", CN.work_start_date, true, C.WIDTH_SHORT),
    col.date("work_end_date", CN.work_end_date, true, C.WIDTH_SHORT),
    col.number("work_order_qty", CN.work_order_qty, true, C.WIDTH_SHORT, false),
    col.check("complete_fg", CN.complete_fg, true, false, C.WIDTH_SHORT),
    col.date("complete_date", CN.complete_date, true, C.WIDTH_SHORT),
    col.text("remark", CN.remark, true, false, C.WIDTH_SHORT),
  ];

  const columnsSelectLineDept = [
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT, C.U, true, true),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
  ];
  const columnsSelectDocument = [
    col.id("insp_document_id", CN.insp_document_id, C.HIDDEN_ID),
    col.text("insp_document_no", CN.insp_document_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, C.U, C.U, C.U, C.U, true, true),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, true),
    col.date("insp_document_reg_date", CN.insp_document_reg_date, C.U, C.U, true),
    col.date("apply_date", CN.apply_date, C.U, C.U, true),
    col.text("contents", CN.contents, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];
  const columnsSelectMid = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT, "left", false, false, false, false),
    col.text("spec_std", CN.spec_std, false, false, C.WIDTH_SHORT, "left", false, false, false, false),
    col.number("spec_min", CN.spec_min, false, C.WIDTH_SHORT, false),
    col.number("spec_max", CN.spec_max, false, C.WIDTH_SHORT, false),
    col.number("spec_lcl", CN.spec_lcl, false, C.WIDTH_SHORT, false),
    col.number("spec_ucl", CN.spec_ucl, false, C.WIDTH_SHORT, false),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.text("infc_memory_nm", CN.infc_memory_nm, false, false, C.WIDTH_SHORT),
  ];
  const columnsSelectBottom = [
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.text("proc_nm", CN.proc_nm, false, false, C.WIDTH_SHORT),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_nm", CN.equip_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_item_type_id", CN.insp_item_type_id, C.HIDDEN_ID),
    col.text("insp_item_type_nm", CN.insp_item_type_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_item_id", CN.insp_item_id, C.HIDDEN_ID),
    col.text("insp_item_nm", CN.insp_item_nm, false, false, C.WIDTH_SHORT),
    col.text("insp_item_desc", CN.insp_item_desc, false, false, C.WIDTH_SHORT),
    col.text("spec_std", CN.spec_std, true, false, C.WIDTH_SHORT),
    col.number("spec_min", CN.spec_min, true, C.WIDTH_SHORT, false),
    col.number("spec_max", CN.spec_max, true, C.WIDTH_SHORT, false),
    col.number("spec_lcl", CN.spec_lcl, true, C.WIDTH_SHORT, false),
    col.number("spec_ucl", CN.spec_ucl, true, C.WIDTH_SHORT, false),

    col.id("insp_method_id", CN.insp_method_id, C.HIDDEN_ID),
    col.text("insp_method_nm", CN.insp_method_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_tool_id", CN.insp_tool_id, C.HIDDEN_ID),
    col.text("insp_tool_nm", CN.insp_tool_nm, false, false, C.WIDTH_SHORT),
    col.id("insp_filing_id", CN.insp_filing_id, C.HIDDEN_ID),
    col.text("insp_filing_nm", CN.insp_filing_nm, false, false, C.WIDTH_SHORT),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.text("infc_memory_nm", CN.infc_memory_nm, false, false, C.WIDTH_SHORT),
  ];

  /**
   * 🔸inputSet id 값이 ⭐ BE : query params
   */
  const inputSet = [
    {
      id: "line_nm",
      name: CN.line_nm,
    },
    {
      id: "request_no",
      name: CN.request_no,
    },
  ];
  const data = [];
  return {
    data,
    columnsHeader,
    columnsMid,
    columnsBottom,
    columnsSelectLineDept,
    columnsModalHeader,

    columnsSelectDocument,
    columnsSelectMid,
    columnsSelectBottom,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
  };
}

export default ProductionOrderSet;
