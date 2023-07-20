//라인관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function PackingInputSet(onCancelYield) {
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
  const columnsPacking = [
    col.id("work_packing_id", CN.work_packing_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE),
    col.date("work_packing_date", CN.work_packing_date),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("packing_complete_qty", CN.packing_complete_qty),
    col.button("complete_fg", "계산취소", "계산취소", onCancelYield, "-"),
    // col.id("complete_fg", CN.complete_fg2, C.HIDDEN_ID),
  ];
  const columnsInput = [
    col.text("lot_no", CN.lot_no),
    col.number("total_input_qty", CN.total_input_qty),
    col.number("input_qty", CN.input_qty2),
    col.number("loss_qty", CN.loss_qty),
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text("remark", CN.remark, true, true),
  ];
  const columnsWeight = [
    col.date("input_date", CN.input_date),
    col.text("input_time", CN.input_time, C.U, C.U, C.U, "center"),
    col.text("lot_no", CN.lot_no, C.U, C.U, C.WIDTH_MIDDLE),
    col.number("input_qty", CN.input_qty),
    col.text("prod_class_nm", CN.prod_class_nm),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, C.U, C.U, C.WIDTH_MIDDLE),
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

  const header = {};

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
    columnsPacking,
    columnsInput,
    columnsWeight,
    columnsModal,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default PackingInputSet;
