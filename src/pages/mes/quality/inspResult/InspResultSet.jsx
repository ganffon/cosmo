//사업부관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function InspResultSet(isEditMode) {
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
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.text("factory_cd", CN.factory_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("factory_nm", CN.factory_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.rText("factory_cd", CN.factory_cd, true, C.U, C.WIDTH_MIDDLE),
    col.rText("factory_nm", CN.factory_nm, true, C.U, C.WIDTH_MIDDLE),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_type_small_nm", CN.prod_type_small_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_SHORT),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_SHORT),
  ];
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
      id: "factory_cd",
      name: CN.factory_cd,
    },
    {
      id: "factory_nm",
      name: CN.factory_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnsSelectProd,
    columnsModal,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default InspResultSet;
