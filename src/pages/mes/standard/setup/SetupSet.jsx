//권한설정관리✨
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function SetupSet(isEditMode) {
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
    col.id("setup_id", CN.setup_id, C.HIDDEN_ID),
    col.text("setup_cd", CN.setup_cd),
    col.text("setup_nm", CN.setup_nm, isEditMode),
    col.check("auth_read", CN.auth_read, isEditMode),
    col.check("auth_create", CN.auth_create, isEditMode),
    col.check("auth_update", CN.auth_update, isEditMode),
    col.check("auth_delete", CN.auth_delete, isEditMode),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
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
      id: "setup_cd",
      name: CN.setup_cd,
    },
    {
      id: "setup_nm",
      name: CN.setup_nm,
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

export default SetupSet;
