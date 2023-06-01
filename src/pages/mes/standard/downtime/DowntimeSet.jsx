//비가동관리✨
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function DowntimeSet(isEditMode, downtimeTypeList) {
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
    col.list(
      "downtime_type_id",
      "downtime_type_nm",
      CN.downtime_type_nm,
      downtimeTypeList,
      isEditMode
    ),
    col.id("downtime_id", CN.downtime_id, C.HIDDEN_ID),
    col.text("downtime_cd", CN.downtime_cd),
    col.text("downtime_nm", CN.downtime_nm, isEditMode),
    col.check("scheduled_shutdown_fg", CN.scheduled_shutdown_fg, isEditMode),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.list(
      "downtime_type_id",
      "downtime_type_nm",
      CN.downtime_type_nm,
      downtimeTypeList,
      true
    ),
    col.text("downtime_cd", CN.downtime_cd, true),
    col.text("downtime_nm", CN.downtime_nm, true),
    col.check("scheduled_shutdown_fg", CN.scheduled_shutdown_fg, true),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = col.multi(["scheduled_shutdown_fg"]);
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
      id: "downtime_cd",
      name: CN.downtime_cd,
    },
    {
      id: "downtime_nm",
      name: CN.downtime_nm,
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

export default DowntimeSet;
