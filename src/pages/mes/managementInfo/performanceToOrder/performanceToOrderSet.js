//라인관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function PerformanceToOrderSet(isEditMode) {
  const data = [];
  const rowNum = ["rowNum"];
  const columns = [
    col.text("work_order_no", CN.work_order_no, C.U, false),
    col.date("work_start_date", CN.work_start_date),
    col.date("work_end_date", CN.work_end_date),
    col.date("complete_date", CN.complete_date),
    col.text("line_nm", CN.line_nm, C.U, C.U, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_gbn_nm", CN.prod_gbn_nm),
    col.text("model_nm", CN.model_nm),
    col.text("prod_class_nm", CN.prod_class_nm),

    col.number("work_input_qty", CN.work_input_qty),
    col.number("theory_input_qty", CN.theory_input_qty),
    col.number("work_input_rate", CN.work_input_rate),

    col.number("work_packing_qty", CN.work_packing_qty),
    col.number("theory_prod_qty", CN.theory_prod_qty),
    col.number("work_packing_rate", CN.work_packing_rate),
    col.text("remark", CN.remark, C.U, C.U, C.WIDTH_LONG),
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };

  const header = {
    //🔸headerMerge
    height: 100,
    complexColumns: [
      {
        header: "투입량",
        name: "투입량",
        childNames: ["work_input_qty", "theory_input_qty", "work_input_rate"],
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        header: "생산량",
        name: "생산량",
        childNames: ["work_packing_qty", "theory_prod_qty", "work_packing_rate"],
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
    ],
    //🔸multiLine
    columns: [
      {
        name: "work_input_qty",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "work_packing_qty",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "theory_input_qty",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "theory_prod_qty",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "work_input_rate",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "work_packing_rate",
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
    ],
  };

  return {
    data,
    rowNum,
    columns,
    columnOptions,
    header,
  };
}

export default PerformanceToOrderSet;
