//권한설정관리✨
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function TemporarySetupSet(isEditMode, AuthTypeGbnList) {
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
    col.id("uid", CN.uid, C.HIDDEN_ID),
    col.text("id", CN.id, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("user_nm", CN.user_nm, false, C.U, C.WIDTH_MIDDLE),
    col.list("auth_type", "auth_type", CN.auth_type, AuthTypeGbnList, isEditMode),
    // col.text("auth_type", CN.auth_type, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.text("create_at", CN.create_at, C.U, true, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, true, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, true, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, true, C.U, "center"),
  ];
  const columnsModal = [
    col.rText("setup_cd", CN.setup_cd, true),
    col.rText("setup_nm", CN.setup_nm, true),
    col.check("auth_read", CN.auth_read, true),
    col.check("auth_create", CN.auth_create, true),
    col.check("auth_update", CN.auth_update, true),
    col.check("auth_delete", CN.auth_delete, true),
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
      id: "id",
      name: CN.id,
    },
    {
      id: "user_nm",
      name: CN.user_nm,
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

export default TemporarySetupSet;
