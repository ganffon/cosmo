//사업부관리✨
import restURI from "json/restURI.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function SparePartReleaseSet(isEditMode) {
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
    col.id("spare_release_id", CN.spare_release_id, C.HIDDEN_ID),
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text("prod_nm", CN.prod_nm, false, false, C.WIDTH_MIDDLE),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.select("line_nm", CN.line_nm, isEditMode, C.WIDTH_SHORT),

    col.date("release_date", CN.release_date, false, C.WIDTH_SHORT),
    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_SHORT),
    col.number("release_qty", CN.release_qty, isEditMode, C.WIDTH_SHORT, false),
    col.id("equip_detail_id", CN.equip_detail_id, C.HIDDEN_ID),
    col.select(
      "equip_detail_nm",
      CN.equip_detail_nm,
      isEditMode,
      C.WIDTH_SHORT
    ),
    col.id("inv_from_store_id", CN.inv_from_store_id, C.HIDDEN_ID),
    col.text(
      "inv_from_store_nm",
      CN.inv_from_store_nm,
      false,
      false,
      C.WIDTH_SHORT
    ),
    col.id("inv_from_location_id", CN.inv_from_location_id, C.HIDDEN_ID),
    col.text(
      "inv_from_location_nm",
      CN.inv_from_location_nm,
      false,
      false,
      C.WIDTH_SHORT
    ),
    col.id("release_emp_id", CN.release_emp_id, C.HIDDEN_ID),
    col.select("release_nm", CN.release_nm, isEditMode, C.WIDTH_SHORT),
    col.text("remark", CN.remark, isEditMode, false, C.WIDTH_LONG),
    col.date("create_at", CN.create_at, false, C.WIDTH_LONG),

    col.id("create_uid", CN.create_uid, C.HIDDEN_ID),
    col.text(
      "create_user_nm",
      CN.create_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
    col.date("update_at", CN.update_at, false, C.WIDTH_LONG),
    col.id("update_uid", CN.update_uid, C.HIDDEN_ID),
    col.text(
      "update_user_nm",
      CN.update_user_nm,
      false,
      false,
      C.WIDTH_SHORT,
      "center"
    ),
  ];
  const columnsModal = [
    col.text("factory_cd", CN.factory_cd, true, false, C.WIDTH_SHORT),
    col.text("factory_nm", CN.factory_nm, true, false, C.WIDTH_SHORT),
  ];

  const columnsModalHeader = [
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.select("line_nm", CN.line_nm, true, C.WIDTH_SHORT),
    col.id("equip_detail_id", CN.equip_detail_id, C.HIDDEN_ID),
    col.select("equip_detail_nm", CN.equip_detail_nm, true, C.WIDTH_SHORT),
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),
    col.select("prod_cd", CN.prod_cd, true, C.WIDTH_MIDDLE),
    col.select("prod_nm", CN.prod_nm, true, C.WIDTH_MIDDLE),

    col.text("lot_no", CN.lot_no, false, false, C.WIDTH_MIDDLE),
    col.number("stock", CN.stock, true, C.WIDTH_SHORT, false),
    col.date("outgo_date", CN.outgo_date, false, C.WIDTH_SHORT),
    col.id("store_id", CN.from_store_id, C.HIDDEN_ID),
    col.select("store_nm", CN.from_store_nm, false, C.WIDTH_SHORT),
    col.id("location_id", CN.from_location_id, C.HIDDEN_ID),
    col.select("location_nm", CN.from_location_nm, true, C.WIDTH_SHORT),
    col.id("release_uid", CN.release_uid, C.HIDDEN_ID),
    col.select("release_nm", CN.release_nm, true, C.WIDTH_SHORT),
    col.text("remark", CN.remark, true, false, C.WIDTH_LONG),
  ];

  const columnsModalSelectProduct = [
    col.id("prod_id", CN.prod_id, C.HIDDEN_ID),

    col.text("prod_cd", CN.prod_cd, false, false, C.WIDTH_MIDDLE),
    col.text(
      "prod_nm",
      CN.prod_nm,
      false,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      C.U,
      "select"
    ),
    col.text(
      "lot_no",
      CN.lot_no,
      false,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      C.U,
      "select"
    ),
    col.number("stock", CN.stock, false, C.WIDTH_SHORT, false),
    col.id("store_id", CN.store_id, C.HIDDEN_ID),

    col.text(
      "store_cd",
      CN.store_cd,
      false,
      true,
      C.WIDTH_MIDDLE,
      C.U,
      C.U,
      "select"
    ),
    col.text(
      "store_nm",
      CN.outgo_store_nm,
      false,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      C.U,
      "select"
    ),
    col.id("location_id", CN.location_id, C.HIDDEN_ID),
    col.text(
      "location_cd",
      CN.location_cd,
      false,
      true,
      C.WIDTH_MIDDLE,
      C.U,
      C.U,
      "select"
    ),
    col.text(
      "location_nm",
      CN.location_nm,
      false,
      false,
      C.WIDTH_MIDDLE,
      C.U,
      C.U,
      "select"
    ),
  ];

  const columnsModalSelectEquipDetail = [
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_cd", CN.equip_cd, false, false, C.WIDTH_SHORT),
    col.text("equip_nm", CN.equip_nm, false, false, C.WIDTH_SHORT),
  ];

  const columnsModalSelectStore = [
    col.id("from_store_id", CN.from_store_id, C.HIDDEN_ID),
    col.text("from_store_nm", CN.from_store_nm, false, false, C.WIDTH_SHORT),
    col.id("from_location_id", CN.from_location_id, C.HIDDEN_ID),
    col.text(
      "from_location_nm",
      CN.from_location_nm,
      false,
      false,
      C.WIDTH_SHORT
    ),
  ];

  const columnsModalSelectReleaseUser = [
    col.text("dept_nm", CN.dept_nm, false, false, C.WIDTH_MIDDLE),
    col.text("grade_nm", CN.grade_nm, false, false, C.WIDTH_MIDDLE),
    col.id("release_uid", CN.release_uid, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, false, false, C.WIDTH_SHORT),
    col.text("release_nm", CN.release_nm, false, false, C.WIDTH_SHORT),
    col.text(
      "worker_group_nm",
      CN.worker_group_nm,
      false,
      true,
      C.WIDTH_MIDDLE
    ),
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
  const datePickerSet = null;

  /**
   * 🔸inputSet id 값이 ✨ BE : query params
   */
  const inputSet = [
    {
      id: "lot_no",
      name: CN.lot_no,
    },
    {
      id: "equip_detail_nm",
      name: CN.equip_detail_nm,
    },
    {
      id: "release_emp_nm",
      name: CN.release_nm,
    },
  ];

  const columnsModalSelectLine = [
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_nm", CN.line_nm, false, false, C.WIDTH_MIDDLE),
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
    columnsModalHeader,
    columnsModalSelectProduct,
    columnsModalSelectLine,
    columnsModalSelectEquipDetail,
    columnsModalSelectStore,
    columnsModalSelectReleaseUser,
  };
}

export default SparePartReleaseSet;
