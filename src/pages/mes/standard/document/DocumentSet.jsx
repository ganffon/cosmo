import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function DocumentSet(
  isEditModeHeader,
  isEditModeDetail,
  isNewDetail,
  lineList,
  inspMethodList,
  inspToolList,
  inspFilingList
) {
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
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.id("insp_document_id", CN.insp_document_id, C.HIDDEN_ID),
    col.text("insp_document_no", CN.insp_document_no, C.U, C.U, C.WIDTH_MIDDLE),
    // col.list("line_id", "line_nm", CN.line_nm, lineList, isEditModeHeader),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    // col.select("prod_cd", CN.prod_cd, isEditModeHeader, C.WIDTH_MIDDLE),
    // col.select("prod_nm", CN.prod_nm, isEditModeHeader, C.WIDTH_MIDDLE),
    col.date("insp_document_reg_date", CN.insp_document_reg_date, isEditModeHeader),
    col.date("apply_date", CN.apply_date, isEditModeHeader),
    col.check("apply_fg", CN.apply_fg, isEditModeHeader),
    col.text("contents", CN.contents, isEditModeHeader, C.U, C.WIDTH_MIDDLE),
    col.text("remark", CN.remark, isEditModeHeader, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];

  const columnsDetail = [
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.id("insp_document_id", CN.insp_document_id, C.HIDDEN_ID),
    col.id("insp_document_detail_id", CN.insp_document_detail_id, C.HIDDEN_ID),
    col.number("sortby", CN.sortby, isEditModeDetail, C.WIDTH_SUPER_SHORT),
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.select("proc_nm", CN.proc_nm, isEditModeDetail, C.WIDTH_MIDDLE),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.select("equip_nm", CN.equip_nm, isEditModeDetail, C.WIDTH_MIDDLE),
    col.listGbn("insp_proc_gbn", CN.insp_proc_gbn, isEditModeDetail),
    col.id("insp_item_type_id", CN.insp_item_type_id, C.HIDDEN_ID),
    col.select("insp_item_type_nm", CN.insp_item_type_nm, isEditModeDetail, C.WIDTH_MIDDLE),
    col.id("insp_item_id", CN.insp_item_id, C.HIDDEN_ID),
    col.select("insp_item_nm", CN.insp_item_nm, isEditModeDetail, C.WIDTH_MIDDLE),
    col.text("insp_item_desc", CN.insp_item_desc, isEditModeDetail, C.U, C.WIDTH_MIDDLE),
    col.text("spec_std", CN.spec_std, isEditModeDetail, C.U, C.WIDTH_MIDDLE),
    col.number("spec_min", CN.spec_min, isEditModeDetail),
    col.number("spec_max", CN.spec_max, isEditModeDetail),
    col.number("spec_lcl", CN.spec_lcl, isEditModeDetail),
    col.number("spec_ucl", CN.spec_ucl, isEditModeDetail),
    col.list("insp_method_id", "insp_method_nm", CN.insp_method_nm, inspMethodList, isEditModeDetail),
    col.list("insp_tool_id", "insp_tool_nm", CN.insp_tool_nm, inspToolList, isEditModeDetail),
    col.list("insp_filing_id", "insp_filing_nm", CN.insp_filing_nm, inspFilingList, isEditModeDetail),
    col.text("special_property", CN.special_property, isEditModeDetail, C.U, C.WIDTH_MIDDLE),
    col.number("worker_sample_cnt", CN.worker_sample_cnt, isEditModeDetail),
    col.text("worker_insp_cycle", CN.worker_insp_cycle, isEditModeDetail),
    col.number("inspector_sample_cnt", CN.inspector_sample_cnt, isEditModeDetail),
    col.text("inspector_insp_cycle", CN.inspector_insp_cycle, isEditModeDetail),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.text("remark", CN.remark, isEditModeDetail, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModalHeader = [
    col.id("insp_document_id", CN.insp_document_id, C.HIDDEN_ID),
    col.text("insp_document_no", CN.insp_document_no, !isNewDetail, C.U, C.WIDTH_MIDDLE),
    col.list("line_id", "line_nm", CN.line_nm, lineList, !isNewDetail),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, !isNewDetail, C.WIDTH_MIDDLE),
    col.select("prod_nm", CN.prod_nm, !isNewDetail, C.WIDTH_MIDDLE),
    col.date("insp_document_reg_date", CN.insp_document_reg_date, !isNewDetail),
    col.date("apply_date", CN.apply_date, !isNewDetail),
    col.check("apply_fg", CN.apply_fg, !isNewDetail),
    col.text("contents", CN.contents, !isNewDetail, C.U, C.WIDTH_MIDDLE),
    col.text("remark", CN.remark, !isNewDetail, C.U, C.WIDTH_LONG),
  ];
  const columnsModalDetail = [
    col.id("insp_document_id", CN.insp_document_id, C.HIDDEN_ID),
    col.number("sortby", CN.sortby, true, C.WIDTH_SUPER_SHORT),
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.select("proc_nm", CN.proc_nm, true, C.WIDTH_MIDDLE),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.select("equip_nm", CN.equip_nm, true, C.WIDTH_MIDDLE),
    col.listGbn("insp_proc_gbn", CN.insp_proc_gbn, true),
    col.id("insp_item_type_id", CN.insp_item_type_id, C.HIDDEN_ID),
    col.select("insp_item_type_nm", CN.insp_item_type_nm, true, C.WIDTH_MIDDLE),
    col.id("insp_item_id", CN.insp_item_id, C.HIDDEN_ID),
    col.select("insp_item_nm", CN.insp_item_nm, true, C.WIDTH_MIDDLE),
    col.text("insp_item_desc", CN.insp_item_desc, true, C.U, C.WIDTH_MIDDLE),
    col.text("spec_std", CN.spec_std, true, C.U, C.WIDTH_MIDDLE),
    col.number("spec_min", CN.spec_min, true),
    col.number("spec_max", CN.spec_max, true),
    col.number("spec_lcl", CN.spec_lcl, true),
    col.number("spec_ucl", CN.spec_ucl, true),
    col.list("insp_method_id", "insp_method_nm", CN.insp_method_nm, inspMethodList, true),
    col.list("insp_tool_id", "insp_tool_nm", CN.insp_tool_nm, inspToolList, true),
    col.list("insp_filing_id", "insp_filing_nm", CN.insp_filing_nm, inspFilingList, true),
    col.text("special_property", CN.special_property, true, C.U, C.WIDTH_MIDDLE),
    col.number("worker_sample_cnt", CN.worker_sample_cnt, true),
    col.text("worker_insp_cycle", CN.worker_insp_cycle, true),
    col.number("inspector_sample_cnt", CN.inspector_sample_cnt, true),
    col.text("inspector_insp_cycle", CN.inspector_insp_cycle, true),
    col.id("infc_memory_id", CN.infc_memory_id, C.HIDDEN_ID),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, "select"),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, "select"),
  ];
  const columnsSelectInsp = [
    col.id("insp_item_type_id", CN.insp_item_type_id, C.HIDDEN_ID),
    col.text("insp_item_type_nm", CN.insp_item_type_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, "select"),
    col.id("insp_item_id", CN.insp_item_id, C.HIDDEN_ID),
    col.text("insp_item_nm", CN.insp_item_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, "select"),
  ];

  const columnsSelectEquipProc = [
    col.id("proc_id", CN.proc_id, C.HIDDEN_ID),
    col.text("proc_nm", CN.proc_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, "select"),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_nm", CN.equip_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, true, "select"),
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = col.multi(["apply_fg"]);
  // const header = {
  //   height: "60",
  //   complexColumns: [
  //     {
  //       header: "ID + Name",
  //       name: "parent1",
  //       childNames: ["id", "name"],
  //     },
  //   ],
  // };

  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안씀 - null
   */
  const datePickerSet = null;

  /**
   * 🔸inputSet id 값이 ⭐ BE : query params
   */
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

  const inputInfo = [
    {
      id: "insp_document_no",
      name: CN.insp_document_no,
    },
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
    {
      id: "insp_document_reg_date",
      name: CN.insp_document_reg_date,
    },
    {
      id: "apply_date",
      name: CN.apply_date,
    },
    {
      id: "apply_fg",
      name: CN.apply_fg,
    },
    {
      id: "contents",
      name: CN.contents,
    },
    {
      id: "remark",
      name: CN.remark,
    },
  ];
  return {
    data,
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnsSelectProd,
    columnsSelectInsp,
    columnsSelectEquipProc,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
    inputInfo,
  };
}

export default DocumentSet;
