import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function MixedReportSet() {
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
  const columnsLeft = [
    col.text("date", CN.date, C.U, C.U, C.U, "center"),
    col.text("mes", "MES 투입실적", C.U, C.U, C.U, "center"),
    col.text("opc", "혼합기 가동", C.U, C.U, C.U, "center"),
    col.text("difference", "차이", C.U, C.U, C.U, "center"),
  ];

  const columnsMES = [
    col.text("work_weigh_date", CN.input_date, C.U, C.U, C.U, "center"),
    col.text("work_weigh_time", CN.input_time, C.U, C.U, C.U, "center"),
    col.text("weigh_emp_cd", CN.emp_cd, C.U, C.U, C.U, "center"),
    col.text("weigh_emp_nm", CN.input_emp_nm, C.U, C.U, C.U, "center"),
  ];

  const columnsOPC = [
    col.text("work_weigh_date", CN.date, C.U, C.U, C.U, "center"),
    col.text("work_weigh_time", CN.hour_time, C.U, C.U, C.U, "center"),
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

  return {
    data,
    columnsLeft,
    columnsMES,
    columnsOPC,
    columnOptions,
    header,
  };
}

export default MixedReportSet;
