import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function lineDepartmentSet(isEditMode) {
  const data = [];
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersModal = ["rowNum"];

  const columns = [
    col.id("line_dept_id", CN.line_dept_id, C.HIDDEN_ID),
    col.text("line_dept_cd", CN.line_dept_cd),
    col.text("line_dept_nm", CN.line_dept_nm, isEditMode),
    col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
    col.text("factory_cd", CN.factory_cd, C.U, true),
    col.text("factory_nm", CN.factory_nm, C.U, C.U, C.WIDTH_MIDDLE),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_cd", CN.line_cd, C.U, true),
    col.select("line_nm", CN.line_nm, isEditMode),
    col.id("dept_id", CN.dept_id, C.HIDDEN_ID),
    col.text("dept_cd", CN.dept_cd, C.U, true),
    col.select("dept_nm", CN.dept_nm, isEditMode, C.WIDTH_LONG),
    col.text("create_at", CN.create_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text(
      "create_user_nm",
      CN.create_user_nm,
      C.U,
      C.U,
      C.WIDTH_SHORT,
      "center"
    ),
    col.text("update_at", CN.update_at, C.U, C.U, C.WIDTH_LONG, "center"),
    col.text(
      "update_user_nm",
      CN.update_user_nm,
      C.U,
      C.U,
      C.WIDTH_SHORT,
      "center"
    ),
  ];
  const columnsModal = [
    col.text("line_dept_cd", CN.line_dept_cd, true),
    col.text("line_dept_nm", CN.line_dept_nm, true),
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_cd", CN.line_cd, C.U, true),
    col.select("line_nm", CN.line_nm, true),
    col.id("dept_id", CN.dept_id, C.HIDDEN_ID),
    col.text("dept_cd", CN.dept_cd, C.U, true),
    col.select("dept_nm", CN.dept_nm, true, C.WIDTH_LONG),
  ];

  const columnsModalSelectLine = [
    col.id("line_id", CN.line_id, C.HIDDEN_ID),
    col.text("line_cd", CN.line_cd),
    col.text("line_nm", CN.line_nm),
  ];
  const columnsModalSelectDept = [
    col.id("dept_id", CN.dept_id, C.HIDDEN_ID),
    col.text("dept_cd", CN.dept_cd),
    col.text("dept_nm", CN.dept_nm, C.U, C.U, C.WIDTH_LONG),
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
      id: "line_dept_cd",
      name: CN.line_dept_cd,
    },
    {
      id: "line_dept_nm",
      name: CN.line_dept_nm,
    },
  ];

  return {
    data,
    rowHeaders,
    rowHeadersModal,
    columns,
    columnsModal,
    columnsModalSelectLine,
    columnsModalSelectDept,
    columnOptions,
    header,
    datePickerSet,
    inputSet,
  };
}

export default lineDepartmentSet;
