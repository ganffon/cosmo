//제품구분관리✨
//🔍 OnlySearchSingleGrid.jsx 에서 사용
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProductGbnSet(isEditMode) {
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
    col.id("prod_gbn_id", CN.prod_gbn_id, C.HIDDEN_ID),
    col.text("prod_gbn_cd", CN.prod_gbn_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_gbn_nm", CN.prod_gbn_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.text("prod_gbn_cd", CN.prod_gbn_cd, true),
    col.text("prod_gbn_nm", CN.prod_gbn_nm, true),
  ];

  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = {};
  /**
   * 🔸날짜단일조회 - "single"
   * 🔸날짜기간조회 - "range"
   * 🔸날짜안쓰는경우 - null
   */
  const datePickerSet = null;

  /**
   * 🔸inputSet id 값이 ✨ BE : query params
   */
  const inputSet = [
    {
      id: "prod_gbn_cd",
      name: CN.prod_gbn_cd,
    },
    {
      id: "prod_gbn_nm",
      name: CN.prod_gbn_nm,
    },
  ];

  return {
    data,
    columns,
    columnsModal,
    columnOptions,
    rowHeaders,
    rowHeadersModal,
    header,
    datePickerSet,
    inputSet,
  };
}

export default ProductGbnSet;
