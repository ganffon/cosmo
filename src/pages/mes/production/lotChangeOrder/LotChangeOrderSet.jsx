import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import "components/grid/setting/GridStyle.css";
import * as col from "custom/GridColumnSet";

function LotChangeOrderSet(isEditModeHeader) {
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
      {
        name: "work_start_time",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "work_end_time",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
    ],
  };

  const columnsHeader = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, isEditModeHeader, C.WIDTH_MIDDLE),
    col.select("prod_nm", CN.prod_nm, isEditModeHeader, C.WIDTH_MIDDLE),
    col.select("prod_std", CN.prod_std, false, C.WIDTH_MIDDLE),
    col.select("input_lot_no", CN.lot_no, isEditModeHeader, C.WIDTH_MIDDLE),
    col.select("input_packing_no", CN.packing_no, isEditModeHeader, C.WIDTH_SHORT),
    col.number("input_qty", CN.qty, false, C.WIDTH_SHORT),
    col.date("input_date", CN.work_packing_date, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditModeHeader, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.text("create_at", CN.create_at, false, false, C.WIDTH_LONG, "center", false, false, false, false),
    col.text("create_user_nm", CN.create_user_nm, false, false, C.WIDTH_SHORT, "center", false, false, false, false),
    col.text("update_at", CN.update_at, false, false, C.WIDTH_LONG, "center", false, false, false, false),
    col.text("update_user_nm", CN.update_user_nm, false, false, C.WIDTH_SHORT, "center", false, false, false, false),
    col.text("delete_at", CN.delete_at, false, true, C.WIDTH_LONG, "center", false, false, false, false),
    col.text("delete_user_nm", CN.delete_user_nm, false, true, C.WIDTH_SHORT, false, false, false, false, false),
  ];
  const columnsMid = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, false, false, C.WIDTH_MIDDLE),
    col.text("input_lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.text("input_packing_no", CN.packing_no),
    col.number("input_qty", CN.qty, false, C.WIDTH_SHORT),
    col.date("input_date", CN.work_packing_date, false, C.WIDTH_SHORT),
    col.text("remark", CN.remark, false, false, C.WIDTH_SHORT, false, false, false, false, false),
    col.text("packing_lot_no", "변경LOT"),
    col.text("packing_no", CN.packing_no),

    col.text("work_packing_date", "변경일자", false, false, false, "center"),
    col.text("work_packing_time", "변경시간", false, false, false, "center"),
    col.text("packing_emp_nm", "작업자", false, false, false, "center"),
  ];

  const columnsModalHeader = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true, C.WIDTH_MIDDLE),
    col.select("prod_nm", CN.prod_nm, true, C.WIDTH_MIDDLE),
    col.select("prod_std", CN.prod_std, false, C.WIDTH_MIDDLE),
    col.date("input_date", CN.work_packing_date, false, C.WIDTH_SHORT),
    col.number("input_qty", CN.qty, false, C.WIDTH_SHORT),
    col.select("input_lot_no", CN.lot_no, true, C.WIDTH_MIDDLE),
    col.select("input_packing_no", CN.packing_no, true, C.WIDTH_SHORT),
    col.text("remark", CN.remark, true, false, C.WIDTH_SHORT, false, false, false, false, false),
  ];

  const columnsSelectPacking = [
    col.text("line_dept_nm", CN.line_dept_nm, false, false, C.WIDTH_SHORT, C.U, true, true),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE, C.U, true, true),
    col.text("prod_std", CN.prod_std, false, false, C.WIDTH_MIDDLE, C.U, true, true),
    col.date("packing_date", CN.work_packing_date, false, C.WIDTH_SHORT, true),
    col.number("packing_qty", CN.packing_qty, false, C.WIDTH_SHORT, false, true),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE, C.U, true, true),
    col.number("packing_no", CN.packing_no, false, C.WIDTH_SHORT, false, true),
  ];

  const data = [];
  return {
    data,
    columnsHeader,
    columnsMid,
    columnsSelectPacking,
    columnsModalHeader,

    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
  };
}

export default LotChangeOrderSet;
