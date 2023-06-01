//사용자관리✨
import { useEffect } from "react";
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function UserSet(isEditMode) {
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
    col.text("user_nm", CN.user_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.password("pwd", CN.pwd, isEditMode),
    col.text("email", CN.email, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.check("pwd_fg", CN.pwd_fg, false),
    col.check("admin_fg", CN.admin_fg, isEditMode),
    col.check("super_admin_fg", CN.super_admin_fg, false),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.text("id", CN.id, true, C.U, C.WIDTH_MIDDLE),
    col.text("user_nm", CN.user_nm, true, C.U, C.WIDTH_MIDDLE),
    col.password("pwd", CN.pwd, true),
    col.text("email", CN.email, true, C.U, C.WIDTH_MIDDLE),
    col.check("admin_fg", CN.admin_fg, true),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];
  const header = col.multi(["pwd_fg", "admin_fg", "super_admin_fg"]);
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

export default UserSet;
