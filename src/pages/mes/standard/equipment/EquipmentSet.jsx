//설비관리✨
import { useEffect } from "react";
import restURI from "json/restURI.json";
import "components/grid/setting/GridStyle.css";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function EquipmentSet(isEditMode, processList) {
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
    col.list("proc_id", "proc_nm", CN.proc_nm, processList, isEditMode),
    col.id("equip_id", CN.equip_id, C.HIDDEN_ID),
    col.text("equip_cd", CN.equip_cd, C.U, C.U, C.WIDTH_MIDDLE),
    col.text("equip_nm", CN.equip_nm, isEditMode, C.U, C.WIDTH_MIDDLE),
    col.id("manager_emp_id", CN.manager_emp_id, C.HIDDEN_ID),
    col.select("manager_emp_nm", CN.manager_emp_nm, isEditMode),
    col.id("sub_manager_emp_id", CN.sub_manager_emp_id, C.HIDDEN_ID),
    col.select("sub_manager_emp_nm", CN.sub_manager_emp_nm, isEditMode),
    col.check("use_fg", CN.use_fg, isEditMode),
    col.check("prd_fg", CN.prd_fg, isEditMode, C.U, true),
    col.text("remark", CN.remark, isEditMode, C.U, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("create_user_nm", CN.create_user_nm, C.U, C.U, C.U, "center"),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text("update_user_nm", CN.update_user_nm, C.U, C.U, C.U, "center"),
  ];
  const columnsModal = [
    col.list("proc_id", "proc_nm", CN.proc_nm, processList, true),
    col.text("equip_cd", CN.equip_cd, true, C.U, C.WIDTH_MIDDLE),
    col.text("equip_nm", CN.equip_nm, true, C.U, C.WIDTH_MIDDLE),
    col.id("manager_emp_id", CN.manager_emp_id, C.HIDDEN_ID),
    col.select("manager_emp_nm", CN.manager_emp_nm, true),
    col.id("sub_manager_emp_id", CN.sub_manager_emp_id, C.HIDDEN_ID),
    col.select("sub_manager_emp_nm", CN.sub_manager_emp_nm, true),
    col.check("use_fg", CN.use_fg, true),
    col.check("prd_fg", CN.prd_fg, true, C.U, true),
    col.text("remark", CN.remark, true, C.U, C.WIDTH_LONG),
  ];
  const columnsModalSelect = [
    col.text("dept_nm", CN.dept_nm, C.U, C.U, C.WIDTH_LONG, C.U, C.U, true),

    col.text("grade_nm", CN.grade_nm, C.U, C.U, C.U, C.U, C.U, true),
    col.id("emp_id", CN.emp_id, C.HIDDEN_ID),
    col.text("emp_cd", CN.emp_cd, C.U, C.U, C.U, C.U, C.U, true),
    col.text("emp_nm", CN.emp_nm, C.U, C.U, C.WIDTH_MIDDLE, C.U, C.U, true),
  ];
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];

  const header = col.multi(["prd_fg", "use_fg"]);
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
      id: "equip_cd",
      name: CN.equip_cd,
    },
    {
      id: "equip_nm",
      name: CN.equip_nm,
    },
  ];

  return {
    data,
    columns,
    columnsModal,
    columnsModalSelect,
    columnOptions,
    rowHeaders,
    rowHeadersModal,
    header,
    datePickerSet,
    inputSet,
  };
}

export default EquipmentSet;
