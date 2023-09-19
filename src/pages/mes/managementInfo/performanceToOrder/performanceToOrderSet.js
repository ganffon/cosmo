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
    col.text("line_nm", CN.line_nm, C.U, C.U, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_gbn_nm", CN.prod_gbn_nm),
    col.text("model_nm", CN.model_nm),
    col.text("prod_class_nm", CN.prod_class_nm),
    col.number("work_order_qty", CN.work_order_qty),
    col.number("work_input_qty", CN.total_input_qty),
    col.number("work_input_rate", CN.work_input_rate),
    col.number("work_packing_qty", CN.work_packing_qty),
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
    // height: 100,
    // complexColumns: [
    //   {
    //     header: "test",
    //     name: "test_test",
    //     childNames: ["line_cd", "line_nm"],
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
    //🔸multiLine
    columns: [
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
