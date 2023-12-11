import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function WeightErpLotSet() {
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
    col.text("work_order_no", CN.work_order_no, C.U, C.U, C.WIDTH_MIDDLE, C.U, C.U, true, C.U, true),
    col.text("line_nm", CN.line_nm, C.U, C.U, C.U, C.U, C.U, true, C.U, true),

    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.U, C.U, C.U, true),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.U, C.U, C.U, true),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE, C.U, C.U, true),

    col.number("total_qty", CN.total_qty),
    col.number("bag_qty", CN.bag_qty),
    col.number("input_qty", CN.input_qty),

    col.text("work_weigh_date", CN.work_weigh_date, C.U, C.U, C.U, "center", C.U, true),
    col.text("work_weigh_time", CN.work_weigh_time, C.U, C.U, C.U, "center", C.U, true),
    col.text("weigh_emp_nm", CN.weigh_emp_nm, C.U, C.U, C.U, "center", C.U, true),

    col.text("work_input_date", CN.input_date, C.U, C.U, C.U, "center", C.U, true),
    col.text("work_input_time", CN.input_time, C.U, C.U, C.U, "center", C.U, true),
    col.text("input_emp_nm", CN.input_emp_nm, C.U, C.U, C.U, "center", C.U, true),

    col.text("main_prod_nm", "계량품목", C.U, C.U, C.U, C.U, C.U, true),
    col.text("main_lot_no", "계량Lot", C.U, C.U, C.WIDTH_MIDDLE, C.U, C.U, true),
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
    // columns: [
    //   {
    //     name: "line_cd",
    //     renderer: CustomGrid.ColumnHeaderMultiLine,
    //   },
    // ],
  };
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
      id: "line_cd",
      name: CN.line_cd,
    },
    {
      id: "line_nm",
      name: CN.line_nm,
    },
  ];

  return {
    data,
    columns,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default WeightErpLotSet;
