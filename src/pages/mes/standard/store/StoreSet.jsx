//창고관리✨
import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function StoreSet(isEditMode) {
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
    col.id("store_id", CN.store_id, C.HIDDEN_ID),
    col.text("store_cd", CN.store_cd),
    col.text("store_nm", CN.store_nm, isEditMode),
    col.check("reject_store_fg", CN.reject_store_fg, isEditMode, C.U, true),
    col.check("return_store_fg", CN.return_store_fg, isEditMode, C.U, true),
    col.check("outgo_store_fg", CN.outgo_store_fg, isEditMode, C.U, true),
    col.check(
      "final_insp_store_fg",
      CN.final_insp_store_fg,
      isEditMode,
      C.U,
      true
    ),
    col.check(
      "outsourcing_store_fg",
      CN.outsourcing_store_fg,
      isEditMode,
      C.U,
      true
    ),
    col.check(
      "available_store_fg",
      CN.available_store_fg,
      isEditMode,
      C.U,
      true
    ),
    col.text(
      "position_type",
      CN.position_type,
      isEditMode,
      C.U,
      C.WIDTH_MIDDLE
    ),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.rText("store_cd", CN.store_cd, true),
    col.rText("store_nm", CN.store_nm, true),
    col.check("reject_store_fg", CN.reject_store_fg, true, C.U, true),
    col.check("return_store_fg", CN.return_store_fg, true, C.U, true),
    col.check("outgo_store_fg", CN.outgo_store_fg, true, C.U, true),
    col.check("final_insp_store_fg", CN.final_insp_store_fg, true, C.U, true),
    col.check("outsourcing_store_fg", CN.outsourcing_store_fg, true, C.U, true),
    col.check("available_store_fg", CN.available_store_fg, true, C.U, true),
    col.text("position_type", CN.position_type, true, C.U, C.WIDTH_MIDDLE),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // frozenColumn은 여기 값만 수정
  };

  const header = col.multi([
    "reject_store_fg",
    "return_store_fg",
    "outgo_store_fg",
    "final_insp_store_fg",
    "outsourcing_store_fg",
    "available_store_fg",
  ]);
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

  const datePickerSet = null; // "single" || "range" || null

  const inputSet = [
    {
      id: "store_cd",
      name: CN.store_cd,
    },
    {
      id: "store_nm",
      name: CN.store_nm,
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

export default StoreSet;
