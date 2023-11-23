import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProductionPackingViewSet() {
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersNum = ["rowNum"];
  const header = col.multi(["rework_fg"]);
  const datePickerSet = null;

  const columns = [
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, false, false, C.WIDTH_MIDDLE),
    col.check("rework_fg", "재처리\n여부"),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.id("work_packing_detail_id", CN.work_packing_detail_id, C.HIDDEN_ID),
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.number("packing_qty", CN.packing_qty, false, C.WIDTH_SHORT, false),
    col.number("packing_no", CN.packing_no),
    col.id("packing_emp_id", CN.packing_emp_id, C.HIDDEN_ID),
    col.select("packing_emp_nm", CN.packing_emp_nm),
    col.date("work_packing_date", CN.work_packing_date),
    col.text("work_packing_time", CN.work_packing_time, C.U, C.U, C.U, "center"),
    col.text("remark", CN.remark, C.U, false, C.WIDTH_MIDDLE),
    col.text("barcode_no", CN.barcode_no, false, true),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT, "center"),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT, "center"),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
  ];

  return {
    columnOptions,
    rowHeadersNum,
    header,
    datePickerSet,
    columns,
    columnsSelectProd,
  };
}

export default ProductionPackingViewSet;
