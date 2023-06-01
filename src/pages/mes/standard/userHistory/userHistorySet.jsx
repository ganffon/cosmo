//사용자관리✨
import { useEffect } from "react";
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function UserHistorySet(isEditMode) {
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
    col.id("user_log_id", CN.user_log_id, C.HIDDEN_ID),
    col.text("user_action", CN.user_action, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.text("factory_nm", CN.factory_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("uid", CN.uid, C.HIDDEN_ID),
    col.text("id", CN.id),
    col.text("user_nm", CN.user_nm),
    col.text("user_ip", CN.user_ip, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("req_url", CN.req_url, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
  ];
  const inputSet = [
    {
      id: "user_action",
      name: CN.user_action,
    },
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
    inputSet,
  };
}
export default UserHistorySet;
