//사업부관리✨
import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function SparepartSstoreViewSet() {
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
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.id("prod_gbn_id", CN.prod_gbn_id, C.HIDDEN_ID),
    col.text("prod_gbn_nm", CN.prod_gbn_nm, false, false, C.WIDTH_SHORT),
    col.id("model_id", CN.model_id, C.HIDDEN_ID),
    col.text("model_nm", CN.model_nm, false, false, C.WIDTH_SHORT),
    // col.id("prod_type_id", CN.prod_type_id, C.HIDDEN_ID),
    // col.text("prod_type_nm", CN.prod_type_nm, false, false, C.WIDTH_SHORT),
    // col.id("prod_type_small_id", CN.prod_type_small_id, C.HIDDEN_ID),
    // col.text("prod_type_small_nm", CN.prod_type_small_nm, false, false, C.WIDTH_SHORT),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.text("prod_std", CN.prod_std, false, false, C.WIDTH_MIDDLE),
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_SHORT),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.text("stock", CN.stock, false, false, C.WIDTH_SHORT),
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
   * 🔸날짜안쓰는경우 - null
   */
  const datePickerSet = "single";

  /**
   * 🔸inputSet id 값이 ✨ BE : query params
   */
  const inputSet = [
    {
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
    },
    {
      id: "lot_no",
      name: CN.lot_no,
    },
  ];

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default SparepartSstoreViewSet;
