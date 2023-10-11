//라인관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function TheoreticalProductionSet(isEditMode) {
  const data = [];
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
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
    col.text("line_nm", CN.line_nm, false, C.U, C.WIDTH_SHORT),
    col.text("prod_gbn_nm", CN.prod_gbn_nm, false, C.U, C.WIDTH_SHORT),
    col.text("model_nm", CN.model_nm, false, C.U, C.WIDTH_SHORT),
    col.text("prod_class_nm", CN.prod_class_nm, false, C.U, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, C.U, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, C.U, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, false, C.U, C.WIDTH_MIDDLE),

    col.number("plasticity_length", "소성길이", isEditMode, C.WIDTH_SHORT),
    col.number("roller_speed", "롤러속도", isEditMode, C.WIDTH_SHORT),
    col.decimalTwo("plasticity_time", "소성시간(Day)", false, C.WIDTH_SHORT),
    col.number("sagger_length", "사야길이", isEditMode, C.WIDTH_SHORT),

    col.number("top_sagger_qty", "사야수량", isEditMode, C.WIDTH_SHORT),
    col.decimalTwo("top_theoretical_sagger_qty", "이론사야수량", false, C.WIDTH_SHORT),
    col.number("top_filling_qty", "충진량", isEditMode, C.WIDTH_SHORT),
    col.decimalTwo("top_theoretical_filling_qty", "이론충진량", false, C.WIDTH_SHORT),

    col.number("bottom_sagger_qty", "사야수량", isEditMode, C.WIDTH_SHORT),
    col.decimalTwo("bottom_theoretical_sagger_qty", "이론사야수량", false, C.WIDTH_SHORT),
    col.number("bottom_filling_qty", "충진량", isEditMode, C.WIDTH_SHORT),
    col.decimalTwo("bottom_theoretical_filling_qty", "이론충진량", false, C.WIDTH_SHORT),

    col.decimalFour("yield", "수율", isEditMode, C.WIDTH_SHORT),

    col.decimalTwo("input_amount", "이론원부재투입량", false, C.WIDTH_SHORT),
    col.decimalTwo("production_volume", "이론제품생산량", false, C.WIDTH_SHORT),

    col.text("remark", CN.remark, isEditMode, C.U, C.WIDTH_LONG),

    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
  ];
  const columnsModal = [
    col.text("line_cd", CN.line_cd, true),
    col.text("line_nm", CN.line_nm, true),
    col.check("rework_fg", CN.rework_fg, true),
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
        name: "top_sagger",
        header: "상단사야",
        childNames: ["top_sagger_qty", "top_theoretical_sagger_qty", "top_filling_qty", "top_theoretical_filling_qty"],
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        name: "bottom_sagger",
        header: "하단사야",
        childNames: [
          "bottom_sagger_qty",
          "bottom_theoretical_sagger_qty",
          "bottom_filling_qty",
          "bottom_theoretical_filling_qty",
        ],
        renderer: CustomGrid.ColumnHeaderMultiLine,
      },
    ],
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
    rowHeaders,
    rowHeadersModal,
    columns,
    columnsModal,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default TheoreticalProductionSet;
