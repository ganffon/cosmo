import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function ProductSet(
  isEditMode,
  productGbnList,
  productModelList,
  productTypeList,
  productTypeSmallList,
  unitList,
  prodClassList
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
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.list("prod_gbn_id", "prod_gbn_nm", CN.prod_gbn_nm, productGbnList, isEditMode),
    col.list("model_id", "model_nm", CN.model_nm, productModelList, isEditMode),
    // col.list("prod_type_id", "prod_type_nm", CN.prod_type_nm, productTypeList, false),
    // col.list("prod_type_small_id", "prod_type_small_nm", CN.prod_type_small_nm, productGbnList, false),
    col.list("prod_class_id", "prod_class_nm", CN.prod_class_nm, prodClassList, isEditMode),
    // col.id("prod_class_id", CN.prod_class_id, C.HIDDEN_ID),
    // col.text("prod_class_nm", CN.prod_class_nm, false, false),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("rev", CN.rev, false, true, C.WIDTH_SUPER_SHORT, "center"),
    col.text("prod_std", CN.prod_std, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.number("bag_qty", CN.bag_qty, isEditMode, C.U, false),
    col.list("unit_id", "unit_nm", CN.unit_nm, unitList, false, C.WIDTH_SUPER_SHORT),
    col.check("lot_fg", CN.lot_fg, isEditMode, C.U, true),
    col.check("use_fg", CN.use_fg, isEditMode, C.WIDTH_SHORT),
    col.check("is_spareparts", CN.is_spareparts, isEditMode, C.WIDTH_SHORT),
    col.check("active_fg", CN.active_fg, isEditMode, C.U, true),
    col.id("bom_type_id", CN.bom_type_id, C.HIDDEN_ID),
    col.number("width", CN.width, false, C.U, true),
    col.number("length", CN.length, false, C.U, true),
    col.number("height", CN.height, false, C.U, true),
    col.text("material", CN.material, false, true),
    col.text("color", CN.color, false, true),
    col.number("weight", CN.weight, false, C.U, true),
    col.number("thickness", CN.thickness, false, C.U, true),
    col.check("mat_order_fg", CN.mat_order_fg, isEditMode, C.U, true),
    col.id("mat_unit_id", CN.mat_unit_id, C.HIDDEN_ID),
    col.number("mat_order_min_qty", CN.mat_order_min_qty, false, C.U, true),

    col.number("mat_supply_days", CN.mat_supply_days, false, C.U, true),
    col.check("sal_order_fg", CN.sal_order_fg, isEditMode, C.U, true),
    col.check("inv_use_fg", CN.inv_use_fg, isEditMode, C.U, true),
    col.number("inv_unit_qty", CN.inv_unit_qty, false, C.U, true),
    col.number("inv_safe_qty", CN.inv_safe_qty, false, C.U, true),

    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.select("store_nm", CN.inv_to_store_nm, isEditMode),
    // col.text("store_nm", CN.inv_to_store_nm),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.select("location_nm", CN.inv_to_location_nm, isEditMode),
    // col.text("location_nm", CN.inv_to_location_nm),
    col.check("qms_receive_insp_fg", CN.qms_receive_insp_fg, isEditMode, C.U, true),
    col.check("qms_proc_insp_fg", CN.qms_proc_insp_fg, isEditMode, C.U, true),
    col.check("qms_final_insp_fg", CN.qms_final_insp_fg, isEditMode, C.U, true),
    col.id("prd_plan_type_id", CN.prd_plan_type_id, C.HIDDEN_ID),
    col.check("prd_active_fg", CN.prd_active_fg, isEditMode, C.U, true),
    col.number("prd_min", CN.prd_min, false, C.U, true),
    col.number("prd_max", CN.prd_max, false, C.U, true),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.list("prod_gbn_id", "prod_gbn_nm", CN.prod_gbn_nm, productGbnList, true),
    col.list("model_id", "model_nm", CN.model_nm, productModelList, true),
    // col.list("prod_type_id", "prod_type_nm", CN.prod_type_nm, productTypeList, true),
    // col.list("prod_type_small_id", "prod_type_small_nm", CN.prod_type_small_nm, productTypeSmallList, true),
    col.list("prod_class_id", "prod_class_nm", CN.prod_class_nm, prodClassList, true),
    col.text("prod_cd", CN.prod_cd, true, C.U, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, true, C.U, C.WIDTH_MIDDLE),
    col.text("rev", CN.rev, true, true, C.WIDTH_SUPER_SHORT, "center"),
    col.text("prod_std", CN.prod_std, true, C.U, C.WIDTH_MIDDLE),
    col.number("bag_qty", CN.bag_qty, true, C.U, false),
    col.list("unit_id", "unit_nm", CN.unit_nm, unitList, true, C.WIDTH_SUPER_SHORT),
    col.id("inv_to_store_id", CN.inv_to_store_id, C.HIDDEN_ID),
    col.select("store_nm", CN.inv_to_store_nm, true),
    col.id("inv_to_location_id", CN.inv_to_location_id, C.HIDDEN_ID),
    col.select("location_nm", CN.inv_to_location_nm, true),
    col.check("lot_fg", CN.lot_fg, true, C.U, true),
    col.check("use_fg", CN.use_fg, true),
    col.check("active_fg", CN.active_fg, true, C.U, true),
    col.number("width", CN.width, true, C.U, true),
    col.number("length", CN.length, true, C.U, true),
    col.number("height", CN.height, true, C.U, true),
    col.text("material", CN.material, true, true),
    col.text("color", CN.color, true, true),
    col.number("weight", CN.weight, true, C.U, true),
    col.number("thickness", CN.thickness, true, C.U, true),
    col.check("is_spareparts", CN.is_spareparts, true, C.WIDTH_SHORT),
    col.check("mat_order_fg", CN.mat_order_fg, true, C.U, true),
    col.number("mat_order_min_qty", CN.mat_order_min_qty, true, C.U, true),
    col.number("mat_supply_days", CN.mat_supply_days, true, C.U, true),
    col.check("sal_order_fg", CN.sal_order_fg, true, C.U, true),
    col.check("inv_use_fg", CN.inv_use_fg, true, C.U, true),
    col.number("inv_unit_qty", CN.inv_unit_qty, true, C.U, true),
    col.number("inv_safe_qty", CN.inv_safe_qty, true, C.U, true),
    col.check("qms_receive_insp_fg", CN.qms_receive_insp_fg, true, C.U, true),
    col.check("qms_proc_insp_fg", CN.qms_proc_insp_fg, true, C.U, true),
    col.check("qms_final_insp_fg", CN.qms_final_insp_fg, true, C.U, true),
    col.check("prd_active_fg", CN.prd_active_fg, true, C.U, true),
    col.number("prd_min", CN.prd_min, true, C.U, true),
    col.number("prd_max", CN.prd_max, true, C.U, true),
  ];
  const columnSelect = [
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text("store_nm", CN.store_nm),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text("location_nm", CN.location_nm),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = col.multi([
    "lot_fg",
    "use_fg",
    "active_fg",
    "mat_order_fg",
    "sal_order_fg",
    "inv_use_fg",
    "qms_receive_insp_fg",
    "qms_proc_insp_fg",
    "qms_final_insp_fg",
    "prd_active_fg",
    "mat_order_min_qty",
    "prd_min",
    "prd_max",
    "is_spareparts",
  ]);
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
      id: "prod_cd",
      name: CN.prod_cd,
    },
    {
      id: "prod_nm",
      name: CN.prod_nm,
    },
    {
      id: "prod_std",
      name: CN.prod_std,
    },
  ];

  return {
    data,
    columns,
    columnsModal,
    columnSelect,
    columnOptions,
    rowHeaders,
    rowHeadersModal,
    header,
    datePickerSet,
    inputSet,
  };
}

export default ProductSet;
