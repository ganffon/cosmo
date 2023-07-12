import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function StoreCheckSet(
  isEditMode,
  productGbnList,
  productModelList,
  productTypeList,
  productTypeSmallList
) {
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
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.id("prod_gbn_id", CN.prod_gbn_id, C.HIDDEN_ID),
    col.text("prod_gbn_nm", CN.prod_gbn_nm, false, false, C.WIDTH_SHORT),
    col.id("model_id", CN.model_id, C.HIDDEN_ID),
    col.text("model_nm", CN.model_nm, false, false, C.WIDTH_SHORT),
    col.id("prod_type_id", CN.prod_type_id, C.HIDDEN_ID),
    col.text("prod_type_nm", CN.prod_type_nm, false, false, C.WIDTH_SHORT),
    col.id("prod_type_small_id", CN.prod_type_small_id, C.HIDDEN_ID),
    col.text(
      "prod_type_small_nm",
      CN.prod_type_small_nm,
      false,
      false,
      C.WIDTH_SHORT
    ),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.WIDTH_MIDDLE),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.WIDTH_MIDDLE),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("stock", CN.stock, false, C.WIDTH_SHORT, false),
    col.number(
      "stock_inspection",
      CN.stock_inspection,
      isEditMode,
      C.WIDTH_SHORT,
      false
    ),
    col.text("remark", CN.remark, false, C.WIDTH_SUPER_LONG),
  ];
  const columnsModal = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.id("prod_gbn_id", CN.prod_gbn_id, C.HIDDEN_ID),
    col.select("prod_gbn_nm", CN.prod_gbn_nm, true, C.WIDTH_SHORT),
    col.id("model_id", CN.model_id, C.HIDDEN_ID),
    col.select("model_nm", CN.model_nm, true, C.WIDTH_SHORT),
    col.id("prod_type_id", CN.prod_type_id, C.HIDDEN_ID),
    col.select("prod_type_nm", CN.prod_type_nm, true, C.WIDTH_SHORT),
    col.id("prod_type_small_id", CN.prod_type_small_id, C.HIDDEN_ID),
    col.select(
      "prod_type_small_nm",
      CN.prod_type_small_nm,
      true,
      C.WIDTH_SHORT
    ),
    col.rSelect("prod_cd", CN.prod_cd, true, C.WIDTH_MIDDLE),
    col.rSelect("prod_nm", CN.prod_nm, true, C.WIDTH_MIDDLE),
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.rSelect("store_nm", CN.store_nm, true, C.WIDTH_MIDDLE),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.select("location_nm", CN.location_nm, true, C.WIDTH_MIDDLE),
    col.rText("lot_no", CN.lot_no, true, false, C.WIDTH_MIDDLE),
    col.rNumber("qty", CN.stock_inspection, true, C.WIDTH_SHORT, false),
    col.text("remark", CN.remark, true, false, C.WIDTH_SUPER_LONG),
  ];
  const columnsModalStockInspection = [
    col.id("tran_id", CN.tran_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.id("prod_gbn_id", CN.prod_gbn_id, C.HIDDEN_ID),
    col.text("prod_gbn_nm", CN.prod_gbn_nm, false, false, C.U, C.U, true, true),
    col.id("model_id", CN.model_id, C.HIDDEN_ID),
    col.text("model_nm", CN.model_nm, false, false, C.U, C.U, true, true),
    col.id("prod_type_id", CN.prod_type_id, C.HIDDEN_ID),
    col.text(
      "prod_type_nm",
      CN.prod_type_nm,
      false,
      false,
      C.U,
      C.U,
      true,
      true
    ),
    col.id("prod_type_small_id", CN.prod_type_small_id, C.HIDDEN_ID),
    col.text(
      "prod_type_small_nm",
      CN.prod_type_small_nm,
      false,
      false,
      C.U,
      C.U,
      true,
      true
    ),
    col.text(
      "prod_cd",
      CN.prod_cd,
      false,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      true,
      true
    ),
    col.text(
      "prod_nm",
      CN.prod_nm,
      false,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      true,
      true
    ),
    col.text(
      "tran_reg_date",
      CN.tran_reg_date,
      false,
      false,
      C.WIDTH_SHORT,
      "center",
      true,
      true
    ),
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm, false, false, C.U, C.U, true, true),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm, false, false, C.U, C.U, true, true),
    col.text(
      "lot_no",
      CN.lot_no,
      false,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      true,
      true
    ),
    col.number("qty", CN.qty, false, C.WIDTH_SHORT, false, true, true),
    col.text("remark", CN.remark, false, false, C.WIDTH_SUPER_LONG),
  ];
  const columnsSelectProd = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.id("prod_gbn_id", CN.prod_gbn_id, C.HIDDEN_ID),
    col.text(
      "prod_gbn_nm",
      CN.prod_gbn_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "left",
      true,
      "select"
    ),
    col.id("model_id", CN.model_id, C.HIDDEN_ID),
    col.text(
      "model_nm",
      CN.model_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "left",
      true,
      "select"
    ),
    col.id("prod_type_id", CN.prod_type_id, C.HIDDEN_ID),
    col.text(
      "prod_type_nm",
      CN.prod_type_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "left",
      true,
      "select"
    ),
    col.id("prod_type_small_id", CN.prod_type_small_id, C.HIDDEN_ID),
    col.text(
      "prod_type_small_nm",
      CN.prod_type_small_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "left",
      true,
      "select"
    ),
    col.text(
      "prod_cd",
      CN.prod_cd,
      false,
      false,
      C.WIDTH_MIDDLE,
      "left",
      true,
      "select"
    ),
    col.text(
      "prod_nm",
      CN.prod_nm,
      false,
      false,
      C.WIDTH_MIDDLE,
      "left",
      true,
      "select"
    ),
  ];
  const columnsSelectStore = [
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text(
      "store_nm",
      CN.store_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "left",
      true,
      "select"
    ),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text(
      "location_nm",
      CN.location_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "left",
      true,
      "select"
    ),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeadersNumCheck = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
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
    columns,
    columnsModal,
    columnsModalStockInspection,
    columnsSelectProd,
    columnsSelectStore,
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
  };
}

export default StoreCheckSet;
