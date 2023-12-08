import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function InventoryViewSet(convertUnit) {
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
  const columnsMaterial = [
    col.text("prod_class_nm", "원료명", C.U, C.U, C.WIDTH_MIDDLE),
    col.number("start_qty", `기초재고(${convertUnit})`),
    col.number("income_qty", `입고(${convertUnit})`),
    col.number("input_qty", `생산투입(${convertUnit})`),
    col.number("end_qty", `기말재고(${convertUnit})`),
  ];
  const columnsProduct = [
    col.text("prod_nm", "제품명", C.U, C.U, C.WIDTH_MIDDLE),
    col.number("start_qty", `기초재고(${convertUnit})`),
    col.number("work_qty", `생산포장(${convertUnit})`),
    col.number("input_qty", `생산투입(${convertUnit})`),
    col.number("outgo_qty", `출하(${convertUnit})`),
    col.number("end_qty", `기말재고(${convertUnit})`),
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
    columnsMaterial,
    columnsProduct,
    columnOptions,
    header,
  };
}

export default InventoryViewSet;
