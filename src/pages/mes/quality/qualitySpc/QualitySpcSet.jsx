import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function QualitySpcSet(isEditMode) {
  const data = [];
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = {};
  const columns = [
    // col.id("insp_result_upload_id", CN.insp_result_upload_id, C.HIDDEN_ID),
    // col.id("insp_result_id", CN.insp_result_id, C.HIDDEN_ID),
    // col.text("lot_no", CN.lot_no, false, false),
    // col.text("prod_nm", CN.prod_nm, false),
    // col.date("work_date", CN.work_date, false, C.U),
    // col.text("insp_item", CN.insp_item, false, false),
    // col.number("insp_min", CN.insp_min, isEditMode),
    // col.number("insp_max", CN.insp_max, isEditMode),
    // col.number("insp_value", CN.insp_value, isEditMode),
    // col.text("remark", CN.remark, isEditMode, false),
    col.text("work_date", CN.work_date, false, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, false, C.WIDTH_SHORT),
    col.text("sample_1", CN.sample_1, false, false, false, C.WIDTH_SHORT),
    col.text("sample_2", CN.sample_2, false, false, false, C.WIDTH_SHORT),
    col.text("sample_3", CN.sample_3, false, false, false, C.WIDTH_SHORT),
    col.text("sample_4", CN.sample_4, false, false, false, C.WIDTH_SHORT),
    col.text("sample_5", CN.sample_5, false, false, false, C.WIDTH_SHORT),
    col.text("average", CN.average, false, false, false, C.WIDTH_SHORT),
    col.text("diviation", CN.diviation, false, false, false, C.WIDTH_SHORT),
  ];
  const columnsSelectProd = [
    col.id("work_order_id", CN.work_order_id, C.HIDDEN_ID),
    col.text("work_order_no", CN.work_order_no, false, false, C.WIDTH_SHORT),
    col.text("work_order_date", CN.work_order_date, false, false, C.WIDTH_SHORT),
    col.text("line_dept_id", CN.line_dept_id, false, true, C.WIDTH_SHORT),
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_id", CN.prod_id, false, true, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
    col.text("inv_to_store_id", CN.inv_to_store_id, false, true, C.WIDTH_SHORT),
    col.text("inv_to_store_nm", CN.inv_to_store_nm, false, true, C.WIDTH_SHORT),
    col.text("work_start_date", CN.work_start_date, false, false, C.WIDTH_SHORT),
    col.text("work_end_date", CN.work_end_date, false, false, C.WIDTH_SHORT),
    // col.text("DB컬럼명", 한글컬럼명, 입력모드, hidden, minWidth, align, sortable, filter),
    // col.text("prod_type_small_nm", CN.prod_type_small_nm, false, false, C.WIDTH_SHORT),
    // col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    // col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
  ];
  const columnsSelectManage = [
    col.id("proc_nm", CN.proc_nm, C.HIDDEN_ID),
    col.text("equip_nm", CN.equip_nm),
    col.text("insp_item_type_nm", CN.insp_item_type_nm), //점검유형
    col.text("insp_item_nm", CN.insp_item_nm), //점검항목
    col.text("insp_item_desc", CN.insp_item_desc, false, true, C.WIDTH_SHORT), //세부내용
    col.text("spec_std", CN.spec_std),
    col.number("spec_min", CN.spec_min),
    col.number("spec_max", CN.spec_max),
    col.number("spec_lcl", CN.spec_lcl),
    col.number("spec_ucl", CN.spec_ucl),
    col.text("infc_memory_id", CN.inv_to_store_id, false, true, C.WIDTH_SHORT),
    col.text("tag_id", CN.tag_id, false, true, C.WIDTH_SHORT),
  ];
  const columnsModal = [
    col.id("insp_result_id", CN.insp_result_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true),
    col.select("prod_nm", CN.prod_cd, true),
    col.text("lot_no", CN.lot_no, true, false),
    col.date("work_date", CN.work_date, true, C.U),
    col.text("insp_item", CN.insp_item, true, false),
    col.number("insp_min", CN.insp_min, true),
    col.number("insp_max", CN.insp_max, true),
    col.number("insp_value", CN.insp_value, true),
    col.text("remark", CN.remark, true, false),
  ];
  const columnProdSelect = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true),
    col.select("prod_nm", CN.prod_nm, true),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const datePickerSet = null;
  const inputSet = [
    {
      id: "lot_no",
      name: CN.lot_no,
    },
    {
      id: "insp_item",
      name: CN.insp_item,
    },
  ];
  return {
    data,
    columns,
    columnsSelectProd,
    columnsSelectManage,
    columnsModal,
    columnProdSelect,
    columnOptions,
    rowHeaders,
    rowHeadersModal,
    header,
    datePickerSet,
    inputSet,
  };
}
export default QualitySpcSet;
